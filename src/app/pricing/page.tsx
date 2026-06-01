"use client";

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Check, Phone, Mail, MapPin, Users, Award, Clock, FileText, Info, ChevronRight, 
  Activity, ShieldCheck, HelpCircle, Sparkles, Loader2, X, Calculator, Layers,
  ArrowRight, Sofa, Building, LayoutGrid, CheckCircle2, ChevronLeft, DollarSign
} from 'lucide-react';
import Link from 'next/link';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Exact rates from the flyer brochure
const PRICING_DATA = {
  residential: {
    '2d_planning': {
      label: '2D Planning',
      description: 'Includes: Floor Plan with Dimensions, Furniture Layout Plan, Door & Window Detail Plan, Electrical Layout (Switch + Light Points), Plumbing Layout (Bathroom + Kitchen), Basic Vastu Planning',
      tiers: [
        { name: 'Basic', rate: 5, unit: 'sq.ft' },
        { name: 'Standard', rate: 8, unit: 'sq.ft' },
        { name: 'Premium', rate: 12, unit: 'sq.ft' }
      ]
    },
    '3d_elevation': {
      label: '3D Elevation (Front Design)',
      description: 'Includes: 3D Front Elevation (Day View), 3D Night View (Lighting Effect), 2-3 Color Options, Material Concept (Tiles / Paint / Texture)',
      tiers: [
        { name: 'Simple', rate: 20, unit: 'sq.ft' },
        { name: 'Modern', rate: 30, unit: 'sq.ft' },
        { name: 'Luxury', rate: 40, unit: 'sq.ft' }
      ]
    },
    '3d_interior': {
      label: '3D Interior Design',
      description: 'Includes: 3D Views (Bedroom, Hall, Kitchen etc.), Furniture Layout Plan, False Ceiling Design Drawing, Lighting Layout Plan, Color Theme & Concept Sheet, Material Suggestion (Laminate, Tiles, Paint)',
      tiers: [
        { name: 'Basic', rate: 30, unit: 'sq.ft' },
        { name: 'Standard', rate: 50, unit: 'sq.ft' },
        { name: 'Premium', rate: 80, unit: 'sq.ft' }
      ]
    },
    'full_package': {
      label: 'Residential Full Package',
      description: 'COMPLETE DRAWINGS SET: All 2D Drawings, Working Drawings for Execution, 3D Elevation, Material Specification Sheet, Full Interior 3D',
      tiers: [
        { name: 'Basic', rate: 70, unit: 'sq.ft' },
        { name: 'Standard', rate: 85, unit: 'sq.ft' },
        { name: 'Premium', rate: 100, unit: 'sq.ft' }
      ]
    }
  },
  commercial: {
    '2d_planning': {
      label: '2D Planning (Commercial)',
      description: 'Includes: Layout Plan (Shop / Office), Furniture / Workstation Layout, Customer Flow Planning, Electrical + Lighting Plan, Fire Safety Basic Layout, Display / Counter Placement',
      tiers: [
        { name: 'Basic', rate: 8, unit: 'sq.ft' },
        { name: 'Standard', rate: 12, unit: 'sq.ft' },
        { name: 'Premium', rate: 18, unit: 'sq.ft' }
      ]
    },
    '3d_elevation': {
      label: '3D Elevation (Commercial)',
      description: 'Includes: 3D Front Design, Branding / Signage Placement, Day + Night View, Glass / ACP / Cladding Design',
      tiers: [
        { name: 'Basic', rate: 30, unit: 'sq.ft' },
        { name: 'Modern', rate: 40, unit: 'sq.ft' },
        { name: 'Luxury', rate: 60, unit: 'sq.ft' }
      ]
    },
    '3d_interior': {
      label: '3D Interior (Commercial)',
      description: 'Includes: 3D Interior Views (Shop / Office), Display Unit Design, Ceiling + Lighting Plan, Branding Placement Design, Furniture Layout Plan, Material Specification',
      tiers: [
        { name: 'Basic', rate: 50, unit: 'sq.ft' },
        { name: 'Standard', rate: 80, unit: 'sq.ft' },
        { name: 'Premium', rate: 120, unit: 'sq.ft' }
      ]
    }
  },
  extra_services: {
    '3d_walkthrough': {
      label: '3D Walkthrough',
      description: 'Immersive virtual tour of the layout',
      tiers: [
        { name: 'Basic Walkthrough', rate: 5000 },
        { name: 'Standard Walkthrough', rate: 15000 },
        { name: 'Premium Walkthrough', rate: 25000 }
      ]
    },
    'online_consultation': {
      label: 'Online Consultation',
      description: 'Live virtual consult with senior design architect',
      tiers: [
        { name: 'Basic Session', rate: 500 },
        { name: 'Standard Session', rate: 1000 },
        { name: 'Premium Session', rate: 1500 }
      ]
    }
  },
  site_visits: [
    { range: '0 - 25 KM', price: 1000 },
    { range: '25 - 50 KM', price: 2000 },
    { range: '50 - 75 KM', price: 3000 },
    { range: '75 - 100 KM', price: 4000 }
  ]
};

// Existing supervision packages
const supervisionPackages = [
  {
    name: "Basic Supervision Package",
    price: "9,999",
    suitableFor: "Suitable for Projects up to 1000 Sqft",
    features: [
      "6 Site Visits",
      "Basic Site Layout Support",
      "Contractor Coordination Support",
      "Site Calling Support",
      "Basic Construction Guidance",
      "Work Progress Checking",
      "Elevation Work Support"
    ],
    benefits: [
      "Affordable professional support",
      "Better contractor coordination",
      "Saves client time during construction",
      "Regular professional site monitoring",
      "Smooth basic construction management",
      "Reduces basic construction mistakes"
    ],
    tag: null,
    slug: "basic"
  },
  {
    name: "Standard Supervision Package",
    price: "17,999",
    suitableFor: "Suitable for Projects from 1000 – 1800 Sqft",
    features: [
      "10 Site Visits",
      "Site Layout Support",
      "Material Guidance",
      "Labour Coordination",
      "Site Coordination Support",
      "Work Progress Monitoring",
      "Basic Execution Guidance",
      "Elevation Work Support",
      "Client Coordination Support"
    ],
    benefits: [
      "Better material & labour management",
      "Smooth and organized construction",
      "Regular professional monitoring",
      "Reduces unnecessary expenses",
      "Faster coordination between client & contractor",
      "Better work quality control",
      "Saves client time and effort",
      "Professional construction support"
    ],
    tag: "BEST VALUE",
    slug: "standard"
  },
  {
    name: "Premium Supervision Package",
    price: "29,999",
    suitableFor: "Suitable for Projects above 1800 Sqft",
    features: [
      "15 Site Visits",
      "Complete Site Layout",
      "Daily Site Coordination",
      "Material Planning",
      "Execution Monitoring",
      "Client Update Support",
      "Contractor & Labour Management",
      "Work Quality Monitoring",
      "Finishing Supervision",
      "Elevation Work Support"
    ],
    benefits: [
      "Stress-free construction handling",
      "Better finishing & quality control",
      "Faster and smoother execution",
      "Regular updates and transparency",
      "Professional construction management support",
      "Better project monitoring & coordination",
      "Saves client effort and valuable time",
      "Smooth execution from start to finishing"
    ],
    tag: "PREMIUM CHOICE",
    slug: "premium"
  },
  {
    name: "Custom / Large Project",
    price: "Custom",
    suitableFor: "For Commercial, Malls & Large Buildings",
    features: [
      "Custom Site Visits (Unlimited/Needed)",
      "Bespoke 3D & VR Spatial Blueprinting",
      "Dedicated Civil Engineer & Lead Architect",
      "Full Material Procurement & Audit Support",
      "Sub-contractor Spacing & Labour Management",
      "Rigorous Material Safety Inspections",
      "Complete Turnkey Corporate Execution"
    ],
    benefits: [
      "Fully customized design parameters",
      "Direct oversight by Lead Architect Sameer Ahmed",
      "Material testing, reports & full logs",
      "100% transparency & milestone tracking",
      "Tailor-made budget optimization planning"
    ],
    tag: "CUSTOM SETUP",
    slug: "custom",
    isCustom: true
  }
];

const whyChooseItems = [
  { title: "Professional Site Management", icon: Activity },
  { title: "Expert Planning & Coordination", icon: FileText },
  { title: "Smooth Construction Execution", icon: ShieldCheck },
  { title: "Better Labour & Material Management", icon: Users },
  { title: "Time-Saving Professional Support", icon: Clock },
  { title: "Trusted Construction Guidance", icon: Award },
  { title: "Customized Packages Available", icon: HelpCircle }
];

// Bespoke Estimator Constants
const BESPOKE_TIER_PRICING = {
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

const BESPOKE_BHK_DEFAULTS = {
  "1-room": { area: 450, label: "1 Room / Studio" },
  "2bhk": { area: 950, label: "2 BHK Layout" },
  "3bhk": { area: 1450, label: "3 BHK Layout" },
  "customized": { area: 1200, label: "Custom Layout" }
};

const BESPOKE_ITEM_CATEGORIES = [
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

function BespokeEstimator() {
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
  const [submitting, setSubmitting] = useState(false);

  // Parse type slug search params if navigated from elsewhere
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get('type');
      if (typeParam === '1-room' || typeParam === '2bhk' || typeParam === '3bhk' || typeParam === 'customized') {
        setBhk(typeParam as any);
      }
    }
  }, []);

  // Dynamic initialization of Area & defaults on BHK change
  useEffect(() => {
    setArea(BESPOKE_BHK_DEFAULTS[bhk].area);
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
    const defaultIds = BESPOKE_ITEM_CATEGORIES
      .filter(cat => cat.id !== "flooring")
      .flatMap(cat => cat.items.map(item => item.id));
    setSelectedItems(defaultIds);
  }, [bhk]);

  // Pricing math calculations
  const baseRate = BESPOKE_TIER_PRICING[tier].rate;
  const areaCost = area * baseRate;
  
  // Sum of custom selected items with scaling multipliers
  const itemsCost = selectedItems.reduce((sum, id) => {
    let item = null;
    let categoryId = "";
    for (const cat of BESPOKE_ITEM_CATEGORIES) {
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
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitting(true);
    try {
      // Sync detailed custom BOQ lead to Firestore
      await addDoc(collection(db, "quick_enquiries"), {
        clientName: name,
        mobileNumber: phone,
        address: city,
        projectType: `Bespoke Interior (${bhk.toUpperCase()})`,
        areaSize: `${area} Sqft`,
        projectLocation: city,
        packageName: "Bespoke Interior Estimate",
        packageSlug: "bespoke-interior-estimate",
        calculatorData: {
          bhk,
          area,
          tier,
          bedrooms,
          bathrooms,
          kitchens,
          selectedItems,
          grandTotal
        },
        totalPrice: grandTotal,
        createdAt: serverTimestamp()
      });

      setSubmitted(true);
      setStep(5);
    } catch (err) {
      console.error("Firestore sync error:", err);
      // Fallback
      setSubmitted(true);
      setStep(5);
    } finally {
      setSubmitting(false);
    }
  };

  const getBespokeWhatsAppMessage = () => {
    let msg = `*GALAXY INTERIOR - Custom Bespoke Estimate Request*\n`;
    msg += `-------------------------------------------\n`;
    msg += `*Layout:* ${BESPOKE_BHK_DEFAULTS[bhk].label}\n`;
    msg += `*Finish Class:* ${BESPOKE_TIER_PRICING[tier].label}\n`;
    msg += `*Supervision Area:* ${area} Sq.ft\n\n`;
    msg += `*TOTAL BESPOKE ESTIMATE: ₹${grandTotal.toLocaleString('en-IN')}/-*\n`;
    msg += `-------------------------------------------\n`;
    msg += `Please connect me with a coordinator to audit this custom BOQ.`;
    return msg;
  };

  return (
    <div className="text-white space-y-6">
      {/* Dynamic Step Header */}
      <div className="text-center mb-10">
        <Badge className="mb-4 rounded-full bg-accent text-primary font-black tracking-widest px-4 py-1 text-[10px] uppercase border-none shadow-md">
          Step {step} of 4: {step === 1 && "Configuration"} {step === 2 && "Quality & Finish"} {step === 3 && "Add-ons Checklist"} {step === 4 && "Final BOQ Estimate"} {step === 5 && "Consultation Locked"}
        </Badge>
        <h2 className="font-display text-2xl md:text-4xl font-black uppercase tracking-tight text-white leading-none">
          {step === 1 && "Configure Your Space"}
          {step === 2 && "Select Finish Standard"}
          {step === 3 && "Include Luxury Upgrades"}
          {step === 4 && "Your Estimated BOQ"}
          {step === 5 && "Estimate Locked Successfully"}
        </h2>
        <div className="w-20 h-1 bg-accent mx-auto mt-4 rounded-full mb-6"></div>
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
        <Card className="glass-card p-6 md:p-8 border-none rounded-[32px] text-white">
          <h3 className="text-xl font-black uppercase tracking-tight text-gold mb-6 font-sans">Select Configuration & Dimensions</h3>
          
          {/* BHK Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {(Object.keys(BESPOKE_BHK_DEFAULTS) as Array<keyof typeof BESPOKE_BHK_DEFAULTS>).map((type) => (
              <button
                key={type}
                onClick={() => setBhk(type)}
                className={`p-5 rounded-[20px] border flex flex-col items-center text-center transition-all duration-300 ${
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
                <span className="text-xs font-black uppercase tracking-wider">{BESPOKE_BHK_DEFAULTS[type].label}</span>
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
        <Card className="glass-card p-6 md:p-8 border-none rounded-[32px] text-white">
          <h3 className="text-xl font-black uppercase tracking-tight text-gold mb-6 font-sans">Select Finishes & Material Quality</h3>
          
          <div className="space-y-5 mb-10">
            {(Object.keys(BESPOKE_TIER_PRICING) as Array<keyof typeof BESPOKE_TIER_PRICING>).map((tierKey) => (
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
                    <span className="font-black uppercase tracking-wider text-sm">{BESPOKE_TIER_PRICING[tierKey].label}</span>
                    <span className="text-accent font-black text-sm">₹{BESPOKE_TIER_PRICING[tierKey].rate} <span className="text-[10px] text-white/50 font-normal">/ sqft</span></span>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed">{BESPOKE_TIER_PRICING[tierKey].desc}</p>
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
        <Card className="glass-card p-6 md:p-8 border-none rounded-[32px] text-white">
          <h3 className="text-xl font-black uppercase tracking-tight text-gold mb-2 font-sans">Custom Work Checklist</h3>
          <p className="text-white/55 text-xs mb-8">Customize your interior setup by toggling individual items. Standard items are pre-selected. Click categories to expand.</p>

          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 mb-8 border border-white/5 rounded-2xl p-2 bg-white/[0.01]">
            {BESPOKE_ITEM_CATEGORIES.map((category) => {
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
                      <h4 className="font-bold text-xs uppercase tracking-wider text-white flex flex-wrap items-center gap-2">
                        {category.title}
                        {multiplier > 1 && <span className="text-[9px] bg-accent/10 border border-accent/20 text-accent font-black px-2 py-0.5 rounded-full uppercase">x{multiplier} rooms scale</span>}
                      </h4>
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
          <Card className="glass-card p-6 md:p-8 border-none rounded-[32px] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-logo-radial opacity-45 -z-10"></div>
            
            <div className="text-center py-6">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent mb-2">Estimated Grand Total</p>
              <h3 className="text-5xl md:text-7xl font-black text-white leading-none animate-pulse">
                ₹{grandTotal.toLocaleString("en-IN")}
              </h3>
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
          <Card className="glass-card p-6 md:p-8 border-none rounded-[32px] text-white animate-fade-in">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <h4 className="text-lg font-black uppercase tracking-tight text-gold flex items-center gap-2 font-sans">
                <FileText className="w-5 h-5 text-accent" />
                Bill of Quantities (BOQ)
              </h4>
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
              {BESPOKE_ITEM_CATEGORIES.map((category) => {
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
          <Card className="glass-card p-6 md:p-8 border-none rounded-[32px] text-white border border-accent/20">
            <h4 className="text-lg font-black uppercase tracking-tight text-gold mb-4 text-center font-sans">Lock in This Price</h4>
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

              <Button type="submit" disabled={submitting} className="w-full rounded-full h-12 font-black uppercase tracking-wider bg-accent hover:bg-accent/90 text-primary mt-6 flex items-center justify-center gap-2">
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Locking Estimate...
                  </>
                ) : (
                  <>
                    Submit & Request Consultation
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
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
        <Card className="glass-card p-10 border-none rounded-[32px] text-center text-white border border-emerald-400/20 max-w-xl mx-auto animate-fade-up">
          <div className="bg-emerald-400/10 text-emerald-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-400/20">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>
          
          <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-4">Estimate Locked!</h3>
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

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="rounded-full px-8 h-12 font-black uppercase tracking-wider bg-accent hover:bg-accent/90 text-primary">
              <a 
                href={`https://wa.me/919631980881?text=${encodeURIComponent(getBespokeWhatsAppMessage())}`}
                target="_blank" 
                rel="noopener noreferrer"
              >
                Discuss on WhatsApp
              </a>
            </Button>
            <Button onClick={() => setStep(1)} variant="outline" className="rounded-full px-8 h-12 font-black uppercase tracking-wider border-white/20 text-white bg-transparent hover:border-accent hover:text-accent">
              Calculate Again
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

export default function PricingPage() {
  // Page Tab Controller
  const [activeTab, setActiveTab] = useState<'calculator' | 'packages' | 'interior-estimate'>('calculator');

  // Sync tab param if provided via query string
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      const typeParam = params.get('type');
      if (tabParam === 'interior-estimate' || typeParam) {
        setActiveTab('interior-estimate');
      }
    }
  }, []);

  // Calculator State
  const [category, setCategory] = useState<'residential' | 'commercial'>('residential');
  const [area, setArea] = useState<number>(1200);
  
  // Track services & chosen tiers
  const [services, setServices] = useState<Record<string, { checked: boolean; tier: number }>>({
    '2d_planning': { checked: true, tier: 1 }, // index of tier: 0=Basic, 1=Standard, 2=Premium
    '3d_elevation': { checked: false, tier: 1 },
    '3d_interior': { checked: false, tier: 1 },
    'full_package': { checked: false, tier: 1 }
  });

  // Site visits distance index
  const [distanceIdx, setDistanceIdx] = useState<number>(0); // 0 = 0-25 KM, etc.

  // Optional Extra Toggles
  const [walkthrough, setWalkthrough] = useState<boolean>(false);
  const [walkthroughTier, setWalkthroughTier] = useState<number>(1); // 0=Basic, 1=Standard, 2=Premium
  
  const [consultation, setConsultation] = useState<boolean>(false);
  const [consultationTier, setConsultationTier] = useState<number>(1); // 0=Basic, 1=Standard, 2=Premium

  // Extra Site Guidance Add-ons
  const [contractorGuidance, setContractorGuidance] = useState<boolean>(false);
  const [materialSupport, setMaterialSupport] = useState<boolean>(false);

  // Enquiry Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enquiryPkg, setEnquiryPkg] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [enquiryData, setEnquiryData] = useState({
    name: '',
    mobile: '',
    address: '',
    projectType: '',
    areaSize: '',
    projectLocation: ''
  });

  // Calculations Logic
  const calculateTotal = () => {
    let subtotal = 0;
    const items: Array<{ name: string; cost: number; desc: string }> = [];

    const activeServices = category === 'residential' ? PRICING_DATA.residential : PRICING_DATA.commercial;

    // Check if full package is selected for residential
    const isFullPackage = category === 'residential' && services['full_package']?.checked;

    if (isFullPackage) {
      // Full package overrides individual service items
      const tierObj = PRICING_DATA.residential.full_package.tiers[services['full_package'].tier];
      const rate = tierObj.rate;
      const cost = rate * area;
      subtotal += cost;
      items.push({
        name: `Residential Full Package (${tierObj.name})`,
        cost: cost,
        desc: `₹${rate}/sq.ft × ${area} sq.ft`
      });
    } else {
      // Add individual services
      Object.entries(services).forEach(([key, val]) => {
        if (key === 'full_package') return; // skip full package
        if (val.checked && activeServices[key as keyof typeof activeServices]) {
          const serviceObj = activeServices[key as keyof typeof activeServices];
          const tierObj = serviceObj.tiers[val.tier];
          const rate = tierObj.rate;
          const cost = rate * area;
          subtotal += cost;
          items.push({
            name: `${serviceObj.label} (${tierObj.name})`,
            cost: cost,
            desc: `₹${rate}/sq.ft × ${area} sq.ft`
          });
        }
      });
    }

    // Site visit charges
    const visitObj = PRICING_DATA.site_visits[distanceIdx];
    subtotal += visitObj.price;
    items.push({
      name: `Site Visit Charges (${visitObj.range})`,
      cost: visitObj.price,
      desc: `Distance premium rates (with car)`
    });

    // Extra Services Add-ons
    if (walkthrough) {
      const walkObj = PRICING_DATA.extra_services['3d_walkthrough'].tiers[walkthroughTier];
      subtotal += walkObj.rate;
      items.push({
        name: `3D Walkthrough (${walkObj.name})`,
        cost: walkObj.rate,
        desc: `Interactive spatial visualization walkthrough`
      });
    }

    if (consultation) {
      const consObj = PRICING_DATA.extra_services['online_consultation'].tiers[consultationTier];
      subtotal += consObj.rate;
      items.push({
        name: `Online Consultation (${consObj.name})`,
        cost: consObj.rate,
        desc: `Virtual design guidance sessions`
      });
    }

    // Guidance Support switches
    if (contractorGuidance) {
      // Free in Premium Tiers, else ₹5,000 flat
      const isPremiumTier = Object.values(services).some(s => s.checked && s.tier === 2) || (isFullPackage && services['full_package'].tier === 2);
      const price = isPremiumTier ? 0 : 5000;
      subtotal += price;
      items.push({
        name: "Contractor Guidance Support",
        cost: price,
        desc: price === 0 ? "Included with Premium Tier" : "Execution guidance flat charge"
      });
    }

    if (materialSupport) {
      subtotal += 3000;
      items.push({
        name: "Material Selection Support",
        cost: 3000,
        desc: "Designated procurement checklist audit support"
      });
    }

    return { total: subtotal, items };
  };

  const { total: calculatedTotal, items: calculatedItems } = calculateTotal();

  // Reset services toggle based on category selection
  useEffect(() => {
    if (category === 'commercial') {
      setServices(prev => ({
        ...prev,
        'full_package': { checked: false, tier: 1 }
      }));
    }
  }, [category]);

  const handleServiceChecked = (key: string, checked: boolean) => {
    setServices(prev => {
      const copy = { ...prev };
      
      if (key === 'full_package' && checked) {
        // Uncheck others if Full Package is checked
        copy['2d_planning'].checked = false;
        copy['3d_elevation'].checked = false;
        copy['3d_interior'].checked = false;
        copy['full_package'].checked = true;
      } else if (key !== 'full_package' && checked) {
        // Uncheck Full Package if other items checked
        copy['full_package'].checked = false;
        copy[key].checked = true;
      } else {
        copy[key].checked = checked;
      }
      
      return copy;
    });
  };

  const handleServiceTier = (key: string, tierIndex: number) => {
    setServices(prev => ({
      ...prev,
      [key]: { ...prev[key], tier: tierIndex }
    }));
  };

  // Compile detailed WhatsApp quote message
  const getWhatsAppMessage = () => {
    const activeText = category === 'residential' ? 'Residential Space' : 'Commercial Space';
    
    let msg = `*GALAXY INTERIOR - Interactive Estimate Request*\n`;
    msg += `-------------------------------------------\n`;
    msg += `*Category:* ${activeText}\n`;
    msg += `*Plot Area:* ${area} Sq.ft\n\n`;
    msg += `*Services Cost Breakdown:*\n`;

    calculatedItems.forEach(item => {
      msg += `• *${item.name}*: ₹${item.cost.toLocaleString('en-IN')}/- (${item.desc})\n`;
    });

    msg += `\n*TOTAL ESTIMATED COST: ₹${calculatedTotal.toLocaleString('en-IN')}/*`;
    msg += `\n-------------------------------------------\n`;
    msg += `Please connect me with a project coordinator to review this calculation.`;

    return msg;
  };

  // Onboarding Redirection Package Saving
  const handleProceedOnboarding = () => {
    const activeText = category === 'residential' ? 'Residential House' : 'Commercial Office/Shop';
    const stateObj = {
      category,
      area,
      services,
      distance: PRICING_DATA.site_visits[distanceIdx].range,
      walkthrough,
      walkthroughTier,
      consultation,
      consultationTier,
      contractorGuidance,
      materialSupport,
      totalPrice: calculatedTotal,
      projectType: activeText,
      items: calculatedItems
    };

    localStorage.setItem('galaxy_calculator_state', JSON.stringify(stateObj));
  };

  // Modal open helpers
  const handleOpenEnquiryModal = (pkg: any) => {
    setErrorMsg('');
    setEnquiryPkg(pkg);
    
    if (pkg.isCalculator) {
      setEnquiryData({
        name: '',
        mobile: '',
        address: '',
        projectType: category === 'residential' ? 'Residential Project' : 'Commercial Project',
        areaSize: `${area} Sqft`,
        projectLocation: ''
      });
    } else {
      setEnquiryData({
        name: '',
        mobile: '',
        address: '',
        projectType: pkg.isCustom ? 'Commercial Building' : pkg.slug === 'basic' ? 'Residential House' : 'Residential Duplex',
        areaSize: pkg.slug === 'basic' ? '1000 Sqft' : pkg.slug === 'standard' ? '1500 Sqft' : '2000 Sqft',
        projectLocation: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEnquiryPkg(null);
  };

  const handleEnquiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnquiryData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEnquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!enquiryData.name || !enquiryData.mobile || !enquiryData.address || !enquiryData.projectType || !enquiryData.areaSize || !enquiryData.projectLocation) {
      setErrorMsg('Please fill in all Client Details.');
      return;
    }

    setLoading(true);

    try {
      const detailedPayload = enquiryPkg.isCalculator ? {
        category: category,
        area: area,
        services: services,
        distanceRange: PRICING_DATA.site_visits[distanceIdx].range,
        walkthrough,
        consultation,
        contractorGuidance,
        materialSupport,
        breakdownItems: calculatedItems
      } : null;

      // 1. Sync quick enquiry details to Firestore
      await addDoc(collection(db, "quick_enquiries"), {
        clientName: enquiryData.name,
        mobileNumber: enquiryData.mobile,
        address: enquiryData.address,
        projectType: enquiryData.projectType,
        areaSize: enquiryData.areaSize,
        projectLocation: enquiryData.projectLocation,
        packageName: enquiryPkg.name,
        packageSlug: enquiryPkg.slug,
        calculatorData: detailedPayload,
        totalPrice: enquiryPkg.isCalculator ? calculatedTotal : enquiryPkg.price,
        createdAt: serverTimestamp()
      });

      // 2. Open WhatsApp redirection to architectural desk
      let whatsappMsg = '';
      if (enquiryPkg.isCalculator) {
        whatsappMsg = `*GALAXY INTERIOR - Calculator Enquiry Submission*\n`;
        whatsappMsg += `-----------------------------------------\n`;
        whatsappMsg += `I have calculated an estimate using the website pricing portal:\n`;
        whatsappMsg += `- *Client Name:* ${enquiryData.name}\n`;
        whatsappMsg += `- *Mobile:* ${enquiryData.mobile}\n`;
        whatsappMsg += `- *Address:* ${enquiryData.address}\n`;
        whatsappMsg += `- *Project Location:* ${enquiryData.projectLocation}\n`;
        whatsappMsg += `- *Area Size:* ${enquiryData.areaSize}\n`;
        whatsappMsg += `- *Category:* ${category === 'residential' ? 'Residential' : 'Commercial'}\n`;
        whatsappMsg += `- *Total Estimate:* ₹${calculatedTotal.toLocaleString('en-IN')}/-\n\n`;
        whatsappMsg += `*Calculated Services Breakdown:*\n`;
        calculatedItems.forEach(item => {
          whatsappMsg += `• ${item.name}: ₹${item.cost.toLocaleString('en-IN')}/-\n`;
        });
      } else {
        whatsappMsg = `*GALAXY INTERIOR - Quick Package Enquiry*\n`;
        whatsappMsg += `-----------------------------------------\n`;
        whatsappMsg += `I would like to enquire about the *${enquiryPkg.name}*. Here are my client details:\n`;
        whatsappMsg += `- *Name:* ${enquiryData.name}\n`;
        whatsappMsg += `- *Mobile:* ${enquiryData.mobile}\n`;
        whatsappMsg += `- *Address:* ${enquiryData.address}\n`;
        whatsappMsg += `- *Project Type:* ${enquiryData.projectType}\n`;
        whatsappMsg += `- *Area Size:* ${enquiryData.areaSize}\n`;
        whatsappMsg += `- *Project Location:* ${enquiryData.projectLocation}`;
      }

      setTimeout(() => {
        const whatsappUrl = `https://wa.me/919631980881?text=${encodeURIComponent(whatsappMsg)}`;
        window.open(whatsappUrl, '_blank');
        handleCloseModal();
      }, 1200);

    } catch (err: any) {
      console.error(err);
      setErrorMsg('Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#051124] text-white min-h-screen pt-28 pb-16">
      {/* Premium Hero Header */}
      <section className="relative py-16 md:py-24 bg-logo-radial bg-logo-mandala overflow-hidden border-b border-accent/15">
        <div className="absolute inset-0 bg-gradient-to-b from-[#051124]/40 to-[#051124] z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
          <Badge className="mb-6 rounded-full bg-accent text-primary font-black tracking-[0.2em] px-6 py-2 uppercase border-none shadow-lg animate-fade-up">
            OFFICIAL RATE CALCULATOR
          </Badge>
          <h1 className="font-display text-4xl md:text-7xl font-black tracking-tight mb-6 leading-none animate-fade-up text-white font-sans">
            Calculate Your Design <br />
            <span className="text-gold italic">Budget Instantly!</span>
          </h1>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-white/70 font-medium leading-relaxed mb-10 font-sans">
            Use our interactive pricing portal based strictly on the Galaxy Interior official pricing blueprint. 
            Select your architectural needs, customize tiers, and export accurate custom estimates.
          </p>

          {/* Quick Badges (Flyer Header features) */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 max-w-4xl mx-auto mt-12 font-sans">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-md hover:border-accent/30 transition-all">
              <Activity className="h-6 w-6 text-accent mb-2" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/80">Residential & Commercial</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-md hover:border-accent/30 transition-all">
              <Users className="h-6 w-6 text-accent mb-2" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/80">Site Supervision support</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-md hover:border-accent/30 transition-all">
              <ShieldCheck className="h-6 w-6 text-accent mb-2" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/80">Precise Area Calculation</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-md hover:border-accent/30 transition-all">
              <Clock className="h-6 w-6 text-accent mb-2" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/80">100% Transparency Rates</span>
            </div>
            <div className="col-span-2 md:col-span-1 bg-accent/15 border border-accent/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg hover:border-accent transition-all group">
              <Sparkles className="h-6 w-6 text-accent mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-accent">Flyer Blueprint Prices</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Selector Navigation */}
      <section className="pt-12 pb-6">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white/5 p-1.5 rounded-3xl md:rounded-full border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-2 shadow-inner">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`py-3.5 px-6 rounded-2xl md:rounded-full text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                activeTab === 'calculator'
                  ? 'bg-gold-gradient text-primary shadow-md font-black scale-102'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calculator className="h-4 w-4" /> Cost Calculator
            </button>
            <button
              onClick={() => setActiveTab('interior-estimate')}
              className={`py-3.5 px-6 rounded-2xl md:rounded-full text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                activeTab === 'interior-estimate'
                  ? 'bg-gold-gradient text-primary shadow-md font-black scale-102'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="h-4 w-4" /> Bespoke Interior Estimate
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`py-3.5 px-6 rounded-2xl md:rounded-full text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                activeTab === 'packages'
                  ? 'bg-gold-gradient text-primary shadow-md font-black scale-102'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="h-4 w-4" /> Supervision Packages
            </button>
          </div>
        </div>
      </section>

      {/* INTERACTIVE COST CALCULATOR SECTION */}
      {activeTab === 'calculator' && (
        <section className="py-10 animate-fade-in duration-300">
          <div className="container mx-auto px-4 max-w-[95vw] xl:max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form Controls */}
              <div className="lg:col-span-7 space-y-6">
                <Card className="glass-card border-white/10 bg-[#08162b] rounded-[32px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div className="mb-6">
                    <span className="text-[10px] font-black text-accent uppercase tracking-widest">Configuration Desk</span>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider mt-1 font-sans">1. Scope Parameters</h3>
                  </div>

                  <div className="space-y-6">
                    {/* Category Selection Toggle */}
                    <div className="space-y-2.5">
                      <label className="text-[10px] font-black text-white/50 uppercase tracking-widest block font-sans">Project Category / Segment</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setCategory('residential')}
                          className={`py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${
                            category === 'residential' 
                              ? 'bg-accent/15 text-accent border-accent/40 shadow-inner' 
                              : 'border-white/10 text-white/60 bg-white/5 hover:border-accent/40'
                          }`}
                        >
                          🏠 Residential Project
                        </button>
                        <button
                          type="button"
                          onClick={() => setCategory('commercial')}
                          className={`py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${
                            category === 'commercial' 
                              ? 'bg-accent/15 text-accent border-accent/40 shadow-inner' 
                              : 'border-white/10 text-white/60 bg-white/5 hover:border-accent/40'
                          }`}
                        >
                          🏢 Commercial Project
                        </button>
                      </div>
                    </div>

                    {/* Area Slider & Numeric Input */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black text-white/50 uppercase tracking-widest font-sans">Plot / Built-up Area</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={area}
                            onChange={(e) => setArea(Math.max(100, Math.min(10000, Number(e.target.value))))}
                            className="w-24 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-right text-xs font-black text-gold focus:outline-none focus:border-accent"
                          />
                          <span className="text-[10px] font-bold text-white/55">SQ.FT</span>
                        </div>
                      </div>
                      <div className="relative pt-2">
                        <input
                          type="range"
                          min="100"
                          max="10000"
                          step="50"
                          value={area}
                          onChange={(e) => setArea(Number(e.target.value))}
                          className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                        />
                        <div className="flex justify-between text-[9px] text-white/40 font-bold uppercase mt-1">
                          <span>100 sqft</span>
                          <span>5,000 sqft</span>
                          <span>10,000 sqft</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Services Checklist Card */}
                <Card className="glass-card border-white/10 bg-[#08162b] rounded-[32px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
                  <div className="mb-6">
                    <span className="text-[10px] font-black text-accent uppercase tracking-widest">Pricing Plan</span>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider mt-1 font-sans">2. Select Services & Tiers</h3>
                  </div>

                  <div className="space-y-6">
                    {category === 'residential' ? (
                      // RESIDENTIAL CHECKLIST WITH FULL PACKAGE INTERACTIVE LOGIC
                      <div className="space-y-5">
                        
                        {/* 1. Full Package Option */}
                        <div className={`p-5 rounded-3xl border transition-all duration-300 ${
                          services['full_package']?.checked 
                            ? 'bg-accent/10 border-accent shadow-[0_0_15px_rgba(255,207,51,0.08)]' 
                            : 'border-white/5 bg-white/[0.01]'
                        }`}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                id="fp_checkbox"
                                checked={services['full_package']?.checked || false}
                                onChange={(e) => handleServiceChecked('full_package', e.target.checked)}
                                className="rounded mt-1 border-white/20 bg-white/5 text-accent focus:ring-0 focus:ring-offset-0"
                              />
                              <div>
                                <label htmlFor="fp_checkbox" className="text-sm font-black text-white uppercase tracking-wider cursor-pointer hover:text-accent flex items-center gap-2">
                                  👑 {PRICING_DATA.residential.full_package.label}
                                </label>
                                <p className="text-[11px] text-white/50 leading-relaxed font-semibold mt-1 max-w-md">
                                  {PRICING_DATA.residential.full_package.description}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-black text-gold uppercase tracking-wider">₹{PRICING_DATA.residential.full_package.tiers[services['full_package']?.tier || 1].rate}/sq.ft</span>
                            </div>
                          </div>

                          {services['full_package']?.checked && (
                            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-4 animate-fade-down duration-200">
                              <span className="text-[10px] font-black text-accent uppercase tracking-widest">Select Drawing Tier</span>
                              <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                                {PRICING_DATA.residential.full_package.tiers.map((t, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleServiceTier('full_package', idx)}
                                    className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${
                                      services['full_package'].tier === idx 
                                        ? 'bg-accent text-primary font-black shadow-md' 
                                        : 'text-white/60 hover:text-white'
                                    }`}
                                  >
                                    {t.name} (₹{t.rate})
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Note explaining exclusive selection */}
                        {services['full_package']?.checked && (
                          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex gap-3 items-start animate-fade-in font-sans">
                            <Info className="h-4.5 w-4.5 text-blue-400 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-white/70 leading-relaxed font-medium">
                              Note: *Full Package* is selected. Selections for individual 2D Planning, 3D Elevation, and 3D Interior items are disabled since they are bundled inside this full drawings package at a better consolidated rate.
                            </p>
                          </div>
                        )}

                        {/* 2. Individual Services Toggles */}
                        <div className={`space-y-4 pt-4 border-t border-white/5 ${services['full_package']?.checked ? 'opacity-40 pointer-events-none' : ''}`}>
                          {['2d_planning', '3d_elevation', '3d_interior'].map((sKey) => {
                            const service = PRICING_DATA.residential[sKey as keyof typeof PRICING_DATA.residential];
                            const current = services[sKey] || { checked: false, tier: 1 };
                            const activeTier = service.tiers[current.tier];

                            return (
                              <div 
                                key={sKey} 
                                className={`p-4 rounded-3xl border transition-all ${
                                  current.checked ? 'bg-white/5 border-white/20' : 'border-white/5 bg-transparent'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-3">
                                    <input
                                      type="checkbox"
                                      id={`res_${sKey}`}
                                      checked={current.checked}
                                      disabled={services['full_package']?.checked}
                                      onChange={(e) => handleServiceChecked(sKey, e.target.checked)}
                                      className="rounded mt-1 border-white/20 bg-white/5 text-accent focus:ring-0 focus:ring-offset-0 cursor-pointer"
                                    />
                                    <div>
                                      <label htmlFor={`res_${sKey}`} className="text-xs font-black text-white uppercase tracking-wider cursor-pointer hover:text-accent flex items-center gap-1.5">
                                        {service.label}
                                      </label>
                                      <p className="text-[10px] text-white/50 leading-relaxed font-medium mt-1">
                                        {service.description}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-xs font-black text-gold uppercase tracking-wider">₹{activeTier.rate}/sq.ft</span>
                                  </div>
                                </div>

                                {current.checked && !services['full_package']?.checked && (
                                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-4 animate-fade-down duration-200">
                                    <span className="text-[9px] font-black text-accent uppercase tracking-widest">Select Plan Tier</span>
                                    <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                                      {service.tiers.map((t, idx) => (
                                        <button
                                          key={idx}
                                          type="button"
                                          onClick={() => handleServiceTier(sKey, idx)}
                                          className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${
                                            current.tier === idx 
                                              ? 'bg-accent text-primary font-black shadow-md' 
                                              : 'text-white/60 hover:text-white'
                                          }`}
                                        >
                                          {t.name} (₹{t.rate})
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      // COMMERCIAL SERVICES CHECKLIST
                      <div className="space-y-4">
                        {['2d_planning', '3d_elevation', '3d_interior'].map((sKey) => {
                          const service = PRICING_DATA.commercial[sKey as keyof typeof PRICING_DATA.commercial];
                          const current = services[sKey] || { checked: false, tier: 1 };
                          const activeTier = service.tiers[current.tier];

                          return (
                            <div 
                              key={sKey} 
                              className={`p-4 rounded-3xl border transition-all ${
                                current.checked ? 'bg-white/5 border-white/20' : 'border-white/5 bg-transparent'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                  <input
                                    type="checkbox"
                                    id={`comm_${sKey}`}
                                    checked={current.checked}
                                    onChange={(e) => handleServiceChecked(sKey, e.target.checked)}
                                    className="rounded mt-1 border-white/20 bg-white/5 text-accent focus:ring-0 focus:ring-offset-0 cursor-pointer"
                                  />
                                  <div>
                                    <label htmlFor={`comm_${sKey}`} className="text-xs font-black text-white uppercase tracking-wider cursor-pointer hover:text-accent">
                                      {service.label}
                                    </label>
                                    <p className="text-[10px] text-white/50 leading-relaxed font-medium mt-1">
                                      {service.description}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-xs font-black text-gold uppercase tracking-wider">₹{activeTier.rate}/sq.ft</span>
                                </div>
                              </div>

                              {current.checked && (
                                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-4 animate-fade-down duration-200">
                                  <span className="text-[9px] font-black text-accent uppercase tracking-widest">Select Plan Tier</span>
                                  <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                                    {service.tiers.map((t, idx) => (
                                      <button
                                        key={idx}
                                        type="button"
                                        onClick={() => handleServiceTier(sKey, idx)}
                                        className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${
                                          current.tier === idx 
                                            ? 'bg-accent text-primary font-black shadow-md' 
                                            : 'text-white/60 hover:text-white'
                                        }`}
                                      >
                                        {t.name} (₹{t.rate})
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </Card>

                {/* Distance & Extra Services Add-ons */}
                <Card className="glass-card border-white/10 bg-[#08162b] rounded-[32px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
                  <div className="mb-6">
                    <span className="text-[10px] font-black text-accent uppercase tracking-widest">Site Visits & Add-ons</span>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider mt-1 font-sans">3. Site Visit Distance & Extras</h3>
                  </div>

                  <div className="space-y-6 font-sans">
                    {/* Site Visit Distance */}
                    <div className="space-y-2.5">
                      <label className="text-[10px] font-black text-white/50 uppercase tracking-widest block">Site Visit Distance Charges (With Car)</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {PRICING_DATA.site_visits.map((vis, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setDistanceIdx(idx)}
                            className={`py-3 px-2 rounded-2xl border text-center flex flex-col items-center justify-center gap-1 transition-all ${
                              distanceIdx === idx 
                                ? 'bg-accent/15 border-accent text-accent' 
                                : 'border-white/5 text-white/65 bg-white/[0.01]'
                            }`}
                          >
                            <span className="text-[10px] font-black">{vis.range}</span>
                            <span className="text-[9px] font-bold text-white/40">₹{vis.price}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Extra Services Checklist Toggles */}
                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <label className="text-[10px] font-black text-white/50 uppercase tracking-widest block">Additional Interactive Extra Services</label>
                      
                      {/* Walkthrough */}
                      <div className={`p-4 rounded-3xl border transition-all ${
                        walkthrough ? 'bg-white/5 border-white/20' : 'border-white/5 bg-transparent'
                      }`}>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id="extra_walk"
                              checked={walkthrough}
                              onChange={(e) => setWalkthrough(e.target.checked)}
                              className="rounded border-white/20 bg-white/5 text-accent focus:ring-0 cursor-pointer"
                            />
                            <div>
                              <label htmlFor="extra_walk" className="text-xs font-black text-white uppercase tracking-wider cursor-pointer">
                                📹 3D Walkthrough Tour
                              </label>
                              <p className="text-[10px] text-white/50 leading-relaxed font-semibold">
                                Complete 3D virtual tour of the layout
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-black text-gold">₹{PRICING_DATA.extra_services['3d_walkthrough'].tiers[walkthroughTier].rate.toLocaleString('en-IN')}</span>
                        </div>

                        {walkthrough && (
                          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-4 animate-fade-down duration-200">
                            <span className="text-[9px] font-black text-accent uppercase tracking-widest">Select Walkthrough Option</span>
                            <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                              {PRICING_DATA.extra_services['3d_walkthrough'].tiers.map((w, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setWalkthroughTier(idx)}
                                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${
                                    walkthroughTier === idx 
                                      ? 'bg-accent text-primary font-black shadow-md' 
                                      : 'text-white/60 hover:text-white'
                                  }`}
                                >
                                  {w.name} (₹{w.rate.toLocaleString('en-IN')})
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Online Consultation */}
                      <div className={`p-4 rounded-3xl border transition-all ${
                        consultation ? 'bg-white/5 border-white/20' : 'border-white/5 bg-transparent'
                      }`}>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id="extra_cons"
                              checked={consultation}
                              onChange={(e) => setConsultation(e.target.checked)}
                              className="rounded border-white/20 bg-white/5 text-accent focus:ring-0 cursor-pointer"
                            />
                            <div>
                              <label htmlFor="extra_cons" className="text-xs font-black text-white uppercase tracking-wider cursor-pointer">
                                🌐 Online Architect Consultation
                              </label>
                              <p className="text-[10px] text-white/50 leading-relaxed font-semibold">
                                Live virtual session with senior planning team
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-black text-gold">₹{PRICING_DATA.extra_services['online_consultation'].tiers[consultationTier].rate.toLocaleString('en-IN')}</span>
                        </div>

                        {consultation && (
                          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-4 animate-fade-down duration-200">
                            <span className="text-[9px] font-black text-accent uppercase tracking-widest">Select Session Tier</span>
                            <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                              {PRICING_DATA.extra_services['online_consultation'].tiers.map((c, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setConsultationTier(idx)}
                                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${
                                    consultationTier === idx 
                                      ? 'bg-accent text-primary font-black shadow-md' 
                                      : 'text-white/60 hover:text-white'
                                  }`}
                                >
                                  {c.name} (₹{c.rate.toLocaleString('en-IN')})
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Site Guidance Switches */}
                    <div className="space-y-4 pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Contractor Guidance */}
                      <button
                        type="button"
                        onClick={() => setContractorGuidance(prev => !prev)}
                        className={`p-4 rounded-3xl border text-left flex justify-between items-center transition-all ${
                          contractorGuidance ? 'bg-accent/10 border-accent/40 text-accent' : 'border-white/5 bg-[#051124]'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="text-xs font-black uppercase tracking-wider">Contractor Guidance</span>
                          <p className="text-[9px] text-white/50 leading-relaxed font-semibold">Included in Premium</p>
                        </div>
                        <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${contractorGuidance ? 'bg-accent' : 'bg-white/10'}`}>
                          <div className={`w-4 h-4 bg-primary rounded-full transition-transform ${contractorGuidance ? 'translate-x-4' : 'translate-x-0'}`}></div>
                        </div>
                      </button>

                      {/* Material Support */}
                      <button
                        type="button"
                        onClick={() => setMaterialSupport(prev => !prev)}
                        className={`p-4 rounded-3xl border text-left flex justify-between items-center transition-all ${
                          materialSupport ? 'bg-accent/10 border-accent/40 text-accent' : 'border-white/5 bg-[#051124]'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="text-xs font-black uppercase tracking-wider">Material Support</span>
                          <p className="text-[9px] text-white/50 leading-relaxed font-semibold">Procurement support</p>
                        </div>
                        <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${materialSupport ? 'bg-accent' : 'bg-white/10'}`}>
                          <div className={`w-4 h-4 bg-primary rounded-full transition-transform ${materialSupport ? 'translate-x-4' : 'translate-x-0'}`}></div>
                        </div>
                      </button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column: Cost Receipt */}
              <div className="lg:col-span-5 sticky top-28 space-y-6">
                <Card className="glass-card border-accent/25 bg-[#08162b] rounded-[32px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none"></div>
                  
                  <div className="border-b border-white/10 pb-6 mb-6">
                    <span className="text-[10px] font-black text-accent uppercase tracking-widest">LIVE ESTIMATION</span>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider mt-1 font-sans">Calculator Receipt</h3>
                  </div>

                  {/* Calculations Details Ledger */}
                  <div className="space-y-4 font-sans max-h-[380px] overflow-y-auto pr-1">
                    {calculatedItems.length === 0 ? (
                      <p className="text-xs text-white/40 italic font-semibold py-8 text-center">
                        Select services from the configuration panel to audit your design estimate.
                      </p>
                    ) : (
                      calculatedItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-start gap-4 border-b border-white/5 pb-3">
                          <div className="space-y-1">
                            <h4 className="text-[11px] font-black text-white uppercase tracking-wider leading-relaxed">{item.name}</h4>
                            <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider">{item.desc}</p>
                          </div>
                          <span className="text-xs font-black text-accent whitespace-nowrap">₹{item.cost.toLocaleString('en-IN')}/-</span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Total pricing highlighted */}
                  <div className="pt-6 border-t border-white/10 mt-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-white uppercase tracking-widest">Grand Total Estimate:</span>
                      <span className="text-2xl md:text-3xl font-black text-accent font-sans animate-pulse">
                        ₹{calculatedTotal.toLocaleString('en-IN')}/-
                      </span>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 space-y-2">
                      <div className="flex justify-between text-[10px] font-bold text-white/60">
                        <span>Expected Timelines:</span>
                        <span className="text-accent uppercase tracking-wider">{area < 1500 ? '15 - 25 Working Days' : area < 3000 ? '30 - 45 Working Days' : '60+ Working Days'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-white/60">
                        <span>Drawing Set Drafts:</span>
                        <span className="text-accent uppercase tracking-wider">3 Architectural Sets included</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking actions */}
                  <div className="mt-8 space-y-3 font-sans">
                    <Link 
                      href="/pricing/continue?source=calculator" 
                      onClick={handleProceedOnboarding}
                      className="block w-full"
                    >
                      <Button className="w-full bg-gold-gradient text-primary font-black uppercase tracking-widest h-14 rounded-full shadow-lg m3-transition hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5">
                        Book This Estimate <ChevronRight className="h-4 w-4 stroke-[3]" />
                      </Button>
                    </Link>

                    <Button
                      onClick={() => handleOpenEnquiryModal({ isCalculator: true, name: "Flyer Estimate Calculator", slug: "calculator" })}
                      className="w-full bg-accent hover:bg-accent/90 text-primary font-black uppercase tracking-widest h-12 rounded-full shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      Quick Enquiry / Poochhein
                    </Button>

                    <a 
                      href={`https://wa.me/919631980881?text=${encodeURIComponent(getWhatsAppMessage())}`}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block w-full"
                    >
                      <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10 font-black uppercase tracking-widest h-12 rounded-full flex items-center justify-center gap-1.5 transition-all">
                        Get Estimate on WhatsApp
                      </Button>
                    </a>
                  </div>
                </Card>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* BESPOKE INTERIOR ESTIMATOR SECTION */}
      {activeTab === 'interior-estimate' && (
        <section className="py-10 animate-fade-in duration-300">
          <div className="container mx-auto px-4 max-w-4xl">
            <BespokeEstimator />
          </div>
        </section>
      )}

      {/* STANDARD SITE SUPERVISION PACKAGES SECTION */}
      {activeTab === 'packages' && (
        <section className="py-10 animate-fade-in duration-300">
          <div className="container mx-auto px-4 max-w-[95vw] xl:max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {supervisionPackages.map((pkg, idx) => (
                <Card 
                  key={idx} 
                  className={cn(
                    "relative glass-card border-white/10 overflow-hidden flex flex-col rounded-[32px] m3-elevation-3 transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 bg-[#08162b]",
                    pkg.tag ? "border-accent/30 shadow-[0_4px_30px_rgba(255,207,51,0.05)]" : ""
                  )}
                >
                  {/* Decorative glowing tag for best choice card */}
                  {pkg.tag && (
                    <div className="absolute top-0 right-0 bg-accent text-primary text-[9px] font-black py-2 px-4 rounded-bl-[16px] shadow-md uppercase tracking-widest z-10">
                      {pkg.tag}
                    </div>
                  )}

                  <CardContent className="p-5 md:p-6 flex-grow flex flex-col justify-between">
                    <div className="flex-grow">
                      {/* Header */}
                      <div className="mb-6 font-sans">
                        <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-wider mb-3 leading-tight h-14 flex items-center">{pkg.name}</h3>
                        <div className="inline-block bg-gold-gradient text-primary px-5 py-2.5 rounded-2xl text-xl md:text-2xl font-black shadow-lg">
                          {pkg.isCustom ? "Custom" : `₹${pkg.price}/-`}
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-accent mt-3 min-h-[32px] leading-relaxed">{pkg.suitableFor}</p>
                      </div>

                      {/* Features checklist */}
                      <div className="py-5 border-t border-white/10">
                        <ul className="space-y-3 font-sans">
                          {pkg.features.map((feat, i) => (
                            <li key={i} className="flex gap-2.5 text-xs font-semibold text-white/95 items-center">
                              <div className="w-4.5 h-4.5 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0 text-accent">
                                <Check className="h-2.5 w-2.5 stroke-[3]" />
                              </div>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Client Benefits section inside card */}
                    <div className="mt-6 pt-5 border-t border-white/10 font-sans">
                      <div className="bg-white/[0.01] border border-white/5 rounded-[20px] p-4 shadow-inner min-h-[220px]">
                        <h4 className="text-[10px] font-black text-gold uppercase tracking-widest mb-3.5">Client Benefits</h4>
                        <ul className="space-y-2.5">
                          {pkg.benefits.map((benefit, i) => (
                            <li key={i} className="flex gap-2 text-[11px] font-medium text-white/60 items-start leading-relaxed">
                              <Check className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action buttons footer inside cards */}
                    <div className="mt-6 font-sans">
                      {pkg.isCustom ? (
                        <div className="flex flex-col gap-2">
                          <Button 
                            onClick={() => handleOpenEnquiryModal(pkg)}
                            className="w-full bg-accent hover:bg-accent/90 text-primary font-black uppercase tracking-wider text-[10px] h-11 rounded-full shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
                          >
                            Quick Enquiry / Poochhein
                          </Button>
                          <div className="flex gap-2">
                            <a href="tel:+919631980881" className="flex-1">
                              <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 font-black uppercase tracking-wider text-[9px] h-10 rounded-full flex items-center justify-center gap-1.5 transition-all">
                                <Phone className="h-3 w-3 shrink-0" /> Call
                              </Button>
                            </a>
                            <a 
                              href={`https://wa.me/919631980881?text=${encodeURIComponent("Hi Galaxy Interior team, I would like to enquire about the Custom Pricing & Large Project package. Please contact me.")}`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex-1"
                            >
                              <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10 font-black uppercase tracking-wider text-[9px] h-10 rounded-full flex items-center justify-center gap-1.5 transition-all">
                                WhatsApp
                              </Button>
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <Link href={`/pricing/continue?package=${pkg.slug}`} className="block w-full">
                            <Button className="w-full bg-gold-gradient hover:opacity-95 text-primary font-black uppercase tracking-wider text-xs h-12 rounded-full shadow-md flex items-center justify-center gap-1.5 m3-transition hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden m3-state-layer">
                              Book & Continue <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                          <Button 
                            onClick={() => handleOpenEnquiryModal(pkg)}
                            variant="outline" 
                            className="w-full border-accent text-accent hover:bg-accent/10 font-black uppercase tracking-wider text-[10px] h-11 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95"
                          >
                            Quick Enquiry / Poochhein
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Visited Depend Distance & Custom Info Section */}
      <section className="py-10 bg-transparent font-sans">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-[28px] p-6 md:p-8 flex gap-5 items-start shadow-md hover:border-accent/20 transition-all">
              <div className="w-12 h-12 bg-accent/15 border border-accent/30 rounded-2xl flex items-center justify-center shrink-0 text-accent">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-black text-sm uppercase tracking-widest text-white leading-tight">Visit Depends Upon Site Distance</h3>
                <p className="text-xs text-white/60 leading-relaxed font-medium">
                  Number of site visits may vary based on site location and distance. 
                  Extra visits or long-distance projects may include additional charges.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[28px] p-6 md:p-8 flex gap-5 items-start shadow-md hover:border-accent/20 transition-all">
              <div className="w-12 h-12 bg-accent/15 border border-accent/30 rounded-2xl flex items-center justify-center shrink-0 text-accent">
                <FileText className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-black text-sm uppercase tracking-widest text-white leading-tight">Customized Packages Available</h3>
                <p className="text-xs text-white/60 leading-relaxed font-medium">
                  Packages can be customized as per project requirement and budget. 
                  Connect with our team to draft your custom design scope.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-transparent font-sans">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary border border-accent/20 text-accent font-bold px-4 py-1 tracking-widest uppercase">WHY GALAXY?</Badge>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">Why Choose Galaxy Interior?</h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 justify-center">
            {whyChooseItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className={cn(
                    "bg-[#08162b] border border-white/5 p-6 rounded-[24px] flex flex-col items-center justify-center text-center shadow-md hover:border-accent/20 hover:scale-[1.02] transition-all duration-300",
                    idx === 6 ? "col-span-2 md:col-span-1" : ""
                  )}
                >
                  <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center mb-4 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-[10px] md:text-xs font-black uppercase tracking-wider text-white/90 leading-snug">{item.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Important Note & Footer CTA */}
      <section className="py-10 bg-transparent border-t border-white/5 font-sans">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-[#08162b] border border-accent/25 rounded-[32px] overflow-hidden shadow-2xl grid md:grid-cols-2 items-stretch">
            {/* Left: Notes */}
            <div className="p-8 md:p-10 space-y-6 flex flex-col justify-center bg-galaxy-dark">
              <div className="flex items-center gap-3">
                <Info className="h-6 w-6 text-accent shrink-0" />
                <h3 className="font-black text-sm uppercase tracking-widest text-white">Important Note</h3>
              </div>
              <ul className="space-y-3.5 text-xs text-white/60 font-medium">
                <li className="flex gap-2 items-start">
                  <span className="text-accent">•</span>
                  <span>Extra site visits or long-distance projects may include additional charges.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-accent">•</span>
                  <span>Customized packages available as per project requirement and budget.</span>
                </li>
              </ul>
            </div>

            {/* Right: Contact */}
            <div className="p-8 md:p-10 space-y-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10">
              <h3 className="font-black text-sm uppercase tracking-widest text-gold text-center md:text-left">Contact Now</h3>
              <div className="space-y-4">
                <a 
                  href="tel:+919631980881" 
                  className="flex items-center gap-4 text-white hover:text-accent transition-colors font-bold text-sm md:text-base"
                >
                  <Phone className="h-5 w-5 text-accent shrink-0" />
                  <span>+91 96319 80881</span>
                </a>
                <a 
                  href="tel:+919122795726" 
                  className="flex items-center gap-4 text-white/50 hover:text-white/80 transition-colors font-medium text-xs"
                >
                  <Phone className="h-4 w-4 text-accent/50 shrink-0" />
                  <span>+91 91227 95726</span>
                </a>
                <div className="flex items-center gap-4 text-white font-bold text-sm md:text-base">
                  <Mail className="h-5 w-5 text-accent shrink-0" />
                  <span>info@galaxyinteriorindia.com</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="flex-1">
                  <Button className="w-full bg-gold-gradient text-primary font-black uppercase tracking-widest h-12 rounded-full shadow-md hover:scale-[1.01] transition-transform">
                    Enquire Now
                  </Button>
                </Link>
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/5 font-black uppercase tracking-widest h-12 rounded-full">
                    Go To Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Enquiry M3 Modal Dialog */}
      {isModalOpen && enquiryPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051124]/80 backdrop-blur-md animate-fade-in font-sans">
          <Card className="w-full max-w-lg glass-card border-accent/25 bg-[#08162b] rounded-[32px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none"></div>
            
            {/* Close Button */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-5 right-5 text-white/50 hover:text-white border border-white/10 hover:border-white/20 p-2 rounded-full transition-all active:scale-95"
            >
              <X className="h-4.5 w-4.5 stroke-[2.5]" />
            </button>

            <CardContent className="p-0">
              <div className="mb-6 pr-8">
                <span className="text-[10px] font-black text-accent uppercase tracking-widest">GALAXY INTERIOR</span>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider mt-1 leading-tight">Client Work Enquiry</h3>
                <p className="text-[10px] text-white/50 font-semibold leading-relaxed mt-1">
                  Inquiry Regarding Plan: <span className="text-gold font-bold">{enquiryPkg.name}</span>
                </p>
              </div>

              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                {/* Client Name */}
                <div className="relative w-full">
                  <Input 
                    name="name"
                    value={enquiryData.name}
                    onChange={handleEnquiryChange}
                    required
                    className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent text-xs font-sans"
                    placeholder="Name" 
                  />
                  <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold">
                    Name
                  </label>
                </div>

                {/* Mobile Number */}
                <div className="relative w-full">
                  <Input 
                    name="mobile"
                    type="tel"
                    value={enquiryData.mobile}
                    onChange={handleEnquiryChange}
                    required
                    className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent text-xs font-sans"
                    placeholder="Mobile Number" 
                  />
                  <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold">
                    Mobile
                  </label>
                </div>

                {/* Client Address */}
                <div className="relative w-full">
                  <Input 
                    name="address"
                    value={enquiryData.address}
                    onChange={handleEnquiryChange}
                    required
                    className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent text-xs font-sans"
                    placeholder="Address" 
                  />
                  <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold">
                    Address
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Project Type */}
                  <div className="relative w-full">
                    <Input 
                      name="projectType"
                      value={enquiryData.projectType}
                      onChange={handleEnquiryChange}
                      required
                      className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent text-xs font-sans"
                      placeholder="Project Type" 
                    />
                    <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                      Project Type
                    </label>
                  </div>

                  {/* Area Size */}
                  <div className="relative w-full">
                    <Input 
                      name="areaSize"
                      value={enquiryData.areaSize}
                      onChange={handleEnquiryChange}
                      required
                      className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent text-xs font-sans"
                      placeholder="Area Size" 
                    />
                    <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                      Area Size
                    </label>
                  </div>
                </div>

                {/* Project Location */}
                <div className="relative w-full">
                  <Input 
                    name="projectLocation"
                    value={enquiryData.projectLocation}
                    onChange={handleEnquiryChange}
                    required
                    className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent text-xs font-sans"
                    placeholder="Project Location" 
                  />
                  <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                    Project Location
                  </label>
                </div>

                {errorMsg && (
                  <p className="text-[11px] font-bold text-red-500 italic animate-pulse">{errorMsg}</p>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full h-14 bg-gold-gradient hover:opacity-95 text-primary rounded-full font-black text-xs uppercase tracking-widest m3-elevation-2 flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        Submit & Ask on WhatsApp <Check className="h-4 w-4 stroke-[3]" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// Utility styling helper
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
