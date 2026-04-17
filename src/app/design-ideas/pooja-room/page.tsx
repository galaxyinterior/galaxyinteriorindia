'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const poojaRoomImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('temple') || img.imageHint.includes('prayer')
);

export default function PoojaRoomDesignsPage() {
  const pageDetails = {
    title: 'Pooja Room Designs',
    description: `Create a serene and sacred space for prayer and meditation. Our Pooja room designs blend traditional elements with modern aesthetics to create a divine corner in your home.`,
    inspiration: {
      title: 'Divine Pooja Room Designs',
      images: poojaRoomImages.length > 0 ? poojaRoomImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Creating Your Sacred Space',
      steps: [
        {
          title: 'Vastu-Compliant Design',
          description:
            'Our designs adhere to Vastu principles to ensure a positive and peaceful environment.',
        },
        {
          title: 'Material & Craftsmanship',
          description:
            'Choose from a range of materials like wood, marble, and metal, crafted with intricate details to create a beautiful Mandir.',
        },
        {
          title: 'Thoughtful Lighting',
          description:
            'We use a combination of ambient and accent lighting to create a serene and divine atmosphere.',
        },
      ],
    },
    faq: {
      title: 'Pooja Room FAQs',
      questions: [
        {
          question: 'What is the best location for a Pooja room according to Vastu?',
          answer:
            'The northeast corner of the house is considered the most auspicious direction for a Pooja room.',
        },
        {
          question: 'What materials are best for a Mandir?',
          answer:
            'Wood, particularly Sheesham or Teak, and marble are popular and auspicious choices for building a Mandir.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
