
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, Phone, Home, Info, Paintbrush, LayoutGrid, Hammer, Mail, Tag } from 'lucide-react';
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

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'COMPANY' },
  { href: '/services', label: 'SERVICES' },
  { href: '/portfolio', label: 'GALLERY' },
  { href: '/construction', label: 'CONSTRUCTION' },
  { href: '/pricing', label: 'PRICING' },
  { href: '/contact', label: 'CONTACT' },
];

const towns = ["GODDA", "RANCHI", "BHAGALPUR", "BANKA", "DEOGHAR", "HAZARIBAGH", "DUMKA"];

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
  <div className="bg-logo-radial border-b border-r border-accent/20 text-white h-16 md:h-[100px] px-4 md:px-8 flex items-center gap-3 transition-all shadow-[0_0_15px_rgba(255,207,51,0.05)]">
    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden border-2 border-accent/25 flex-shrink-0 bg-white/5 backdrop-blur-md">
      <Image src="/logo.png" alt="Galaxy Interior Logo" width={48} height={48} className="object-contain w-full h-full" />
    </div>
    <div className="flex flex-col">
      <span className="text-[1.2rem] md:text-3xl font-bold tracking-tighter leading-none mt-1 text-white">GALAXY</span>
      <span className="text-[7.5px] md:text-xs font-bold tracking-[0.3em] text-accent opacity-90">INTERIOR</span>
    </div>
  </div>
);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

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
                  <a href="tel:+919122795726">GODDA: +91 91227 95726</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-bold text-primary focus:bg-primary focus:text-white">
                  <a href="tel:+919631980881">RANCHI: +91 96319 80881</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex h-16 items-center relative">
        <div className="flex-1 flex items-center justify-end px-4 lg:px-12 ml-[190px] md:ml-[380px]">
          <nav className="hidden lg:flex items-center space-x-3 xl:space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={cn(
                  "text-[11px] xl:text-xs font-bold uppercase tracking-widest m3-transition relative py-2.5 px-4 rounded-full m3-state-layer",
                  pathname === link.href 
                    ? "bg-accent/15 text-accent font-black" 
                    : (isScrolled || !isHomePage ? "text-white/80 hover:text-accent" : "text-white hover:text-accent")
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-4">
            <a href="tel:+919122795726" className="bg-primary p-3 text-white rounded-2xl m3-elevation-2 m3-state-layer relative overflow-hidden flex items-center justify-center">
              <Phone className="h-5 w-5" />
            </a>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn(isScrolled || !isHomePage ? "text-accent hover:text-white" : "text-white")}>
                  <Menu className="h-8 w-8" />
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

                <div className="mt-auto p-6 border-t border-accent/10 bg-white/[0.02]">
                  <a 
                    href="tel:+919122795726" 
                    className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/20 text-xs font-black text-white hover:bg-accent hover:text-primary hover:border-accent shadow-md m3-transition hover:scale-[1.02] active:scale-[0.98] group"
                  >
                    <Phone className="h-4 w-4 text-accent group-hover:text-inherit transition-colors" />
                    <span className="tracking-wider text-[11px]">+91 91227 95726</span>
                  </a>
                  <p className="text-center text-[9px] text-white/40 mt-4 uppercase tracking-widest font-bold">
                    Ranchi & Godda Offices
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
