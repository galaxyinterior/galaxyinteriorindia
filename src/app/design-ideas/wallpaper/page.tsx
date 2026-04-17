'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DesignIdeaPageLayout from '../DesignIdeaPageLayout';

const wallpaperImages = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('wallpaper')
);

export default function WallpaperPage() {
  const pageDetails = {
    title: 'Wallpaper Designs',
    description: `Add personality, pattern, and texture to your walls with wallpaper. From bold botanicals to subtle geometrics, explore our curated collection to find the perfect print for your space.`,
    inspiration: {
      title: 'Stunning Wallpaper Ideas',
      images: wallpaperImages.length > 0 ? wallpaperImages : PlaceHolderImages.slice(0, 6)
    },
    howItWorks: {
      title: 'Choosing and Applying Wallpaper',
      steps: [
        {
          title: 'Design & Selection',
          description:
            'Our designers help you select a wallpaper that complements your furniture and decor, whether you want to cover a full room or create a statement accent wall.',
        },
        {
          title: 'Wall Preparation',
          description:
            'Proper wall preparation is key to a flawless finish. We ensure your walls are smooth, clean, and primed before application.',
        },
        {
          title: 'Professional Application',
          description:
            'Our expert installers meticulously apply the wallpaper, ensuring perfect pattern alignment and a bubble-free finish.',
        },
      ],
    },
    faq: {
      title: 'Wallpaper FAQs',
      questions: [
        {
          question: 'Can I use wallpaper in a bathroom?',
          answer:
            'Yes, but it\'s important to choose the right type. Vinyl wallpapers are moisture-resistant and are a good choice for bathrooms. Ensure the room has good ventilation to prevent peeling.',
        },
        {
          question: 'What is the difference between peel-and-stick and traditional wallpaper?',
          answer:
            'Traditional wallpaper requires a separate adhesive paste for application. Peel-and-stick wallpaper has a self-adhesive backing, making it easier to apply and remove, which is great for renters or temporary designs.',
        },
      ],
    },
  };
  return <DesignIdeaPageLayout {...pageDetails} />;
}
