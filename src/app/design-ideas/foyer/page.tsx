'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const foyerImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('foyer') || img.imageHint.includes('entryway')
);

export default function FoyerDesignsPage() {
  const pageDetails = {
    title: 'Foyer Designs',
    description: `Make a lasting first impression. Our foyer designs create a warm and welcoming entryway that reflects your home's personality, combining style with practical storage solutions.`,
    inspiration: {
      title: 'Elegant Foyer and Entryway Ideas',
      images: foyerImages.length > 0 ? foyerImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Designing Your Grand Entrance',
      steps: [
        {
          title: 'Statement Piece',
          description:
            'We help you select a statement piece like a console table, a unique mirror, or a striking light fixture to define the space.',
        },
        {
          title: 'Smart Storage',
          description:
            'Incorporate shoe racks, coat hooks, or a stylish cabinet to keep your entryway organized and clutter-free.',
        },
        {
          title: 'Finishing Touches',
          description:
            'From elegant flooring to decorative accents, we ensure every detail contributes to a grand and welcoming entrance.',
        },
      ],
    },
    faq: {
      title: 'Foyer Design FAQs',
      questions: [
        {
          question: 'How can I make a small foyer feel larger?',
          answer:
            'Use a large mirror to create the illusion of space. Opt for light paint colors and ensure the area is well-lit. A slim console table can provide a surface without taking up too much floor space.',
        },
        {
          question: 'What is the most important element in a foyer?',
          answer:
            'Lighting is crucial. A beautiful pendant light or chandelier can instantly elevate the space and create a welcoming ambiance. A statement mirror is also a great addition.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
