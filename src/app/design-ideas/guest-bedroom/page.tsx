'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const guestBedroomImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('bedroom')
);

export default function GuestBedroomDesignsPage() {
  const pageDetails = {
    title: 'Guest Bedroom Designs',
    description: `Make your guests feel at home with a comfortable and welcoming guest bedroom. Discover our designs that balance style and functionality to create a perfect retreat for your visitors.`,
    inspiration: {
      title: 'Welcoming Guest Bedroom Ideas',
      images: guestBedroomImages.length > 0 ? guestBedroomImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Designing a Comfortable Guest Room',
      steps: [
        {
          title: 'Versatile Design',
          description:
            'We create a neutral and inviting space that can be easily personalized for different guests.',
        },
        {
          title: 'Essential Comforts',
          description:
            'A comfortable bed, adequate storage, and thoughtful amenities are key to a great guest room. We help you choose the right elements.',
        },
        {
          title: 'Flawless Execution',
          description:
            'We manage the entire process to deliver a beautiful and functional guest bedroom for your home.',
        },
      ],
    },
    faq: {
      title: 'Guest Bedroom FAQs',
      questions: [
        {
          question: 'What are the must-haves for a guest bedroom?',
          answer:
            'A comfortable bed, clean linens, a place for luggage, a closet with empty hangers, and a bedside table with a lamp are essentials.',
        },
        {
          question: 'How can I make a small guest room more functional?',
          answer:
            'Use a sofa bed or a daybed, install wall-mounted shelves for storage, and use a light color palette to make the space feel larger.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
