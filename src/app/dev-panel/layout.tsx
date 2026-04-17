import type { Metadata } from 'next';
import DevWrapper from '@/components/dev/DevWrapper';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return <DevWrapper>{children}</DevWrapper>;
}
