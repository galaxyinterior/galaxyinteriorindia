"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonitorPlay, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { validateImageFile, uploadImageToStorage } from "@/lib/media-upload";

export default function SlideshowAdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [mediaUrlLink, setMediaUrlLink] = useState("");
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [priceTag, setPriceTag] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  
  const [slides, setSlides] = useState<any[]>([]);
  const [status, setStatus] = useState<{ type: 'idle'|'success'|'error', msg: string }>({ type: 'idle', msg: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "slideshow"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedSlides = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSlides(fetchedSlides);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this slide?")) {
       try {
         await deleteDoc(doc(db, "slideshow", id));
       } catch (err) {
         console.error("Delete failed:", err);
         alert("Failed to delete the slide.");
       }
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !mediaUrlLink) {
      setStatus({ type: 'error', msg: "Please provide either a media file or a media URL." });
      return;
    }
    setLoading(true);
    setStatus({ type: 'idle', msg: "Publishing slide media..." });
    try {
      let finalUrl = mediaUrlLink;
      if (file) {
        const fileError = validateImageFile(file);
        if (fileError) {
          setStatus({ type: 'error', msg: fileError });
          setLoading(false);
          return;
        }
        finalUrl = await uploadImageToStorage(file, "slideshow");
      }
      await addDoc(collection(db, "slideshow"), {
        type: mediaType, url: finalUrl, heading, subheading, price: priceTag,
        storageType: file ? "firebase-storage" : "external-link",
        createdAt: serverTimestamp()
      });
      setStatus({ type: 'success', msg: "New slide successfully added to homepage!" });
      setFile(null); setMediaUrlLink(""); setHeading(""); setSubheading(""); setPriceTag("");
      const fileInput = document.getElementById("slideMedia") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (err: any) {
      console.error(err);
      setStatus({ type: 'error', msg: `Publish failed: ${err.message}` });
    }
    setLoading(false);
  };

  const inputClass = "bg-[#051124] border-white/10 text-white placeholder:text-white/20 focus:ring-accent";
  const selectClass = "w-full h-11 px-4 rounded-lg border border-white/10 bg-[#051124] text-white text-sm focus:outline-none focus:ring-1 focus:ring-accent";
  const labelClass = "text-xs font-bold text-white/40 uppercase tracking-widest";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-display font-bold text-white tracking-tight flex items-center gap-3">
          <MonitorPlay className="w-10 h-10 text-accent" /> Hero Slideshow
        </h1>
        <p className="text-white/40 mt-2 text-lg">Add new sliding banners to the homepage hero section.</p>
      </div>

      {status.msg && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 ${
          status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
          status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 
          'bg-accent/10 border-accent/20 text-accent'
        }`}>
          {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : status.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <Loader2 className="w-5 h-5 animate-spin" />}
          <p className="font-medium text-sm">{status.msg}</p>
        </div>
      )}

      <Card className="bg-[#08162d] border border-white/10 shadow-none rounded-2xl">
        <CardHeader className="border-b border-white/5 pb-6 rounded-t-2xl">
          <CardTitle className="text-xl font-bold text-white">Create New Slide</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleUpload} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelClass}>Media Type</label>
                  <select value={mediaType} onChange={(e) => setMediaType(e.target.value as any)} className={selectClass}>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                
                <div className="space-y-4 border border-white/5 p-4 rounded-xl bg-white/5">
                  <div className="space-y-2">
                    <label className={`${labelClass} block`}>Option 1: Upload File</label>
                    <Input
                      id="slideMedia"
                      type="file"
                      accept={mediaType === 'image' ? "image/*" : "video/*"}
                      onChange={(e) => {
                        const selected = e.target.files?.[0] || null;
                        if (!selected) {
                          setFile(null);
                          return;
                        }
                        if (mediaType === "image") {
                          const fileError = validateImageFile(selected);
                          if (fileError) {
                            setStatus({ type: 'error', msg: fileError });
                            e.currentTarget.value = "";
                            setFile(null);
                            return;
                          }
                        }
                        setFile(selected);
                        setMediaUrlLink("");
                      }}
                      disabled={loading}
                      className={inputClass}
                    />
                    <p className="text-[10px] text-white/30">
                      {mediaType === "image" ? "Image limit: 1 MB." : "Video uploads do not have the 1 MB image limit."}
                    </p>
                  </div>
                  <div className="relative flex items-center py-1">
                      <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink-0 mx-4 text-white/20 text-xs font-bold uppercase">OR PASTE LINK</span>
                      <div className="flex-grow border-t border-white/10"></div>
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Option 2: Paste Media URL</label>
                    <Input 
                      placeholder="https://example.com/media.mp4" 
                      value={mediaUrlLink}
                      onChange={(e) => {
                          setMediaUrlLink(e.target.value);
                          if (e.target.value) {
                             setFile(null);
                             const el = document.getElementById("slideMedia") as HTMLInputElement;
                             if (el) el.value = "";
                          }
                      }}
                      disabled={loading || !!file}
                      className={inputClass}
                    />
                  </div>
                </div>
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Heading (Large Text)</label>
              <Input placeholder="e.g. Designing Dreams, Delivering Peace" value={heading} onChange={(e) => setHeading(e.target.value)} required className={inputClass} />
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Subheading (Description Text)</label>
              <Textarea placeholder="Enter a brief paragraph describing the slide..." value={subheading} onChange={(e) => setSubheading(e.target.value)} rows={3} required className={inputClass} />
            </div>
            
            <div className="space-y-2">
              <label className={labelClass}>Price/Highlight Tag</label>
              <Input placeholder="e.g. Bespoke Plans Available" value={priceTag} onChange={(e) => setPriceTag(e.target.value)} required className={inputClass} />
            </div>

            <Button type="submit" disabled={loading || (!file && !mediaUrlLink)} className="w-full bg-accent text-primary font-bold h-12 mt-4 text-sm">
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {loading ? "Publishing Slide..." : "Publish Slide to Homepage"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6 font-display">Active Slides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.length === 0 && <p className="text-white/30 italic col-span-full">No active slides found. Add one above.</p>}
          {slides.map(slide => (
             <div key={slide.id} className="border border-white/10 rounded-2xl overflow-hidden bg-[#08162d] shadow-none flex flex-col relative group">
                <button 
                  onClick={() => handleDelete(slide.id)} 
                  className="absolute top-3 right-3 bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity font-bold shadow-lg"
                >
                  DELETE
                </button>
                <div className="relative w-full aspect-video bg-white/5">
                   {slide.type === 'video' ? (
                     <video src={slide.url} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                   ) : (
                     <img src={slide.url} alt={slide.heading} className="w-full h-full object-cover" />
                   )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                   <h3 className="font-bold text-white line-clamp-1 text-lg mb-1">{slide.heading || "Untitled"}</h3>
                   <p className="text-sm text-white/40 line-clamp-2 leading-relaxed mb-3 flex-1">{slide.subheading}</p>
                   {slide.price && <p className="text-xs font-bold bg-accent/20 text-accent w-fit px-2 py-1 rounded">{slide.price}</p>}
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
