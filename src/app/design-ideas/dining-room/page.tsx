'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const diningRoomImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('dining')
);

export default function DiningRoomDesignsPage() {
  const pageDetails = {
    title: 'Dining Room Designs',
    description: `The dining room is where families come together. Explore our collection of elegant dining room designs to create a perfect setting for your meals and memories.`,
    inspiration: {
      title: 'Inspiring Dining Room Designs',
      images: diningRoomImages.length > 0 ? diningRoomImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'How to Design Your Dining Room',
      steps: [
        {
          title: 'Consultation',
          description:
            'Our designers will help you choose the right dining table, chairs, and lighting to create a comfortable and stylish dining space.',
        },
        {
          title: '3D Visualization',
          description:
            'Visualize your dining room with our 3D designs to ensure every detail is perfect before we begin execution.',
        },
        {
          title: 'Execution',
          description:
            'Our team will handle the complete setup of your dining room, ensuring a high-quality finish and timely delivery.',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          question: 'What size dining table do I need?',
          answer:
            'The size of your dining table depends on the size of your room and the number of people you want to accommodate. A good rule of thumb is to allow at least 24 inches of space per person.',
        },
        {
          question: 'How do I choose the right lighting for my dining room?',
          answer:
            'A chandelier or a pendant light above the dining table is a classic choice. You can also use wall sconces or recessed lighting to create a warm and inviting ambiance.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
