'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const crockeryUnitImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('dining') || img.imageHint.includes('cabinet')
);

export default function CrockeryUnitsPage() {
  const pageDetails = {
    title: 'Crockery Unit Designs',
    description: `Showcase your beautiful dinnerware and add elegant storage to your dining area. Our crockery units are designed to be both functional and a beautiful piece of furniture.`,
    inspiration: {
      title: 'Elegant Crockery Unit Ideas',
      images: crockeryUnitImages.length > 0 ? crockeryUnitImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Designing Your Crockery Unit',
      steps: [
        {
          title: 'Custom Design',
          description:
            'We design custom units that fit your space and storage needs, whether you want a freestanding sideboard or a built-in cabinet.',
        },
        {
          title: 'Material & Finish',
          description:
            'Choose from a variety of materials and finishes, with options like glass doors, internal lighting, and custom hardware.',
        },
        {
          title: 'Perfect Execution',
          description:
            'Our craftsmen build and install your crockery unit with precision, creating a stunning and practical addition to your home.',
        },
      ],
    },
    faq: {
      title: 'Crockery Unit FAQs',
      questions: [
        {
          question: 'What is the difference between a sideboard and a crockery unit?',
          answer:
            'The terms are often used interchangeably. Traditionally, a sideboard is a longer, lower piece of furniture, while a crockery unit might be taller with a hutch. Both are used for storing and displaying dinnerware.',
        },
        {
          question: 'Should my crockery unit match my dining table?',
          answer:
            'It doesn\'t have to be an exact match, but it should complement the style and finish of your dining table and chairs for a cohesive look.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
