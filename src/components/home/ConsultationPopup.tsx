
"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ConsultationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [propertyType, setPropertyType] = useState("2 BHK");

  useEffect(() => {
    // Show popup after 10 seconds of page interaction
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const location = formData.get('location') as string;
    const phone = formData.get('phone') as string;
    
    try {
      await addDoc(collection(db, "consultations"), {
        name,
        location,
        phone,
        propertyType,
        message: "Free Consultation Inquiry",
        createdAt: serverTimestamp()
      });
    } catch (ignore) {
      console.error(ignore);
    }
    
    const message = `*Galaxy Interior - Free Consultation Inquiry*\n\n*Property Type:* ${propertyType}\n*Name:* ${name}\n*Location:* ${location}\n*Phone:* ${phone}`;
    const whatsappUrl = `https://wa.me/919631980881?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="fixed inset-x-0 bottom-0 top-auto translate-x-0 translate-y-0 w-full max-w-full rounded-t-[28px] rounded-b-none border-t border-accent/20 p-0 bg-[#051124] max-h-[92vh] overflow-y-auto md:fixed md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-4xl md:rounded-[32px] md:border md:overflow-visible m3-elevation-5 m3-transition [&>button]:hidden">
        <div className="flex flex-col md:flex-row min-h-[auto] md:min-h-[500px] bg-[#051124]">
          {/* Left Side: Banner Content */}
          <div className="hidden md:flex relative w-full md:w-[45%] bg-logo-radial bg-logo-mandala flex-col items-center justify-center p-8 overflow-hidden border-r border-accent/15">
            {/* Background Decorative Interior Image */}
            <Image
              src="/generated/kitchen_offer_bg.png"
              alt="Exclusive Offer"
              fill
              className="object-cover opacity-15"
            />
            
            <div className="relative z-10 text-center">
              <div className="bg-accent/10 border border-accent/30 px-4 py-1 rounded-full text-accent font-bold text-[10px] mb-4 inline-block shadow-md">
                galaxyinteriorindia.com
              </div>
              <h2 className="text-3xl font-display font-bold text-white leading-tight mb-4 italic uppercase tracking-tighter">
                Exclusive <br />
                <span className="text-4xl text-gold font-black not-italic block my-1">Appliance</span>
                HOME UPGRADE
              </h2>
              
              <div className="grid grid-cols-2 gap-3 mt-6">
                 <div className="bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-accent/20 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    <div className="bg-accent text-primary text-[8px] font-black py-0.5 px-2 rounded-md inline-block mb-1 uppercase">FREE!</div>
                    <p className="text-white text-[10px] font-bold tracking-wider">CHIMNEY</p>
                    <p className="text-accent text-[9px] font-semibold">(worth ₹8-10k)</p>
                 </div>
                 <div className="bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-accent/20 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    <div className="bg-accent text-primary text-[8px] font-black py-0.5 px-2 rounded-md inline-block mb-1 uppercase">FREE!</div>
                    <p className="text-white text-[10px] font-bold tracking-wider">OVEN</p>
                    <p className="text-accent text-[9px] font-semibold">(worth ₹4-5k)</p>
                 </div>
              </div>

              <div className="mt-8 bg-black/45 backdrop-blur-md text-white p-3 px-6 rounded-2xl inline-block border border-accent/20 shadow-[0_0_15px_rgba(255,207,51,0.05)]">
                 <p className="text-lg font-bold text-gold tracking-wider">2 BHK</p>
                 <p className="text-[10px] text-white/70 font-medium">(4.5 - 7 Lakh)</p>
              </div>

              <div className="mt-8 space-y-0.5 text-white/80 text-[10px] font-bold">
                 <p className="text-white font-black text-xs hover:text-accent transition-colors cursor-default">+91 96319 80881</p>
                 <p className="text-white/40 font-medium text-[9px] hover:text-white/60 transition-colors cursor-default">+91 91227 95726</p>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full md:w-[55%] p-5 sm:p-8 md:p-12 flex flex-col justify-center relative bg-[#061226]">
            {/* Mobile M3 Drag Handle */}
            <div className="md:hidden w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-4"></div>
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-white/60 hover:text-accent border border-white/20 hover:border-accent/40 bg-white/5 hover:bg-white/10 transition-colors p-2 rounded-full z-10 flex items-center justify-center shadow-lg"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Mobile Banner */}
            <div className="md:hidden mt-4 mb-6 text-center bg-gradient-to-r from-accent/5 to-accent/10 p-4 rounded-2xl border border-accent/20 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
              <div className="absolute top-0 right-0 bg-accent text-primary text-[8px] font-black py-1 px-3 rounded-bl-lg shadow-sm uppercase">FREE!</div>
              <h2 className="text-lg font-display font-bold text-accent mb-1 uppercase tracking-tight">Premium Home Upgrade</h2>
              <p className="text-[10px] text-white/80 font-bold uppercase tracking-wider">Chimney & Oven Included on 2BHK</p>
            </div>

            <h3 className="text-xl md:text-3xl font-bold text-white mb-6 md:mb-8 font-display leading-tight text-center md:text-left px-4 md:px-0">
              Get a <span className="text-gold">free design consultation</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Property type</p>
                <div className="flex flex-wrap gap-2">
                  {["2 BHK", "3 BHK", "Others"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPropertyType(type)}
                      className={cn(
                        "px-6 py-2 rounded-full border text-xs font-bold transition-all relative m3-state-layer overflow-hidden",
                        propertyType === type 
                          ? "bg-accent text-primary border-accent shadow-[0_0_15px_rgba(255,207,51,0.25)] font-black" 
                          : "border-white/10 text-white/60 bg-white/5 hover:border-accent/40 hover:text-white"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* M3 Outlined Text Field: Name */}
              <div className="relative w-full">
                <Input 
                  name="name" 
                  required 
                  className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent"
                  placeholder="Name" 
                />
                <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold">
                  Name
                </label>
              </div>

              {/* M3 Outlined Text Field: Location */}
              <div className="relative w-full">
                <Input 
                  name="location" 
                  required 
                  className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent"
                  placeholder="Location (e.g. city, state)" 
                />
                <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold">
                  Location (e.g. city, state)
                </label>
              </div>
              
              <div className="flex gap-2">
                <div className="w-16 h-14 bg-white/[0.02] border border-white/20 rounded-2xl flex items-center justify-center text-xs font-bold text-white/60">
                  +91
                </div>
                
                {/* M3 Outlined Text Field: Phone */}
                <div className="relative flex-1">
                  <Input 
                    name="phone" 
                    type="tel" 
                    required 
                    className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent"
                    placeholder="Phone Number" 
                  />
                  <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold">
                    Phone Number
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-3 py-1">
                <Checkbox 
                  id="whatsapp" 
                  defaultChecked 
                  className="rounded-md border-white/20 data-[state=checked]:bg-accent data-[state=checked]:text-primary focus-visible:ring-accent" 
                />
                <label htmlFor="whatsapp" className="text-[10px] text-white/70 flex items-center gap-1 cursor-pointer font-medium hover:text-white transition-colors">
                  Yes, send me updates via WhatsApp. <span className="text-green-400">📱</span>
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 bg-gold-gradient hover:opacity-95 text-primary rounded-full font-black text-sm uppercase tracking-[0.15em] m3-elevation-2 hover:m3-elevation-3 transition-all hover:scale-[1.01] active:scale-[0.99] relative overflow-hidden m3-state-layer"
              >
                Book Free Consultation
              </Button>

              <p className="text-[9px] text-center text-white/50 leading-relaxed px-4">
                By submitting, you consent to our <Link href="#" className="underline font-bold text-accent hover:text-white transition-colors">privacy policy</Link> and <Link href="#" className="underline font-bold text-accent hover:text-white transition-colors">terms of use</Link>
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
