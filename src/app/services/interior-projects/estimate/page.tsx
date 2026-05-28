"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  ChevronRight, ArrowRight, Check, Sparkles, Zap, Sofa, 
  Home, Building, LayoutGrid, CheckCircle2, ChevronLeft, 
  DollarSign, FileText, Phone, Layers
} from "lucide-react";
import Link from "next/link";

// Quality Tier Pricing per Sq Ft
const TIER_PRICING = {
  standard: {
    label: "Standard Quality Finish",
    rate: 350,
    desc: "Clean, durable, functional and cost-effective finishes with branded standard materials."
  },
  premium: {
    label: "Premium Elegance Finish",
    rate: 650,
    desc: "Elegant wood veneers, cove light structures, modular switches, and high-performance laminates."
  },
  luxury: {
    label: "Luxury Italian Finish",
    rate: 1100,
    desc: "High-gloss acrylics, premium Italian laminates, designer glass panels, and customized fittings."
  }
};

// Default Area parameters by BHK
const BHK_DEFAULTS = {
  "1-room": { area: 450, label: "1 Room / Studio" },
  "2bhk": { area: 950, label: "2 BHK Layout" },
  "3bhk": { area: 1450, label: "3 BHK Layout" },
  "customized": { area: 1200, label: "Custom Layout" }
};

// Item Catalog across 7 categories
const ITEM_CATEGORIES = [
  {
    id: "living",
    title: "1. Living Room",
    items: [
      { id: "living_tv_panel", label: "TV Panel", price: 25000 },
      { id: "living_false_ceiling", label: "False Ceiling", price: 18000 },
      { id: "living_cove_lighting", label: "Cove Lighting", price: 8000 },
      { id: "living_sofa_set", label: "Sofa Set", price: 45000 },
      { id: "living_center_table", label: "Center Table", price: 12000 },
      { id: "living_wall_paneling", label: "Wall Paneling", price: 22000 },
      { id: "living_curtains", label: "Curtains", price: 9000 },
      { id: "living_wallpaper", label: "Wallpaper/Texture Paint", price: 11000 },
      { id: "living_shoe_rack", label: "Shoe Rack", price: 8500 },
      { id: "living_ac_fitting", label: "AC Fitting", price: 4500 },
      { id: "living_smart_lighting", label: "Smart Lighting", price: 15000 }
    ]
  },
  {
    id: "bedroom",
    title: "2. Bedroom",
    items: [
      { id: "bed_storage", label: "Bed with Storage", price: 38000 },
      { id: "bed_mattress", label: "Mattress", price: 15000 },
      { id: "bed_wardrobe", label: "Wardrobe", price: 48000 },
      { id: "bed_dressing", label: "Dressing Table", price: 12000 },
      { id: "bed_side_table", label: "Side Table", price: 6000 },
      { id: "bed_curtains", label: "Curtains", price: 7500 },
      { id: "bed_study", label: "Study/Work Table", price: 14000 },
      { id: "bed_false_ceiling", label: "False Ceiling", price: 14000 },
      { id: "bed_mood_lighting", label: "Mood Lighting", price: 7000 },
      { id: "bed_ac", label: "AC Connection", price: 3500 }
    ]
  },
  {
    id: "kitchen",
    title: "3. Modular Kitchen",
    items: [
      { id: "kitchen_upper", label: "Upper Cabinets", price: 32000 },
      { id: "kitchen_lower", label: "Lower Cabinets", price: 38000 },
      { id: "kitchen_chimney", label: "Chimney", price: 18000 },
      { id: "kitchen_hob", label: "Hob", price: 14000 },
      { id: "kitchen_sink", label: "Sink", price: 11000 },
      { id: "kitchen_countertop", label: "Granite/Quartz Countertop", price: 28000 },
      { id: "kitchen_softclose", label: "Soft-Close Channels", price: 16000 },
      { id: "kitchen_tall", label: "Tall Unit", price: 24000 },
      { id: "kitchen_ro", label: "RO Space", price: 4500 },
      { id: "kitchen_fridge", label: "Fridge Space", price: 8000 },
      { id: "kitchen_microwave", label: "Microwave Cabinet", price: 6500 }
    ]
  },
  {
    id: "bathroom",
    title: "4. Bathroom",
    items: [
      { id: "bath_vanity", label: "Vanity Cabinet", price: 9500 },
      { id: "bath_mirror", label: "Mirror", price: 6500 },
      { id: "bath_glass", label: "Glass Partition", price: 18500 },
      { id: "bath_fittings", label: "Premium Fittings", price: 22000 },
      { id: "bath_geyser", label: "Geyser Fitting", price: 3000 },
      { id: "bath_exhaust", label: "Exhaust Fan", price: 2500 },
      { id: "bath_storage", label: "Storage Rack", price: 4000 }
    ]
  },
  {
    id: "electrical",
    title: "5. Electrical Work",
    items: [
      { id: "elec_switches", label: "Modular Switches", price: 12000 },
      { id: "elec_decorative", label: "Decorative Lights", price: 15000 },
      { id: "elec_led_strip", label: "LED Strip", price: 8500 },
      { id: "elec_fan", label: "Fan", price: 14000 },
      { id: "elec_smart", label: "Smart Switches", price: 18000 },
      { id: "elec_wiring", label: "Hidden Wiring", price: 25000 },
      { id: "elec_extra_plugs", label: "Extra Plug Points", price: 6000 }
    ]
  },
  {
    id: "paint",
    title: "6. Paint & Wall Finish",
    items: [
      { id: "paint_putty", label: "Putty", price: 15000 },
      { id: "paint_primer", label: "Primer", price: 8000 },
      { id: "paint_luxury", label: "Luxury Paint", price: 28000 },
      { id: "paint_texture", label: "Texture Paint", price: 12000 },
      { id: "paint_wallpaper", label: "Wallpaper", price: 15000 }
    ]
  },
  {
    id: "flooring",
    title: "7. Flooring (optional)",
    items: [
      { id: "floor_tiles", label: "Tiles Replacement", price: 45000 },
      { id: "floor_wood", label: "Wooden Flooring", price: 55000 },
      { id: "floor_skirting", label: "Skirting", price: 9000 }
    ]
  }
];

export default function EstimateMakerPage() {
  const [step, setStep] = useState(1);
  const [bhk, setBhk] = useState<"1-room" | "2bhk" | "3bhk" | "customized">("2bhk");
  const [area, setArea] = useState(950);
  const [tier, setTier] = useState<"standard" | "premium" | "luxury">("premium");
  
  // Custom counters for customized layout
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [kitchens, setKitchens] = useState(1);

  // Selected item checklist
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("living");
  
  // Lead Submission Details
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Ranchi");
  const [submitted, setSubmitted] = useState(false);

  // Dynamic initialization of Area & defaults on BHK change
  useEffect(() => {
    setArea(BHK_DEFAULTS[bhk].area);
    if (bhk === "1-room") {
      setBedrooms(1);
      setBathrooms(1);
    } else if (bhk === "2bhk") {
      setBedrooms(2);
      setBathrooms(2);
    } else if (bhk === "3bhk") {
      setBedrooms(3);
      setBathrooms(3);
    }
  }, [bhk]);

  // Set standard checklist items selected by default (excluding flooring)
  useEffect(() => {
    const defaultIds = ITEM_CATEGORIES
      .filter(cat => cat.id !== "flooring")
      .flatMap(cat => cat.items.map(item => item.id));
    setSelectedItems(defaultIds);
  }, [bhk]);

  // Pricing math calculations
  const baseRate = TIER_PRICING[tier].rate;
  const areaCost = area * baseRate;
  
  // Sum of custom selected items with scaling multipliers
  const itemsCost = selectedItems.reduce((sum, id) => {
    let item = null;
    let categoryId = "";
    for (const cat of ITEM_CATEGORIES) {
      const found = cat.items.find(i => i.id === id);
      if (found) {
        item = found;
        categoryId = cat.id;
        break;
      }
    }
    
    if (!item) return sum;
    
    let multiplier = 1;
    if (categoryId === "bedroom") {
      multiplier = bhk === "1-room" ? 1 : bhk === "2bhk" ? 2 : bhk === "3bhk" ? 3 : bedrooms;
    } else if (categoryId === "bathroom") {
      multiplier = bhk === "1-room" ? 1 : bhk === "2bhk" ? 2 : bhk === "3bhk" ? 2 : bathrooms;
    } else if (categoryId === "kitchen" && bhk === "customized") {
      multiplier = kitchens;
    }
    
    return sum + (item.price * multiplier);
  }, 0);

  // Grand total calculation
  const subtotal = areaCost + itemsCost;
  const gst = Math.round(subtotal * 0.18); // 18% GST standard on interior design and contracts
  const grandTotal = subtotal + gst;

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
    setStep(5);
  };

  return (
    <div className="bg-[#051124] min-h-screen text-white pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-accent/80 font-bold uppercase tracking-widest text-[9px] mb-8 justify-center">
          <Link href="/services" className="hover:text-accent transition-colors">Services</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/services/interior-projects" className="hover:text-accent transition-colors">Interior Projects</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-accent">Estimate Maker</span>
        </div>

        {/* Dynamic Step Header */}
        <div className="text-center mb-10">
          <Badge className="mb-4 rounded-full bg-accent text-primary font-black tracking-widest px-4 py-1 text-[10px] uppercase border-none shadow-md">
            Step {step} of 4: {step === 1 && "Configuration"} {step === 2 && "Quality & Finish"} {step === 3 && "Add-ons Checklist"} {step === 4 && "Final BOQ Estimate"} {step === 5 && "Consultation Locked"}
          </Badge>
          <h1 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
            {step === 1 && "Configure Your Space"}
            {step === 2 && "Select Finish Standard"}
            {step === 3 && "Include Luxury Upgrades"}
            {step === 4 && "Your Estimated BOQ"}
            {step === 5 && "Estimate Locked Successfully"}
          </h1>
          <div className="w-20 h-1 bg-accent mx-auto mt-4 rounded-full mb-6"></div>
          
          {/* Serving Locations Banner */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-white/50 text-[9px] font-black uppercase tracking-widest bg-white/[0.02] border border-white/5 py-2.5 px-4 rounded-full max-w-2xl mx-auto backdrop-blur-sm animate-fade-in mb-6">
            <span className="text-accent font-black">Serving Studios:</span>
            {["GODDA", "RANCHI", "BHAGALPUR", "BANKA", "DEOGHAR", "HAZARIBAGH", "DUMKA", "KISHANGANJ", "PURNEA"].map((loc, i, arr) => (
              <React.Fragment key={loc}>
                <span className="text-white/80 hover:text-accent transition-colors cursor-default">{loc}</span>
                {i < arr.length - 1 && <span className="text-white/20 font-light">|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Progress Bar */}
        {step < 5 && (
          <div className="flex items-center justify-between max-w-md mx-auto mb-12 relative px-4">
            <div className="absolute left-0 right-0 h-1 bg-white/10 top-1/2 -translate-y-1/2 -z-10 rounded-full"></div>
            <div className="absolute left-0 h-1 bg-accent top-1/2 -translate-y-1/2 -z-10 rounded-full transition-all duration-300" style={{ width: `${(step - 1) * 33.3}%` }}></div>
            {[1, 2, 3, 4].map((num) => (
              <div 
                key={num} 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                  num <= step ? "bg-accent text-primary shadow-[0_0_10px_rgba(255,207,51,0.5)] scale-110" : "bg-white/10 text-white/50"
                }`}
              >
                {num}
              </div>
            ))}
          </div>
        )}

        {/* --- STEP 1: CONFIGURATION --- */}
        {step === 1 && (
          <Card className="glass-panel p-8 border-none m3-rounded-xl text-white">
            <h2 className="text-xl font-black uppercase tracking-tight text-gold mb-6">Select Configuration & Dimensions</h2>
            
            {/* BHK Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {(Object.keys(BHK_DEFAULTS) as Array<keyof typeof BHK_DEFAULTS>).map((type) => (
                <button
                  key={type}
                  onClick={() => setBhk(type)}
                  className={`p-5 rounded-[20px] border flex flex-col items-center text-center transition-all duration-300 m3-elevation-1 ${
                    bhk === type 
                      ? "border-accent bg-accent/15 text-white shadow-[0_0_15px_rgba(255,207,51,0.15)]" 
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="mb-3 text-accent">
                    {type === "1-room" && <Layers className="w-6 h-6" />}
                    {type === "2bhk" && <Home className="w-6 h-6" />}
                    {type === "3bhk" && <Building className="w-6 h-6" />}
                    {type === "customized" && <Sofa className="w-6 h-6" />}
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider">{BHK_DEFAULTS[type].label}</span>
                </button>
              ))}
            </div>

            {/* Custom rooms builder if customized selected */}
            {bhk === "customized" && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10 animate-fade-up">
                <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-4">Room Allocations</p>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <span className="block text-xs font-bold text-white/60">Bedrooms</span>
                    <div className="flex justify-center items-center gap-3">
                      <button onClick={() => setBedrooms(Math.max(1, bedrooms - 1))} className="w-8 h-8 rounded-lg bg-white/10 font-bold hover:bg-white/20">-</button>
                      <span className="text-lg font-black">{bedrooms}</span>
                      <button onClick={() => setBedrooms(bedrooms + 1)} className="w-8 h-8 rounded-lg bg-white/10 font-bold hover:bg-white/20">+</button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="block text-xs font-bold text-white/60">Bathrooms</span>
                    <div className="flex justify-center items-center gap-3">
                      <button onClick={() => setBathrooms(Math.max(1, bathrooms - 1))} className="w-8 h-8 rounded-lg bg-white/10 font-bold hover:bg-white/20">-</button>
                      <span className="text-lg font-black">{bathrooms}</span>
                      <button onClick={() => setBathrooms(bathrooms + 1)} className="w-8 h-8 rounded-lg bg-white/10 font-bold hover:bg-white/20">+</button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="block text-xs font-bold text-white/60">Kitchens</span>
                    <div className="flex justify-center items-center gap-3">
                      <button onClick={() => setKitchens(Math.max(0, kitchens - 1))} className="w-8 h-8 rounded-lg bg-white/10 font-bold hover:bg-white/20">-</button>
                      <span className="text-lg font-black">{kitchens}</span>
                      <button onClick={() => setKitchens(kitchens + 1)} className="w-8 h-8 rounded-lg bg-white/10 font-bold hover:bg-white/20">+</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Area Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-white/80">Total Carpet Area (Sq Ft)</label>
                <div className="bg-[#051124] border border-accent/20 px-4 py-2 rounded-xl text-lg font-black text-accent">
                  {area} <span className="text-xs font-bold text-white/60">sqft</span>
                </div>
              </div>
              <input
                type="range"
                min={200}
                max={5000}
                step={50}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[9px] font-black text-white/40 uppercase tracking-widest">
                <span>200 sqft</span>
                <span>Studio</span>
                <span>Mid Apartment</span>
                <span>Duplex Villa</span>
                <span>5000 sqft</span>
              </div>
            </div>

            <div className="flex justify-end mt-12">
              <Button onClick={handleNext} className="rounded-full px-8 h-12 font-black uppercase tracking-wider bg-accent hover:bg-accent/90 text-primary">
                Next: Choose Finish
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* --- STEP 2: FINISH STANDARD --- */}
        {step === 2 && (
          <Card className="glass-panel p-8 border-none m3-rounded-xl text-white">
            <h2 className="text-xl font-black uppercase tracking-tight text-gold mb-6 font-display">Select Finishes & Material Quality</h2>
            
            <div className="space-y-5 mb-10">
              {(Object.keys(TIER_PRICING) as Array<keyof typeof TIER_PRICING>).map((tierKey) => (
                <button
                  key={tierKey}
                  onClick={() => setTier(tierKey)}
                  className={`p-6 rounded-[24px] border text-left flex gap-5 items-start transition-all duration-300 w-full ${
                    tier === tierKey 
                      ? "border-accent bg-accent/10 shadow-[0_0_15px_rgba(255,207,51,0.1)]" 
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                    tier === tierKey ? "border-accent bg-accent" : "border-white/40"
                  }`}>
                    {tier === tierKey && <Check className="w-3.5 h-3.5 text-primary stroke-[3]" />}
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-black uppercase tracking-wider text-sm">{TIER_PRICING[tierKey].label}</span>
                      <span className="text-accent font-black text-sm">₹{TIER_PRICING[tierKey].rate} <span className="text-[10px] text-white/50 font-normal">/ sqft</span></span>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed">{TIER_PRICING[tierKey].desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-12">
              <Button onClick={handlePrev} variant="outline" className="rounded-full px-8 h-12 font-black uppercase tracking-wider border-white/20 text-white bg-transparent hover:border-accent hover:text-accent">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleNext} className="rounded-full px-8 h-12 font-black uppercase tracking-wider bg-accent hover:bg-accent/90 text-primary">
                Next: Upgrades
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* --- STEP 3: DYNAMIC CHECKLIST --- */}
        {step === 3 && (
          <Card className="glass-panel p-8 border-none m3-rounded-xl text-white">
            <h2 className="text-xl font-black uppercase tracking-tight text-gold mb-2 font-display">Custom Work Checklist</h2>
            <p className="text-white/55 text-xs mb-8">Customize your interior setup by toggling individual items. Standard items are pre-selected. Click categories to expand.</p>

            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 mb-8 border border-white/5 rounded-2xl p-2 bg-white/[0.01]">
              {ITEM_CATEGORIES.map((category) => {
                const isExpanded = expandedCategory === category.id;
                const categorySelectedCount = category.items.filter(item => selectedItems.includes(item.id)).length;
                
                let multiplier = 1;
                if (category.id === "bedroom") {
                  multiplier = bhk === "1-room" ? 1 : bhk === "2bhk" ? 2 : bhk === "3bhk" ? 3 : bedrooms;
                } else if (category.id === "bathroom") {
                  multiplier = bhk === "1-room" ? 1 : bhk === "2bhk" ? 2 : bhk === "3bhk" ? 2 : bathrooms;
                } else if (category.id === "kitchen" && bhk === "customized") {
                  multiplier = kitchens;
                }

                const categoryCost = category.items
                  .filter(item => selectedItems.includes(item.id))
                  .reduce((sum, item) => sum + (item.price * multiplier), 0);

                return (
                  <div key={category.id} className="border border-white/10 rounded-[20px] overflow-hidden bg-white/[0.01]">
                    {/* Header */}
                    <button
                      type="button"
                      onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                    >
                      <div>
                        <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
                          {category.title}
                          {multiplier > 1 && <span className="text-[9px] bg-accent/10 border border-accent/20 text-accent font-black px-2 py-0.5 rounded-full uppercase">x{multiplier} rooms scale</span>}
                        </h3>
                        <p className="text-[9px] text-white/50 font-bold uppercase tracking-widest mt-1">
                          {categorySelectedCount} of {category.items.length} items active
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-accent">₹{categoryCost.toLocaleString("en-IN")}</span>
                        <span className="text-[10px] text-white/40">{isExpanded ? "▲" : "▼"}</span>
                      </div>
                    </button>

                    {/* Content List */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 border-t border-white/5 bg-[#051124]/30">
                        {/* Quick controls */}
                        <div className="flex gap-4 mb-3.5 text-[9px] font-black uppercase tracking-widest text-accent">
                          <button 
                            type="button" 
                            onClick={() => {
                              const ids = category.items.map(i => i.id);
                              setSelectedItems(prev => Array.from(new Set([...prev, ...ids])));
                            }}
                            className="hover:underline"
                          >
                            ✓ Select All
                          </button>
                          <span className="text-white/25">|</span>
                          <button 
                            type="button" 
                            onClick={() => {
                              const ids = category.items.map(i => i.id);
                              setSelectedItems(prev => prev.filter(id => !ids.includes(id)));
                            }}
                            className="hover:underline"
                          >
                            ✗ Clear All
                          </button>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {category.items.map((item) => {
                            const isChecked = selectedItems.includes(item.id);
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  if (isChecked) {
                                    setSelectedItems(prev => prev.filter(id => id !== item.id));
                                  } else {
                                    setSelectedItems(prev => [...prev, item.id]);
                                  }
                                }}
                                className={`p-3.5 rounded-[14px] border text-left flex gap-3 items-center transition-all duration-300 ${
                                  isChecked 
                                    ? "border-accent bg-accent/5 text-white" 
                                    : "border-white/5 bg-white/[0.01] hover:bg-white/5 text-white/70"
                                }`}
                              >
                                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${isChecked ? "border-accent bg-accent" : "border-white/40"}`}>
                                  {isChecked && <Check className="w-2.5 h-2.5 text-primary stroke-[3]" />}
                                </div>
                                <div className="flex-1 flex justify-between items-center text-[11px]">
                                  <span className="font-bold">{item.label}</span>
                                  <span className="text-accent font-black shrink-0 ml-2">₹{item.price.toLocaleString("en-IN")}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between mt-10">
              <Button onClick={handlePrev} variant="outline" className="rounded-full px-8 h-12 font-black uppercase tracking-wider border-white/20 text-white bg-transparent hover:border-accent hover:text-accent">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleNext} className="rounded-full px-8 h-12 font-black uppercase tracking-wider bg-accent hover:bg-accent/90 text-primary">
                Next: View Estimate
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* --- STEP 4: ESTIMATE & BOQ BREAKDOWN --- */}
        {step === 4 && (
          <div className="space-y-8 animate-fade-up">
            <Card className="glass-panel p-8 border-none m3-rounded-xl text-white relative overflow-hidden">
              {/* Radial gradient backing */}
              <div className="absolute inset-0 bg-logo-radial opacity-45 -z-10"></div>
              
              <div className="text-center py-6">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent mb-2">Estimated Grand Total</p>
                <h2 className="text-5xl md:text-7xl font-black text-white leading-none">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </h2>
                <p className="text-white/50 text-xs mt-3 uppercase tracking-wider font-semibold">Includes 18% GST (Materials + Labor Contract)</p>
                
                <div className="flex justify-center gap-6 mt-6 border-y border-white/10 py-4 max-w-md mx-auto">
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase tracking-widest font-bold">Base Cost</span>
                    <span className="text-base font-black">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="w-px bg-white/10 h-8 self-center"></div>
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase tracking-widest font-bold">Taxes (18%)</span>
                    <span className="text-base font-black">₹{gst.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Bill of Quantities (BOQ) Breakdown */}
            <Card className="glass-panel p-8 border-none m3-rounded-xl text-white animate-fade-in">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <h3 className="text-lg font-black uppercase tracking-tight text-gold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" />
                  Bill of Quantities (BOQ)
                </h3>
                <Badge className="bg-white/10 text-white font-bold">{tier.toUpperCase()}</Badge>
              </div>

              <div className="space-y-5 text-sm font-semibold">
                {/* 1. Base civil structure planning */}
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <div>
                    <span className="block font-black text-white/95 uppercase tracking-wider text-xs">Architectural Carpet Area Fitouts</span>
                    <span className="text-xs text-white/50">{area} sqft @ ₹{baseRate}/sqft (Supervision & General Civil Contract)</span>
                  </div>
                  <span className="font-black text-white">₹{areaCost.toLocaleString("en-IN")}</span>
                </div>

                {/* 2. Custom selected items category-wise */}
                {ITEM_CATEGORIES.map((category) => {
                  let multiplier = 1;
                  if (category.id === "bedroom") {
                    multiplier = bhk === "1-room" ? 1 : bhk === "2bhk" ? 2 : bhk === "3bhk" ? 3 : bedrooms;
                  } else if (category.id === "bathroom") {
                    multiplier = bhk === "1-room" ? 1 : bhk === "2bhk" ? 2 : bhk === "3bhk" ? 2 : bathrooms;
                  } else if (category.id === "kitchen" && bhk === "customized") {
                    multiplier = kitchens;
                  }

                  const activeItems = category.items.filter(item => selectedItems.includes(item.id));
                  const categoryCost = activeItems.reduce((sum, item) => sum + (item.price * multiplier), 0);

                  if (categoryCost === 0) return null;

                  return (
                    <div key={category.id} className="py-3 border-b border-white/5 space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="block font-black text-white/90 uppercase tracking-wider text-xs">{category.title}</span>
                          <span className="text-[10px] text-white/40">
                            {activeItems.length} items active {multiplier > 1 && `• x${multiplier} rooms scale`}
                          </span>
                        </div>
                        <span className="font-black text-white">₹{categoryCost.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="pl-3 space-y-1.5 text-xs text-white/60 font-medium border-l-2 border-accent/20">
                        {activeItems.map(item => (
                          <div key={item.id} className="flex justify-between">
                            <span>• {item.label}</span>
                            <span>₹{(item.price * multiplier).toLocaleString("en-IN")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* 3. Subtotal */}
                <div className="flex justify-between items-center pt-4 text-base font-black text-gold">
                  <span>Net Estimated Cost</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </Card>

            {/* Lock estimate contact form */}
            <Card className="glass-panel p-8 border-none m3-rounded-xl text-white border border-accent/20">
              <h3 className="text-lg font-black uppercase tracking-tight text-gold mb-4 text-center font-display">Lock in This Price</h3>
              <p className="text-xs text-white/50 text-center max-w-sm mx-auto mb-8">Pricing depends on raw material indices. Lock in your current estimate range and book a free virtual site visit.</p>

              <form onSubmit={handleFormSubmit} className="space-y-4 max-w-md mx-auto">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/60">Full Name</label>
                    <Input 
                      type="text" 
                      placeholder="Akash Kumar" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      required 
                      className="bg-[#051124] border-white/10 text-white rounded-xl focus:border-accent h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/60">Phone Number</label>
                    <Input 
                      type="tel" 
                      placeholder="+91 96319 80881" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                      required 
                      className="bg-[#051124] border-white/10 text-white rounded-xl focus:border-accent h-11"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/60">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="akash@gmail.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#051124] border-white/10 text-white rounded-xl focus:border-accent h-11 w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/60">Select Galaxy Studio Location</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {["Godda", "Ranchi", "Bhagalpur", "Banka", "Deoghar", "Hazaribagh", "Dumka", "Kishanganj", "Purnea"].map((loc) => (
                      <button
                        type="button"
                        key={loc}
                        onClick={() => setCity(loc)}
                        className={`py-2.5 px-3 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
                          city === loc
                            ? "border-accent bg-accent/15 text-white shadow-[0_0_10px_rgba(255,207,51,0.15)] scale-[1.02]"
                            : "border-white/10 bg-[#051124]/30 text-white/60 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full rounded-full h-12 font-black uppercase tracking-wider bg-accent hover:bg-accent/90 text-primary mt-6">
                  Submit & Request Consultation
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </form>
            </Card>

            <div className="flex justify-start">
              <Button onClick={handlePrev} variant="outline" className="rounded-full px-8 h-12 font-black uppercase tracking-wider border-white/20 text-white bg-transparent hover:border-accent hover:text-accent">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Adjust Selections
              </Button>
            </div>
          </div>
        )}

        {/* --- STEP 5: SUCCESS SUBMISSION --- */}
        {step === 5 && (
          <Card className="glass-panel p-10 border-none m3-rounded-xl text-center text-white border border-emerald-400/20 max-w-xl mx-auto animate-fade-up">
            <div className="bg-emerald-400/10 text-emerald-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-400/20">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>
            
            <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-4">Estimate Locked!</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Thank you, **{name}**. We have successfully locked in your custom interior design estimate of **₹{grandTotal.toLocaleString("en-IN")}** for your **{area} sqft** project in **{city}**.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left mb-8 text-xs space-y-2">
              <p className="flex justify-between"><span>Name:</span> <span className="font-bold text-white">{name}</span></p>
              <p className="flex justify-between"><span>Phone:</span> <span className="font-bold text-white">{phone}</span></p>
              <p className="flex justify-between"><span>Locked Pricing:</span> <span className="font-black text-accent">₹{grandTotal.toLocaleString("en-IN")}</span></p>
              <p className="flex justify-between"><span>Assigned Studio:</span> <span className="font-bold text-white">{city} Office</span></p>
            </div>

            <p className="text-white/40 text-xs mb-8">One of our Lead Interior Architects from the {city} studio will contact you within 24 business hours to share details and schedule a free site mapping.</p>

            <div className="flex justify-center gap-4">
              <Button asChild className="rounded-full px-8 h-12 font-black uppercase tracking-wider bg-accent hover:bg-accent/90 text-primary">
                <Link href="/services/interior-projects">Browse Packages</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8 h-12 font-black uppercase tracking-wider border-white/20 text-white bg-transparent hover:border-accent hover:text-accent">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
