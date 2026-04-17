'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const officeImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('office')
);

export default function HomeOfficeDesignsPage() {
  const pageDetails = {
    title: 'Home Office Designs',
    description: `Create a productive and inspiring workspace at home. Explore our range of home office designs that are tailored to your needs, whether you need a quiet corner or a dedicated room.`,
    inspiration: {
      title: 'Functional Home Office Ideas',
      images: officeImages.length > 0 ? officeImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Designing Your Home Office',
      steps: [
        {
          title: 'Requirement Analysis',
          description:
            'We analyze your workflow and storage needs to design an office that maximizes productivity and comfort.',
        },
        {
          title: 'Ergonomic Design',
          description:
            'We focus on creating an ergonomic setup with the right desk, chair, and lighting to ensure your comfort and well-being.',
        },
        {
          title: 'Installation',
          description:
            'Our team ensures a seamless installation process, setting up your home office for immediate use.',
        },
      ],
    },
    faq: {
      title: 'Home Office FAQs',
      questions: [
        {
          question: 'What is the best lighting for a home office?',
          answer:
            'A combination of natural light and good task lighting is ideal. An adjustable desk lamp is essential to reduce eye strain.',
        },
        {
          question: 'How can I create a home office in a small space?',
          answer:
            'Consider using a corner of a room, a floating desk, or multi-functional furniture. Vertical storage can also help save space.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
