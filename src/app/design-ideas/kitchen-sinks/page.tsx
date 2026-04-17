'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const sinkImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('kitchen')
);

export default function KitchenSinksPage() {
  const pageDetails = {
    title: 'Kitchen Sink Designs',
    description: `The right kitchen sink is a blend of form and function. Discover our range of sinks, from stainless steel undermounts to classic farmhouse styles, to find the perfect fit for your kitchen workflow.`,
    inspiration: {
      title: 'Functional & Stylish Kitchen Sinks',
      images: sinkImages.length > 0 ? sinkImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Selecting Your Kitchen Sink',
      steps: [
        {
          title: 'Material & Style',
          description:
            'We guide you through materials like stainless steel, granite composite, and fireclay, and styles like single-bowl, double-bowl, and apron-front.',
        },
        {
          title: 'Faucet Pairing',
          description:
            'A great sink deserves a great faucet. We help you choose a faucet that complements your sink and provides the functionality you need.',
        },
        {
          title: 'Expert Installation',
          description:
            'Our team ensures your new sink and faucet are installed correctly, with proper plumbing and sealing for long-lasting, leak-free performance.',
        },
      ],
    },
    faq: {
      title: 'Kitchen Sink FAQs',
      questions: [
        {
          question: 'What are the pros and cons of single vs. double bowl sinks?',
          answer:
            'Single bowl sinks are great for washing large pots and pans. Double bowl sinks are better for multitasking, like washing dishes on one side and prepping food on the other.',
        },
        {
          question: 'What is an undermount sink?',
          answer:
            'An undermount sink is installed below the countertop, which creates a seamless look and makes it easy to wipe counter debris directly into the sink. It is best used with solid surface countertops like granite or quartz.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
