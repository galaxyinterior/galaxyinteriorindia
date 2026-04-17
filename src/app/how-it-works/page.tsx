
"use client";

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const steps = [
  {
    number: 1,
    title: 'Consult Designer',
    image: 'https://picsum.photos/seed/step1/200/200',
    hint: 'architectural meeting',
  },
  {
    number: 2,
    title: 'Book Galaxy Interior',
    image: 'https://picsum.photos/seed/step2/200/200',
    hint: 'contract signing',
  },
  {
    number: 3,
    title: 'Confirm Design',
    image: 'https://picsum.photos/seed/step3/200/200',
    hint: '3d design approval',
  },
  {
    number: 4,
    title: 'Execution',
    image: 'https://picsum.photos/seed/step4/200/200',
    hint: 'construction in progress',
  },
  {
    number: 5,
    title: 'Handover',
    image: 'https://picsum.photos/seed/step5/200/200',
    hint: 'luxury interior handover',
  },
];

const processDetails = [
    {
      id: 'meet-designer',
      title: 'Meet your Galaxy expert team',
      image: 'https://images.unsplash.com/photo-1600607687940-4e2a09695d51?q=80&w=800&auto=format&fit=crop',
      hint: 'designer discussion',
      points: [
        {
          title: 'Initial Consultation',
          description: "Tell us about your dream space. We analyze your requirements and provide initial concepts for your Godda or Ranchi home.",
          buttonText: 'GET FREE CONSULTATION',
          buttonLink: '/contact',
        },
        {
          title: 'Personalised Quote',
          description: 'Receive a detailed quote including material specifications from top brands like Hettich and UltraTech.',
        },
      ],
    },
    {
        id: 'book-galaxy',
        title: 'Book Galaxy Interior',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop',
        hint: 'booking project',
        points: [
          {
            title: 'Seal the Deal',
            description: "Once you are happy with the concept and quote, pay the booking amount to initiate the detailed design phase with Galaxy Interior.",
          },
          {
            title: 'Finalise the 3D Designs',
            description: 'We create photorealistic 3D renders and virtual walkthroughs. Pick your materials, finishes, and lighting layouts.',
          },
        ],
      },
      {
        id: 'execution',
        title: 'Work Commences',
        image: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=800&auto=format&fit=crop',
        hint: 'site construction',
        points: [
          {
            title: 'Order Placement',
            description: 'Finalise the design with the next payment installment, and we begin procurement and site preparation.',
          },
          {
            title: 'Rigorous Supervision',
            description: 'Our Galaxy Interior site supervisors manage daily work, ensuring Vastu compliance and superior craftsmanship.',
          },
        ],
      },
      {
        id: 'final-install',
        title: 'Final Touches',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
        hint: 'interior installation',
        points: [
          {
            title: 'Material Dispatch & Fitting',
            description: 'Custom furniture and fittings are delivered on-site. Installation happens as per the finalized design blueprints.',
          },
          {
            title: 'Quality Checks',
            description: 'A multi-level quality check ensures every corner of your home is perfect.',
          },
        ],
      },
      {
        id: 'move-in',
        title: 'The Handover',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
        hint: 'luxury home ready',
        points: [
          {
            title: 'Final Walkthrough',
            description: 'Your Galaxy Interior designer performs a final check with you to ensure everything meets our high standards.',
          },
          {
            title: 'Move Into Your Dream Home',
            description: 'Your premium home is ready for you to move in and enjoy luxury living with Galaxy Interior.',
          },
        ],
      },
  ];

  const orderTypes = [
    {
      type: 'Structural & Architecture',
      overview: 'Foundation, civil work, wall construction & structural stability',
      milestone: 'Brickwork & structural completion',
      handover: 'Ready for finishing works',
    },
    {
      type: 'Interior Finishing',
      overview: 'False ceiling, painting, flooring & electrical/plumbing fixtures',
      milestone: 'All interior finishing completion',
      handover: 'Ready for furniture & cabinetry',
    },
    {
      type: 'Modular Furniture',
      overview: 'Modular kitchen, wardrobes, TV units (Hettich hardware)',
      milestone: 'Material dispatch & carcass fitting',
      handover: 'Final installation and handover',
    },
    {
      type: 'Luxury Accents',
      overview: 'Wallpaper, PVC paneling, LED profile lighting',
      milestone: 'Final site decoration',
      handover: 'Project Completion',
    },
  ];

const ProcessStep = ({ step, isLast }: { step: typeof steps[0], isLast: boolean }) => (
    <div className="flex items-center w-full">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-primary/10 shadow-lg">
          <Image src={step.image} alt={step.title} fill className="object-cover" data-ai-hint={step.hint} />
        </div>
        <p className="mt-3 text-xs sm:text-sm font-bold text-primary uppercase tracking-widest">{step.title}</p>
      </div>
      {!isLast && <div className="flex-1 h-px bg-primary/20 border-t border-dashed mx-2 sm:mx-4"></div>}
    </div>
  );
  
const MidwayBanner = () => (
    <section className="bg-primary text-white py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full bg-white/5 backdrop-blur-3xl -skew-x-12 translate-x-1/2" />
        <div className="container mx-auto px-4 text-center relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <CheckCircle2 className="h-10 w-10 text-accent" />
                <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight">Your project is now in Galaxy safe hands!</h2>
            </div>
        </div>
    </section>
);

const OrderTypesSection = () => (
    <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="font-display text-4xl md:text-6xl font-bold text-primary">Understand the Galaxy Process</h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500">
                    We follow a transparent phased-payment and execution system, ensuring that you only pay as your project progresses with Galaxy Interior.
                </p>
            </div>
            <Card className='shadow-2xl overflow-x-auto glass-card border-none'>
                <Table>
                    <TableHeader className="bg-primary">
                        <TableRow>
                            <TableHead className="font-bold text-white uppercase tracking-widest text-xs">Phase</TableHead>
                            <TableHead className="font-bold text-white uppercase tracking-widest text-xs">Scope of Work</TableHead>
                            <TableHead className="font-bold text-white uppercase tracking-widest text-xs">Payment Milestone</TableHead>
                            <TableHead className="font-bold text-white uppercase tracking-widest text-xs">Handover Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderTypes.map((order, index) => (
                            <TableRow key={index} className="hover:bg-primary/5 transition-colors">
                                <TableCell className="font-bold text-primary">{order.type}</TableCell>
                                <TableCell>{order.overview}</TableCell>
                                <TableCell>{order.milestone}</TableCell>
                                <TableCell className="font-bold text-accent">{order.handover}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    </section>
);

export default function HowItWorksPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-galaxy-dark text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tighter mb-12">
            The Galaxy Journey
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-white/60 mb-16">
            Building your dream home in Godda or Ranchi? Here is our end-to-end process from architecture to interiors.
          </p>

          <div className="mt-12 flex flex-row items-start justify-center gap-y-8">
            {steps.map((step, index) => (
              <ProcessStep key={step.number} step={step} isLast={index === steps.length - 1} />
            ))}
          </div>

          <div className="mt-20">
            <Button asChild size="lg" className="rounded-full px-12 h-14 font-bold uppercase tracking-widest shadow-2xl">
              <Link href="/contact">START YOUR PROJECT NOW</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Detailed Steps Section */}
      {processDetails.map((detail, index) => (
        <React.Fragment key={detail.id}>
            <section id={detail.id} className={`py-24 ${index % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'}`}>
                <div className={`container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center`}>
                    <div className={`relative aspect-video rounded-3xl overflow-hidden glass-card p-4 ${index % 2 === 1 ? 'md:order-last' : ''}`}>
                        <Image
                        src={detail.image}
                        alt={detail.title}
                        fill
                        className="object-cover rounded-3xl"
                        data-ai-hint={detail.hint}
                        />
                    </div>
                    <div className={`${index % 2 === 1 ? 'md:order-first' : ''}`}>
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-primary mb-12">{detail.title}</h2>
                        <div className="relative space-y-12 border-l-2 border-dashed border-primary/20 ml-6">
                            {detail.points.map((point, pIndex) => (
                                <div key={pIndex} className="relative pl-10">
                                    <div className="absolute -left-[11px] top-1.5 h-5 w-5 rounded-full bg-white border-4 border-primary shadow-lg"></div>
                                    <h3 className="text-2xl font-bold text-primary">{point.title}</h3>
                                    <p className="mt-3 text-gray-600 leading-relaxed">{point.description}</p>
                                    {point.buttonText && (
                                        <Button asChild className="mt-6 rounded-full px-8 shadow-lg">
                                            <Link href={point.buttonLink || '#'}>{point.buttonText}</Link>
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {detail.id === 'execution' && <MidwayBanner />}
        </React.Fragment>
      ))}

      <OrderTypesSection />
    </div>
  );
}
