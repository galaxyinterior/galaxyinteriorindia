"use client";

import * as React from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Star, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from "@/lib/utils";

const LOCATIONS = [
  "Ranchi",
  "Godda",
  "Bhagalpur",
  "Banka",
  "Deoghar",
  "Hazaribagh",
  "Dumka",
  "Kishanganj",
  "Purnea"
];

const MOCK_REVIEWS = [
  {
    id: "mock-r1",
    name: "Ananya Sharma",
    location: "Ranchi",
    rating: 5,
    comment: "Galaxy Interior converted our 3BHK shell into a luxury haven. The modular kitchen and smart automation are spectacular!"
  },
  {
    id: "mock-r2",
    name: "Rahul Verma",
    location: "Godda",
    rating: 5,
    comment: "Highly professional construction and structural layout planning. Flawless turnkey execution."
  },
  {
    id: "mock-r3",
    name: "Vikram Singh",
    location: "Bhagalpur",
    rating: 5,
    comment: "Their 3D elevation renders mapped Vastu perfectly. Visually stunning and structurally solid."
  },
  {
    id: "mock-r4",
    name: "Pooja Kumari",
    location: "Deoghar",
    rating: 5,
    comment: "Outstanding service. The ceiling design, color combination, and light mapping were perfect for our duplex flat."
  },
  {
    id: "mock-r5",
    name: "Aman Gupta",
    location: "Hazaribagh",
    rating: 4,
    comment: "Great experience working with the design team. The executive wardrobe and modular kitchen have premium quality finishes."
  }
];

export default function ReviewsPage() {
  const [reviewsList, setReviewsList] = React.useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = React.useState(true);
  
  // New review form state
  const [reviewName, setReviewName] = React.useState("");
  const [reviewLocation, setReviewLocation] = React.useState("Ranchi");
  const [reviewRating, setReviewRating] = React.useState(5);
  const [reviewComment, setReviewComment] = React.useState("");
  const [submittingReview, setSubmittingReview] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");

  React.useEffect(() => {
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

  const sortedReviews = React.useMemo(() => {
    return [...reviewsList].sort((a, b) => {
      // 1. Sort by rating (descending)
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      // 2. Sort by comment length (descending) - longer/more informative reviews first
      const lenA = a.comment ? a.comment.trim().length : 0;
      const lenB = b.comment ? b.comment.trim().length : 0;
      return lenB - lenA;
    });
  }, [reviewsList]);

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      setSubmitError("Please fill in all fields.");
      return;
    }
    setSubmittingReview(true);
    setSubmitError("");
    try {
      await addDoc(collection(db, "reviews"), {
        name: reviewName,
        location: reviewLocation,
        rating: reviewRating,
        comment: reviewComment,
        createdAt: serverTimestamp()
      });
      setSubmitSuccess(true);
      setReviewName("");
      setReviewComment("");
      setReviewRating(5);
      setReviewLocation("Ranchi");
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err: any) {
      console.error("Error adding review: ", err);
      setSubmitError("Failed to submit review. Please try again.");
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="bg-[#051124] min-h-screen text-white pt-24 pb-20 relative overflow-hidden">
      {/* Background Mandala Vector Backing */}
      <div className="absolute inset-0 bg-logo-radial opacity-35 pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back navigation */}
        <div className="flex items-center gap-2 mb-8 justify-start">
          <Link href="/" className="flex items-center gap-1.5 text-accent hover:text-white text-xs font-black uppercase tracking-wider transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-up">
          <Badge className="mb-4 rounded-full bg-accent text-primary font-black tracking-[0.20em] px-5 py-2 border-none shadow-md text-[10px] uppercase">
            Client Voices
          </Badge>
          <h1 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tight text-white leading-none mb-6">
            All Client <span className="text-gold italic">Reviews</span>
          </h1>
          <p className="max-w-xl mx-auto text-xs md:text-sm text-white/60 font-semibold leading-relaxed">
            Read verified testimonials and reviews about our bespoke home interiors, modular kitchens, and civil structural constructions.
          </p>
          <div className="w-20 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Reviews List */}
          <div className="lg:col-span-7 space-y-6">
            {loadingReviews ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-accent"></div>
              </div>
            ) : sortedReviews.length === 0 ? (
              <div className="text-center py-12 bg-[#08162d] rounded-[32px] border border-white/10 p-8">
                <p className="text-white/60 italic text-sm">No reviews found in our database.</p>
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                {sortedReviews.map((review, idx) => (
                  <div 
                    key={review.id || idx} 
                    className="p-4 md:p-8 bg-white/[0.03] border border-white/10 rounded-[20px] md:rounded-[28px] shadow-lg hover:border-accent/25 transition-all duration-300 group hover:-translate-y-1 animate-fade-up"
                  >
                    <div className="flex justify-between items-start mb-3 md:mb-4">
                      <div>
                        <h4 className="font-bold text-sm md:text-xl text-white group-hover:text-gold transition-colors">{review.name}</h4>
                        <p className="text-[9px] md:text-[10px] text-accent/80 font-black tracking-widest uppercase mt-0.5">{review.location}</p>
                      </div>
                      
                      {/* Rating Stars */}
                      <div className="flex gap-0.5 md:flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={cn(
                              "w-3.5 h-3.5 md:w-4 md:h-4", 
                              i < review.rating 
                                ? "fill-gold text-gold filter drop-shadow-[0_0_2px_rgba(255,207,51,0.5)]" 
                                : "text-white/20"
                            )} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-white/70 text-xs md:text-base leading-relaxed font-medium italic">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submission Form Column */}
          <div className="lg:col-span-5 bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-[32px] shadow-2xl relative overflow-hidden backdrop-blur-md sticky top-24">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
            
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 uppercase tracking-tight font-display">
              Add Your <span className="text-gold">Review</span>
            </h3>

            <form onSubmit={handleReviewSubmit} className="space-y-5 relative z-10">
              {submitError && (
                <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-200 text-xs rounded-xl font-semibold">
                  {submitError}
                </div>
              )}
              {submitSuccess && (
                <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs rounded-xl font-semibold animate-fade-in">
                  Thank you! Your review has been submitted successfully and published in real time.
                </div>
              )}

              {/* Name Input */}
              <div className="relative w-full">
                <input
                  type="text"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  required
                  disabled={submittingReview}
                  className="w-full h-14 px-4 pt-4 pb-1 rounded-xl border border-white/20 focus:border-accent bg-white/[0.02] text-white focus:outline-none focus:ring-0 peer placeholder:text-transparent text-sm font-medium transition-all"
                  placeholder="Your Name"
                  id="client_review_name_all"
                />
                <label 
                  htmlFor="client_review_name_all"
                  className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold"
                >
                  Your Name
                </label>
              </div>

              {/* Location Select Dropdown */}
              <div className="space-y-1.5">
                <label htmlFor="client_review_location_all" className="text-[10px] font-black text-white/50 uppercase tracking-widest pl-1">
                  Select Location
                </label>
                <div className="relative">
                  <select
                    value={reviewLocation}
                    onChange={(e) => setReviewLocation(e.target.value)}
                    disabled={submittingReview}
                    id="client_review_location_all"
                    className="w-full h-14 px-4 rounded-xl border border-white/20 focus:border-accent bg-[#08162d] text-white focus:outline-none focus:ring-0 text-sm font-semibold transition-all appearance-none cursor-pointer"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc} className="bg-[#051124]">
                        {loc}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-white/60 w-0 h-0" />
                </div>
              </div>

              {/* Rating Interactive Stars Selector */}
              <div className="space-y-2">
                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest pl-1 block">
                  Your Rating
                </span>
                <div className="flex gap-2.5 py-1">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const starVal = i + 1;
                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={submittingReview}
                        onClick={() => setReviewRating(starVal)}
                        className="focus:outline-none transition-transform hover:scale-125 active:scale-95 group/star"
                      >
                        <Star 
                          className={cn(
                            "w-7 h-7 transition-all duration-200", 
                            starVal <= reviewRating 
                              ? "fill-gold text-gold filter drop-shadow-[0_0_4px_rgba(255,207,51,0.6)]" 
                              : "text-white/25 group-hover/star:text-gold/50"
                          )} 
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Comment Textarea */}
              <div className="relative w-full">
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  required
                  rows={4}
                  disabled={submittingReview}
                  className="w-full px-4 pt-5 pb-1 rounded-xl border border-white/20 focus:border-accent bg-white/[0.02] text-white focus:outline-none focus:ring-0 peer placeholder:text-transparent text-sm font-medium transition-all resize-none"
                  placeholder="Write your review..."
                  id="client_review_comment_all"
                />
                <label 
                  htmlFor="client_review_comment_all"
                  className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold"
                >
                  Write your review...
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={submittingReview}
                className="w-full h-14 bg-gold-gradient hover:opacity-95 text-primary rounded-full font-black text-xs uppercase tracking-widest m3-elevation-2 hover:m3-elevation-3 transition-all hover:scale-[1.01] active:scale-[0.99] relative overflow-hidden"
              >
                {submittingReview ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
