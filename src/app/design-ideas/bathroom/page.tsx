'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const bathroomImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('bathroom')
);

export default function BathroomDesignsPage() {
  const pageDetails = {
    title: 'Bathroom Designs',
    description: `Transform your bathroom into a personal spa with our modern bathroom designs. From luxurious bathtubs to space-saving vanities, we have everything you need to create a relaxing and functional space.`,
    inspiration: {
      title: 'Inspiring Bathroom Designs',
      images: bathroomImages.length > 0 ? bathroomImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Creating Your Dream Bathroom',
      steps: [
        {
          title: 'Consultation',
          description:
            'Our designers will work with you to create a bathroom design that is both beautiful and functional, tailored to your specific needs.',
        },
        {
          title: 'Material Selection',
          description:
            'We help you choose the right tiles, fixtures, and fittings to create a cohesive and stylish look.',
        },
        {
          title: 'Execution',
          description:
            'Our experienced team handles all aspects of the renovation, from plumbing and electrical work to tiling and installation.',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          question: 'How can I make my small bathroom look bigger?',
          answer:
            'Using large mirrors, light-colored tiles, and a clear glass shower screen can make a small bathroom feel more spacious. Good lighting is also key.',
        },
        {
          question: 'What are the latest trends in bathroom design?',
          answer:
            'Current trends include walk-in showers, freestanding tubs, smart toilets, and natural materials like wood and stone. Matte black fixtures are also very popular.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
