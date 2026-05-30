
"use client"

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Handshake, Target, Rocket, Sparkles, PencilRuler, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const teamMembers = [
  { name: 'Shivashish Ranjan', role: 'Founder & Chairman', image: '/ceo.png' },
  { name: 'Kumkum Ranjan', role: 'CEO' },
  { name: 'Ratan Kumar', role: 'General Manager (GM)' },
  { name: 'Anjula Devi', role: 'Managing Director (MD)' },
];

interface JourneyMilestone {
  text: string;
  image?: string;
}

interface JourneyItem {
  year: string;
  milestones: (string | JourneyMilestone)[];
}

const journeyData: JourneyItem[] = [
  {
    year: '2021',
    milestones: [
      'Galaxy Interior was founded with a simple yet powerful vision—to transform every space into a perfect blend of luxury, comfort, and unique identity. What started as a small initiative has grown into a journey driven by creativity, dedication, and trust.',
    ],
  },
  {
    year: '2023',
    milestones: [
      'Established our first office in Bhagalpur, laying a strong foundation for our professional growth.',
    ],
  },
  {
    year: '2024',
    milestones: [
      'Expanded to Ranchi, marking a significant step forward in building our brand presence.',
    ],
  },
  {
    year: '2025',
    milestones: [
      'Continued our journey by opening a new office in Kishanganj, further strengthening our reach.',
    ],
  },
  {
    year: '2026',
    milestones: [
      'Our goal is to expand into Purnia and Patna, taking Galaxy Interior to the next level as a trusted regional brand.',
    ],
  },
];

function AboutHero() {
  return (
    <section className="relative pt-36 pb-20 bg-logo-radial bg-logo-mandala border-b border-accent/10 text-white overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl animate-fade-up">
        <Badge className="mb-6 rounded-full bg-accent text-primary font-black tracking-[0.20em] px-6 py-2 border-none shadow-lg text-[10px] uppercase">
          LUXURY INTERIOR SPECIALIST
        </Badge>
        <h1 className="font-display text-4xl md:text-7xl font-black tracking-tight mb-6 uppercase text-shadow-lg leading-tight">
          Shaping Dreams, <span className="text-gold italic block md:inline mt-1 md:mt-0">Crafting Spaces</span>
        </h1>
        <p className="text-white/85 text-base md:text-xl font-semibold max-w-2xl mx-auto leading-relaxed">
          Smart & AI-Based Design Solutions for Modern Living. Complete Interior & Construction Solutions – From Planning to Execution.
        </p>
      </div>
    </section>
  );
}

function CompanyOverview() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-square rounded-[32px] overflow-hidden glass-card p-3 m3-elevation-2">
          <Image
            src="/about.jpeg"
            alt="Luxury Interior Design by Galaxy"
            fill
            className="object-cover rounded-[24px]"
            data-ai-hint="interior architect working"
          />
        </div>
        <div className="animate-fade-up">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-primary mb-8 leading-tight">Company Overview</h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              Galaxy Interior is a full-service interior design and construction company committed to delivering luxury, functionality, and innovation in every project.
            </p>
            <p>
              We specialize in transforming residential and commercial spaces into modern, elegant, and highly efficient environments using advanced design tools, smart planning techniques, and high-quality materials.
            </p>
            <p>
              Our approach is based on detail-oriented planning, transparent execution, and client-focused customization, ensuring every project reflects the client’s vision while maintaining global design standards. We work in <span className="font-bold text-primary">Jharkhand, Bihar, and Bengal</span>, offering complete solutions from concept design to final handover.
            </p>
          </div>
          <Button asChild size="lg" className="mt-10 rounded-full px-12 h-14 font-black uppercase tracking-[0.15em] m3-elevation-2 hover:m3-elevation-3 transition-all hover:scale-105 active:scale-95 m3-state-layer relative overflow-hidden">
            <Link href="/contact">Start Your Project</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function VisionMission() {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <Card className="glass-card p-10 border-none m3-elevation-2 hover:m3-elevation-3 rounded-[28px] relative overflow-hidden group m3-transition hover:-translate-y-1">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Target className="h-32 w-32 text-primary" />
            </div>
            <div className="relative z-10">
              <div className="bg-primary text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-display font-bold text-primary mb-6">Our Vision</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                To become the <span className="font-bold text-primary">No.1 Interior & Construction Brand</span> in Eastern India, known for innovation, luxury design, and trust.
              </p>
            </div>
          </Card>

          <Card className="p-10 border border-white/5 m3-elevation-2 hover:m3-elevation-3 rounded-[28px] relative overflow-hidden group bg-primary text-white m3-transition hover:-translate-y-1">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Rocket className="h-32 w-32 text-white" />
            </div>
            <div className="relative z-10">
              <div className="bg-accent text-primary w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <Rocket className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-6">Our Mission</h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-accent shrink-0" />
                  <span>Deliver world-class interior & construction solutions</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-accent shrink-0" />
                  <span>Use modern & AI-based design technologies</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-accent shrink-0" />
                  <span>Ensure timely project completion with top quality</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-accent shrink-0" />
                  <span>Build long-term relationships with clients</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function DesignPhilosophy() {
  const philosophy = [
    { icon: <Zap />, title: 'Functional', desc: 'Spaces that work perfectly for your daily life.' },
    { icon: <Sparkles />, title: 'Aesthetic', desc: 'Beautiful designs that inspire every day.' },
    { icon: <Users />, title: 'Personalized', desc: 'Reflecting your unique vision and style.' },
    { icon: <PencilRuler />, title: 'Future-ready', desc: 'Designs built with modern & smart technology.' },
  ]
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary text-white font-bold px-4 py-1">OUR PHILOSOPHY</Badge>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-primary">How We Design</h2>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600">
            We combine <span className="font-bold text-primary">creative design + engineering precision + smart technology</span> to create spaces that are both beautiful and practical.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {philosophy.map((item, index) => (
            <div key={index} className="text-center group p-8 rounded-[28px] bg-gray-50 border border-gray-100 hover:bg-primary m3-transition hover:-translate-y-1 hover:border-primary/10">
              <div className="inline-block bg-white text-primary p-5 rounded-2xl mb-6 m3-elevation-1 group-hover:bg-accent group-hover:text-primary m3-transition">
                {item.icon && <div className="h-8 w-8">{item.icon}</div>}
              </div>
              <h3 className="text-2xl font-black text-primary group-hover:text-white mb-3 uppercase tracking-tight">{item.title}</h3>
              <p className="text-gray-500 group-hover:text-white/70 leading-relaxed text-sm md:text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GrowthJourney() {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-primary">Our Growth Journey</h2>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 sm:left-1/2 top-0 h-full w-0.5 bg-primary/20 -translate-x-1/2"></div>
          {journeyData.map((item, index) => (
            <div key={index} className="relative mb-16 last:mb-0">
              <div className="flex items-center gap-4 sm:gap-8">
                <div className="hidden sm:flex w-1/2"></div>
                <div className="z-10 bg-white">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center ring-8 ring-primary/5">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </div>
                </div>
                <div className="sm:w-1/2 text-left">
                  <p className="text-2xl sm:text-3xl font-bold text-primary">{item.year}</p>
                </div>
              </div>
              <div className="mt-4 ml-12 sm:ml-0 sm:mt-0">
                <div className="sm:flex">
                  <div className="sm:w-1/2 sm:pr-12"></div>
                  <div className="sm:w-1/2 sm:pl-12">
                    <ul className="space-y-6">
                      {item.milestones.map((milestone, mIndex) => (
                        <li key={mIndex} className="flex gap-4">
                          <span className="text-accent mt-1.5">•</span>
                          <div>
                            {typeof milestone === 'string' ? (
                              <p className="text-lg text-gray-600 leading-relaxed">{milestone}</p>
                            ) : (
                              <>
                                <p className="text-lg text-gray-600 font-bold leading-relaxed">{milestone.text}</p>
                                {milestone.image && (
                                  <div className="mt-3 border rounded-xl p-3 bg-white inline-block shadow-sm">
                                    <Image src={milestone.image} alt="Galaxy Interior Award" width={150} height={45} className='object-contain' />
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MeetTheTeam() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-primary">Meet Our Team</h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500">The expert architects and designers behind every Galaxy project.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* CEO Block - Left Side */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="group text-center animate-fade-up w-full max-w-sm">
              <div className="relative w-full aspect-[4/5] mx-auto rounded-[28px] overflow-hidden mb-8 m3-elevation-3 transition-all duration-700 hover:scale-[1.01] border-[6px] border-white bg-gray-50">
                <img
                  loading="lazy"
                  src={teamMembers[0].image}
                  alt={teamMembers[0].name}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-3xl font-display font-black text-primary">{teamMembers[0].name}</h3>
              <p className="text-accent font-bold uppercase tracking-[0.2em] mt-2">{teamMembers[0].role}</p>
              <div className="w-12 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
            </div>
          </div>

          {/* Other Members - Right Side Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {teamMembers.slice(1).map((member, index) => (
              <div key={index} className="group text-center animate-fade-up" style={{ animationDelay: `${index * 150}ms` }}>
                {member.image ? (
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-[24px] overflow-hidden mb-5 m3-elevation-2 transition-all duration-500 group-hover:-translate-y-1.5 border-4 border-white">
                    <img
                      loading="lazy"
                      src={member.image}
                      alt={member.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-[24px] overflow-hidden mb-5 m3-elevation-1 bg-gray-50 flex flex-col justify-center items-center transition-all duration-500 group-hover:-translate-y-1.5 border-4 border-gray-100/80">
                    <span className="text-4xl sm:text-5xl font-display font-black text-gray-200 group-hover:text-primary/20 transition-colors uppercase tracking-widest">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
                <h3 className="text-xl sm:text-2xl font-bold text-primary">{member.name}</h3>
                <p className="text-accent font-bold uppercase tracking-widest text-xs sm:text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      <AboutHero />
      <CompanyOverview />
      <VisionMission />
      <DesignPhilosophy />
      <GrowthJourney />
      <MeetTheTeam />
    </div>
  )
}
