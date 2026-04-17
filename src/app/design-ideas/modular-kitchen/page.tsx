'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const kitchenImages = PlaceHolderImages.filter((img) =>
  img.imageHint.includes('kitchen')
);

export default function ModularKitchenDesignsPage() {
  const pageDetails = {
    title: 'Modular Kitchen Designs',
    description: `A modular kitchen is all about functionality and style. Explore our stunning collection of modular kitchen designs that are customized to fit your space and needs. From sleek cabinets to smart storage solutions, we create kitchens that are a joy to cook in.`,
    inspiration: {
      title: 'Latest Modular Kitchen Designs',
      images: kitchenImages.length > 0 ? kitchenImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Your Modular Kitchen Journey',
      steps: [
        {
          title: 'Design & Planning',
          description:
            'Our expert designers help you choose the right layout, materials, and finishes to create a kitchen that is both beautiful and practical.',
        },
        {
          title: '3D Visualization',
          description:
            'Get a realistic 3D view of your kitchen design. This allows you to make changes and finalize the design before we start manufacturing.',
        },
        {
          title: 'Manufacturing & Installation',
          description:
            'Your kitchen is manufactured in our state-of-the-art facility and installed by our skilled professionals, ensuring a perfect fit and finish.',
        },
      ],
    },
    faq: {
      title: 'Modular Kitchen FAQs',
      questions: [
        {
          question: 'What are the different types of modular kitchen layouts?',
          answer:
            'The most common layouts are L-shaped, U-shaped, G-shaped, parallel, and straight kitchens. The best layout for you depends on the size and shape of your kitchen.',
        },
        {
          question: 'What materials are used for modular kitchens?',
          answer:
            'We use a variety of high-quality materials like HDF, MDF, plywood, and particleboard for the cabinets, with finishes like laminate, acrylic, and lacquer.',
        },
        {
          question: 'How long does it take to install a modular kitchen?',
          answer:
            'Once the design is finalized and manufacturing is complete, the installation process typically takes about 7-10 days.',
        },
      ],
    },
  };

  return <DesignIdeaPageLayout {...pageDetails} />;
}
