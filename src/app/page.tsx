"use client";

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ConsultationPopup from '@/components/home/ConsultationPopup';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { useMode } from '@/context/ModeContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Mail, ChevronRight, Star } from 'lucide-react';

const residentialServices = [
  { name: 'Architectural Plan', slug: 'architectural-plan', image: '/generated/hero_exterior_1.png', desc: 'Modern architectural & structural blueprints for your dream home.' },
  { name: '2D Floor Plan', slug: '2d-plan', image: '/generated/proc_planning.png', desc: 'Detailed 2D floor plans ensuring solid foundations and accurate mapping.' },
  { name: '3D Design', slug: '3d-design', image: '/generated/srv_3d_design.png', desc: 'Immersive 3D visualization to preview your interior and exterior.' },
  { name: 'Interior Projects', slug: 'interior-projects', image: '/generated/srv_interior.png', desc: 'Bespoke custom interiors crafted to fit your lifestyle and taste.' },
  { name: 'Construction', slug: 'construction', image: '/generated/srv_construction.png', desc: 'Full-service construction execution with high-quality materials.' },
  { name: 'Modular Kitchen', slug: 'modular-kitchen', image: '/generated/kitchen_offer_bg.png', desc: 'Smart, highly efficient & elegant kitchen solutions for modern homes.' },
];

const residentialFurniture = [
  { name: 'Luxury Velvet Sofa', category: 'Home', image: '/generated/furniture_sofa.png', price: 'Premium' },
  { name: 'Marble Dining Table', category: 'Home', image: '/generated/furniture_dining_table.png', price: 'Luxury' },
  { name: 'Designer King Bed', category: 'Home', image: '/generated/furniture_bed.png', price: 'Grand' },
  { name: 'Sleek Glass Wardrobe', category: 'Home', image: '/generated/furniture_wardrobe.png', price: 'Modern' },
  { name: 'Modern Coffee Table', category: 'Home', image: '/generated/furniture_coffee_table.png', price: 'Chic' },
];

const commercialServices = [
  { name: 'Commercial Tower Design', slug: 'architectural-plan', image: '/generated/srv_construction.png', desc: 'Premium architectural structures for malls, buildings, and corporate hubs.' },
  { name: 'Office Layout Plan', slug: '2d-plan', image: '/generated/proc_planning.png', desc: 'Optimized 2D spacing configurations for corporate seats, rooms, and blocks.' },
  { name: '3D Workspace Design', slug: '3d-design', image: '/generated/srv_3d_design.png', desc: 'High-end 3D corporate visualization to preview retail malls and showrooms.' },
  { name: 'Corporate Head Offices', slug: 'interior-projects', image: '/generated/srv_interior.png', desc: 'End-to-end office interiors designed for elite regional headquarters.' },
  { name: 'Retail Shop Execution', slug: 'construction', image: '/generated/legacy_villa.png', desc: 'Structural execution of retail shops, clinics, and medical centers.' },
  { name: 'Commercial False Ceiling', slug: 'modular-kitchen', image: '/generated/kitchen_offer_bg.png', desc: 'Acoustic false ceilings, automation lighting, and lobby panelling works.' },
];

const commercialFurniture = [
  { name: 'Executive Office Chair', category: 'Office', image: '/generated/furniture_office_chair.png', price: 'Elite' },
  { name: 'Ergonomic Visitor Chair', category: 'Office', image: '/generated/furniture_visitor_chair.png', price: 'Pro' },
  { name: 'Minimalist Bookshelf', category: 'Office', image: '/generated/furniture_bookshelf.png', price: 'Style' },
  { name: 'Executive Glass Wardrobe', category: 'Office', image: '/generated/furniture_wardrobe.png', price: 'Pro' },
  { name: 'Luxury Velvet Lobby Sofa', category: 'Office', image: '/generated/furniture_sofa.png', price: 'Premium' },
];

const partnerLogos = [
  { name: "Skydecor", path: "/partner_logos/skydecor.png" },
  { name: "Havells", path: "/partner_logos/Havells_Logo.svg.png" },
  { name: "Godrej", path: "/partner_logos/godrej.png" },
  { name: "Pidilite", path: "/partner_logos/Pidilite_logo.svg.png" },
  { name: "Panasonic", path: "/partner_logos/Panasonic_logo.svg.png" },
  { name: "Century Ply", path: "/partner_logos/Century_Plyboards.svg.png" },
  { name: "Greenply", path: "/partner_logos/Greenply_logo.svg.png" },
  { name: "Kajaria", path: "/partner_logos/kajaria.png" },
  { name: "Somany", path: "/partner_logos/somany.png" },
  { name: "UltraTech", path: "/partner_logos/Ultratech_Cement_Logo.svg.png" }
];

const LOCATIONS = [
  "Ranchi",
  "Godda",
  "Bhagalpur",
  "Banka",
  "Deoghar",
  "Hazaribagh",
  "Dumka",
  "Kishanganj",
  "Purnea"
];

const MOCK_REVIEWS = [
  {
    id: "mock-r1",
    name: "Ananya Sharma",
    location: "Ranchi",
    rating: 5,
    comment: "Galaxy Interior converted our 3BHK shell into a luxury haven. The modular kitchen and smart automation are spectacular!"
  },
  {
    id: "mock-r2",
    name: "Rahul Verma",
    location: "Godda",
    rating: 5,
    comment: "Highly professional construction and structural layout planning. Flawless turnkey execution."
  },
  {
    id: "mock-r3",
    name: "Vikram Singh",
    location: "Bhagalpur",
    rating: 5,
    comment: "Their 3D elevation renders mapped Vastu perfectly. Visually stunning and structurally solid."
  },
  {
    id: "mock-r4",
    name: "Pooja Kumari",
    location: "Deoghar",
    rating: 5,
    comment: "Outstanding service. The ceiling design, color combination, and light mapping were perfect for our duplex flat."
  },
  {
    id: "mock-r5",
    name: "Aman Gupta",
    location: "Hazaribagh",
    rating: 4,
    comment: "Great experience working with the design team. The executive wardrobe and modular kitchen have premium quality finishes."
  }
];

export default function HomePage() {
  const { mode, setMode } = useMode();
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [furnitureFilter, setFurnitureFilter] = React.useState('All');
  const [heroSlides, setHeroSlides] = React.useState<any[]>([]);
  const [dynamicServices, setDynamicServices] = React.useState<any[]>([]);

  // Expertise & Furniture slide indices for mobile carousels
  const [activeServiceIndex, setActiveServiceIndex] = React.useState(0);
  const [isServiceHovered, setIsServiceHovered] = React.useState(false);
  const [activeFurnitureIndex, setActiveFurnitureIndex] = React.useState(0);
  const [isFurnitureHovered, setIsFurnitureHovered] = React.useState(false);

  // Touch swipe states for mobile manual controls
  const [touchStartX, setTouchStartX] = React.useState(0);
  const [touchEndX, setTouchEndX] = React.useState(0);
  const [furnTouchStartX, setFurnTouchStartX] = React.useState(0);
  const [furnTouchEndX, setFurnTouchEndX] = React.useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsServiceHovered(true);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsServiceHovered(false);
    if (!touchStartX || !touchEndX) return;
    if (touchStartX - touchEndX > 50) {
      setActiveServiceIndex((prev) => (prev + 1) % activeServices.length);
    }
    if (touchStartX - touchEndX < -50) {
      setActiveServiceIndex((prev) => (prev - 1 + activeServices.length) % activeServices.length);
    }
    setTouchStartX(0);
    setTouchEndX(0);
  };

  const handleFurnTouchStart = (e: React.TouchEvent) => {
    setIsFurnitureHovered(true);
    setFurnTouchStartX(e.targetTouches[0].clientX);
  };

  const handleFurnTouchMove = (e: React.TouchEvent) => {
    setFurnTouchEndX(e.targetTouches[0].clientX);
  };

  const handleFurnTouchEnd = () => {
    setIsFurnitureHovered(false);
    if (!furnTouchStartX || !furnTouchEndX) return;
    if (furnTouchStartX - furnTouchEndX > 50) {
      setActiveFurnitureIndex((prev) => (prev + 1) % filteredFurniture.length);
    }
    if (furnTouchStartX - furnTouchEndX < -50) {
      setActiveFurnitureIndex((prev) => (prev - 1 + filteredFurniture.length) % filteredFurniture.length);
    }
    setFurnTouchStartX(0);
    setFurnTouchEndX(0);
  };

  // Reviews state
  const [reviewsList, setReviewsList] = React.useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = React.useState(true);

  // New review form state
  const [reviewName, setReviewName] = React.useState("");
  const [reviewLocation, setReviewLocation] = React.useState("Ranchi");
  const [reviewRating, setReviewRating] = React.useState(5);
  const [reviewComment, setReviewComment] = React.useState("");
  const [submittingReview, setSubmittingReview] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");

  const sortedReviews = React.useMemo(() => {
    return [...reviewsList].sort((a, b) => {
      // 1. Sort by rating (descending)
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      // 2. Sort by comment length (descending) - longer/more informative comments first
      const lenA = a.comment ? a.comment.trim().length : 0;
      const lenB = b.comment ? b.comment.trim().length : 0;
      return lenB - lenA;
    });
  }, [reviewsList]);

  const homepageReviews = React.useMemo(() => {
    return sortedReviews.slice(0, 5);
  }, [sortedReviews]);

  React.useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReviewsList(fetched.length > 0 ? fetched : MOCK_REVIEWS);
      setLoadingReviews(false);
    }, (error) => {
      console.warn("Firestore connection error, falling back to mock reviews:", error);
      setReviewsList(MOCK_REVIEWS);
      setLoadingReviews(false);
    });
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    const q = query(collection(db, "slideshow"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHeroSlides(fetched);
    }, (error) => {
      console.warn("Firestore slideshow error:", error);
      setHeroSlides([]);
    });
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDynamicServices(fetched);
    });
    return () => unsubscribe();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      setSubmitError("Please fill in all fields.");
      return;
    }
    setSubmittingReview(true);
    setSubmitError("");
    try {
      await addDoc(collection(db, "reviews"), {
        name: reviewName,
        location: reviewLocation,
        rating: reviewRating,
        comment: reviewComment,
        createdAt: serverTimestamp()
      });
      setSubmitSuccess(true);
      setReviewName("");
      setReviewComment("");
      setReviewRating(5);
      setReviewLocation("Ranchi");
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err: any) {
      console.error("Error adding review: ", err);
      setSubmitError("Failed to submit review. Please try again.");
    } finally {
      setSubmittingReview(false);
    }
  };

  const [api, setApi] = React.useState<any>();

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);



  // Dynamically swap datasets based on switch notch mode
  const activeHeroSlides = heroSlides;
  
  const combinedResidentialServices = [...residentialServices, ...dynamicServices.filter(s => s.mode === 'residential' || s.mode === 'both')];
  const combinedCommercialServices = [...commercialServices, ...dynamicServices.filter(s => s.mode === 'commercial' || s.mode === 'both')];
  const activeServices = mode === "residential" ? combinedResidentialServices : combinedCommercialServices;
  
  const activeFurnitureItems = mode === "residential" ? residentialFurniture : commercialFurniture;

  const filteredFurniture = activeFurnitureItems.filter(item =>
    furnitureFilter === 'All' || item.category === furnitureFilter
  );

  const heroAutoplayPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  // Automated transition effect on global mode updates
  React.useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [mode]);

  // Sync category filter options on mode toggles
  React.useEffect(() => {
    setFurnitureFilter('All');
  }, [mode]);

  // Autoplay Expertise Carousel every 5 seconds on mobile (with touch/hover pause)
  React.useEffect(() => {
    if (isServiceHovered) return;
    const interval = setInterval(() => {
      setActiveServiceIndex((prev) => (prev + 1) % activeServices.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isServiceHovered, activeServices.length]);

  // Autoplay Furniture Carousel every 5 seconds on mobile (with touch/hover pause)
  React.useEffect(() => {
    if (isFurnitureHovered || filteredFurniture.length === 0) return;
    const interval = setInterval(() => {
      setActiveFurnitureIndex((prev) => (prev + 1) % filteredFurniture.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isFurnitureHovered, filteredFurniture.length]);

  // Reset indices on mode transitions
  React.useEffect(() => {
    setActiveServiceIndex(0);
    setActiveFurnitureIndex(0);
  }, [mode]);

  return (
    <div className="bg-transparent relative">
      {/* Consultation Popup */}
      <ConsultationPopup />

      <div className={cn("m3-transition", isTransitioning ? "opacity-20 scale-[0.995]" : "opacity-100 scale-100")}>

        {/* Hero Slideshow */}
        <section className="relative h-screen w-full overflow-hidden bg-black">
          {activeHeroSlides.length > 0 ? (
            <Carousel
              plugins={[heroAutoplayPlugin.current]}
              className="w-full h-full"
              opts={{
                loop: true,
                duration: 40,
              }}
              setApi={setApi}
            >
              <CarouselContent className="h-full ml-0">
                {activeHeroSlides.map((slide, index) => (
                  <CarouselItem key={index} className="relative w-full h-screen pl-0 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                      {slide.type === 'video' ? (
                        <>
                          {/* Video shown only on desktop */}
                          <video
                            autoPlay
                            muted={isMuted}
                            loop
                            playsInline
                            className="hidden md:block w-full h-full object-cover scale-105 lg:animate-slow-zoom"
                          >
                            <source src={slide.url} type="video/mp4" />
                          </video>
                          {/* Lightweight fallback shown on mobile only when a slide is a video */}
                          <div className="block md:hidden absolute inset-0">
                            <Image
                              src={slide.mobileFallbackUrl || "/generated/hero_interior_1.png"}
                              alt={slide.heading || "Hero slide"}
                              fill
                              className="object-cover scale-105"
                              priority={index === 0}
                            />
                          </div>
                        </>
                      ) : (
                          <Image
                            src={slide.url}
                            alt={slide.heading || "Hero slide"}
                            fill
                            className="object-cover scale-105 lg:animate-slow-zoom"
                            priority={index === 0}
                          />
                      )}
                      <div className="absolute inset-0 bg-black/40" />
                    </div>

                    <div className="relative z-10 h-full flex items-center px-6 md:px-24">
                      <div className="max-w-4xl text-left animate-fade-up">
                        <h1 className="font-display text-3.5xl sm:text-5xl md:text-8xl font-black text-white mb-4 md:mb-8 leading-tight drop-shadow-2xl text-shadow-lg uppercase tracking-tight mt-12 md:mt-0">
                          {slide.heading || "Featured Project"}
                        </h1>

                        <div className="mb-6 md:mb-10 inline-block">
                          <div className="bg-accent text-primary font-black px-6 md:px-8 py-2.5 rounded-full text-base md:text-2xl m3-elevation-3">
                            {slide.price || "View Our Work"}
                          </div>
                          <p className="text-white/60 text-[10px] md:text-xs mt-2 font-semibold">*T&C Apply</p>
                        </div>

                        <p className="text-base md:text-2xl text-white/90 max-w-2xl mb-8 md:mb-12 font-medium drop-shadow-lg leading-snug md:leading-normal">
                          {slide.subheading || "New uploads from the admin panel will appear here automatically."}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-center px-6">
              <div className="max-w-2xl">
                <p className="text-accent font-black uppercase tracking-[0.25em] text-[10px] mb-4">Slideshow Empty</p>
                <h1 className="font-display text-3xl md:text-6xl font-black text-white uppercase tracking-tight">
                  Welcome
                </h1>
              </div>
            </div>
          )}

          {/* Floating Sidebar Icons (Hidden on Mobile viewports) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-1 scale-75 md:scale-100 origin-right">
            <Link href="https://wa.me/919631980881" target="_blank" className="bg-white/10 backdrop-blur-md p-4 text-white hover:bg-green-500 transition-all flex flex-col items-center gap-1 group">
              <MessageCircle className="w-6 h-6" />
              <span className="text-[10px] font-bold">Whatsapp</span>
            </Link>
            <Link href="/contact" className="bg-white/10 backdrop-blur-md p-4 text-white hover:bg-primary transition-all flex flex-col items-center gap-1">
              <Mail className="w-6 h-6" />
              <span className="text-[10px] font-bold">Send Mail</span>
            </Link>
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {activeHeroSlides.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-500",
                  activeIndex === i ? "w-8 bg-accent" : "w-2.5 bg-white/40"
                )}
              ></div>
            ))}
          </div>
        </section>

        {/* Our Trusted Partners Section */}
        <section className="py-12 md:py-24 bg-white/70 backdrop-blur-xl border-b border-white/20 overflow-hidden">
          <div className="container mx-auto px-4 mb-8 md:mb-16 text-center">
            <h2 className="text-2xl md:text-5xl font-bold mb-2 font-display uppercase tracking-tight" style={{ color: '#0f172a' }}>Our Trusted Partners</h2>
            <div className="w-16 md:w-24 h-1 bg-accent mx-auto mb-4 md:mb-6"></div>
            <p className="font-medium italic text-xs md:text-base px-4" style={{ color: '#374151' }}>Winning collaborations that produce winning designs.</p>
          </div>

          <div className="w-full overflow-hidden">
            <div className="animate-marquee flex gap-12 md:gap-16 items-center">
              {/* First Set */}
              {partnerLogos.map((brand, index) => (
                <div key={`brand-1-${index}`} className="flex-shrink-0 w-36 h-24 md:w-48 md:h-32 p-4 opacity-65 hover:opacity-100 transition-opacity duration-300 group">
                  <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={brand.path}
                      alt={brand.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate Set for Seamless Loop */}
              {partnerLogos.map((brand, index) => (
                <div key={`brand-2-${index}`} className="flex-shrink-0 w-36 h-24 md:w-48 md:h-32 p-4 opacity-65 hover:opacity-100 transition-opacity duration-300 group">
                  <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={brand.path}
                      alt={brand.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Legacy Section */}
        <section className="py-12 md:py-24 bg-white/60 backdrop-blur-lg relative">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="relative aspect-square rounded-[30px] overflow-hidden glass-card p-3 m3-elevation-2">
              <Image
                src="/generated/legacy_villa.png"
                alt="Luxury Architecture"
                fill
                className="object-cover p-2 rounded-[24px]"
              />
            </div>
            <div className="animate-fade-up">
              <Badge className="mb-4 bg-primary text-white font-bold tracking-widest px-4 py-1">OUR LEGACY</Badge>
              <h2 className="text-3xl md:text-7xl font-bold mb-4 md:mb-8 text-primary leading-tight uppercase">
                {mode === "residential" ? "Elite Living Redefined" : "Corporate Redefined"}
              </h2>
              <p className="text-base md:text-lg mb-6 md:mb-8 leading-relaxed" style={{ color: '#1f2937' }}>
                {mode === "residential"
                  ? "Galaxy Interior is a full-service architecture and design firm. From the first brick of construction to the final piece of bespoke furniture, we handle every detail of your home with precision and passion."
                  : "Galaxy Interior is a full-service architecture and design firm. From structural blueprinting to customized corporate layouts, we construct high-productivity spaces for elite regional businesses."
                }
              </p>
              <div className="grid grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-10">
                <div className="p-5 md:p-7 bg-[#0b1c35] border border-white/10 rounded-[24px] m3-elevation-1 hover:m3-elevation-2 transition-all duration-300">
                  <span className="block text-3xl md:text-5xl font-black text-gold mb-1">500+</span>
                  <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-white/50">Projects Completed</span>
                </div>
                <div className="p-5 md:p-7 bg-[#0b1c35] border border-white/10 rounded-[24px] m3-elevation-1 hover:m3-elevation-2 transition-all duration-300">
                  <span className="block text-3xl md:text-5xl font-black text-gold mb-1">10+</span>
                  <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-white/50">Years Excellence</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-12 md:py-24 bg-primary/95 backdrop-blur-2xl text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/4 h-full bg-white/5 backdrop-blur-3xl -skew-x-12 translate-x-1/2 border-l border-white/10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10 md:mb-16">
              <Badge className="mb-4 bg-accent text-primary font-bold px-4 py-1">EXPERTISE</Badge>
              <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 uppercase tracking-tighter">Bespoke Solutions</h2>
              <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto px-4">
                {mode === "residential"
                  ? "We offer a 360-degree approach to architecture and interiors, ensuring quality and luxury at every step of your home building."
                  : "We offer turn-key corporate solutions, commercial constructions, and premium retail showrooms across Jharkhand."
                }
              </p>
            </div>
            {/* Mobile Snap Scroll for Expertise — pure CSS, zero JS jank */}
            <div className="md:hidden w-full">
              <div
                className="flex gap-4 overflow-x-auto px-4 pb-4 [&::-webkit-scrollbar]:hidden"
                style={{
                  scrollSnapType: 'x mandatory',
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {activeServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[75vw] max-w-[290px]"
                    style={{ scrollSnapAlign: 'center' }}
                  >
                    <Card className="glass-card bg-white/10 border-white/10 overflow-hidden flex flex-col px-0 pt-0 rounded-[16px] m3-elevation-2 h-[275px] w-full justify-between">
                      <div>
                        <div className="relative w-full h-28 overflow-hidden border-b border-white/5 rounded-t-[16px]">
                          <Image
                            src={service.image}
                            alt={service.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-primary/20" />
                          {service.price && <Badge className="absolute top-2 left-2 bg-[#051124]/90 backdrop-blur-md text-accent font-black border border-accent/20 px-2 py-0.5 rounded-full text-[7px] shadow-sm uppercase tracking-wider">₹{Number(service.price).toLocaleString("en-IN")}</Badge>}
                        </div>
                        <div className="p-3.5">
                          <h3 className="text-sm font-bold mb-1 uppercase tracking-tight text-gold">{service.name}</h3>
                          <p className="text-white/70 text-[11px] leading-relaxed line-clamp-3">{service.desc}</p>
                        </div>
                      </div>
                      <div className="px-3.5 pb-3.5 pt-1">
                        <Link href={`/services/${service.slug}`} className="text-accent font-black flex items-center gap-1.5 text-[8px] tracking-widest uppercase">
                          EXPLORE <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
              {/* Swipe hint */}
              <p className="text-center text-white/30 text-[9px] font-bold tracking-widest uppercase mt-1">← Swipe to explore →</p>
            </div>

            {/* Desktop Grid View for Expertise */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeServices.map((service, index) => (
                <Card key={index} className="glass-card bg-white/10 border-white/10 group m3-transition overflow-hidden flex flex-col px-0 pt-0 rounded-[28px] m3-elevation-2 hover:m3-elevation-3 hover:-translate-y-1.5">
                  <div className="relative w-full h-48 md:h-56 overflow-hidden border-b border-white/5 rounded-t-[28px]">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-110 group-hover:opacity-90 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                    {service.price && <Badge className="absolute top-4 left-4 bg-[#051124]/90 backdrop-blur-md text-accent font-black border border-accent/20 px-3.5 py-1 rounded-full text-[9px] shadow-sm uppercase tracking-wider">₹{Number(service.price).toLocaleString("en-IN")}</Badge>}
                  </div>
                  <CardContent className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 uppercase tracking-tight text-gold m3-transition">{service.name}</h3>
                      <p className="text-white/70 mb-6 md:mb-8 text-sm md:text-base flex-1 leading-relaxed m3-transition">{service.desc}</p>
                    </div>
                    <Link href={`/services/${service.slug}`} className="text-accent group-hover:text-white hover:text-white font-black flex items-center gap-1.5 text-[10px] md:text-xs tracking-widest mt-auto w-fit uppercase transition-colors">
                      EXPLORE <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Furniture Showcase Section */}
        <section className="py-12 md:py-24 bg-white/40 backdrop-blur-xl overflow-hidden relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10 md:mb-16">
              <Badge className="mb-4 bg-primary text-white font-bold px-4 py-1">COLLECTIONS</Badge>
              <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 uppercase tracking-tighter text-primary">
                {mode === "residential" ? "Premium Furniture" : "Corporate Setup"}
              </h2>
              <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto px-4 mb-8">
                {mode === "residential"
                  ? "From ergonomic office setups to luxurious home comfort, we provide bespoke furniture that defines your living space."
                  : "From modular workstation layouts to premium lobby chairs, we manufacture bespoke workspace assets that scale."
                }
              </p>

              {/* Filter Buttons */}
              <div className="flex justify-center gap-3 mb-12">
                {(mode === "residential" ? ['All', 'Home'] : ['All', 'Office']).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setFurnitureFilter(filter)}
                    className={cn(
                      "px-6 md:px-8 py-2.5 md:py-3.5 rounded-full text-xs md:text-sm font-black transition-all m3-elevation-1 m3-state-layer overflow-hidden relative",
                      furnitureFilter === filter
                        ? "bg-primary text-white border-none m3-elevation-2"
                        : "bg-white text-primary hover:bg-gray-50 border border-gray-200"
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Snap Scroll for Furniture — pure CSS, zero JS jank */}
            <div className="sm:hidden w-full">
              <div
                className="flex gap-4 overflow-x-auto px-4 pb-4 [&::-webkit-scrollbar]:hidden"
                style={{
                  scrollSnapType: 'x mandatory',
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {filteredFurniture.length === 0 ? (
                  <p className="text-center text-gray-500 text-sm py-8 w-full">No items found.</p>
                ) : (
                  filteredFurniture.map((item, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-[72vw] max-w-[270px]"
                      style={{ scrollSnapAlign: 'center' }}
                    >
                      <div className="relative bg-[#08162b] rounded-[16px] overflow-hidden border border-white/5 flex flex-col h-[235px] w-full">
                        <div className="relative h-32 overflow-hidden rounded-t-[16px]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          <Badge className="absolute top-2 left-2 bg-[#051124]/90 backdrop-blur-md text-accent font-black border border-accent/20 px-2 py-0.5 rounded-full text-[7px] shadow-sm uppercase tracking-wider">
                            {item.price}
                          </Badge>
                        </div>
                        <div className="p-3 flex-1 flex flex-col justify-between bg-[#08162b]">
                          <div>
                            <p className="text-[8px] font-black text-accent mb-0.5 uppercase tracking-widest">{item.category}</p>
                            <h3 className="text-xs font-bold text-white truncate leading-tight">{item.name}</h3>
                          </div>
                          <Link href="/contact" className="bg-accent text-primary text-[8px] font-black py-1.5 px-3 rounded-full text-center w-full tracking-widest shadow-md block">
                            ENQUIRE NOW
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* Swipe hint */}
              <p className="text-center text-primary/40 text-[9px] font-bold tracking-widest uppercase mt-1">← Swipe to browse →</p>
            </div>

            {/* Desktop Grid View for Furniture */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {filteredFurniture.map((item, index) => (
                <div key={index} className="group relative bg-[#08162b] rounded-[28px] overflow-hidden m3-elevation-2 hover:m3-elevation-3 border border-white/5 h-full flex flex-col m3-transition hover:-translate-y-1.5 animate-fade-up">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-t-[28px]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-[#08162b]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <p className="text-accent font-black text-[10px] uppercase tracking-widest mb-1.5">{item.category} Solutions</p>
                      <h3 className="text-white text-xl font-bold mb-4 leading-tight">{item.name}</h3>
                      <Link href="/contact" className="bg-accent hover:bg-white text-primary text-[10px] font-black py-3 px-6 rounded-full w-fit tracking-widest shadow-md transition-colors m3-state-layer overflow-hidden">
                        ENQUIRE NOW
                      </Link>
                    </div>
                    <Badge className="absolute top-4 left-4 bg-[#051124]/90 backdrop-blur-md text-accent font-black border border-accent/20 px-3.5 py-1 rounded-full text-[9px] shadow-sm uppercase tracking-wider">
                      {item.price}
                    </Badge>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between bg-[#08162b] group-hover:bg-[#061226]/80 transition-colors duration-500 border-t border-white/5 rounded-b-[28px]">
                    <div>
                      <p className="text-[10px] font-black text-accent mb-1 uppercase tracking-widest">{item.category}</p>
                      <h3 className="text-lg font-bold text-white truncate leading-tight">{item.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link href="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-black px-12 py-7 text-lg rounded-full m3-elevation-2 hover:m3-elevation-3 transition-all hover:scale-105 active:scale-95 group overflow-hidden relative m3-state-layer">
                  {mode === "residential" ? "GET CUSTOM FURNITURE" : "BOOK OFFICE SETUP"} <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform text-primary" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Reviews & Testimonials Section */}
        <section className="py-16 md:py-28 bg-[#051124] relative text-white overflow-hidden border-t border-white/5">
          {/* Background Decorative Mandala Accent */}
          <div className="absolute inset-0 bg-logo-radial opacity-20 pointer-events-none -z-10" />

          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent text-primary font-bold px-4 py-1.5 uppercase tracking-widest text-[9px]">
                Client Voices
              </Badge>
              <h2 className="text-3xl md:text-6xl font-bold mb-4 font-display uppercase tracking-tight text-white">
                What Our <span className="text-gold italic">Clients Say</span>
              </h2>
              <div className="w-16 h-1 bg-accent mx-auto mb-6"></div>
              <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto px-4">
                Real testimonials from elite home owners and corporate directors across Jharkhand, Bihar, and beyond.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Reviews List Column */}
              <div className="lg:col-span-7 space-y-6 lg:max-h-[650px] lg:overflow-y-auto pr-2 custom-scrollbar">
                {loadingReviews ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div>
                  </div>
                ) : homepageReviews.length === 0 ? (
                  <div className="text-center py-10 bg-white/5 rounded-[24px] border border-white/10 p-6">
                    <p className="text-white/60 italic text-sm">No reviews submitted yet. Be the first to share your experience!</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 md:space-y-6">
                      {homepageReviews.map((review, idx) => (
                        <div
                          key={review.id || idx}
                          className="p-4 md:p-8 bg-white/[0.03] border border-white/10 rounded-[20px] md:rounded-[28px] shadow-lg hover:border-accent/25 transition-all duration-300 group hover:-translate-y-1 animate-fade-up"
                        >
                          <div className="flex justify-between items-start mb-3 md:mb-4">
                            <div>
                              <h4 className="font-bold text-sm md:text-xl text-white group-hover:text-gold transition-colors">{review.name}</h4>
                              <p className="text-[9px] md:text-[10px] text-accent/80 font-black tracking-widest uppercase mt-0.5">{review.location}</p>
                            </div>

                            {/* Rating Stars */}
                            <div className="flex gap-0.5 md:flex gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "w-3.5 h-3.5 md:w-4 md:h-4",
                                    i < review.rating
                                      ? "fill-gold text-gold filter drop-shadow-[0_0_2px_rgba(255,207,51,0.5)]"
                                      : "text-white/20"
                                  )}
                                />
                              ))}
                            </div>
                          </div>

                          <p className="text-white/70 text-xs md:text-base leading-relaxed font-medium italic">
                            &ldquo;{review.comment}&rdquo;
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 text-center lg:text-left">
                      <Link href="/reviews">
                        <Button variant="outline" className="rounded-full px-8 py-5 border-white/20 hover:border-accent text-white hover:text-accent font-black uppercase text-xs tracking-wider bg-transparent hover:scale-105 active:scale-95 transition-all">
                          See All Reviews ({sortedReviews.length})
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>

              {/* Review Submission Form Column */}
              <div className="lg:col-span-5 bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-[32px] shadow-2xl relative overflow-hidden backdrop-blur-md">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />

                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 uppercase tracking-tight font-display">
                  Share Your <span className="text-gold">Experience</span>
                </h3>

                <form onSubmit={handleReviewSubmit} className="space-y-5 relative z-10">
                  {submitError && (
                    <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-200 text-xs rounded-xl font-semibold">
                      {submitError}
                    </div>
                  )}
                  {submitSuccess && (
                    <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs rounded-xl font-semibold animate-fade-in">
                      Thank you! Your review has been submitted successfully and published in real time.
                    </div>
                  )}

                  {/* Name Input */}
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      required
                      disabled={submittingReview}
                      className="w-full h-14 px-4 pt-4 pb-1 rounded-xl border border-white/20 focus:border-accent bg-white/[0.02] text-white focus:outline-none focus:ring-0 peer placeholder:text-transparent text-sm font-medium transition-all"
                      placeholder="Your Name"
                      id="client_review_name"
                    />
                    <label
                      htmlFor="client_review_name"
                      className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold"
                    >
                      Your Name
                    </label>
                  </div>

                  {/* Location Select Dropdown */}
                  <div className="space-y-1.5">
                    <label htmlFor="client_review_location" className="text-[10px] font-black text-white/50 uppercase tracking-widest pl-1">
                      Select Location
                    </label>
                    <div className="relative">
                      <select
                        value={reviewLocation}
                        onChange={(e) => setReviewLocation(e.target.value)}
                        disabled={submittingReview}
                        id="client_review_location"
                        className="w-full h-14 px-4 rounded-xl border border-white/20 focus:border-accent bg-[#08162d] text-white focus:outline-none focus:ring-0 text-sm font-semibold transition-all appearance-none cursor-pointer"
                      >
                        {LOCATIONS.map((loc) => (
                          <option key={loc} value={loc} className="bg-[#051124]">
                            {loc}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-white/60 w-0 h-0" />
                    </div>
                  </div>

                  {/* Rating Interactive Stars Selector */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-white/50 uppercase tracking-widest pl-1 block">
                      Your Rating
                    </span>
                    <div className="flex gap-2.5 py-1">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const starVal = i + 1;
                        return (
                          <button
                            key={i}
                            type="button"
                            disabled={submittingReview}
                            onClick={() => setReviewRating(starVal)}
                            className="focus:outline-none transition-transform hover:scale-125 active:scale-95 group/star"
                          >
                            <Star
                              className={cn(
                                "w-7 h-7 transition-all duration-200",
                                starVal <= reviewRating
                                  ? "fill-gold text-gold filter drop-shadow-[0_0_4px_rgba(255,207,51,0.6)]"
                                  : "text-white/25 group-hover/star:text-gold/50"
                              )}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Comment Textarea */}
                  <div className="relative w-full">
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                      rows={4}
                      disabled={submittingReview}
                      className="w-full px-4 pt-5 pb-1 rounded-xl border border-white/20 focus:border-accent bg-white/[0.02] text-white focus:outline-none focus:ring-0 peer placeholder:text-transparent text-sm font-medium transition-all resize-none"
                      placeholder="Write your review..."
                      id="client_review_comment"
                    />
                    <label
                      htmlFor="client_review_comment"
                      className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold"
                    >
                      Write your review...
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={submittingReview}
                    className="w-full h-14 bg-gold-gradient hover:opacity-95 text-primary rounded-full font-black text-xs uppercase tracking-widest m3-elevation-2 hover:m3-elevation-3 transition-all hover:scale-[1.01] active:scale-[0.99] relative overflow-hidden"
                  >
                    {submittingReview ? "Submitting..." : "Submit Review"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
