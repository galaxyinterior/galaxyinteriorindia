'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const staircaseImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('staircase')
);

export default function StaircasePage() {
  const pageDetails = {
    title: 'Staircase Designs',
    description: `A staircase is more than just a connection between floors; it's a major architectural feature. Explore our designs for spiral, floating, and classic staircases to elevate your home.`,
    inspiration: {
      title: 'Stunning Staircase Designs',
      images: staircaseImages.length > 0 ? staircaseImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Designing Your Staircase',
      steps: [
        {
          title: 'Structural Design',
          description:
            'Our architects design structurally sound and aesthetically pleasing staircases that fit your space, from grand straight flights to compact spirals.',
        },
        {
          title: 'Material & Railing Selection',
          description:
            'Choose from materials like wood, metal, glass, and concrete. We also design custom railings and balustrades to complete the look.',
        },
        {
          title: 'Expert Construction',
          description:
            'Our experienced craftsmen build and install your staircase with precision, ensuring safety and durability.',
        },
      ],
    },
    faq: {
      title: 'Staircase Design FAQs',
      questions: [
        {
          question: 'What are floating stairs?',
          answer:
            'Floating stairs have treads that are attached to the wall without visible support underneath. This creates a minimalist, open look, making the space feel larger.',
        },
        {
          question: 'What is the difference between a baluster and a banister?',
          answer:
            'A banister (or handrail) is what you hold onto. Balusters are the vertical posts that support the handrail. The entire system is called a balustrade.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
