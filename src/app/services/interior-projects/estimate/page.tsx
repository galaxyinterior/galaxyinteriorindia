"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function RedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const type = searchParams.get('type');
    if (type) {
      router.replace(`/pricing?tab=interior-estimate&type=${type}`);
    } else {
      router.replace('/pricing?tab=interior-estimate');
    }
  }, [router, searchParams]);

  return (
    <div className="bg-[#051124] min-h-screen text-white flex flex-col justify-center items-center font-sans">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-accent mb-4"></div>
      <p className="text-sm font-semibold tracking-wider text-white/70 uppercase">Redirecting to pricing estimator...</p>
    </div>
  );
}
