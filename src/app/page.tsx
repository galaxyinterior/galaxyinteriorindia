"use client";

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building,
  Paintbrush,
  CookingPot,
  LayoutGrid,
  ChevronRight,
  Zap,
  MessageCircle,
  Mail,
  Box,
  Hammer,
  Home,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ConsultationPopup from '@/components/home/ConsultationPopup';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { useMode } from '@/context/ModeContext';

// Residential Datasets (Houses, Flats, Living Rooms)
const residentialHeroSlides = [
  {
    type: 'video',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-living-room-4142-large.mp4',
    heading: "India's Most Trusted Interior Company",
    subheading: "Luxury Architecture & Premium Interior Solutions for Jharkhand's Elite.",
    price: 'Starting at 6.3 Lac*'
  },
  {
    type: 'image',
    url: '/generated/hero_interior_1.png',
    heading: 'Designing Dreams, Delivering Peace',
    subheading: 'Experience the future of home design with our advanced 3D & VR planning.',
    price: 'Bespoke Plans Available'
  },
  {
    type: 'image',
    url: '/generated/hero_exterior_1.png',
    heading: 'Bespoke Craftsmanship',
    subheading: 'From conceptual sketches to final handover, we build with precision.',
    price: 'Quality You Can Trust'
  }
];

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

// Commercial Datasets (Malls, Clinics, Offices, Shops)
const commercialHeroSlides = [
  {
    type: 'image',
    url: '/generated/hero_exterior_1.png',
    heading: "Corporate Head Offices & Retail Malls",
    subheading: "Advanced structural blueprints and premium interior mapping for corporate offices, retail showrooms, and clinics.",
    price: 'Starting at 12.5 Lac*'
  },
  {
    type: 'image',
    url: '/generated/srv_construction.png',
    heading: 'Smart Offices, High Productivity',
    subheading: 'Experience modern office designs with state-of-the-art acoustic setups, smart cabins, and lobbies.',
    price: 'Layout Plans Included'
  },
  {
    type: 'image',
    url: '/generated/srv_interior.png',
    heading: 'Luxury Malls & Shop Outlets',
    subheading: 'Turnkey execution of elegant shopping showrooms and multi-floor clinics across Jharkhand.',
    price: 'Elite Craftsmanship'
  }
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

export default function HomePage() {
  const { mode, setMode } = useMode();
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [furnitureFilter, setFurnitureFilter] = React.useState('All');
  
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
  const activeHeroSlides = mode === "residential" ? residentialHeroSlides : commercialHeroSlides;
  const activeServices = mode === "residential" ? residentialServices : commercialServices;
  const activeFurnitureItems = mode === "residential" ? residentialFurniture : commercialFurniture;

  const filteredFurniture = activeFurnitureItems.filter(item => 
    furnitureFilter === 'All' || item.category === furnitureFilter
  );
  
  const heroAutoplayPlugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false })
  );

  const partnersAutoplayPlugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
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

  return (
    <div className="bg-transparent relative">
      {/* Consultation Popup */}
      <ConsultationPopup />

      <div className={cn("m3-transition", isTransitioning ? "opacity-20 scale-[0.995]" : "opacity-100 scale-100")}>

      {/* Hero Slideshow */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
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
                    <video
                      autoPlay
                      muted={isMuted}
                      loop
                      playsInline
                      className="w-full h-full object-cover scale-105 animate-slow-zoom"
                    >
                      <source src={slide.url} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={slide.url}
                      alt={slide.heading}
                      fill
                      className="object-cover scale-105 animate-slow-zoom"
                      priority={index === 0}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 h-full flex items-center px-6 md:px-24">
                  <div className="max-w-4xl text-left animate-fade-up">
                    <h1 className="font-display text-3.5xl sm:text-5xl md:text-8xl font-black text-white mb-4 md:mb-8 leading-tight drop-shadow-2xl text-shadow-lg uppercase tracking-tight mt-12 md:mt-0">
                      {slide.heading}
                    </h1>
                    
                    <div className="mb-6 md:mb-10 inline-block">
                       <div className="bg-accent text-primary font-black px-6 md:px-8 py-2.5 rounded-full text-base md:text-2xl m3-elevation-3">
                          {slide.price}
                       </div>
                       <p className="text-white/60 text-[10px] md:text-xs mt-2 font-semibold">*T&C Apply</p>
                    </div>

                    <p className="text-base md:text-2xl text-white/90 max-w-2xl mb-8 md:mb-12 font-medium drop-shadow-lg leading-snug md:leading-normal">
                      {slide.subheading}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

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
            <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-2 font-display uppercase tracking-tight">Our Trusted Partners</h2>
            <div className="w-16 md:w-24 h-1 bg-accent mx-auto mb-4 md:mb-6"></div>
            <p className="text-gray-500 font-medium italic text-xs md:text-base px-4">Winning collaborations that produce winning designs.</p>
        </div>

        <div className="container mx-auto px-4">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[partnersAutoplayPlugin.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-8">
              {partnerLogos.map((brand, index) => (
                <CarouselItem key={index} className="pl-4 md:pl-8 basis-1/2 md:basis-1/4">
                  <div className="flex items-center justify-center h-24 md:h-32 p-4 grayscale hover:grayscale-0 transition-all duration-500 group">
                    <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-300">
                      <Image 
                        src={brand.path} 
                        alt={brand.name} 
                        fill 
                        className="object-contain" 
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
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
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
      </div>
    </div>
  );
}
