'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const balconyImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('balcony')
);

export default function BalconyDesignsPage() {
  const pageDetails = {
    title: 'Balcony Designs',
    description: `Transform your balcony into a beautiful and functional outdoor retreat. Whether you want a cozy reading nook, a vertical garden, or a small dining spot, we can help you make the most of your balcony.`,
    inspiration: {
      title: 'Creative Balcony Ideas',
      images: balconyImages.length > 0 ? balconyImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Creating Your Balcony Oasis',
      steps: [
        {
          title: 'Planning & Layout',
          description:
            'We help you plan the layout based on your balcony\'s size and how you want to use the space.',
        },
        {
          title: 'Weather-Resistant Furniture',
          description:
            'Choose from our range of durable and weather-resistant furniture, including bistro sets, loungers, and hanging chairs.',
        },
        {
          title: 'Greenery & Lighting',
          description:
            'We incorporate plants, vertical gardens, and outdoor lighting to create a lush and inviting atmosphere.',
        },
      ],
    },
    faq: {
      title: 'Balcony Design FAQs',
      questions: [
        {
          question: 'How can I add privacy to my balcony?',
          answer:
            'You can use outdoor curtains, bamboo screens, tall plants, or a trellis with climbing vines to add privacy to your balcony.',
        },
        {
          question: 'What kind of flooring is best for a balcony?',
          answer:
            'Interlocking deck tiles, artificial grass, and outdoor rugs are all great, easy-to-install options that can instantly upgrade your balcony floor.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
