
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, Phone, Home, Info, Paintbrush, LayoutGrid, Hammer, Mail, Tag, Building2, Zap, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useMode } from '@/context/ModeContext';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'COMPANY' },
  { href: '/services', label: 'SERVICES' },
  { href: '/portfolio', label: 'GALLERY' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '/products', label: 'PRODUCTS' },
  { href: '/construction', label: 'CONSTRUCTION' },
  { href: '/pricing', label: 'PRICING' },
  { href: '/contact', label: 'CONTACT' },
];

const towns = ["GODDA", "RANCHI", "BHAGALPUR", "BANKA", "DEOGHAR", "HAZARIBAGH", "DUMKA", "KISHANGANJ", "PURNEA"];

const linkIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  '/': Home,
  '/about': Info,
  '/services': Paintbrush,
  '/portfolio': LayoutGrid,
  '/construction': Hammer,
  '/pricing': Tag,
  '/contact': Phone
};

const Logo = () => (
  <div className="bg-logo-radial border-b border-r border-accent/20 text-white h-14 md:h-[100px] px-3.5 md:px-8 flex items-center gap-2.5 transition-all shadow-[0_0_15px_rgba(255,207,51,0.05)]">
    <div className="h-9 w-9 md:h-12 md:w-12 rounded-full overflow-hidden border-2 border-accent/25 flex-shrink-0 bg-white/5 backdrop-blur-md">
      <Image src="/logo.png" alt="Galaxy Interior Logo" width={48} height={48} className="object-contain w-full h-full" />
    </div>
    <div className="flex flex-col">
      <span className="text-[1.05rem] md:text-3xl font-bold tracking-tighter leading-none mt-1 text-white">GALAXY</span>
      <span className="text-[6.5px] md:text-xs font-bold tracking-[0.3em] text-accent opacity-90">INTERIOR</span>
    </div>
  </div>
);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { mode, setMode } = useMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "glass-panel m3-elevation-2" : (isHomePage ? "bg-transparent" : "bg-primary border-b border-white/5 m3-elevation-1")
    )}>
      {/* Branding Block - Overlapping both bars */}
      <Link href="/" className="absolute top-0 left-0 z-[60] block h-full">
        <Logo />
      </Link>

      {/* Top Bar (Announcement Bar) */}
      <div className={cn(
        "py-1.5 hidden md:block relative z-40 transition-colors duration-300 border-b border-white/5",
        isScrolled ? "bg-galaxy-dark/85 text-white/70 border-white/5" : "bg-black/20 text-white"
      )}>
        <div className="container mx-auto px-4 flex justify-end items-center gap-6">
          {/* Town names shifted right to avoid logo */}
          <div className="flex-1 flex justify-end pr-8 text-[10px] font-bold uppercase tracking-widest space-x-3">
            {towns.map((town, index) => (
              <span key={town} className="flex items-center">
                <span className="hover:text-accent transition-colors cursor-default opacity-80">{town}</span>
                {index < towns.length - 1 && <span className="mx-2 opacity-30">|</span>}
              </span>
            ))}
          </div>
          
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={cn(
                  "flex items-center gap-2 px-4 py-1 text-[10px] font-bold uppercase tracking-widest transition-all",
                  isScrolled ? "text-accent hover:text-white" : "text-white hover:text-accent"
                )}>
                  <Phone className="h-3.5 w-3.5 fill-current" />
                  CALL NOW
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border-primary">
                <DropdownMenuItem asChild className="cursor-pointer font-bold text-primary focus:bg-primary focus:text-white">
                  <a href="tel:+919631980881">OWNER: +91 96319 80881</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-medium text-primary/60 focus:bg-primary/10 focus:text-primary text-xs">
                  <a href="tel:+919122795726">GM: +91 91227 95726</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex h-14 md:h-16 items-center relative">
        <div className="flex-1 flex items-center justify-end px-4 lg:px-12 ml-[190px] md:ml-[380px]">
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3.5">
            {/* HOME Link */}
            <Link 
              href="/" 
              className={cn(
                "text-[10px] xl:text-[11px] font-bold uppercase tracking-widest m3-transition relative py-1.5 px-3 rounded-full m3-state-layer",
                pathname === '/' 
                  ? "bg-accent/15 text-accent font-black" 
                  : (isScrolled || !isHomePage ? "text-white/80 hover:text-accent" : "text-white hover:text-accent")
              )}
            >
              HOME
            </Link>

            {/* SERVICES Dropdown */}
            <div className="relative group">
              <Link
                href="/services"
                className={cn(
                  "flex items-center gap-1 text-[10px] xl:text-[11px] font-bold uppercase tracking-widest m3-transition relative py-1.5 px-3 rounded-full m3-state-layer cursor-pointer",
                  pathname.startsWith('/services') || pathname === '/products' || pathname === '/construction' || pathname === '/projects'
                    ? "bg-accent/15 text-accent font-black" 
                    : (isScrolled || !isHomePage ? "text-white/80 hover:text-accent" : "text-white hover:text-accent")
                )}
              >
                SERVICES
                <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-44 bg-[#051124]/95 backdrop-blur-md border border-accent/20 rounded-2xl shadow-xl py-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
                <Link href="/services" className="block px-4 py-2.5 text-[9.5px] font-black uppercase tracking-wider text-white/85 hover:text-accent hover:bg-white/5 transition-colors">
                  All Services
                </Link>
                <Link href="/products" className="block px-4 py-2.5 text-[9.5px] font-black uppercase tracking-wider text-white/85 hover:text-accent hover:bg-white/5 transition-colors">
                  Products
                </Link>
                <Link href="/construction" className="block px-4 py-2.5 text-[9.5px] font-black uppercase tracking-wider text-white/85 hover:text-accent hover:bg-white/5 transition-colors">
                  Construction
                </Link>
                <Link href="/projects" className="block px-4 py-2.5 text-[9.5px] font-black uppercase tracking-wider text-white/85 hover:text-accent hover:bg-white/5 transition-colors">
                  Projects
                </Link>
              </div>
            </div>

            {/* GALLERY Link */}
            <Link 
              href="/portfolio" 
              className={cn(
                "text-[10px] xl:text-[11px] font-bold uppercase tracking-widest m3-transition relative py-1.5 px-3 rounded-full m3-state-layer",
                pathname === '/portfolio' 
                  ? "bg-accent/15 text-accent font-black" 
                  : (isScrolled || !isHomePage ? "text-white/80 hover:text-accent" : "text-white hover:text-accent")
              )}
            >
              GALLERY
            </Link>

            {/* PRICING Link */}
            <Link 
              href="/pricing" 
              className={cn(
                "text-[10px] xl:text-[11px] font-bold uppercase tracking-widest m3-transition relative py-1.5 px-3 rounded-full m3-state-layer",
                pathname === '/pricing' 
                  ? "bg-accent/15 text-accent font-black" 
                  : (isScrolled || !isHomePage ? "text-white/80 hover:text-accent" : "text-white hover:text-accent")
              )}
            >
              PRICING
            </Link>

            {/* COMPANY Dropdown (Contact and About) */}
            <div className="relative group">
              <Link
                href="/about"
                className={cn(
                  "flex items-center gap-1 text-[10px] xl:text-[11px] font-bold uppercase tracking-widest m3-transition relative py-1.5 px-3 rounded-full m3-state-layer cursor-pointer",
                  pathname === '/about' || pathname === '/contact'
                    ? "bg-accent/15 text-accent font-black" 
                    : (isScrolled || !isHomePage ? "text-white/80 hover:text-accent" : "text-white hover:text-accent")
                )}
              >
                COMPANY
                <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-40 bg-[#051124]/95 backdrop-blur-md border border-accent/20 rounded-2xl shadow-xl py-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
                <Link href="/about" className="block px-4 py-2.5 text-[9.5px] font-black uppercase tracking-wider text-white/85 hover:text-accent hover:bg-white/5 transition-colors">
                  About Us
                </Link>
                <Link href="/contact" className="block px-4 py-2.5 text-[9.5px] font-black uppercase tracking-wider text-white/85 hover:text-accent hover:bg-white/5 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </nav>

          {/* Initialize Project CTA — Desktop */}
          <Link
            href="/consult-online"
            className="hidden lg:flex items-center gap-1.5 ml-2 xl:ml-3 px-3.5 xl:px-4 py-1.5 rounded-full bg-accent text-primary font-black text-[10px] xl:text-[11px] uppercase tracking-widest shadow-[0_0_12px_rgba(255,207,51,0.35)] m3-transition active:scale-95 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>Initialize Project</span>
          </Link>

          {/* User Dashboard Portal Login */}
          <Link
            href="/login"
            className="hidden lg:flex items-center gap-1.5 ml-2 px-3 py-1.5 rounded-full bg-transparent hover:bg-white/5 border border-white/20 hover:border-accent text-white hover:text-accent font-black text-[10px] xl:text-[11px] uppercase tracking-widest m3-transition active:scale-95"
          >
            <span>Portal Login</span>
          </Link>
          
          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-3">
            <a href="tel:+919122795726" className="bg-primary p-2.5 text-white rounded-2xl m3-elevation-2 m3-state-layer relative overflow-hidden flex items-center justify-center">
              <Phone className="h-4.5 w-4.5" />
            </a>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn(isScrolled || !isHomePage ? "text-accent hover:text-white" : "text-white", "h-9 w-9")}>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#051124] text-white border-l border-accent/15 rounded-l-[28px] p-0 flex flex-col h-full shadow-[0_0_50px_rgba(0,0,0,0.6)] w-[85vw] sm:max-w-sm overflow-hidden">
                <div className="bg-logo-radial bg-logo-mandala px-6 py-8 flex flex-col items-start border-b border-accent/15 relative">
                  <div className="bg-accent/10 border border-accent/20 px-3 py-0.5 rounded-full text-accent font-bold text-[9px] mb-3 uppercase tracking-wider">
                    Elite Interior
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full overflow-hidden border-2 border-accent/30 flex-shrink-0 bg-white/5 backdrop-blur-md shadow-lg">
                      <Image src="/logo.png" alt="Galaxy Interior Logo" width={44} height={44} className="object-contain w-full h-full" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold tracking-tighter text-white leading-none">GALAXY</span>
                      <span className="text-[9px] font-bold tracking-[0.3em] text-accent mt-0.5">INTERIOR</span>
                    </div>
                  </div>
                </div>

                <nav className="flex-1 flex flex-col gap-1.5 px-3 py-6 overflow-y-auto">
                  {navLinks.map((link) => {
                    const Icon = linkIcons[link.href] || Info;
                    const isActive = pathname === link.href;
                    return (
                      <Link 
                        key={link.href}
                        href={link.href} 
                        className={cn(
                          "flex items-center gap-4 px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-widest m3-transition relative group overflow-hidden",
                          isActive 
                            ? "bg-accent text-primary shadow-[0_4px_15px_rgba(255,207,51,0.2)]" 
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className={cn("h-4 w-4 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-primary" : "text-accent")} />
                        <span>{link.label}</span>
                        
                        {!isActive && (
                          <span className="absolute inset-0 border border-accent/0 rounded-full group-hover:border-accent/15 transition-all"></span>
                        )}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-auto p-6 border-t border-accent/10 bg-white/[0.02] space-y-3">
                  {/* Initialize Project CTA — Mobile Drawer */}
                  <Link
                    href="/consult-online"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2.5 w-full p-4 rounded-2xl bg-accent text-primary font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,207,51,0.3)] active:scale-95 transition-all group relative overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
                    <Zap className="h-4 w-4 fill-current" />
                    <span>Initialize Project</span>
                  </Link>

                  <a 
                    href="tel:+919122795726" 
                    className="flex items-center justify-center gap-3 w-full p-3.5 rounded-2xl bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/20 text-xs font-black text-white shadow-md m3-transition active:scale-[0.98] group"
                  >
                    <Phone className="h-4 w-4 text-accent group-hover:text-inherit transition-colors" />
                    <span className="tracking-wider text-[11px]">+91 91227 95726</span>
                  </a>
                  <p className="text-center text-[9px] text-white/40 uppercase tracking-widest font-bold">
                    General Manager &amp; Owner
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
