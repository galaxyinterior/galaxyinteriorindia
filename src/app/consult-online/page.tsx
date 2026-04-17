
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { Phone, Mail, MapPin, UserCheck, Ruler, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

const designers = [
  {
    name: 'Sameer Ahmed',
    role: 'Founder & Lead Architect',
    image: 'https://picsum.photos/seed/team1/400/400',
    hint: 'male architect',
    phone: '+91 91134 39057',
    email: 'info@galaxyinterior.com',
  },
  {
    name: 'Sonia Sharma',
    role: 'Head of Interior Design',
    image: 'https://picsum.photos/seed/team2/400/400',
    hint: 'female interior designer',
    phone: '+91 96319 80881',
    email: 'info@galaxyinterior.com',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Senior Site Supervisor',
    image: 'https://picsum.photos/seed/team3/400/400',
    hint: 'construction expert',
    phone: '+91 91134 39057',
    email: 'info@galaxyinterior.com',
  },
  {
    name: 'Priya Singh',
    role: '3D Visualization Expert',
    image: 'https://picsum.photos/seed/team4/400/400',
    hint: '3d visualizer',
    phone: '+91 96319 80881',
    email: 'info@galaxyinterior.com',
  },
];

const serviceOptions = [
  "False Ceiling", "Wallpaper", "Wall Paints", "Tiles Flooring", 
  "Wooden Flooring", "PVC Work", "Lights", "Wall Panelling", 
  "Modular Kitchen", "Wardrobes", "Tv Units", "Bed", 
  "Partition Panels", "Pooja Units", "Dressing Table", "Other Interior Work"
];

export default function ConsultOnlinePage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service) 
        : [...prev, service]
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const area = formData.get('area') as string;
    const reference = formData.get('reference') as string;
    const message = formData.get('message') as string;

    const whatsappMessage = `*New Consultation Request from Galaxy Interior*
--------------------------
*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Area/Size:* ${area}
*Reference:* ${reference}
*Services Selected:* ${selectedServices.length > 0 ? selectedServices.join(', ') : 'None selected'}
*Additional Info:* ${message || 'N/A'}`;

    const whatsappUrl = `https://wa.me/919631980881?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative py-32 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 z-0"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-6 rounded-full bg-accent text-primary font-bold tracking-[0.2em] px-6 py-2 uppercase border-none shadow-lg">
            GALAXY EXPERIENCE
          </Badge>
          <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-none">
            Consult <span className="text-accent italic">Online</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 font-medium">
            Take the first step towards your dream home. Our design experts in Godda and Ranchi are just a message away.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white clip-path-slant-up"></div>
      </section>

      {/* Main Form Section */}
      <section className="py-24 -mt-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            {/* Left: Form Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="p-8 bg-gray-50 rounded-[2rem] border-l-8 border-accent shadow-sm">
                <h2 className="text-3xl font-bold text-primary mb-6">How it works?</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">1</div>
                    <div>
                      <h3 className="font-bold text-primary">Fill Details</h3>
                      <p className="text-sm text-gray-500">Provide your basic info and project requirements.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">2</div>
                    <div>
                      <h3 className="font-bold text-primary">Select Services</h3>
                      <p className="text-sm text-gray-500">Choose the specific works you are interested in.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">3</div>
                    <div>
                      <h3 className="font-bold text-primary">Expert Connect</h3>
                      <p className="text-sm text-gray-500">We will analyze and connect with you via WhatsApp/Call.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-primary font-bold">
                    <UserCheck className="w-6 h-6 text-accent" />
                    <span>Personalized Consultation</span>
                </div>
                <div className="flex items-center gap-4 text-primary font-bold">
                    <Ruler className="w-6 h-6 text-accent" />
                    <span>Accurate 3D Estimations</span>
                </div>
                <div className="flex items-center gap-4 text-primary font-bold">
                    <MessageSquare className="w-6 h-6 text-accent" />
                    <span>Direct WhatsApp Support</span>
                </div>
              </div>
            </div>

            {/* Right: The Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl rounded-[3rem] border-none overflow-hidden glass-card">
                <CardHeader className="bg-primary/5 p-10 text-center border-b border-primary/10">
                  <CardTitle className="text-4xl text-primary font-display">Project Inquiry Form</CardTitle>
                  <CardDescription className="text-gray-500 text-lg">
                    Fields marked with <span className="text-red-500">*</span> are mandatory.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-10">
                  <form onSubmit={handleSubmit} className="space-y-10">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-primary font-bold uppercase tracking-widest text-xs">Full Name *</Label>
                        <Input id="name" name="name" placeholder="John Doe" required className="rounded-xl h-12 border-primary/20 focus:border-primary transition-all" />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-primary font-bold uppercase tracking-widest text-xs">Email Address *</Label>
                        <Input id="email" name="email" type="email" placeholder="john@example.com" required className="rounded-xl h-12 border-primary/20 focus:border-primary transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="phone" className="text-primary font-bold uppercase tracking-widest text-xs">Phone Number *</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="+91 00000 00000" required className="rounded-xl h-12 border-primary/20 focus:border-primary transition-all" />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="area" className="text-primary font-bold uppercase tracking-widest text-xs">Size (Area / Sqft) *</Label>
                        <Input id="area" name="area" placeholder="e.g. 1200 Sqft" required className="rounded-xl h-12 border-primary/20 focus:border-primary transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="reference" className="text-primary font-bold uppercase tracking-widest text-xs">Reference Name</Label>
                        <Input id="reference" name="reference" placeholder="Friend, Social Media, etc." className="rounded-xl h-12 border-primary/20 focus:border-primary transition-all" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <Label className="text-primary font-bold uppercase tracking-widest text-xs">Services Interested In *</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 p-6 rounded-[2rem] bg-gray-50 border border-primary/10">
                        {serviceOptions.map((service) => (
                          <div key={service} className="flex items-center space-x-3 group cursor-pointer">
                            <Checkbox 
                              id={service} 
                              checked={selectedServices.includes(service)}
                              onCheckedChange={() => toggleService(service)}
                              className="w-5 h-5 rounded-md border-primary transition-all group-hover:scale-110"
                            />
                            <label htmlFor={service} className="text-sm font-medium leading-none cursor-pointer group-hover:text-primary transition-colors">
                              {service}
                            </label>
                          </div>
                        ))}
                      </div>
                      {selectedServices.length === 0 && (
                        <p className="text-xs text-red-500 font-bold italic animate-pulse">Please select at least one service.</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="message" className="text-primary font-bold uppercase tracking-widest text-xs">Any Other Requirements</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Share your vision, color preferences, or specific needs..."
                        rows={5}
                        className="rounded-xl border-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={selectedServices.length === 0}
                      className="w-full rounded-full h-16 font-bold uppercase tracking-[0.2em] shadow-2xl bg-primary hover:bg-galaxy-dark transition-all text-white" 
                      size="lg"
                    >
                      SEND INQUIRY VIA WHATSAPP
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary text-white font-bold px-4 py-1">OUR CORE TEAM</Badge>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-primary">
              Connect with Our Experts
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              Directly talk to our senior designers and site engineers for your Galaxy Interior project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {designers.map((designer) => (
              <Card key={designer.name} className="group overflow-hidden rounded-[2.5rem] border-none shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={designer.image}
                      alt={designer.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint={designer.hint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                        <div className="space-y-3 text-white">
                            <a href={`tel:${designer.phone}`} className="flex items-center gap-3 text-sm font-bold hover:text-accent transition-colors">
                                <Phone className="h-4 w-4" />
                                <span>{designer.phone}</span>
                            </a>
                            <a href={`mailto:${designer.email}`} className="flex items-center gap-3 text-sm font-bold hover:text-accent transition-colors">
                                <Mail className="h-4 w-4" />
                                <span>{designer.email}</span>
                            </a>
                        </div>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-primary mb-1">
                      {designer.name}
                    </h3>
                    <p className="text-accent text-xs font-bold uppercase tracking-widest">{designer.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Summary Footer Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto rounded-[3rem] overflow-hidden bg-primary text-white shadow-2xl grid md:grid-cols-2">
                <div className="p-12 space-y-8 bg-galaxy-dark">
                    <div className="flex items-center gap-3">
                        <div className="bg-white rounded-lg inline-block overflow-hidden">
                          <div className="relative w-64 h-16">
                            <Image 
                              src="/logo2.png" 
                              alt="Galaxy Interior Logo" 
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                    </div>
                    <p className="text-white/60 text-lg italic">"Shaping Dreams, Crafting Spaces. Luxury architecture and interiors tailored for Jharkhand's elite."</p>
                    <div className="flex gap-4">
                        <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white hover:text-primary">
                            <a href="tel:+919113439057">Call Godda</a>
                        </Button>
                        <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white hover:text-primary">
                            <a href="tel:+919631980881">Call Ranchi</a>
                        </Button>
                    </div>
                </div>
                <div className="p-12 space-y-8 flex flex-col justify-center border-l border-white/10">
                    <div className="flex items-start gap-4">
                        <MapPin className="h-6 w-6 text-accent shrink-0" />
                        <div>
                            <p className="font-bold text-lg mb-1">Visit our Experience Center</p>
                            <p className="text-white/60 text-sm">Godda: Near Durga Mandir Sarkanda, JH - 814133</p>
                            <p className="text-white/60 text-sm">Ranchi: Morabadi, Ranchi, JH - 834006</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Mail className="h-6 w-6 text-accent shrink-0" />
                        <a href="mailto:info@galaxyinterior.com" className="text-lg hover:text-accent transition-colors">info@galaxyinterior.com</a>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
