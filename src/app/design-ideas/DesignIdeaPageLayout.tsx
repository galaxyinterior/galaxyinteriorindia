"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import DesignIdeasNav from './DesignIdeasNav';
import { ChevronRight } from 'lucide-react';

interface DesignIdeaPageProps {
  title: string;
  description: string;
  inspiration: {
    title: string;
    images: ImagePlaceholder[];
  };
  howItWorks: {
    title: string;
    steps: { title: string; description: string }[];
  };
  faq: {
    title: string;
    questions: { question: string; answer: string }[];
  };
}

export default function DesignIdeaPageLayout({ title, description, inspiration, howItWorks, faq }: DesignIdeaPageProps) {
  return (
    <>
      <section className="py-4 sm:py-8 bg-white border-b">
        <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-500 mb-4 overflow-x-auto whitespace-nowrap">
                <Link href="/" className="hover:text-primary">Home</Link>
                <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
                <Link href="/design-ideas" className="hover:text-primary">Design Ideas</Link>
                <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
                <span className="font-medium text-gray-700 truncate">{title}</span>
            </div>
            <DesignIdeasNav />
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-gray-800">{title}</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">{description}</p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/#contact">Get Free Consultation</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">{inspiration.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(inspiration.images.length > 0 ? inspiration.images : PlaceHolderImages.slice(0, 6)).map((image) => (
              <Card key={image.id} className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-gray-800">{image.description}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">{howItWorks.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.steps.map((step, index) => (
              <Card key={index} className="p-8 text-center rounded-xl">
                <div className="text-4xl font-bold text-primary mb-4">0{index + 1}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">{faq.title}</h2>
          <Accordion type="single" collapsible className="w-full">
            {faq.questions.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left text-lg font-medium">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base text-gray-600">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}

    