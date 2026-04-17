
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
      <DialogContent className="max-w-4xl p-0 overflow-hidden border-none rounded-3xl md:rounded-[2rem] bg-white w-[92vw] sm:w-[95vw] md:w-full max-h-[90vh] overflow-y-auto md:overflow-visible">
        <div className="flex flex-col md:flex-row min-h-[auto] md:min-h-[500px]">
          {/* Left Side: Banner Content */}
          <div className="hidden md:flex relative w-full md:w-[45%] bg-[#f4a261] flex-col items-center justify-center p-8 overflow-hidden">
            {/* Background Decorative Interior Image */}
            <Image
              src="/generated/kitchen_offer_bg.png"
              alt="Exclusive Offer"
              fill
              className="object-cover opacity-20"
            />
            
            <div className="relative z-10 text-center">
              <div className="bg-white/90 px-4 py-1 rounded-full text-[#c0392b] font-bold text-[10px] mb-4 inline-block shadow-md">
                galaxyinterior.com
              </div>
              <h2 className="text-3xl font-display font-bold text-white leading-tight mb-4 italic">
                Exclusive <br />
                <span className="text-4xl text-[#c0392b] not-italic">Appliance</span> <br />
                HOME UPGRADE
              </h2>
              
              <div className="grid grid-cols-2 gap-3 mt-6">
                 <div className="bg-white/30 backdrop-blur-md p-3 rounded-2xl border border-white/30">
                    <div className="bg-red-600 text-white text-[8px] font-bold py-1 px-2 rounded-lg inline-block mb-1">FREE!</div>
                    <p className="text-white text-[10px] font-bold">CHIMNEY</p>
                    <p className="text-white/70 text-[8px]">(worth ₹8-10k)</p>
                 </div>
                 <div className="bg-white/30 backdrop-blur-md p-3 rounded-2xl border border-white/30">
                    <div className="bg-red-600 text-white text-[8px] font-bold py-1 px-2 rounded-lg inline-block mb-1">FREE!</div>
                    <p className="text-white text-[10px] font-bold">OVEN</p>
                    <p className="text-white/70 text-[8px]">(worth ₹4-5k)</p>
                 </div>
              </div>

              <div className="mt-8 bg-black/80 text-white p-3 px-6 rounded-2xl inline-block border border-white/20">
                 <p className="text-lg font-bold">2BHK</p>
                 <p className="text-[10px] text-white/60">(4.5 - 7 Lakh)</p>
              </div>

              <div className="mt-8 space-y-1 text-white text-[10px] font-bold">
                 <p>+91 91134 39057</p>
                 <p>+91 96319 80881</p>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full md:w-[55%] p-5 sm:p-8 md:p-12 flex flex-col justify-center relative bg-white">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-400 hover:bg-gray-100 hover:text-primary transition-colors p-2 rounded-full z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Mobile Banner */}
            <div className="md:hidden mt-4 mb-6 text-center bg-orange-50 p-4 rounded-2xl border border-orange-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-600 text-white text-[8px] font-bold py-1 px-3 rounded-bl-lg shadow-sm">FREE!</div>
              <h2 className="text-lg font-display font-bold text-[#c0392b] mb-1">Premium Home Upgrade</h2>
              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">Chimney & Oven Included on 2BHK</p>
            </div>

            <h3 className="text-xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 font-display leading-tight text-center md:text-left px-4 md:px-0">
              Get a free design consultation
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Property type</p>
                <div className="flex flex-wrap gap-2">
                  {["2 BHK", "3 BHK", "Others"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPropertyType(type)}
                      className={cn(
                        "px-5 py-2 rounded-full border text-xs font-bold transition-all",
                        propertyType === type 
                          ? "bg-primary text-white border-primary shadow-md" 
                          : "border-gray-200 text-gray-500 hover:border-primary/30"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <Input name="name" placeholder="Name" required className="h-11 rounded-xl border-gray-200 focus:border-primary bg-gray-50/50" />
              <Input name="location" placeholder="Location (e.g. city, state)" required className="h-11 rounded-xl border-gray-200 focus:border-primary bg-gray-50/50" />
              
              <div className="flex gap-2">
                <div className="w-16 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center text-xs font-bold text-gray-500">
                  +91
                </div>
                <Input name="phone" placeholder="Phone Number" type="tel" required className="h-11 rounded-xl border-gray-200 focus:border-primary flex-1 bg-gray-50/50" />
              </div>

              <div className="flex items-center space-x-3 py-2">
                <Checkbox id="whatsapp" defaultChecked className="rounded-md border-gray-300" />
                <label htmlFor="whatsapp" className="text-[10px] text-gray-500 flex items-center gap-1 cursor-pointer font-medium">
                  Yes, send me updates via WhatsApp. <span className="text-green-500">📱</span>
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-[#a03020] hover:bg-[#802010] text-white rounded-full font-bold text-sm uppercase tracking-[0.1em] shadow-lg transition-all"
              >
                Book Free Consultation
              </Button>

              <p className="text-[9px] text-center text-gray-400 leading-relaxed px-4">
                By submitting, you consent to our <Link href="#" className="underline font-bold">privacy policy</Link> and <Link href="#" className="underline font-bold">terms of use</Link>
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
