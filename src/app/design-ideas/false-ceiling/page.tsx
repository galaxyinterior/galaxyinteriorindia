'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const ceilingImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('ceiling')
);

export default function FalseCeilingDesignsPage() {
  const pageDetails = {
    title: 'False Ceiling Designs',
    description: `Add a touch of elegance and sophistication to your home with a false ceiling. Our designs can incorporate ambient lighting, hide wiring, and improve acoustics.`,
    inspiration: {
      title: 'Modern False Ceiling Ideas',
      images: ceilingImages.length > 0 ? ceilingImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Designing Your False Ceiling',
      steps: [
        {
          title: 'Design Consultation',
          description:
            'Explore various designs, from simple and sleek to intricate and layered, with our expert designers.',
        },
        {
          title: 'Lighting Integration',
          description:
            'We help you choose and place lighting fixtures like cove lights, spotlights, and chandeliers to create the perfect mood.',
        },
        {
          title: 'Professional Installation',
          description:
            'Our skilled team ensures a flawless and safe installation using high-quality materials like gypsum and POP.',
        },
      ],
    },
    faq: {
      title: 'False Ceiling FAQs',
      questions: [
        {
          question: 'What are the benefits of a false ceiling?',
          answer:
            'A false ceiling can enhance the aesthetics of a room, provide better lighting options, conceal wires and pipes, and improve thermal insulation and acoustics.',
        },
        {
          question: 'What is the minimum height required for a false ceiling?',
          answer:
            'A minimum ceiling height of about 8.5 to 9 feet is generally recommended to install a false ceiling without making the room feel cramped.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
