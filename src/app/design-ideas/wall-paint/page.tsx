'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const wallPaintImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('interior paint') || img.imageHint.includes('living-room')
);

export default function WallPaintPage() {
  const pageDetails = {
    title: 'Wall Paint Ideas',
    description: `The right paint color can completely change the mood of a room. From bold accent walls to serene neutrals, explore our color palettes and painting techniques to refresh your home.`,
    inspiration: {
      title: 'Transform Your Home with Color',
      images: wallPaintImages.length > 0 ? wallPaintImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Choosing the Perfect Paint',
      steps: [
        {
          title: 'Color Consultation',
          description:
            'Our color experts help you choose the perfect shades that reflect your personality and complement your furniture and lighting.',
        },
        {
          title: 'Finishes & Techniques',
          description:
            'We guide you on finishes (matte, satin, eggshell) and special techniques like color blocking or textured painting for a unique look.',
        },
        {
          title: 'Professional Painting Service',
          description:
            'Our professional painters ensure a perfect, long-lasting finish with meticulous prep work and precise application.',
        },
      ],
    },
    faq: {
      title: 'Wall Paint FAQs',
      questions: [
        {
          question: 'What is an accent wall?',
          answer:
            'An accent wall is a wall that is painted a different color from the other walls in the room. It\'s a great way to add a pop of color and create a focal point.',
        },
        {
          question: 'What is the 60-30-10 rule in interior design?',
          answer:
            'It\'s a classic decorating rule. 60% of the room should be a dominant color (walls), 30% should be a secondary color (furniture), and 10% should be an accent color (accessories, small decor items).',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
