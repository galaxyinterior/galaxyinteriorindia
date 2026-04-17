'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const wallDecorImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('wall art') || img.imageHint.includes('gallery wall')
);

export default function WallDecorPage() {
  const pageDetails = {
    title: 'Wall Decor Ideas',
    description: `Bring your walls to life with creative decor. From statement art and gallery walls to textured panels and unique shelving, we have endless ideas to express your style.`,
    inspiration: {
      title: 'Creative Ways to Decorate Your Walls',
      images: wallDecorImages.length > 0 ? wallDecorImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Styling Your Walls',
      steps: [
        {
          title: 'Conceptualization',
          description:
            'Our designers help you brainstorm ideas and choose a theme or focal point for your wall decor.',
        },
        {
          title: 'Curation & Sourcing',
          description:
            'We help you find the perfect art, mirrors, clocks, and other decorative objects to create a cohesive look.',
        },
        {
          title: 'Layout & Installation',
          description:
            'We create a balanced layout and handle the professional installation, ensuring your decor is hung securely and beautifully.',
        },
      ],
    },
    faq: {
      title: 'Wall Decor FAQs',
      questions: [
        {
          question: 'How do I create a gallery wall?',
          answer:
            'Start by choosing a theme or color palette. Lay out your frames on the floor to finalize the arrangement before hanging them. Use a mix of frame sizes and orientations for a dynamic look.',
        },
        {
          question: 'How high should I hang artwork?',
          answer:
            'A good rule of thumb is to hang artwork so that its center is at eye level, which is typically 57-60 inches from the floor. When hanging art above furniture, leave about 6-8 inches of space.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
