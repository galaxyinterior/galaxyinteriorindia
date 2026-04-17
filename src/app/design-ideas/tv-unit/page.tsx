'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const tvUnitImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('living-room')
);

export default function TvUnitDesignsPage() {
  const pageDetails = {
    title: 'TV Unit Designs',
    description: `A TV unit is more than just a stand for your television. Our designs integrate storage, display, and style to create a focal point in your living room.`,
    inspiration: {
      title: 'Stylish TV Unit Designs',
      images: tvUnitImages.length > 0 ? tvUnitImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Designing the Perfect TV Unit',
      steps: [
        {
          title: 'Functional Design',
          description:
            'We design TV units that provide ample storage for media devices, books, and decor, while keeping wires neatly concealed.',
        },
        {
          title: 'Customization',
          description:
            'Choose from a variety of finishes, materials, and configurations to match your living room\'s style.',
        },
        {
          title: 'Seamless Installation',
          description:
            'Our expert team ensures your TV unit is installed perfectly, with attention to every detail.',
        },
      ],
    },
    faq: {
      title: 'TV Unit FAQs',
      questions: [
        {
          question: 'What is the ideal height for a TV unit?',
          answer:
            'The center of the TV screen should be at eye level when you are seated. Typically, the top of the TV unit should be around 24-28 inches from the floor.',
        },
        {
          question: 'Should the TV unit be wider than the TV?',
          answer:
            'Yes, for a balanced look, the TV unit should be at least a few inches wider than the TV on both sides.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
