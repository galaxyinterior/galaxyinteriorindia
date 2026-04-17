
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const socialLinks = [
  { name: 'Facebook', icon: <Facebook className="h-5 w-5" />, href: '#' },
  { name: 'Instagram', icon: <Instagram className="h-5 w-5" />, href: '#' },
  { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, href: '#' },
  { name: 'YouTube', icon: <Youtube className="h-5 w-5" />, href: 'https://www.youtube.com/channel/UCl0XEaJwoo_1rQ0w-bxCOZg' },
];

export default function Footer() {
  return (
    <footer className="bg-galaxy-dark text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          <div className="lg:col-span-1">
            <Link href="/" className="block mb-8">
              <div className="inline-block relative w-64 h-16 md:w-80 md:h-20">
                <Image 
                  src="/logoxy_dark.png" 
                  alt="Galaxy Interior Logo" 
                  fill
                  className="object-contain"
                />
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
              <li><Link href="/construction" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Construction</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-bold text-white uppercase tracking-widest mb-8">Our Offices</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="font-bold text-primary text-sm uppercase tracking-widest">Godda Office</p>
                <div className="flex gap-3 text-white/60 text-sm">
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <span>Near Durga Mandir Sarkanda, Godda, Jharkhand – 814133</span>
                </div>
                <div className="flex gap-3 text-white/60 text-sm">
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <span>+91 9113439057</span>
                </div>
              </div>
              <div className="space-y-4">
                <p className="font-bold text-primary text-sm uppercase tracking-widest">Ranchi Office</p>
                <div className="flex gap-3 text-white/60 text-sm">
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <span>Van Vrindavan Colony, Morabadi, Ranchi – 834006</span>
                </div>
                <div className="flex gap-3 text-white/60 text-sm">
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <span>+91 9631980881</span>
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-3 text-white/60 text-sm">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <span>info@galaxyinterior.com</span>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-white/40 uppercase tracking-[0.2em]">
          <p>&copy; {new Date().getFullYear()} GALAXY INTERIOR. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
