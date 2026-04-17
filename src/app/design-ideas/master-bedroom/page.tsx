'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const bedroomImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('bedroom') || img.imageHint.includes('bed')
);

export default function MasterBedroomDesignsPage() {
  const pageDetails = {
    title: 'Master Bedroom Designs',
    description: `Your master bedroom is your personal sanctuary. Discover our range of master bedroom designs, from cozy and rustic to sleek and modern. We'll help you create a peaceful and relaxing retreat with the perfect bed, lighting, and storage solutions.`,
    inspiration: {
      title: 'Inspiring Master Bedroom Ideas',
      images: bedroomImages.length > 0 ? bedroomImages : PlaceHolderImages.slice(0,6)
    },
    howItWorks: {
      title: 'Creating Your Dream Bedroom',
      steps: [
        {
          title: 'Personalized Consultation',
          description:
            'Our designers work with you to understand your lifestyle and preferences to create a bedroom that is both beautiful and functional.',
        },
        {
          title: 'Customized 3D Designs',
          description:
            'See your dream bedroom come to life with our realistic 3D renderings. You can experiment with different layouts, colors, and furniture before finalizing the design.',
        },
        {
          title: 'Flawless Execution',
          description:
            'From civil work to final touches, our experienced team ensures that every detail is executed to perfection, delivering your dream bedroom on time.',
        },
      ],
    },
    faq: {
      title: 'Master Bedroom FAQs',
      questions: [
        {
          question: 'What is the best color for a master bedroom?',
          answer:
            'The best color for a master bedroom depends on the mood you want to create. Soft, neutral colors like beige, gray, and white can create a calming atmosphere, while bold colors like navy or emerald green can add a touch of drama.',
        },
        {
          question: 'How can I make my small master bedroom look bigger?',
          answer:
            'Using light colors, mirrors, and multi-functional furniture can make a small bedroom appear more spacious. Proper lighting and a clutter-free design also help.',
        },
        {
          question: 'What are the essential furniture pieces for a master bedroom?',
          answer:
            'A comfortable bed, a wardrobe or closet for storage, and nightstands are essential. Depending on the space, you can also add a dresser, a reading chair, or a small desk.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
