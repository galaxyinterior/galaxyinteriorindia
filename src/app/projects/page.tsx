"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight, Folder, CheckCircle2, Clock, Calendar, Sparkles, Filter, Building2, Paintbrush, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Category definitions
const CATEGORIES = [
  { id: "all", label: "All Projects", icon: <Folder className="w-4 h-4" /> },
  { id: "interior", label: "Interior Design", icon: <Paintbrush className="w-4 h-4" /> },
  { id: "construction", label: "Construction", icon: <Building2 className="w-4 h-4" /> },
  { id: "3d-design", label: "3D Design", icon: <Home className="w-4 h-4" /> },
  { id: "other", label: "Other Services", icon: <Sparkles className="w-4 h-4" /> }
];

// Fallback Mock Data
const MOCK_PROJECTS = [
  {
    id: "mock-1",
    title: "Ranchi Luxury Penthouse",
    category: "interior",
    status: "completed",
    description: "Turnkey luxury interior execution featuring customized acrylic modular kitchen setup, hydraulic storage beds, false ceilings, and smart home ambient lighting.",
    image: "/generated/srv_interior.png",
    location: "Ranchi, Jharkhand"
  },
  {
    id: "mock-2",
    title: "Deoghar Modern Duplex Villa",
    category: "construction",
    status: "ongoing",
    description: "Full civil villa structure from footing foundation to structural pillars, utilizing premium quality Tata steel and UltraTech concrete for lifetime endurance.",
    image: "/generated/srv_construction.png",
    location: "Deoghar, Jharkhand"
  },
  {
    id: "mock-3",
    title: "Bhagalpur Smart Apartment Plan",
    category: "3d-design",
    status: "upcoming",
    description: "Detailed 3D elevation renders, layout blueprints, and photorealistic space mapping optimized fully for traditional Vastu compliance.",
    image: "/generated/srv_3d_design.png",
    location: "Bhagalpur, Bihar"
  },
  {
    id: "mock-4",
    title: "Godda Classic Estate Structure",
    category: "construction",
    status: "completed",
    description: "Finished high-end structural villa construction, complete with wall putty bases, primer coatings, and robust anti-moisture shield paint sets.",
    image: "/generated/legacy_villa.png",
    location: "Godda, Jharkhand"
  },
  {
    id: "mock-5",
    title: "Dumka Cozy Family Flat",
    category: "interior",
    status: "ongoing",
    description: "Ongoing comprehensive false ceiling execution, louvered wall paneling installations, and engineered double-charged tiles layering work.",
    image: "/generated/fac_false_ceiling.png",
    location: "Dumka, Jharkhand"
  },
  {
    id: "mock-6",
    title: "Banka Office Workspace Design",
    category: "3d-design",
    status: "completed",
    description: "Full blueprint layout design of a modern modular co-working space. Optimized ceiling grids and hidden structural wiring lines.",
    image: "/generated/3d_split_interior_hero.png",
    location: "Banka, Bihar"
  }
];

export default function ProjectsPage() {
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
      setProjects(fetched.length > 0 ? fetched : MOCK_PROJECTS);
      setLoading(false);
    }, (error) => {
      console.warn("Firestore connection error, falling back to mock projects:", error);
      setProjects(MOCK_PROJECTS);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filtering projects
  const filteredProjects = projects.filter(proj => {
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
        <div className="text-center mb-16 animate-fade-up">
          <Badge className="mb-4 rounded-full bg-accent text-primary font-black tracking-[0.20em] px-5 py-2 border-none shadow-md text-[10px] uppercase">
            Galaxy Works
          </Badge>
          <h1 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tight text-white leading-none mb-6">
            Our <span className="text-gold italic">Projects</span>
          </h1>
          <p className="max-w-xl mx-auto text-xs md:text-sm text-white/60 font-semibold leading-relaxed">
            Explore our architectural models, construction projects, and custom turnkey luxury interiors across Jharkhand, Bihar, and West Bengal.
          </p>
          <div className="w-20 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
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
                <div>
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-display">Completed Masterpieces</h2>
                  <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-1">Fully delivered & handed over projects</p>
                </div>
                <div className="ml-auto bg-white/5 text-white/80 font-black text-xs px-3.5 py-1.5 rounded-full border border-white/10">
                  {completedProjects.length} Projects
                </div>
              </div>

              {completedProjects.length === 0 ? (
                <p className="text-white/40 italic text-sm py-4">No completed projects under this category yet.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                  {completedProjects.map((proj) => (
                    <ProjectCard key={proj.id} project={proj} />
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
                <div>
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-display">Ongoing Sites</h2>
                  <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-1">Under active design or civil execution</p>
                </div>
                <div className="ml-auto bg-white/5 text-white/80 font-black text-xs px-3.5 py-1.5 rounded-full border border-white/10">
                  {ongoingProjects.length} Projects
                </div>
              </div>

              {ongoingProjects.length === 0 ? (
                <p className="text-white/40 italic text-sm py-4">No active ongoing projects under this category.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                  {ongoingProjects.map((proj) => (
                    <ProjectCard key={proj.id} project={proj} />
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
                <div>
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-display">Upcoming Blueprints</h2>
                  <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-1">Scheduled for layout planning & initial site prep</p>
                </div>
                <div className="ml-auto bg-white/5 text-white/80 font-black text-xs px-3.5 py-1.5 rounded-full border border-white/10">
                  {upcomingProjects.length} Projects
                </div>
              </div>

              {upcomingProjects.length === 0 ? (
                <p className="text-white/40 italic text-sm py-4">No upcoming projects queued in this category.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                  {upcomingProjects.map((proj) => (
                    <ProjectCard key={proj.id} project={proj} />
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
          <p className="text-xs md:text-sm text-white/60 leading-relaxed max-w-xl mx-auto mb-8 font-semibold">
            Ready to initiate your custom modular kitchen, luxury room interiors, or entire duplex architectural construction? Talk to our Chief Architect now.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="rounded-full h-12 px-8 font-black uppercase tracking-wider bg-accent hover:bg-accent/90 text-primary">
              <Link href="/services/interior-projects/estimate">
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
function ProjectCard({ project }: { project: any }) {
  const categoryLabel = CATEGORIES.find(c => c.id === project.category)?.label || "Fitout";
  const statusColors = {
    completed: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    ongoing: "bg-accent/15 text-accent border-accent/25",
    upcoming: "bg-blue-400/10 text-blue-400 border-blue-400/20"
  };

  return (
    <Card className="group bg-[#08162d] border border-white/10 rounded-[12px] sm:rounded-[18px] md:rounded-[24px] overflow-hidden hover:border-accent/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-accent/5 flex flex-col justify-between h-full">
      <div>
        <div className="relative aspect-video w-full overflow-hidden bg-black/40 border-b border-white/5">
          <img
            loading="lazy"
            src={project.image || "/generated/srv_interior.png"}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Status Badge overlay */}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
            <Badge className={`rounded-full font-black text-[7px] sm:text-[9px] uppercase tracking-wider border px-2 py-0.5 sm:px-3 sm:py-1 shadow-md ${statusColors[project.status as keyof typeof statusColors]}`}>
              {project.status}
            </Badge>
          </div>

          {/* Category Badge overlay */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
            <Badge className="rounded-full bg-primary/95 text-white/90 border border-white/10 font-bold text-[7px] sm:text-[9px] tracking-wide px-2 py-0.5 sm:px-3 sm:py-1 shadow-md">
              {categoryLabel}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-2.5 sm:p-4 md:p-6 space-y-1.5 sm:space-y-3">
          <div className="flex items-center gap-1 sm:gap-1.5 text-accent font-black tracking-widest text-[7px] sm:text-[9px] uppercase">
            <MapPin className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
            {project.location || "Jharkhand"}
          </div>
          <h3 className="text-[10px] sm:text-sm md:text-xl font-bold uppercase tracking-tight text-white group-hover:text-accent transition-colors leading-tight font-display line-clamp-1">
            {project.title}
          </h3>
          <p className="text-white/60 text-[9px] sm:text-xs leading-relaxed line-clamp-2 sm:line-clamp-3 font-semibold">
            {project.description}
          </p>
        </div>
      </div>

      <div className="px-2.5 sm:px-4 md:px-6 pb-2.5 sm:pb-4 md:pb-6 pt-1 sm:pt-2">
        <Button asChild variant="outline" className="w-full text-[8px] sm:text-xs font-black uppercase tracking-wider border-white/10 hover:border-accent text-white hover:text-accent bg-transparent rounded-lg sm:rounded-xl h-8 sm:h-10">
          <Link href="/contact" className="flex items-center justify-center gap-1 sm:gap-1.5">
            Query Design
            <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
