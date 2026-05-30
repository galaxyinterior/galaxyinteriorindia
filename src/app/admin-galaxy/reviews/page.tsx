"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, PlusCircle, CheckCircle2, Loader2, AlertCircle, Trash2, Star, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const LOCATIONS = ["Ranchi", "Godda", "Bhagalpur", "Banka", "Deoghar", "Hazaribagh", "Dumka", "Kishanganj", "Purnea"];

export default function AdminReviewsPage() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("Ranchi");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [reviews, setReviews] = useState<any[]>([]);
  const [statusMsg, setStatusMsg] = useState<{ type: 'idle'|'success'|'error', msg: string }>({ type: 'idle', msg: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAtFormatted: doc.data().createdAt?.toDate()?.toLocaleString() || "Just now"
      }));
      setReviews(fetched);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete/reject this review? It will instantly disappear from the homepage feed.")) {
       try {
         await deleteDoc(doc(db, "reviews", id));
       } catch (err) {
         console.error("Delete failed:", err);
         alert("Failed to delete the review.");
       }
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) {
      setStatusMsg({ type: 'error', msg: "Please fill in all fields." });
      return;
    }
    setLoading(true);
    setStatusMsg({ type: 'idle', msg: "Saving review details..." });
    try {
      await addDoc(collection(db, "reviews"), {
        name, location, rating: Number(rating), comment, createdAt: serverTimestamp()
      });
      setStatusMsg({ type: 'success', msg: "Review added and approved successfully!" });
      setName(""); setComment(""); setRating(5); setLocation("Ranchi");
    } catch (err: any) {
      console.error("Failed to add review:", err);
      setStatusMsg({ type: 'error', msg: `Failed: ${err.message}` });
    }
    setLoading(false);
  };

  const inputClass = "bg-[#051124] border-white/10 text-white placeholder:text-white/20 focus:ring-accent";
  const selectClass = "w-full h-10 px-3 border border-white/10 bg-[#051124] text-white rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-accent";
  const labelClass = "text-xs font-bold text-white/40 uppercase tracking-widest";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto px-4">
      <div>
        <h1 className="text-4xl font-display font-bold text-white tracking-tight flex items-center gap-3">
          <MessageSquare className="w-10 h-10 text-accent" /> Review Moderator
        </h1>
        <p className="text-white/40 mt-2 text-lg">Audit, moderate, and remove client testimonials published on the homepage feed in real time.</p>
      </div>

      {statusMsg.msg && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 ${
          statusMsg.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
          statusMsg.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 
          'bg-accent/10 border-accent/20 text-accent'
        }`}>
          {statusMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : 
           statusMsg.type === 'error' ? <AlertCircle className="w-5 h-5 shrink-0" /> :
           <Loader2 className="w-5 h-5 shrink-0 animate-spin" />}
          <p className="font-medium text-sm">{statusMsg.msg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Manual Add Review Form */}
        <div className="lg:col-span-5">
          <Card className="bg-[#08162d] border border-white/10 shadow-none rounded-2xl">
            <CardHeader className="border-b border-white/5 pb-6 rounded-t-2xl">
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-white">
                <PlusCircle className="text-accent w-6 h-6" /> Create Testimonial
              </CardTitle>
              <p className="text-sm text-white/40">Submit a manual verified review on behalf of a client.</p>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="space-y-1.5">
                  <label className={labelClass}>Client Name</label>
                  <Input placeholder="e.g. Sameer Ahmed" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} required className={inputClass} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={labelClass}>Location</label>
                    <select value={location} onChange={(e) => setLocation(e.target.value)} disabled={loading} className={selectClass}>
                      {LOCATIONS.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Rating Star</label>
                    <select value={rating} onChange={(e) => setRating(Number(e.target.value))} disabled={loading} className={selectClass}>
                      <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                      <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                      <option value="3">⭐⭐⭐ (3 Stars)</option>
                      <option value="2">⭐⭐ (2 Stars)</option>
                      <option value="1">⭐ (1 Star)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={labelClass}>Comment / Feedback</label>
                  <Textarea placeholder="Write detailed client feedback..." value={comment} onChange={(e) => setComment(e.target.value)} disabled={loading} rows={4} required className={inputClass} />
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-accent text-primary font-bold h-11 mt-4">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Approve & Publish Review"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="bg-[#08162d] border border-white/10 shadow-none rounded-2xl">
            <CardHeader className="border-b border-white/5 pb-4 rounded-t-2xl flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold text-white">Client Reviews</CardTitle>
              <Badge variant="outline" className="bg-transparent border-white/10 text-white/40">{reviews.length} Total</Badge>
            </CardHeader>
            <CardContent className="pt-6">
              {reviews.length === 0 ? (
                <div className="text-center py-12 text-white/30 font-medium">
                  No testimonials submitted yet.
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-4 border border-white/5 rounded-xl flex gap-4 bg-white/5 items-start justify-between">
                      <div className="space-y-2 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-bold text-white text-sm capitalize">{rev.name}</h4>
                          <Badge variant="outline" className="text-[9px] uppercase font-black bg-transparent border-white/10 text-white/40 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5 text-accent shrink-0" /> {rev.location}
                          </Badge>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={cn(
                                "w-3.5 h-3.5 shrink-0", 
                                i < rev.rating ? "fill-yellow-500 text-yellow-500" : "text-white/10"
                              )} 
                            />
                          ))}
                        </div>
                        <p className="text-xs text-white/40 italic">"{rev.comment}"</p>
                        <p className="text-[8.5px] text-white/20 font-bold uppercase tracking-wider">Submitted: {rev.createdAtFormatted}</p>
                      </div>

                      <button
                        onClick={() => handleDelete(rev.id)}
                        className="p-2 text-red-400/50 rounded-lg shrink-0"
                        title="Delete/Reject Review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
