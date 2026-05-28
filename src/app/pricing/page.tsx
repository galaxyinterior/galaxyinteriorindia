"use client";

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Check, Phone, Mail, MapPin, Users, Award, Clock, FileText, Info, ChevronRight, 
  Activity, ShieldCheck, HelpCircle, Sparkles, Loader2, X 
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const packages = [
  {
    name: "Basic Package",
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
    name: "Standard Package",
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
    name: "Premium Package",
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

export default function PricingPage() {
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

  const handleOpenEnquiryModal = (pkg: any) => {
    setErrorMsg('');
    setEnquiryPkg(pkg);
    setEnquiryData({
      name: '',
      mobile: '',
      address: '',
      projectType: pkg.isCustom ? 'Commercial Building' : pkg.slug === 'basic' ? 'Residential House' : 'Residential Duplex',
      areaSize: pkg.slug === 'basic' ? '1000 Sqft' : pkg.slug === 'standard' ? '1500 Sqft' : '2000 Sqft',
      projectLocation: ''
    });
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
      // 1. Sync quick enquiry details to Firestore quick_enquiries collection
      await addDoc(collection(db, "quick_enquiries"), {
        clientName: enquiryData.name,
        mobileNumber: enquiryData.mobile,
        address: enquiryData.address,
        projectType: enquiryData.projectType,
        areaSize: enquiryData.areaSize,
        projectLocation: enquiryData.projectLocation,
        packageName: enquiryPkg.name,
        packageSlug: enquiryPkg.slug,
        createdAt: serverTimestamp()
      });

      // 2. Open WhatsApp redirection to architectural desk
      const whatsappMsg = `*GALAXY INTERIOR - Quick Package Enquiry*
-----------------------------------------
I would like to enquire about the *${enquiryPkg.name}*. Here are my client details:
- *Name:* ${enquiryData.name}
- *Mobile:* ${enquiryData.mobile}
- *Address:* ${enquiryData.address}
- *Project Type:* ${enquiryData.projectType}
- *Area Size:* ${enquiryData.areaSize}
- *Project Location:* ${enquiryData.projectLocation}`;

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
            CONSTRUCTION HANDLING
          </Badge>
          <h1 className="font-display text-4xl md:text-7xl font-black tracking-tight mb-6 leading-none animate-fade-up text-white font-sans">
            Stress-Free Construction <br />
            <span className="text-gold italic">Starts Here!</span>
          </h1>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-white/70 font-medium leading-relaxed mb-10 font-sans">
            Galaxy Interior handles your construction professionally with proper site monitoring, 
            labour coordination & quality management – saving your time, money & effort.
          </p>

          {/* Quick Badges (Flyer Header features) */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 max-w-4xl mx-auto mt-12 font-sans">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-md hover:border-accent/30 transition-all">
              <Activity className="h-6 w-6 text-accent mb-2" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/80">Professional Site Monitoring</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-md hover:border-accent/30 transition-all">
              <Users className="h-6 w-6 text-accent mb-2" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/80">Better Labour Coordination</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-md hover:border-accent/30 transition-all">
              <ShieldCheck className="h-6 w-6 text-accent mb-2" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/80">Quality Management</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-md hover:border-accent/30 transition-all">
              <Clock className="h-6 w-6 text-accent mb-2" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/80">Saves Your Time & Money</span>
            </div>
            <div className="col-span-2 md:col-span-1 bg-accent/15 border border-accent/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg hover:border-accent transition-all group">
              <Sparkles className="h-6 w-6 text-accent mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-accent">Elevation Work Support Included</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Packages Section */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-4 max-w-[95vw] xl:max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight text-white mb-4 font-sans">Construction Handling Packages</h2>
            <div className="w-20 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {packages.map((pkg, idx) => (
              <Card 
                key={idx} 
                className={cn(
                  "relative glass-card border-white/10 overflow-hidden flex flex-col rounded-[32px] m3-elevation-3 transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 bg-[#08162b]",
                  pkg.tag ? "border-accent/30 shadow-[0_4px_30px_rgba(255,207,51,0.05)]" : ""
                )}
              >
                {/* Decorative glowing gradient for best choice card */}
                {pkg.tag && (
                  <div className="absolute top-0 right-0 bg-accent text-primary text-[9px] font-black py-2 px-4 rounded-bl-[16px] shadow-md uppercase tracking-widest z-10">
                    {pkg.tag}
                  </div>
                )}

                <CardContent className="p-5 md:p-6 flex-grow flex flex-col justify-between">
                  <div className="flex-grow">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-wider mb-3 leading-tight h-14 flex items-center font-sans">{pkg.name}</h3>
                      <div className="inline-block bg-gold-gradient text-primary px-5 py-2.5 rounded-2xl text-xl md:text-2xl font-black shadow-lg">
                        {pkg.isCustom ? "Custom" : `₹${pkg.price}/-`}
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-accent mt-3 min-h-[32px] leading-relaxed font-sans">{pkg.suitableFor}</p>
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
                  <div className="mt-6 pt-5 border-t border-white/10">
                    <div className="bg-white/[0.01] border border-white/5 rounded-[20px] p-4 shadow-inner min-h-[220px] font-sans">
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
                          <a href="tel:+919122795726" className="flex-1">
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
                  className="flex items-center gap-4 text-white hover:text-accent transition-colors font-bold text-sm md:text-base"
                >
                  <Phone className="h-5 w-5 text-accent shrink-0" />
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
                  Inquiry Regarding Package: <span className="text-gold font-bold">{enquiryPkg.name}</span>
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
                    className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent text-xs"
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
                    className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent text-xs"
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
                    className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent text-xs"
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
