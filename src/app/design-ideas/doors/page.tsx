'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const doorImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('door')
);

export default function DoorsPage() {
  const pageDetails = {
    title: 'Door Designs',
    description: `Doors are a critical element of your home's design and security. Explore our collection of stylish and durable doors, from grand main entrances to sleek interior doors.`,
    inspiration: {
      title: 'Beautiful Door Designs',
      images: doorImages.length > 0 ? doorImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Choosing the Right Doors',
      steps: [
        {
          title: 'Style & Material Selection',
          description:
            'We help you select the perfect door style—be it panel, flush, or glass—and material, such as wood, fiberglass, or steel.',
        },
        {
          title: 'Hardware & Finishes',
          description:
            'The right hardware, including handles, hinges, and locks, can elevate the look of your door. We offer a wide range of finishes to match your decor.',
        },
        {
          title: 'Professional Installation',
          description:
            'Our expert carpenters ensure your doors are hung perfectly, providing smooth operation and a secure fit.',
        },
      ],
    },
    faq: {
      title: 'Door Design FAQs',
      questions: [
        {
          question: 'What is the best material for a front door?',
          answer:
            'It depends on your priorities. Wood offers a classic, beautiful look but requires maintenance. Fiberglass is durable and low-maintenance, while steel is the most secure and affordable option.',
        },
        {
          question: 'What are panel doors?',
          answer:
            'Panel doors are a classic style, constructed with stiles and rails and featuring square or rectangular patterns. The number and design of panels can vary, creating different looks from traditional to contemporary.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
