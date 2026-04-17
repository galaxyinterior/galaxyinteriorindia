'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const studyImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('study') || img.imageHint.includes('library')
);

export default function StudyRoomDesignsPage() {
  const pageDetails = {
    title: 'Study Room Designs',
    description: `Create a quiet and organized space for learning and concentration. Our study room designs focus on creating a conducive environment with smart storage and comfortable seating.`,
    inspiration: {
      title: 'Inspiring Study Room Ideas',
      images: studyImages.length > 0 ? studyImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Creating the Perfect Study Space',
      steps: [
        {
          title: 'Personalized Design',
          description:
            'We design a space that caters to the user\'s needs, whether it\'s for a child\'s homework or a personal library.',
        },
        {
          title: 'Smart Storage',
          description:
            'Custom bookshelves, cabinets, and desk organizers help keep the space tidy and distraction-free.',
        },
        {
          title: 'Professional Setup',
          description:
            'Our team handles the complete setup, from furniture assembly to lighting installation, creating a ready-to-use study area.',
        },
      ],
    },
    faq: {
      title: 'Study Room FAQs',
      questions: [
        {
          question: 'What are the essential elements of a good study room?',
          answer:
            'A good study room should have a comfortable chair, a spacious desk, adequate lighting, and plenty of storage to keep it organized.',
        },
        {
          question: 'What colors are best for a study room?',
          answer:
            'Colors like green and blue are known to promote concentration and calmness. Neutral colors can also create a serene environment. Avoid overly bright or distracting colors.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
