'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const kidsBedroomImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('kids bedroom')
);

export default function KidsBedroomDesignsPage() {
  const pageDetails = {
    title: 'Kids Bedroom Designs',
    description: `Create a fun, imaginative, and safe space for your little ones. Our kids' bedroom designs are playful yet practical, with smart storage and themes that can grow with your child.`,
    inspiration: {
      title: 'Fun and Functional Kids Bedroom Ideas',
      images: kidsBedroomImages.length > 0 ? kidsBedroomImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Creating a Magical Kids Room',
      steps: [
        {
          title: 'Thematic Design',
          description:
            'From fairytale castles to superhero lairs, we design rooms that spark imagination and creativity.',
        },
        {
          title: 'Child-Safe & Durable',
          description:
            'We use non-toxic paints, rounded-edge furniture, and durable materials to ensure the room is safe for your child.',
        },
        {
          title: 'Smart Storage Solutions',
          description:
            'We incorporate clever storage for toys, books, and clothes to keep the room organized and clutter-free.',
        },
      ],
    },
    faq: {
      title: 'Kids Bedroom FAQs',
      questions: [
        {
          question: 'How can I design a room that grows with my child?',
          answer:
            'Opt for a neutral base color and add personality with easily updatable elements like bedding, wall decals, and accessories. Choose adaptable furniture that can be repurposed as your child grows.',
        },
        {
          question: 'What are the best storage solutions for a kids room?',
          answer:
            'Use a combination of open shelves for display, closed cabinets for clutter, and labeled bins or baskets to make cleanup easy and fun for kids.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
