
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Phone, Mail, ArrowRight } from 'lucide-react';

const socialLinks = [
  { name: 'Facebook', icon: <Facebook className="h-5 w-5" />, href: 'https://www.facebook.com/share/1CtjPKYSbr/' },
  { name: 'Instagram', icon: <Instagram className="h-5 w-5" />, href: 'https://www.instagram.com/galaxy.interior05?igsh=MTNhajZpbnUwcDIwbA==' },
  { name: 'YouTube', icon: <Youtube className="h-5 w-5" />, href: 'https://www.youtube.com/channel/UCl0XEaJwoo_1rQ0w-bxCOZg' },
];

export default function Footer() {
  return (
    <footer className="bg-galaxy-dark text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">

          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8 hover:opacity-90 transition-opacity">
              <div className="h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden border-2 border-accent/25 flex-shrink-0 bg-white/5 backdrop-blur-md flex items-center justify-center">
                <Image src="/logo.png" alt="Galaxy Interior Logo" width={64} height={64} className="object-contain w-full h-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-4xl font-bold tracking-tighter leading-none text-white uppercase">GALAXY</span>
                <span className="text-[10px] md:text-sm font-bold tracking-[0.3em] text-accent opacity-90 uppercase">INTERIOR</span>
              </div>
            </Link>
            <p className="text-white/60 mb-8 leading-relaxed">
              Full-service architecture, construction and interior design firm shaping dreams across Jharkhand.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(social => (
                <Link
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith('http') ? "_blank" : "_self"}
                  rel={social.href.startsWith('http') ? "noopener noreferrer" : ""}
                  className="h-10 w-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-primary hover:border-primary hover:text-white transition-all"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white uppercase tracking-widest mb-8">Explore</h3>
            <ul className="space-y-4 text-white/60">
              <li><Link href="/about" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Our Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Portfolio</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Our Projects</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Product Catalog</Link></li>
              <li><Link href="/construction" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Construction</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Pricing Plans</Link></li>
              <li><Link href="/reviews" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Client Reviews</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-bold text-white uppercase tracking-widest mb-8">Serviceable Areas</h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-white/70 text-sm font-bold uppercase tracking-wider leading-relaxed">
              <span>GODDA</span> <span className="text-accent">|</span>
              <span>RANCHI</span> <span className="text-accent">|</span>
              <span>BHAGALPUR</span> <span className="text-accent">|</span>
              <span>BANKA</span> <span className="text-accent">|</span>
              <span>DEOGHAR</span> <span className="text-accent">|</span>
              <span>HAZARIBAGH</span> <span className="text-accent">|</span>
              <span>DUMKA</span> <span className="text-accent">|</span>
              <span>PURNEA</span> <span className="text-accent">|</span>
              <span>KISHANGANJ</span>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-x-8 gap-y-4 text-white/60 text-sm">
              <div className="flex gap-3 items-center">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+919631980881" className="font-bold text-white hover:text-accent transition-colors text-base">+91 96319 80881</a>
                  <a href="tel:+919122795726" className="font-bold text-white hover:text-accent transition-colors text-base">+91 91227 95726</a>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:info@galaxyinteriorindia.com" className="font-bold text-white hover:text-accent transition-colors">info@galaxyinteriorindia.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-white/40 uppercase tracking-[0.2em]">
          <p>&copy; {new Date().getFullYear()} GALAXY INTERIOR. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
