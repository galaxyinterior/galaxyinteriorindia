"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Phone, Home, Info, Paintbrush, LayoutGrid, Hammer, Tag, Zap, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "COMPANY" },
  { href: "/services", label: "SERVICES" },
  { href: "/portfolio", label: "GALLERY" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/products", label: "PRODUCTS" },
  { href: "/construction", label: "CONSTRUCTION" },
  { href: "/pricing", label: "PRICING" },
  { href: "/contact", label: "CONTACT" },
];

const linkIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "/": Home,
  "/about": Info,
  "/services": Paintbrush,
  "/portfolio": LayoutGrid,
  "/construction": Hammer,
  "/pricing": Tag,
  "/contact": Phone,
};

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#051124] border-b border-white/5 flex items-center justify-between px-4 shadow-lg lg:hidden">
      {/* Brand logo container without heavy border-r */}
      <Link href="/" className="flex items-center gap-2.5">
        <div className="h-9 w-9 rounded-full overflow-hidden border border-accent/30 bg-[#08162d] flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Galaxy Interior Logo"
            width={36}
            height={36}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-black tracking-tighter leading-none text-white">GALAXY</span>
          <span className="text-[6.5px] font-black tracking-[0.28em] text-accent mt-0.5">INTERIOR</span>
        </div>
      </Link>

      {/* Tighter Call & Menu Controls */}
      <div className="flex items-center gap-1.5">
        <a
          href="tel:+919122795726"
          className="h-9 w-9 flex items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent transition-colors"
        >
          <Phone className="h-4.5 w-4.5" />
        </a>

        {/* Initialize Project — Mobile Top Bar */}
        <Link
          href="/consult-online"
          className="flex items-center gap-1.5 h-9 px-3 rounded-xl bg-accent text-primary font-black text-[9px] uppercase tracking-widest shadow-[0_0_12px_rgba(255,207,51,0.4)] active:scale-95 transition-all"
        >
          <Zap className="h-3 w-3 fill-current flex-shrink-0" />
          <span className="hidden xs:inline">Start</span>
        </Link>

        {/* User Login — Mobile Top Bar */}
        <Link
          href="/login"
          className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:text-accent transition-colors active:scale-95"
          title="Portal Login"
        >
          <User className="h-4.5 w-4.5 shrink-0" />
        </Link>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-white hover:text-accent focus:bg-transparent"
            >
              <Menu className="h-6.5 w-6.5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-[#051124] text-white border-l border-accent/15 rounded-l-[20px] p-0 flex flex-col h-full shadow-[0_0_50px_rgba(0,0,0,0.6)] w-[80vw] sm:max-w-xs overflow-hidden"
          >
            {/* Mobile Sidebar Announcement */}
            <div className="bg-logo-radial bg-logo-mandala px-5 py-6 flex flex-col items-start border-b border-accent/15 relative">
              <div className="bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full text-accent font-bold text-[8px] mb-2 uppercase tracking-wider">
                Elite Studios
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full overflow-hidden border border-accent/20 flex-shrink-0 bg-white/5">
                  <Image
                    src="/logo.png"
                    alt="Galaxy Logo"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-tighter leading-none">GALAXY</span>
                  <span className="text-[7px] font-black tracking-[0.25em] text-accent mt-0.5">INTERIOR</span>
                </div>
              </div>
            </div>

            {/* Mobile Drawer Menu Links */}
            <nav className="flex-1 flex flex-col gap-1 px-2.5 py-4 overflow-y-auto">
              {navLinks.map((link) => {
                const Icon = linkIcons[link.href] || Info;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3.5 px-5 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                      isActive
                        ? "bg-accent text-primary shadow-md font-black"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isActive ? "text-primary" : "text-accent"
                      )}
                    />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Call Card */}
            <div className="mt-auto p-4 border-t border-accent/10 bg-white/[0.02]">
              <a
                href="tel:+919122795726"
                className="flex items-center justify-center gap-2 w-full p-3 rounded-xl bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/20 text-[10px] font-black text-white hover:bg-accent hover:text-primary transition-all duration-300"
              >
                <Phone className="h-3.5 w-3.5 text-accent" />
                <span className="tracking-wider">+91 91227 95726</span>
              </a>
              <p className="text-center text-[7.5px] text-white/40 mt-3 uppercase tracking-widest font-bold">
                General Manager &amp; Owner
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
