'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const flooringImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('flooring')
);

export default function FlooringPage() {
  const pageDetails = {
    title: 'Flooring Designs',
    description: `The floor is the foundation of your interior design. Discover a world of flooring options, from classic hardwood and luxurious marble to durable vinyl and modern concrete.`,
    inspiration: {
      title: 'Beautiful Flooring Solutions',
      images: flooringImages.length > 0 ? flooringImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Selecting Your Perfect Floor',
      steps: [
        {
          title: 'Consultation',
          description:
            'We help you choose the best flooring material based on your lifestyle, budget, and the room\'s function.',
        },
        {
          title: 'Pattern & Layout Design',
          description:
            'We can create unique patterns and layouts to make your flooring a standout feature of your home.',
        },
        {
          title: 'Professional Installation',
          description:
            'Our skilled installers ensure your flooring is laid perfectly, providing a beautiful and long-lasting finish.',
        },
      ],
    },
    faq: {
      title: 'Flooring FAQs',
      questions: [
        {
          question: 'What is the most durable type of flooring?',
          answer:
            'Porcelain tile and luxury vinyl tile (LVT) are two of the most durable flooring options available. They are resistant to scratches, stains, and water, making them ideal for high-traffic areas.',
        },
        {
          question: 'Is hardwood flooring a good choice for kitchens?',
          answer:
            'While beautiful, solid hardwood is susceptible to water damage, making it risky for kitchens. Engineered hardwood is a more stable option, but luxury vinyl or tile are generally recommended for wet areas.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
