'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const wardrobeImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('wardrobe')
);

export default function WardrobeDesignsPage() {
  const pageDetails = {
    title: 'Wardrobe Designs',
    description: `Get organized with our stylish and functional wardrobe designs. From walk-in closets to sliding door wardrobes, we have a solution for every space and storage need.`,
    inspiration: {
      title: 'Modern Wardrobe Designs',
      images: wardrobeImages.length > 0 ? wardrobeImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Designing Your Perfect Wardrobe',
      steps: [
        {
          title: 'Space Planning',
          description:
            'We will help you optimize your space to create a wardrobe that meets your storage needs and complements your room\'s decor.',
        },
        {
          title: 'Customization',
          description:
            'Choose from a wide range of materials, finishes, and accessories to create a wardrobe that is uniquely yours.',
        },
        {
          title: 'Installation',
          description:
            'Our professional team will install your wardrobe with precision and care, ensuring a perfect fit and finish.',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          question: 'What are the different types of wardrobes?',
          answer:
            'The most common types are freestanding wardrobes, built-in wardrobes, and walk-in closets. The best type for you depends on your space and storage requirements.',
        },
        {
          question: 'How do I choose the right material for my wardrobe?',
          answer:
            'The choice of material depends on your budget and aesthetic preferences. Popular options include MDF, plywood, and laminates. Our designers can help you choose the best material for your needs.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
