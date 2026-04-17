'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const tileImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('tiles') || img.imageHint.includes('flooring')
);

export default function TilesDesignsPage() {
  const pageDetails = {
    title: 'Tile Designs',
    description: `From flooring to backsplashes, tiles can dramatically transform a space. Explore our vast collection of ceramic, porcelain, mosaic, and natural stone tiles to find the perfect style for your home.`,
    inspiration: {
      title: 'Stunning Tile Applications',
      images: tileImages.length > 0 ? tileImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Choosing and Installing Tiles',
      steps: [
        {
          title: 'Selection Guidance',
          description:
            'Our experts help you select the right tile type, size, color, and pattern based on the application and your aesthetic goals.',
        },
        {
          title: 'Layout Design',
          description:
            'We create a detailed layout plan, considering patterns like herringbone, chevron, or basketweave to enhance your design.',
        },
        {
          title: 'Professional Installation',
          description:
            'Our experienced masons ensure precise and durable tile installation for a flawless finish on floors, walls, and backsplashes.',
        },
      ],
    },
    faq: {
      title: 'Tile Design FAQs',
      questions: [
        {
          question: 'What is the difference between ceramic and porcelain tiles?',
          answer:
            'Porcelain tiles are denser, less porous, and more durable than ceramic tiles, making them more suitable for high-traffic areas and outdoor use. Ceramic tiles are often more affordable and easier to cut.',
        },
        {
          question: 'How do I choose the right grout color?',
          answer:
            'Matching the grout to the tile color creates a seamless, uniform look. Using a contrasting grout color will highlight the tile shape and pattern, creating a more graphic, bold design.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
