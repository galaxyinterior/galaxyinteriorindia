'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const windowImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('window')
);

export default function WindowsPage() {
  const pageDetails = {
    title: 'Window Designs',
    description: `Windows are your home's connection to the outside world, providing light, air, and views. Discover our range of window designs, from classic casement to modern picture windows.`,
    inspiration: {
      title: 'Inspiring Window Designs',
      images: windowImages.length > 0 ? windowImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Selecting the Perfect Windows',
      steps: [
        {
          title: 'Style Consultation',
          description:
            'We help you choose the right window style (casement, sliding, bay, etc.) to complement your home\'s architecture and functional needs.',
        },
        {
          title: 'Material & Glazing',
          description:
            'Select from materials like uPVC, aluminum, or wood, and glazing options for energy efficiency and sound insulation.',
        },
        {
          title: 'Precise Installation',
          description:
            'Our team ensures your windows are installed with precision for optimal performance, weather sealing, and security.',
        },
      ],
    },
    faq: {
      title: 'Window Design FAQs',
      questions: [
        {
          question: 'What are the most energy-efficient windows?',
          answer:
            'Double or triple-glazed windows with a low-E coating are the most energy-efficient. The frame material also matters; uPVC and wood are better insulators than aluminum.',
        },
        {
          question: 'What is a casement window?',
          answer:
            'A casement window is hinged at the side and opens outward to the left or right. They are known for providing excellent ventilation and a tight seal when closed.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
