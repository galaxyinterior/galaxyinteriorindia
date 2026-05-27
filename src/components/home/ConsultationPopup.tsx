
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
      <DialogContent className="max-w-4xl p-0 overflow-hidden border border-accent/20 rounded-3xl md:rounded-[2rem] bg-[#051124] w-[92vw] sm:w-[95vw] md:w-full max-h-[90vh] overflow-y-auto md:overflow-visible shadow-[0_0_50px_rgba(0,0,0,0.5)]">
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
                galaxyinterior.com
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

              <div className="mt-8 space-y-1 text-white/80 text-[10px] font-bold">
                 <p className="hover:text-accent transition-colors cursor-default">+91 91134 39057</p>
                 <p className="hover:text-accent transition-colors cursor-default">+91 96319 80881</p>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full md:w-[55%] p-5 sm:p-8 md:p-12 flex flex-col justify-center relative bg-[#061226]">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-white/60 hover:bg-white/10 hover:text-accent transition-colors p-2 rounded-full z-10"
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

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-3">
                <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Property type</p>
                <div className="flex flex-wrap gap-2">
                  {["2 BHK", "3 BHK", "Others"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPropertyType(type)}
                      className={cn(
                        "px-5 py-2 rounded-full border text-xs font-bold transition-all",
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

              <Input 
                name="name" 
                placeholder="Name" 
                required 
                className="h-11 rounded-xl border-white/10 focus:border-accent bg-white/5 placeholder:text-white/40 text-white focus:ring-accent focus:ring-1 focus-visible:ring-accent" 
              />
              <Input 
                name="location" 
                placeholder="Location (e.g. city, state)" 
                required 
                className="h-11 rounded-xl border-white/10 focus:border-accent bg-white/5 placeholder:text-white/40 text-white focus:ring-accent focus:ring-1 focus-visible:ring-accent" 
              />
              
              <div className="flex gap-2">
                <div className="w-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-xs font-bold text-white/60">
                  +91
                </div>
                <Input 
                  name="phone" 
                  placeholder="Phone Number" 
                  type="tel" 
                  required 
                  className="h-11 rounded-xl border-white/10 focus:border-accent flex-1 bg-white/5 placeholder:text-white/40 text-white focus:ring-accent focus:ring-1 focus-visible:ring-accent" 
                />
              </div>

              <div className="flex items-center space-x-3 py-2">
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
                className="w-full h-12 bg-gold-gradient hover:opacity-90 text-primary rounded-full font-black text-sm uppercase tracking-[0.1em] shadow-[0_4px_20px_rgba(255,207,51,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98]"
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
