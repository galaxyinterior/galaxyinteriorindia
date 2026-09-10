
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
import { useLocation } from '@/context/LocationContext';
import { MapPin } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'COMPANY' },
  { 
    label: 'OUR SERVICES',
    nested: [
      { href: '/services/design-facilities', label: 'Design Facilities' },
      { href: '/services/interior-project', label: 'Interior Project' },
      { href: '/services/construction-project', label: 'Construction Project' },
      { href: '/services/turnkey-project', label: 'Turnkey Project' },
      { href: '/services/renovation', label: 'Renovation' }
    ]
  },
  { href: '/portfolio', label: 'GALLERY' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '/products', label: 'PRODUCTS' },
  { href: '/construction', label: 'CONSTRUCTION' },
  { href: '/pricing', label: 'PRICING' },
  { href: '/contact', label: 'CONTACT' },
];

const towns = ["GODDA", "RANCHI", "BHAGALPUR", "BANKA", "DEOGHAR", "HAZARIBAGH", "DUMKA", "KISHANGANJ", "PURNEA", "KOLKATA", "PATNA"];

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
  <div className="bg-primary border-b border-r border-accent/20 text-white h-14 md:h-[100px] px-3.5 md:px-8 flex items-center gap-2.5 transition-all shadow-[0_0_15px_rgba(255,207,51,0.05)]">
    <div className="h-9 w-9 md:h-12 md:w-12 rounded-full overflow-hidden border-2 border-accent/25 flex-shrink-0 bg-white/50 backdrop-blur-md">
      <Image src="/logo.png" alt="Galaxy Interior Logo" width={48} height={48} className="object-contain w-full h-full" />
    </div>
    <div className="flex flex-col">
      <span className="text-[1.05rem] md:text-3xl font-bold tracking-tighter leading-none mt-1 text-white">GALAXY</span>
      <span className="text-[6.5px] md:text-xs font-bold tracking-[0.3em] text-accent opacity-100">INTERIOR</span>
    </div>
  </div>
);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { mode, setMode } = useMode();
  const { location, setIsModalOpen } = useLocation();

  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const { auth } = require('@/lib/firebase');
    const { onAuthStateChanged } = require('firebase/auth');
    const unsubscribe = onAuthStateChanged(auth, (u: any) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

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
      isScrolled ? "glass-panel m3-elevation-2" : (isHomePage ? "bg-transparent" : "bg-white border-b border-gray-100 m3-elevation-1")
    )}>
      {/* Branding Block - Overlapping both bars */}
      <Link href="/" className="absolute top-0 left-0 z-[60] block h-full">
        <Logo />
      </Link>

      {/* Top Bar (Announcement Bar) */}
      <div className={cn(
        "py-1.5 hidden md:block relative z-40 transition-colors duration-300 border-b",
        isScrolled ? "bg-white/85 text-primary/80 border-gray-100" : "bg-white/50 text-primary border-gray-200"
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
          
          <div className="flex items-center space-x-6">
            {location && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all",
                  isScrolled ? "text-accent border-gray-200 hover:bg-gray-50" : "text-primary border-gray-300 hover:bg-white/50"
                )}
              >
                <MapPin className="h-3.5 w-3.5 fill-current" />
                {location}
              </button>
            )}
            <a href="tel:+919631980881" className={cn(
              "flex items-center gap-2 px-4 py-1 text-[10px] font-bold uppercase tracking-widest transition-all",
              isScrolled ? "text-accent hover:text-primary" : "text-primary hover:text-accent"
            )}>
              <Phone className="h-3.5 w-3.5 fill-current" />
              CALL NOW
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex h-14 md:h-16 items-center relative">
        <div className="flex-1 flex items-center justify-end px-4 lg:px-12 ml-[190px] md:ml-[380px]">
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3.5">
            {navLinks.map((link) => {
              if (link.nested) {
                return (
                  <DropdownMenu key={link.label}>
                    <DropdownMenuTrigger className={cn(
                      "flex items-center gap-1 text-[10px] xl:text-[11px] font-bold uppercase tracking-widest m3-transition relative py-1.5 px-3 rounded-full m3-state-layer outline-none",
                      pathname.startsWith('/services')
                        ? "bg-accent/15 text-accent font-black" 
                        : (isScrolled || !isHomePage ? "text-primary/80 hover:text-accent" : "text-primary hover:text-accent")
                    )}>
                      {link.label}
                      <ChevronDown className="h-3 w-3" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" sideOffset={8} className="bg-white border border-gray-100 text-primary min-w-[200px] shadow-2xl p-2 rounded-xl z-[100]">
                      {link.nested.map((subItem) => (
                        <DropdownMenuItem key={subItem.href} asChild className="focus:bg-transparent">
                          <Link href={subItem.href} className="w-full cursor-pointer hover:bg-accent/20 hover:text-accent transition-colors font-semibold text-xs tracking-wide py-2.5 px-3 rounded-lg block">
                            {subItem.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Link 
                  key={link.href}
                  href={link.href!} 
                  className={cn(
                    "text-[10px] xl:text-[11px] font-bold uppercase tracking-widest m3-transition relative py-1.5 px-3 rounded-full m3-state-layer",
                    pathname === link.href
                      ? "bg-accent/15 text-accent font-black" 
                      : (isScrolled || !isHomePage ? "text-primary/80 hover:text-accent" : "text-primary hover:text-accent")
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {!authLoading && user ? (
            <Link
              href="/consult-online"
              className="hidden lg:flex items-center gap-1.5 ml-2 xl:ml-3 px-5 py-1.5 rounded-full bg-accent text-primary font-black text-[10px] xl:text-[11px] uppercase tracking-widest shadow-[0_0_12px_rgba(255,207,51,0.35)] m3-transition active:scale-95 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Dashboard</span>
            </Link>
          ) : (
            <>
              {/* Get Free Consultation CTA */}
              <Link
                href="/contact"
                className="hidden lg:flex items-center gap-1.5 ml-2 xl:ml-3 px-4 py-2 rounded-full bg-primary hover:bg-accent text-white hover:text-primary font-black text-[10px] xl:text-[11px] uppercase tracking-widest shadow-[0_0_12px_rgba(255,207,51,0.15)] m3-transition active:scale-95"
              >
                <span>Get Free Consultation</span>
              </Link>

              {/* User Dashboard Portal Login */}
              <Link
                href="/login"
                className="hidden lg:flex items-center gap-1.5 ml-2 px-3 py-1.5 rounded-full bg-transparent hover:bg-gray-100 border border-gray-200 hover:border-accent text-primary hover:text-accent font-black text-[10px] xl:text-[11px] uppercase tracking-widest m3-transition active:scale-95"
              >
                <span>Portal Login</span>
              </Link>
            </>
          )}
          
          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-3">
            <a href="tel:+919122795726" className="bg-primary p-2.5 text-white rounded-2xl m3-elevation-2 m3-state-layer relative overflow-hidden flex items-center justify-center">
              <Phone className="h-4.5 w-4.5" />
            </a>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn(isScrolled || !isHomePage ? "text-accent hover:text-primary" : "text-primary", "h-9 w-9")}>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white text-primary border-l border-gray-100 rounded-l-[28px] p-0 flex flex-col h-full shadow-[0_0_50px_rgba(0,0,0,0.1)] w-[85vw] sm:max-w-sm overflow-hidden">
                <div className="bg-logo-radial bg-logo-mandala px-6 py-8 flex flex-col items-start border-b border-gray-100 relative">
                  <div className="bg-accent/10 border border-accent/20 px-3 py-0.5 rounded-full text-accent font-bold text-[9px] mb-3 uppercase tracking-wider">
                    Elite Interior
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full overflow-hidden border-2 border-accent/30 flex-shrink-0 bg-white/50 backdrop-blur-md shadow-lg">
                      <Image src="/logo.png" alt="Galaxy Interior Logo" width={44} height={44} className="object-contain w-full h-full" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold tracking-tighter text-primary leading-none">GALAXY</span>
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
                            : "text-primary/70 hover:text-primary hover:bg-gray-100"
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

                <div className="mt-auto p-6 border-t border-gray-100 bg-gray-50 space-y-3">
                  {!authLoading && user ? (
                    <Link
                      href="/consult-online"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2.5 w-full p-4 rounded-2xl bg-accent text-primary font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,207,51,0.3)] active:scale-95 transition-all group relative overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
                      <LayoutGrid className="h-4 w-4" />
                      <span>Go to Dashboard</span>
                    </Link>
                  ) : (
                    <Link
                      href="/consult-online"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2.5 w-full p-4 rounded-2xl bg-accent text-primary font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,207,51,0.3)] active:scale-95 transition-all group relative overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
                      <Zap className="h-4 w-4 fill-current" />
                      <span>Initialize Project</span>
                    </Link>
                  )}

                  <a 
                    href="tel:+919122795726" 
                    className="flex items-center justify-center gap-3 w-full p-3.5 rounded-2xl bg-white border border-gray-200 text-xs font-black text-primary shadow-sm m3-transition active:scale-[0.98] group"
                  >
                    <Phone className="h-4 w-4 text-accent group-hover:text-inherit transition-colors" />
                    <span className="tracking-wider text-[11px]">+91 91227 95726</span>
                  </a>
                  <p className="text-center text-[9px] text-primary/40 uppercase tracking-widest font-bold">
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
