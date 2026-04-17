'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const livingRoomImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('living-room') || img.imageHint.includes('sofa')
);

export default function LivingRoomDesignsPage() {
  const pageDetails = {
    title: 'Living Room Designs',
    description: `A living room is where you spend most of your time with family and friends. Explore our collection of modern, traditional, and transitional living room designs to find the perfect style for your home. From comfortable sofas to elegant coffee tables, we have everything you need to create a warm and inviting space.`,
    inspiration: {
      title: 'Get Inspired by Our Living Room Designs',
      images: livingRoomImages.length > 0 ? livingRoomImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'How to Design Your Living Room',
      steps: [
        {
          title: 'Consult with Our Designers',
          description:
            'Share your vision and requirements with our expert designers. We will help you create a personalized design that reflects your style and fits your budget.',
        },
        {
          title: 'Visualize Your Space',
          description:
            'Get a 3D visualization of your living room design. This will help you see how the furniture and decor will look in your space before you make any final decisions.',
        },
        {
          title: 'Execution and Installation',
          description:
            'Our team will handle everything from sourcing materials to installation. We ensure a hassle-free experience and a high-quality finish for your dream living room.',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          question: 'How much does it cost to design a living room?',
          answer:
            'The cost of designing a living room can vary widely depending on the size of the room, the quality of materials, and the extent of the work. We offer packages to suit various budgets.',
        },
        {
          question: 'How long does it take to design and execute?',
          answer:
            'A typical living room project can take anywhere from 4 to 8 weeks, from the initial design consultation to the final installation.',
        },
        {
          question: 'Can I use my existing furniture?',
          answer:
            'Absolutely! Our designers can incorporate your existing furniture into the new design or suggest ways to refurbish them to fit the new look.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
