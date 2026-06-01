"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, ArrowRight, Folder, CheckCircle2, Clock, Calendar, Sparkles, Paintbrush, Home, Building } from "lucide-react";
import Link from "next/link";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { cn } from "@/lib/utils";

// Category definitions
const CATEGORIES = [
  { id: "all", label: "All Projects", icon: <Folder className="w-4 h-4" /> },
  { id: "interior", label: "Interior Design", icon: <Paintbrush className="w-4 h-4" /> },
  { id: "construction", label: "Construction", icon: <Building className="w-4 h-4" /> },
  { id: "3d-design", label: "3D Design", icon: <Home className="w-4 h-4" /> }
];

// Fallback Residential Mock Data
const RESIDENTIAL_MOCK_PROJECTS = [
  {
    id: "mock-res-1",
    title: "Ranchi Luxury Penthouse",
    category: "interior",
    status: "completed",
    projectSegment: "residential",
    description: "Turnkey luxury interior execution featuring customized acrylic modular kitchen setup, hydraulic storage beds, false ceilings, and smart home ambient lighting.",
    image: "/generated/srv_interior.png",
    location: "Ranchi, Jharkhand"
  },
  {
    id: "mock-res-2",
    title: "Deoghar Modern Duplex Villa",
    category: "construction",
    status: "ongoing",
    projectSegment: "residential",
    description: "Full civil villa structure from footing foundation to structural pillars, utilizing premium quality Tata steel and UltraTech concrete for lifetime endurance.",
    image: "/generated/srv_construction.png",
    location: "Deoghar, Jharkhand"
  },
  {
    id: "mock-res-3",
    title: "Bhagalpur Smart Apartment Plan",
    category: "3d-design",
    status: "upcoming",
    projectSegment: "residential",
    description: "Detailed 3D elevation renders, layout blueprints, and photorealistic space mapping optimized fully for traditional Vastu compliance.",
    image: "/generated/srv_3d_design.png",
    location: "Bhagalpur, Bihar"
  },
  {
    id: "mock-res-4",
    title: "Godda Classic Estate Structure",
    category: "construction",
    status: "completed",
    projectSegment: "residential",
    description: "Finished high-end structural villa construction, complete with wall putty bases, primer coatings, and robust anti-moisture shield paint sets.",
    image: "/generated/legacy_villa.png",
    location: "Godda, Jharkhand"
  },
  {
    id: "mock-res-5",
    title: "Dumka Cozy Family Flat",
    category: "interior",
    status: "ongoing",
    projectSegment: "residential",
    description: "Ongoing comprehensive false ceiling execution, louvered wall paneling installations, and engineered double-charged tiles layering work.",
    image: "/generated/fac_false_ceiling.png",
    location: "Dumka, Jharkhand"
  }
];

// Fallback Commercial Mock Data
const COMMERCIAL_MOCK_PROJECTS = [
  {
    id: "mock-com-1",
    title: "Ranchi Corporate Headquarters",
    category: "interior",
    status: "completed",
    projectSegment: "commercial",
    description: "Modern modular office workspace design with luxury executive cabins, soundproof partition grids, structured network wiring, and central air routing.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
    location: "Ranchi, Jharkhand"
  },
  {
    id: "mock-com-2",
    title: "Deoghar Multi-Floor Retail Mall",
    category: "construction",
    status: "ongoing",
    projectSegment: "commercial",
    description: "Heavy-duty commercial tower structural execution featuring high-end glass elevations, concrete floor slabs, and centralized automated ventilation frameworks.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
    location: "Deoghar, Jharkhand"
  },
  {
    id: "mock-com-3",
    title: "Bhagalpur Medical Complex Plan",
    category: "3d-design",
    status: "upcoming",
    projectSegment: "commercial",
    description: "High-fidelity 3D structural rendering and Spacing Blueprints for a state-of-the-art diagnostic clinic, complying with regional safety guidelines.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop",
    location: "Bhagalpur, Bihar"
  },
  {
    id: "mock-com-4",
    title: "Godda Regional Bank Hub",
    category: "interior",
    status: "completed",
    projectSegment: "commercial",
    description: "Turnkey structural setup of bank workstations, reception desk panelling, secure vault access layouts, and low-voltage cable routing setups.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&auto=format&fit=crop",
    location: "Godda, Jharkhand"
  },
  {
    id: "mock-com-5",
    title: "Dumka Boutique Restaurant Fitout",
    category: "interior",
    status: "ongoing",
    projectSegment: "commercial",
    description: "Ongoing luxury cafe fine dining lounge layout construction, complete with smart accent lighting, acoustic partitions, and commercial modular kitchen setup.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop",
    location: "Dumka, Jharkhand"
  },
  {
    id: "mock-com-6",
    title: "Banka School Spacing Layout",
    category: "3d-design",
    status: "completed",
    projectSegment: "commercial",
    description: "Optimized classroom layouts, structural column drawings, and safe fire-escape routing layouts for a new high school academy.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop",
    location: "Banka, Bihar"
  }
];

export default function ProjectsPage() {
  const [projectSegment, setProjectSegment] = useState<"residential" | "commercial">("residential");
  const [activeCategory, setActiveCategory] = useState("all");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // If Firestore database has projects, use them. Otherwise, fall back to beautiful mock data!
      if (fetched.length > 0) {
        setProjects(fetched);
      } else {
        setProjects([...RESIDENTIAL_MOCK_PROJECTS, ...COMMERCIAL_MOCK_PROJECTS]);
      }
      setLoading(false);
    }, (error) => {
      console.warn("Firestore connection error, falling back to mock projects:", error);
      setProjects([...RESIDENTIAL_MOCK_PROJECTS, ...COMMERCIAL_MOCK_PROJECTS]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSegmentChange = (segment: "residential" | "commercial") => {
    setProjectSegment(segment);
    setActiveCategory("all");
  };

  // Filtering projects
  const filteredProjects = projects.filter(proj => {
    // Filter by active segment
    const segment = proj.projectSegment || "residential";
    if (segment !== projectSegment) return false;

    // Filter by active category
    if (activeCategory === "all") return true;
    return proj.category === activeCategory;
  });

  const completedProjects = filteredProjects.filter(p => p.status === "completed");
  const ongoingProjects = filteredProjects.filter(p => p.status === "ongoing");
  const upcomingProjects = filteredProjects.filter(p => p.status === "upcoming");

  return (
    <div className="bg-[#051124] min-h-screen text-white pt-24 pb-20 relative overflow-hidden">
      {/* Background Mandala Vector Backing */}
      <div className="absolute inset-0 bg-logo-radial opacity-35 pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-accent/80 font-bold uppercase tracking-widest text-[9px] mb-8 justify-center">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="text-white/20">/</span>
          <span className="text-accent">Projects Portfolio</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-10 animate-fade-up">
          <Badge className="mb-4 rounded-full bg-accent/15 text-accent border border-accent/20 font-black tracking-[0.20em] px-5 py-2 text-[10px] uppercase">
            Galaxy Works
          </Badge>
          <h1 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tight text-white leading-none mb-6">
            Our <span className="text-gold italic">Projects</span>
          </h1>
          <p className="max-w-xl mx-auto text-xs md:text-sm text-white/50 font-semibold leading-relaxed">
            Explore our state-of-the-art design blueprints, civil structures under active construction, and luxury custom interiors across the region.
          </p>
          <div className="w-20 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Segment Selector Toggle */}
        <div className="flex justify-center mb-12 animate-fade-up">
          <div className="bg-[#08162d] border border-white/10 p-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
            <button
              type="button"
              onClick={() => handleSegmentChange("residential")}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2",
                projectSegment === "residential"
                  ? "bg-gold-gradient text-primary shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                  : "text-white/60 hover:text-white"
              )}
            >
              🏠 Residential Projects
            </button>
            <button
              type="button"
              onClick={() => handleSegmentChange("commercial")}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2",
                projectSegment === "commercial"
                  ? "bg-accent text-primary shadow-[0_0_12px_rgba(255,207,51,0.4)]"
                  : "text-white/60 hover:text-white"
              )}
            >
              🏢 Commercial Projects
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-4xl mx-auto animate-fade-up">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 border ${
                activeCategory === cat.id
                  ? "border-accent bg-accent/15 text-white shadow-[0_0_15px_rgba(255,207,51,0.15)]"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-accent"></div>
          </div>
        ) : (
          <div className="space-y-24">
            
            {/* 1. COMPLETED PROJECTS */}
            <section className="space-y-8 animate-fade-up">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="bg-emerald-400/10 text-emerald-400 p-2.5 rounded-2xl border border-emerald-400/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-display">Completed Masterpieces</h2>
                  <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-1">Fully delivered & handed over sites</p>
                </div>
                <div className="ml-auto bg-[#08162d] text-white/85 font-black text-xs px-4 py-2 rounded-full border border-white/10">
                  {completedProjects.length} Projects
                </div>
              </div>

              {completedProjects.length === 0 ? (
                <p className="text-white/40 italic text-sm py-4 text-center">No completed {projectSegment} projects under this category yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {completedProjects.map((proj) => (
                    <ProjectCard key={proj.id} project={proj} projectSegment={projectSegment} />
                  ))}
                </div>
              )}
            </section>

            {/* 2. ONGOING PROJECTS */}
            <section className="space-y-8 animate-fade-up">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="bg-accent/15 text-accent p-2.5 rounded-2xl border border-accent/20">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-display">Ongoing Sites</h2>
                  <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-1">Under active structural civil execution</p>
                </div>
                <div className="ml-auto bg-[#08162d] text-white/85 font-black text-xs px-4 py-2 rounded-full border border-white/10">
                  {ongoingProjects.length} Projects
                </div>
              </div>

              {ongoingProjects.length === 0 ? (
                <p className="text-white/40 italic text-sm py-4 text-center">No active ongoing {projectSegment} sites under this category.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {ongoingProjects.map((proj) => (
                    <ProjectCard key={proj.id} project={proj} projectSegment={projectSegment} />
                  ))}
                </div>
              )}
            </section>

            {/* 3. UPCOMING PROJECTS */}
            <section className="space-y-8 animate-fade-up">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="bg-blue-400/10 text-blue-400 p-2.5 rounded-2xl border border-blue-400/20">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-display">Upcoming Blueprints</h2>
                  <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-1">Scheduled for spacing models & site setup</p>
                </div>
                <div className="ml-auto bg-[#08162d] text-white/85 font-black text-xs px-4 py-2 rounded-full border border-white/10">
                  {upcomingProjects.length} Projects
                </div>
              </div>

              {upcomingProjects.length === 0 ? (
                <p className="text-white/40 italic text-sm py-4 text-center">No upcoming {projectSegment} blueprints queued in this category.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcomingProjects.map((proj) => (
                    <ProjectCard key={proj.id} project={proj} projectSegment={projectSegment} />
                  ))}
                </div>
              )}
            </section>

          </div>
        )}

        {/* Lead Capture Banner */}
        <div className="mt-28 bg-[#08162d] border border-white/10 rounded-[32px] p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden animate-fade-up shadow-2xl">
          <div className="absolute inset-0 bg-logo-radial opacity-30 -z-10" />
          <Badge className="mb-4 rounded-full bg-accent/15 border border-accent/25 text-accent font-black tracking-widest px-4 py-1.5 text-[9px] uppercase">
            Consultation Free
          </Badge>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">
            Shaping Dreams, <span className="text-gold italic">Crafting Spaces</span>
          </h2>
          <p className="text-xs md:text-sm text-white/50 leading-relaxed max-w-xl mx-auto mb-8 font-semibold">
            Ready to initiate your custom room plans, luxury modular designs, or entire commercial corporate layouts? Talk to our chief architect now.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="rounded-full h-12 px-8 font-black uppercase tracking-wider bg-accent hover:bg-accent/90 text-primary">
              <Link href="/pricing?tab=interior-estimate">
                Instant Estimate Calculator
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full h-12 px-8 font-black uppercase tracking-wider border-white/20 hover:border-accent text-white hover:text-accent bg-transparent">
              <Link href="/contact">Book Free Consultation</Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

// Project Card Subcomponent
function ProjectCard({ project, projectSegment }: { project: any; projectSegment: string }) {
  const categoryLabel = CATEGORIES.find(c => c.id === project.category)?.label || "Plan Layout";
  const statusColors = {
    completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    ongoing: "bg-accent/15 text-accent border-accent/25",
    upcoming: "bg-blue-500/15 text-blue-400 border-blue-500/25"
  };

  return (
    <Card className="group bg-[#08162d] border border-white/10 rounded-[24px] overflow-hidden hover:border-accent/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-accent/5 flex flex-col justify-between h-full text-left">
      <div>
        <div className="relative aspect-video w-full overflow-hidden bg-black/40 border-b border-white/5">
          <img
            loading="lazy"
            src={project.image || "/generated/srv_interior.png"}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Status Badge overlay */}
          <div className="absolute top-4 left-4">
            <Badge className={`rounded-full font-black text-[9px] uppercase tracking-wider border px-3 py-1 shadow-md ${statusColors[project.status as keyof typeof statusColors]}`}>
              {project.status}
            </Badge>
          </div>

          {/* Category Badge overlay */}
          <div className="absolute top-4 right-4">
            <Badge className="rounded-full bg-[#051124]/90 text-white/90 border border-white/10 font-bold text-[9px] tracking-wide px-3 py-1 shadow-md">
              {categoryLabel}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-accent font-black tracking-widest text-[9px] uppercase">
              <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
              {project.location || "Jharkhand"}
            </div>
            {projectSegment === "commercial" ? (
              <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[8px] font-black uppercase tracking-wider rounded-full px-2">🏢 Commercial</Badge>
            ) : (
              <Badge className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[8px] font-black uppercase tracking-wider rounded-full px-2">🏠 Residential</Badge>
            )}
          </div>
          <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-accent transition-colors leading-tight font-display line-clamp-1">
            {project.title}
          </h3>
          <p className="text-white/50 text-xs leading-relaxed line-clamp-3 font-semibold">
            {project.description}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2">
        <Button asChild variant="outline" className="w-full text-xs font-black uppercase tracking-wider border-white/10 hover:border-accent text-white hover:text-accent bg-transparent rounded-xl h-10">
          <Link href="/contact" className="flex items-center justify-center gap-1.5">
            Query Spacing Design
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
