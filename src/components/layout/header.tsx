
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, Phone, Home } from 'lucide-react';
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
  { href: '/contact', label: 'CONTACT' },
];

const towns = ["GODDA", "RANCHI", "BHAGALPUR", "BANKA", "DEOGHAR", "HAZARIBAGH", "DUMKA"];

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
      isScrolled ? "glass-panel shadow-2xl" : (isHomePage ? "bg-transparent" : "bg-primary border-b border-white/5 shadow-md")
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
                  <a href="tel:+919113439057">GODDA: +91 91134 39057</a>
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
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={cn(
                  "text-[11px] xl:text-xs font-bold uppercase tracking-widest transition-colors relative group py-2",
                  isScrolled || !isHomePage ? "text-white/80 hover:text-accent" : "text-white hover:text-accent",
                  pathname === link.href ? "text-accent" : "text-white/80"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 transition-transform origin-left bg-accent",
                  pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}></span>
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-4">
            <a href="tel:+919113439057" className="bg-primary p-2 text-white rounded-full shadow-lg">
              <Phone className="h-5 w-5" />
            </a>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn(isScrolled || !isHomePage ? "text-accent hover:text-white" : "text-white")}>
                  <Menu className="h-8 w-8" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white p-0">
                <div className="bg-primary p-6 flex flex-col items-center">
                  <div className="flex items-center gap-3 text-white">
                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0 bg-white">
                      <Image src="/logo.png" alt="Galaxy Interior Logo" width={40} height={40} className="object-contain w-full h-full" />
                    </div>
                    <span className="text-2xl font-bold tracking-tighter">GALAXY INTERIOR</span>
                  </div>
                </div>
                <nav className="flex flex-col space-y-2 mt-6">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href}
                      href={link.href} 
                      className={cn(
                        "text-sm font-bold uppercase tracking-widest p-5 border-b border-gray-100 transition-colors",
                        pathname === link.href ? "text-primary bg-primary/5" : "text-gray-800 hover:bg-gray-50"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-8 px-5 space-y-4">
                    <a href="tel:+919113439057" className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 text-sm font-bold text-primary">
                      <Phone className="h-5 w-5" /> +91 91134 39057
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
