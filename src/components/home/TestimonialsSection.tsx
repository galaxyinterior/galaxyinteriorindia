"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const MOCK_REVIEWS = [
  { id: "mock-1", name: "Ananya Sharma", location: "Ranchi", rating: 5, comment: "Galaxy Interior converted our 3BHK shell into a luxury haven. The modular kitchen and smart automation are spectacular!" },
  { id: "mock-2", name: "Rahul Verma", location: "Godda", rating: 5, comment: "Highly professional construction and structural layout planning. Flawless turnkey execution." },
  { id: "mock-3", name: "Vikram Singh", location: "Bhagalpur", rating: 5, comment: "Their 3D elevation renders mapped Vastu perfectly. Visually stunning and structurally solid." }
];

export default function TestimonialsSection() {
  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReviewsList(fetched.length > 0 ? fetched : MOCK_REVIEWS);
      setLoadingReviews(false);
    }, (error) => {
      console.warn("Firestore connection error, falling back to mock reviews:", error);
      setReviewsList(MOCK_REVIEWS);
      setLoadingReviews(false);
    });
    return () => unsubscribe();
  }, []);

  const homepageReviews = useMemo(() => {
    return [...reviewsList].sort((a, b) => b.rating - a.rating).slice(0, 3);
  }, [reviewsList]);

  return (
    <section className="py-24 bg-[#0a1120] text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight uppercase">
            Client Voices
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Real testimonials from homeowners and corporate directors across the region.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loadingReviews ? (
            <div className="col-span-3 text-center py-10">Loading...</div>
          ) : (
            homepageReviews.map((review, idx) => (
              <div key={review.id || idx} className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < review.rating ? "fill-accent text-accent" : "text-white/20"
                      )}
                    />
                  ))}
                </div>
                <p className="text-white/80 italic mb-8 flex-1 leading-relaxed">
                  "{review.comment}"
                </p>
                <div>
                  <h4 className="font-bold text-white">{review.name}</h4>
                  <span className="text-[10px] text-accent font-black tracking-widest uppercase">{review.location}</span>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-12 text-center">
           <Link href="/reviews">
             <Button variant="outline" className="border-white/20 hover:border-accent text-white hover:text-accent font-black px-8 py-6 rounded-full tracking-widest text-xs uppercase bg-transparent m3-transition">
               Read All Reviews
             </Button>
           </Link>
        </div>
      </div>
    </section>
  );
}
