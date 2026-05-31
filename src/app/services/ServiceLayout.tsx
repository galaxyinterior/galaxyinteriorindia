
"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, ChevronRight, Sparkles, ShieldCheck, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface ServicePageProps {
  title: string;
  category: "Service" | "Facility";
  description: string;
  image: string;
  imageHint: string;
  points: string[];
  brands?: string[];
  serviceKey?: string;
}

export default function ServiceLayout({ title, category, description, image, imageHint, points, brands, serviceKey }: ServicePageProps) {
  const contactHref = serviceKey
    ? `/contact?service=${encodeURIComponent(serviceKey)}`
    : '/contact';

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [adminResponse, setAdminResponse] = useState("");
  const [loadingAppStatus, setLoadingAppStatus] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        
        // Fetch user profile from Firestore to get name and phone
        try {
          const { doc, getDoc } = await import('firebase/firestore');
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          }
        } catch (err) {
          console.error(err);
        }
        
        // Check if user has already applied for this service
        try {
          const { collection, query, where, onSnapshot } = await import('firebase/firestore');
          const q = query(
            collection(db, 'applied_services'),
            where('uid', '==', user.uid),
            where('serviceName', '==', title)
          );
          
          const unsubSnap = onSnapshot(q, (snap) => {
            if (!snap.empty) {
              setHasApplied(true);
              const data = snap.docs[0].data();
              if (data.adminResponse) {
                setAdminResponse(data.adminResponse);
              } else {
                setAdminResponse("");
              }
            } else {
              setHasApplied(false);
              setAdminResponse("");
            }
            setLoadingAppStatus(false);
          }, (err) => {
            console.error(err);
            setLoadingAppStatus(false);
          });
          
          return unsubSnap;
        } catch (err) {
          console.error(err);
          setLoadingAppStatus(false);
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
        setHasApplied(false);
        setAdminResponse("");
        setLoadingAppStatus(false);
      }
    });
    return () => unsubscribe();
  }, [title]);

  const handleApply = async () => {
    if (!currentUser) return;
    setApplying(true);
    try {
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      
      const docData = {
        uid: currentUser.uid,
        clientName: userProfile?.name || currentUser.displayName || "Valued Client",
        clientPhone: userProfile?.phone || "No phone provided",
        clientEmail: currentUser.email || "No email provided",
        serviceName: title,
        serviceSlug: serviceKey || title.toLowerCase().replace(/\s+/g, '-'),
        status: "Applied",
        adminResponse: "",
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'applied_services'), docData);
      
      // Trigger a client notification
      await addDoc(collection(db, 'notifications'), {
        uid: currentUser.uid,
        title: "Service Application Setup",
        message: `You have successfully applied for the "${title}" service. Our senior coordinators will review and sync back direct responses here!`,
        read: false,
        createdAt: serverTimestamp()
      });

      setHasApplied(true);
    } catch (err) {
      console.error("Failed to apply for service", err);
      alert("Failed to submit service application. Please check your Firestore database connection.");
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="py-24 bg-galaxy-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs mb-4">
            <Link href="/services" className="hover:underline">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span>{title}</span>
          </div>
          <Badge className="mb-6 bg-primary text-white font-bold tracking-widest px-4 py-1">{category}</Badge>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase">{title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative aspect-square rounded-[32px] overflow-hidden glass-card p-3 m3-elevation-2">
              <Image src={image} alt={title} fill className="object-cover rounded-[24px]" data-ai-hint={imageHint} />
            </div>
            <div>
              <h2 className="text-4xl font-black text-primary mb-8 uppercase tracking-tight">Redefining Excellence</h2>
              <p className="text-lg text-gray-600 mb-12 leading-relaxed">{description}</p>
              
              <div className="space-y-4 mb-12">
                {points.map((point, idx) => (
                  <div key={idx} className="flex gap-4 items-center p-3.5 rounded-[20px] bg-gray-50 border border-gray-100/60 m3-elevation-1 hover:m3-elevation-2 m3-transition">
                    <div className="bg-accent/15 p-2 rounded-full flex-shrink-0 flex items-center justify-center">
                      <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                    </div>
                    <span className="text-base font-semibold text-gray-700">{point}</span>
                  </div>
                ))}
              </div>

              {brands && (
                <div className="p-8 bg-gray-50/50 border border-gray-100 rounded-[28px] m3-elevation-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Trusted Brands We Use</p>
                  <div className="flex flex-wrap gap-3">
                    {brands.map(brand => (
                      <span key={brand} className="px-5 py-2.5 bg-white border border-gray-100 rounded-full text-xs font-black text-primary m3-elevation-1 m3-state-layer relative overflow-hidden">{brand}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dynamic Application and Enquire CTAs */}
              <div className="mt-12 space-y-6">
                {loadingAppStatus ? (
                  <div className="h-12 w-32 rounded-full bg-gray-100 animate-pulse"></div>
                ) : currentUser ? (
                  hasApplied ? (
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold shadow-sm">
                        <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
                        <span>Registered & Applied for {title}</span>
                      </div>
                      
                      {adminResponse ? (
                        <div className="p-5 bg-primary/5 border border-primary/10 rounded-[20px] text-left animate-fade-in">
                          <span className="text-[9px] font-black text-primary uppercase tracking-widest block mb-1.5">Sameer Ahmed (Architect response)</span>
                          <p className="text-sm font-semibold text-gray-700 leading-relaxed italic">"{adminResponse}"</p>
                          <span className="text-[7.5px] text-gray-400 block mt-2.5 font-bold uppercase tracking-wider">Direct synced reply note</span>
                        </div>
                      ) : (
                        <div className="p-4 bg-gray-50 border border-gray-100 rounded-[20px] text-left">
                          <p className="text-xs font-semibold text-gray-500 italic">"Your application is active under review. Lead Architect Sameer Ahmed will reply shortly inside this panel."</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        onClick={handleApply}
                        disabled={applying}
                        className="rounded-full bg-accent hover:bg-accent/90 text-primary px-8 md:px-12 h-12 text-xs md:text-sm font-black uppercase tracking-[0.12em] m3-elevation-2 active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-primary shrink-0" />
                        {applying ? "Applying..." : "Apply Online Direct"}
                      </Button>
                      
                      <Button asChild variant="outline" className="rounded-full border-primary/20 hover:bg-gray-50 text-primary px-8 h-12 text-xs md:text-sm font-black uppercase tracking-[0.12em] active:scale-95 transition-all">
                        <Link href={contactHref}>Enquire via Form</Link>
                      </Button>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="rounded-full bg-accent hover:bg-accent/90 text-primary px-8 md:px-12 h-12 text-xs md:text-sm font-black uppercase tracking-[0.12em] m3-elevation-2 active:scale-95 transition-all flex items-center justify-center gap-2">
                      <Link href="/login">
                        <Sparkles className="w-4 h-4 text-primary shrink-0" /> Login & Apply Online
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" className="rounded-full border-primary/20 hover:bg-gray-50 text-primary px-8 h-12 text-xs md:text-sm font-black uppercase tracking-[0.12em] active:scale-95 transition-all">
                      <Link href={contactHref}>Enquire for {title}</Link>
                    </Button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
