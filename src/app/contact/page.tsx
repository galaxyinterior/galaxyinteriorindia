"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Check } from 'lucide-react';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const ALL_SERVICES = [
  "Architectural",
  "2D Plan",
  "3D Elevation",
  "3D Interior Design",
  "Interior Project",
  "Service Work",
];

const FAQS = [
  {
    q: "What services does Galaxy Interior offer?",
    a: "Galaxy Interior offers a complete range of architecture and interior solutions including Architectural Plans, 2D Floor Plans, 3D Elevation Design, 3D Interior Design, Interior Projects, Modular Kitchens, False Ceiling, Construction, and Service Work. We handle both residential and commercial projects."
  },
  {
    q: "Which areas do you serve?",
    a: "We proudly serve Godda, Ranchi, Bhagalpur, Banka, Deoghar, Hazaribagh, Dumka, Purnea, and Kishanganj. Our operations span across Jharkhand, Bihar, and West Bengal. We also handle projects in other parts of Eastern India on request."
  },
  {
    q: "What is the starting price for a residential interior project?",
    a: "Residential interior projects at Galaxy Interior start from ₹6.3 Lac. The final cost depends on the size of the property, materials selected, scope of work, and customization required. We offer bespoke plans to suit every budget."
  },
  {
    q: "Do you handle commercial projects as well?",
    a: "Yes! We specialize in commercial projects including corporate head offices, retail showrooms, clinics, malls, and shop outlets. Commercial projects start from ₹12.5 Lac. We offer layout planning, 3D workspace design, false ceiling, and complete interior execution."
  },
  {
    q: "How long does a complete interior project take?",
    a: "Project timelines vary by scope. A 3D design or plan is typically delivered in 3–7 working days. A full interior execution project for a 2–3 BHK home takes 45–90 days depending on material availability, customization, and site conditions."
  },
  {
    q: "What is included in a 3D Elevation Design?",
    a: "Our 3D Elevation Design includes front, side, and rear elevation renders, dusk and daylight lighting modes, material and colour simulation (stone, glass, paint, tiles), landscape and surrounding context, and high-resolution 4K output. Revisions are included until you are fully satisfied."
  },
  {
    q: "What does 3D Interior Design cover?",
    a: "3D Interior Design covers all rooms — living room, bedroom, kitchen, dining, pooja, and study. Each render includes accurate furniture placement, texture and material mapping, lighting mood simulation (warm, cool, accent), false ceiling design, and a colour palette guide."
  },
  {
    q: "Can I see my home design before construction starts?",
    a: "Absolutely. That is the core purpose of our 3D Design service. We create photorealistic renders of both the exterior (elevation) and interior (room-by-room) so you can visualize every detail — furniture, materials, lighting — before a single brick is laid or rupee is spent."
  },
  {
    q: "Which brands and materials do you use?",
    a: "We use only premium, certified brands. Our trusted partners include Century Ply, Greenply, Hettich, Godrej, Pidilite, Havells, Panasonic, Kajaria, Somany, UltraTech, Tata Steel, and JSW. All materials are selected for durability, aesthetics, and safety standards."
  },
  {
    q: "Do you offer a warranty on construction work?",
    a: "Yes. Galaxy Interior provides a 5-year construction warranty on all civil and structural work. Interior execution work also comes with service support. We use premium materials like UltraTech cement and Tata Steel to ensure longevity and quality."
  },
  {
    q: "How do I start a project with Galaxy Interior?",
    a: "Simply fill out the contact form on this page or call/WhatsApp us at +91 91227 95726 or +91 96319 80881. Our team will schedule a free consultation, understand your requirements, and provide a detailed project plan and cost estimate."
  },
  {
    q: "Is the initial consultation free?",
    a: "Yes, the first consultation is completely free of charge. Our design experts will discuss your requirements, space dimensions, budget, and design preferences. We then prepare a customized proposal for your project."
  },
  {
    q: "Can I customise the interior design style?",
    a: "Absolutely. Every project at Galaxy Interior is 100% customized. We offer Modern, Contemporary, Minimalist, Classic, and Luxury design styles. We incorporate your preferred colour palette, materials, furniture, and spatial requirements to create a unique design that reflects your personality."
  },
  {
    q: "Do you handle Vastu-compliant designs?",
    a: "Yes. Our Architectural Plan service includes optional Vastu-based planning. We work with your Vastu consultant or apply standard Vastu principles to space orientation, room placement, entry directions, and layout to ensure your home is both aesthetically stunning and spiritually aligned."
  },
  {
    q: "What is included in an Architectural Plan?",
    a: "Our Architectural Plan includes complete architectural layout design, space utilization planning, structural analysis and RCC design, optional Vastu-based planning, modern exterior elevation design, and municipality approval-ready blueprints. Tools used include AutoCAD, SketchUp, Revit, and V-Ray."
  },
  {
    q: "How experienced is the Galaxy Interior team?",
    a: "Galaxy Interior was founded in 2021 by Shivashish Ranjan and has completed 500+ projects across 10+ years of combined team excellence. Our leadership includes our Founder & Chairman, CEO Kumkum Ranjan, General Manager Ratan Kumar, and Managing Director Anjula Devi."
  },
  {
    q: "Do you manage the entire project from design to handover?",
    a: "Yes. We offer complete turnkey project management — from the initial concept design and 2D/3D planning to material procurement, site execution, daily supervision, furniture installation, and final handover. You do not need to coordinate with multiple vendors."
  },
  {
    q: "Can you work within a fixed budget?",
    a: "Yes. We offer transparent budgeting from day one. Once we understand your requirements, we prepare a detailed cost breakdown. We offer design options at different budget levels without compromising on quality. Our bespoke plans are designed to maximize value within your budget."
  },
  {
    q: "What are your working hours?",
    a: "Our team is available Monday to Sunday, 9:00 AM to 8:00 PM. You can reach us via phone, WhatsApp, or email at any time during these hours. For urgent queries, WhatsApp is the fastest way to connect with our team."
  },
  {
    q: "Do you execute projects outside Jharkhand?",
    a: "Yes. While our primary operations are in Jharkhand, Bihar, and West Bengal, we accept projects across Eastern India. Our vision is to expand into Purnia and Patna in 2026, and we already have offices in Bhagalpur, Ranchi, and Kishanganj to serve clients across the region."
  },
];

function ContactForm() {
  const searchParams = useSearchParams();
  const preService = searchParams.get('service');   // single
  const preServices = searchParams.get('services'); // comma-separated multi

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    const toSelect: string[] = [];
    if (preServices) {
      preServices.split(',').forEach(s => {
        const trimmed = s.trim();
        if (ALL_SERVICES.includes(trimmed)) toSelect.push(trimmed);
      });
    } else if (preService && ALL_SERVICES.includes(preService)) {
      toSelect.push(preService);
    }
    if (toSelect.length > 0) setSelectedServices(toSelect);
  }, [preService, preServices]);
  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      await addDoc(collection(db, "consultations"), {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        location: formData.get('location'),
        services: selectedServices,
        message: formData.get('message'),
        propertyType: "Contact Page",
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setSelectedServices([]);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  return (
    <div className="bg-[#051124] text-white min-h-screen pt-28">
      {/* Material 3 Premium Hero Section */}
      <section className="relative py-16 md:py-24 bg-logo-radial bg-logo-mandala overflow-hidden border-b border-accent/15">
        <div className="absolute inset-0 bg-gradient-to-b from-[#051124]/40 to-[#051124] z-0" />
        
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl animate-fade-up">
          <Badge className="mb-6 rounded-full bg-accent text-primary font-black tracking-[0.20em] px-6 py-2 border-none shadow-md text-[10px] uppercase">
            REACH OUT TO US
          </Badge>
          <h1 className="font-display text-4xl md:text-7xl font-black tracking-tight mb-4 uppercase text-shadow-lg leading-tight text-white font-sans">
            Get in <span className="text-gold italic">Touch</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-white/70 font-semibold leading-relaxed font-sans">
            Let's design and construct your dream space together. We proudly serve residential and commercial properties.
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="py-20 bg-[#051124]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: M3 Info Cards & Chips */}
            <div className="lg:col-span-5 space-y-8 animate-fade-up">
              
              {/* Serviceable Locations Card */}
              <div className="bg-[#08162d] border border-white/10 rounded-[28px] p-8 shadow-2xl hover:border-accent/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-accent/15 text-accent w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-white uppercase tracking-tight">Serviceable Areas</h2>
                </div>
                
                <p className="text-sm text-white/60 mb-6 leading-relaxed">
                  We proudly serve and execute premium architecture, construction, and luxury interior design projects in the following regions:
                </p>
                
                <div className="flex flex-wrap gap-2.5">
                  {["GODDA", "RANCHI", "BHAGALPUR", "BANKA", "DEOGHAR", "HAZARIBAGH", "DUMKA", "PURNEA", "KISHANGANJ"].map((loc) => (
                    <span 
                      key={loc} 
                      className="bg-white/5 hover:bg-accent hover:text-primary border border-white/10 text-white text-xs font-black uppercase tracking-wider rounded-full px-4 py-2.5 shadow-sm transition-all duration-300 hover:scale-[1.05] cursor-default flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                      {loc}
                    </span>
                  ))}
                </div>

                <div className="mt-8 p-5 bg-accent/5 rounded-[20px] border border-accent/10 flex gap-4 items-start">
                  <div className="bg-accent text-primary p-2.5 rounded-xl mt-0.5 shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-accent mb-1 uppercase tracking-wider text-xs">Statewide Operations</p>
                    <p className="text-white/80 leading-relaxed font-semibold">
                      We work across <span className="text-accent font-bold">Jharkhand, Bihar, and West Bengal</span>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info List Card */}
              <div className="bg-[#08162d] border border-white/10 rounded-[28px] p-8 shadow-2xl hover:border-accent/20 transition-all duration-300 space-y-6">
                <h3 className="text-2xl font-display font-bold text-white mb-6 border-b border-white/10 pb-4 uppercase tracking-tight">Contact Info</h3>
                
                {/* Phone Item */}
                <div className="flex gap-4 items-center p-3 rounded-2xl hover:bg-white/5 transition-all duration-200">
                  <div className="bg-accent/15 text-accent w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 font-bold uppercase tracking-wider mb-0.5">Call / WhatsApp</p>
                    <div className="flex flex-col text-sm">
                      <a href="tel:+919122795726" className="hover:text-accent transition-colors font-bold text-white text-base">+91 91227 95726</a>
                      <a href="tel:+919631980881" className="hover:text-accent transition-colors font-bold text-white text-base">+91 96319 80881</a>
                    </div>
                  </div>
                </div>

                {/* Email Item */}
                <div className="flex gap-4 items-center p-3 rounded-2xl hover:bg-white/5 transition-all duration-200">
                  <div className="bg-accent/15 text-accent w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 font-bold uppercase tracking-wider mb-0.5">Email Address</p>
                    <a href="mailto:info@galaxyinteriorindia.com" className="hover:text-accent transition-colors font-bold text-white text-base">info@galaxyinteriorindia.com</a>
                  </div>
                </div>

                {/* Hours Item */}
                <div className="flex gap-4 items-center p-3 rounded-2xl hover:bg-white/5 transition-all duration-200">
                  <div className="bg-accent/15 text-accent w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 font-bold uppercase tracking-wider mb-0.5">Working Hours</p>
                    <p className="font-bold text-white text-base">Mon - Sun: 9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: M3 Form Card */}
            <div className="lg:col-span-7 animate-fade-up" style={{ animationDelay: "150ms" }}>
              <div className="bg-[#08162d] border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl hover:border-accent/20 transition-all duration-500">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-2 uppercase tracking-tight">Send Us a Message</h2>
                  <p className="text-white/60 font-semibold">Have a project in mind? Drop us a line and let's bring it to life.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Full Name</Label>
                      <Input id="name" name="name" placeholder="John Doe" required className="h-12 rounded-2xl border-white/10 focus:border-accent focus:ring-accent/20 bg-[#051124] text-white placeholder:text-white/30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Email Address</Label>
                      <Input id="email" name="email" type="email" placeholder="john@example.com" required className="h-12 rounded-2xl border-white/10 focus:border-accent focus:ring-accent/20 bg-[#051124] text-white placeholder:text-white/30" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+91 00000 00000" required className="h-12 rounded-2xl border-white/10 focus:border-accent focus:ring-accent/20 bg-[#051124] text-white placeholder:text-white/30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Your Location</Label>
                      <Input id="location" name="location" placeholder="City, State" required className="h-12 rounded-2xl border-white/10 focus:border-accent focus:ring-accent/20 bg-[#051124] text-white placeholder:text-white/30" />
                    </div>
                  </div>
                  
                  {/* Multi-Select Services */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between ml-1">
                      <Label className="text-xs font-bold text-white/50 uppercase tracking-widest">Select Services</Label>
                      {selectedServices.length > 0 && (
                        <span className="text-[10px] font-black text-accent uppercase tracking-wider bg-accent/10 rounded-full px-2.5 py-1">
                          {selectedServices.length} selected
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {ALL_SERVICES.map((service) => {
                        const isSelected = selectedServices.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 border ${
                              isSelected
                                ? 'bg-accent text-primary border-accent shadow-md shadow-accent/20 scale-[1.04]'
                                : 'bg-white/5 text-white/70 border-white/10 hover:border-accent/50 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 shrink-0" />}
                            {service}
                          </button>
                        );
                      })}
                    </div>
                    {selectedServices.length === 0 && (
                      <p className="text-[11px] text-white/30 ml-1 font-medium">Tap to select one or more services you're interested in</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Your Message</Label>
                    <Textarea id="message" name="message" placeholder="Tell us about your project, ideas, plot metrics..." rows={5} className="rounded-2xl border-white/10 focus:border-accent focus:ring-accent/20 bg-[#051124] text-white placeholder:text-white/30 p-4 animate-fade-in" />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={submitting} 
                    className="w-full rounded-full h-14 font-black uppercase tracking-[0.2em] bg-accent hover:bg-accent/95 text-primary shadow-lg shadow-accent/10 hover:shadow-xl hover:shadow-accent/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 m3-state-layer relative overflow-hidden animate-fade-in"
                  >
                    {submitting ? "Sending..." : submitted ? "Message Sent!" : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#051124] border-t border-white/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <Badge className="mb-4 rounded-full bg-accent text-primary font-black tracking-[0.20em] px-6 py-2 border-none shadow-md text-[10px] uppercase">
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              Frequently Asked <span className="text-gold italic">Questions</span>
            </h2>
            <p className="text-white/50 mt-4 text-sm font-semibold max-w-xl mx-auto">
              Everything you need to know about Galaxy Interior — our services, process, pricing, and more.
            </p>
          </div>
          <FaqAccordion />
        </div>
      </section>
    </div>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`rounded-[20px] border transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'border-accent/40 bg-[#08162d] shadow-lg shadow-accent/5'
                : 'border-white/10 bg-[#08162d]/60 hover:border-white/20'
            }`}
          >
            <button
              id={`faq-${i}`}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
            >
              <span className="font-bold text-sm md:text-base text-white group-hover:text-accent transition-colors leading-snug">
                <span className="text-accent font-black mr-2 text-xs">Q{String(i + 1).padStart(2, '0')}.</span>
                {faq.q}
              </span>
              <span
                className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isOpen
                    ? 'bg-accent border-accent text-primary rotate-45'
                    : 'border-white/20 text-white/50 group-hover:border-accent/50 group-hover:text-accent'
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}
            >
              <div className="px-6 pb-5 border-t border-white/10 pt-4">
                <p className="text-white/65 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactForm />
    </Suspense>
  );
}
