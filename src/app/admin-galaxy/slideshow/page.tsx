"use client";

import { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { storage, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonitorPlay, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

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
        const fileRef = ref(storage, `slideshow/${Date.now()}_${file.name}`);
        await uploadBytesResumable(fileRef, file);
        finalUrl = await getDownloadURL(fileRef);
      }
      
      await addDoc(collection(db, "slideshow"), {
        type: mediaType,
        url: finalUrl,
        heading,
        subheading,
        price: priceTag,
        createdAt: serverTimestamp()
      });
      
      setStatus({ type: 'success', msg: "New slide successfully added to homepage!" });
      setFile(null);
      setMediaUrlLink("");
      setHeading("");
      setSubheading("");
      setPriceTag("");
      
      const fileInput = document.getElementById("slideMedia") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
    } catch (err: any) {
      console.error(err);
      setStatus({ type: 'error', msg: `Publish failed: ${err.message}` });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto border-l-4 border-accent pl-8 py-4 bg-white shadow-sm rounded-r-3xl">
      <div>
        <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight flex items-center gap-3">
          <MonitorPlay className="w-10 h-10 text-accent" /> Hero Slideshow
        </h1>
        <p className="text-gray-500 mt-2 text-lg">Add new sliding banners to the homepage hero section.</p>
      </div>

      {status.msg && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : status.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
          {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : status.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <Loader2 className="w-5 h-5 animate-spin" />}
          <p className="font-medium text-sm">{status.msg}</p>
        </div>
      )}

      <Card className="border-gray-200 shadow-md">
        <CardHeader className="bg-gray-50/50 border-b pb-6 rounded-t-xl">
          <CardTitle>Create New Slide</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleUpload} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Media Type</label>
                  <select 
                    value={mediaType} 
                    onChange={(e) => setMediaType(e.target.value as any)}
                    className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                
                <div className="space-y-4 border p-4 rounded-xl bg-gray-50/50">
                  <div className="space-y-2 opacity-50 relative group">
                    <label className="text-sm font-bold text-gray-700 block">Option 1: Upload File (Disabled)</label>
                    <div className="absolute -top-10 left-0 bg-red-600 text-white text-xs px-3 py-1 rounded hidden group-hover:block z-10 whitespace-nowrap">
                       Uploading files requires configured container storage. Please use Links.
                    </div>
                    <Input 
                      id="slideMedia"
                      type="file" 
                      accept={mediaType === 'image' ? "image/*" : "video/*"}
                      disabled={true}
                    />
                  </div>
                  <div className="relative flex items-center py-1">
                      <div className="flex-grow border-t border-gray-200"></div>
                      <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase">USE LINK ONLY</span>
                      <div className="flex-grow border-t border-gray-200"></div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Option 2: Paste Media URL</label>
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
                    />
                  </div>
                </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Heading (Large Text)</label>
              <Input 
                placeholder="e.g. Designing Dreams, Delivering Peace" 
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Subheading (Description Text)</label>
              <Textarea 
                placeholder="Enter a brief paragraph describing the slide..." 
                value={subheading}
                onChange={(e) => setSubheading(e.target.value)}
                rows={3}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Price/Highlight Tag</label>
              <Input 
                placeholder="e.g. Bespoke Plans Available" 
                value={priceTag}
                onChange={(e) => setPriceTag(e.target.value)}
                required
              />
            </div>

            <Button type="submit" disabled={loading || (!file && !mediaUrlLink)} className="w-full bg-accent hover:bg-accent/90 text-primary font-bold h-12 mt-4 text-lg">
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {loading ? "Publishing Slide..." : "Publish Slide to Homepage"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">Active Slides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.length === 0 && <p className="text-gray-500 italic col-span-full">No active slides found. Add one above.</p>}
          {slides.map(slide => (
             <div key={slide.id} className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col relative group">
                <button 
                  onClick={() => handleDelete(slide.id)} 
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity font-bold shadow-lg"
                >
                  DELETE
                </button>
                <div className="relative w-full aspect-video bg-gray-100">
                   {slide.type === 'video' ? (
                     <video src={slide.url} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                   ) : (
                     <img src={slide.url} alt={slide.heading} className="w-full h-full object-cover" />
                   )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                   <h3 className="font-bold text-gray-900 line-clamp-1 text-lg mb-1">{slide.heading || "Untitled"}</h3>
                   <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-3 flex-1">{slide.subheading}</p>
                   {slide.price && <p className="text-xs font-bold bg-accent/20 text-blue-900 w-fit px-2 py-1 rounded">{slide.price}</p>}
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
