'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const spaceSavingImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('small apartment')
);

export default function SpaceSavingFurniturePage() {
  const pageDetails = {
    title: 'Space Saving Furniture',
    description: `Make the most of every square foot with our ingenious space-saving furniture. Perfect for modern apartments and compact homes, our solutions are stylish, multi-functional, and smart.`,
    inspiration: {
      title: 'Smart Solutions for Small Spaces',
      images: spaceSavingImages.length > 0 ? spaceSavingImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Maximizing Your Space',
      steps: [
        {
          title: 'Space Assessment',
          description:
            'Our designers analyze your layout to identify opportunities for multi-functional and space-efficient furniture.',
        },
        {
          title: 'Custom Solutions',
          description:
            'From sofa beds and extendable dining tables to wall-mounted desks and modular storage, we offer custom solutions for your needs.',
        },
        {
          title: 'Seamless Integration',
          description:
            'We ensure that your space-saving furniture blends perfectly with your existing decor, enhancing both functionality and style.',
        },
      ],
    },
    faq: {
      title: 'Space-Saving Furniture FAQs',
      questions: [
        {
          question: 'What is the most versatile piece of space-saving furniture?',
          answer:
            'A high-quality sofa bed is one of the most versatile pieces, instantly turning a living room into a guest room. Modular shelving units are also incredibly flexible.',
        },
        {
          question: 'How can I make a small room feel less cluttered?',
          answer:
            'Choose furniture with built-in storage. Use vertical space with tall bookshelves or wall-mounted cabinets. Opt for furniture with legs to create a sense of openness.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
