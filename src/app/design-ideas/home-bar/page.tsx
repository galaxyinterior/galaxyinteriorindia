'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const homeBarImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('home bar')
);

export default function HomeBarPage() {
  const pageDetails = {
    title: 'Home Bar Designs',
    description: `Entertain in style with a custom home bar. Whether you have a dedicated room or a small corner, we can design a stylish and functional bar for your home.`,
    inspiration: {
      title: 'Stylish Home Bar Ideas',
      images: homeBarImages.length > 0 ? homeBarImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Creating Your Home Bar',
      steps: [
        {
          title: 'Custom Design',
          description:
            'We design a bar that fits your space and entertainment style, including features like wine storage, glass racks, and a sink.',
        },
        {
          title: 'Material Selection',
          description:
            'Choose from a range of materials like wood, quartz, and metal, along with dramatic lighting to set the mood.',
        },
        {
          title: 'Professional Build',
          description:
            'Our craftsmen build and install your home bar, creating the perfect spot for you to host friends and family.',
        },
      ],
    },
    faq: {
      title: 'Home Bar FAQs',
      questions: [
        {
          question: 'How much space do I need for a home bar?',
          answer:
            'You can create a home bar in a variety of spaces. A small bar cart can work in a living room corner, or you can build a full wet bar if you have a dedicated area.',
        },
        {
          question: 'What are the essentials for a home bar?',
          answer:
            'Essential elements include a counter surface, some storage for bottles and glassware, and comfortable seating if space allows. Good lighting is also key to creating the right ambiance.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
