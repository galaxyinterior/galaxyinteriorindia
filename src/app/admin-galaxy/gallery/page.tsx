"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, UploadCloud, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { validateImageFile, uploadImageToStorage } from "@/lib/media-upload";

export default function GalleryAdminPage() {
  const [singleFile, setSingleFile] = useState<File | null>(null);
  const [singleTitle, setSingleTitle] = useState("");
  const [singleUrlLink, setSingleUrlLink] = useState("");
  
  const [images, setImages] = useState<any[]>([]);
  const [status, setStatus] = useState<{ type: 'idle'|'success'|'error', msg: string }>({ type: 'idle', msg: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setImages(fetched);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this photo?")) {
       try {
         await deleteDoc(doc(db, "gallery", id));
       } catch (err) {
         console.error("Delete failed:", err);
         alert("Failed to delete the photo.");
       }
    }
  };

  const handleSingleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleFile && !singleUrlLink) {
      setStatus({ type: 'error', msg: "Please select an image file or provide a URL." });
      return;
    }
    
    setLoading(true);
    setStatus({ type: 'idle', msg: "Saving image..." });
    
    try {
      let url = singleUrlLink;
      if (singleFile) {
        const fileError = validateImageFile(singleFile);
        if (fileError) {
          setStatus({ type: 'error', msg: fileError });
          setLoading(false);
          return;
        }
        url = await uploadImageToStorage(singleFile, "gallery");
      }
      
      await addDoc(collection(db, "gallery"), {
        title: singleTitle || "Untitled",
        url,
        storageType: singleFile ? "firebase-storage" : "external-link",
        createdAt: serverTimestamp()
      });
      
      setStatus({ type: 'success', msg: "Image successfully added to gallery!" });
      setSingleFile(null);
      setSingleTitle("");
      setSingleUrlLink("");
      
      const fileInput = document.getElementById("singleFile") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
    } catch (err: any) {
      console.error(err);
      setStatus({ type: 'error', msg: `Upload failed: ${err.message}` });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-4xl font-display font-bold text-white tracking-tight flex items-center gap-3">
          <ImageIcon className="w-10 h-10 text-accent" /> Gallery Upload
        </h1>
        <p className="text-white/40 mt-2 text-lg">Add new photos to the portfolio gallery securely via Firebase.</p>
      </div>

      {status.msg && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 ${
          status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
          status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 
          'bg-accent/10 border-accent/20 text-accent'
        }`}>
          {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : 
           status.type === 'error' ? <AlertCircle className="w-5 h-5 shrink-0" /> :
           <Loader2 className="w-5 h-5 shrink-0 animate-spin" />}
          <p className="font-medium text-sm">{status.msg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-[#08162d] border border-white/10 shadow-none rounded-2xl">
          <CardHeader className="border-b border-white/5 pb-6 rounded-t-2xl">
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-white">
              <UploadCloud className="text-accent w-6 h-6" /> Single Upload
            </CardTitle>
            <p className="text-sm text-white/40">Upload one photo with a specific title.</p>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSingleUpload} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Photo Title</label>
                <Input 
                  placeholder="e.g. Modern Living Room Design" 
                  value={singleTitle}
                  onChange={(e) => setSingleTitle(e.target.value)}
                  disabled={loading}
                  required
                  className="bg-[#051124] border-white/10 text-white placeholder:text-white/20 focus:ring-accent"
                />
              </div>
              <div className="space-y-4 border border-white/5 p-4 rounded-xl bg-white/5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/50 block uppercase tracking-widest">Option 1: Upload Image File</label>
                  <Input 
                    id="singleFile"
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (!file) {
                        setSingleFile(null);
                        return;
                      }
                      const fileError = validateImageFile(file);
                      if (fileError) {
                        setStatus({ type: 'error', msg: fileError });
                        e.currentTarget.value = "";
                        setSingleFile(null);
                        return;
                      }
                      setSingleFile(file);
                      setSingleUrlLink("");
                    }}
                    disabled={loading}
                    className="bg-[#051124] border-white/10 text-white"
                  />
                  <p className="text-[10px] text-white/30">Max size: 1 MB. Larger images will be blocked.</p>
                </div>
                <div className="relative flex items-center py-1">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink-0 mx-4 text-white/20 text-xs font-bold uppercase">USE LINK ONLY</span>
                    <div className="flex-grow border-t border-white/10"></div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Option 2: Paste Image Link</label>
                  <Input 
                    placeholder="https://example.com/image.png" 
                    value={singleUrlLink}
                    onChange={(e) => {
                        setSingleUrlLink(e.target.value);
                        if (e.target.value) {
                            setSingleFile(null);
                            const el = document.getElementById("singleFile") as HTMLInputElement;
                            if (el) el.value = "";
                        }
                    }}
                    disabled={loading || !!singleFile}
                    className="bg-[#051124] border-white/10 text-white placeholder:text-white/20 focus:ring-accent"
                  />
                </div>
              </div>
              <Button type="submit" disabled={loading || (!singleFile && !singleUrlLink)} className="w-full bg-accent text-primary font-bold h-12">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Image to Gallery"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6 font-display">Current Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.length === 0 && <p className="text-white/30 italic col-span-full">No active photos in gallery. Add one above.</p>}
          {images.map(img => (
             <div key={img.id} className="relative group rounded-xl overflow-hidden border border-white/10 aspect-square">
                <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                   <p className="text-white font-bold text-sm line-clamp-1 mb-2">{img.title}</p>
                   <button 
                     onClick={() => handleDelete(img.id)} 
                     className="w-full bg-red-600 text-white text-xs py-2 rounded-lg font-bold shadow-lg"
                   >
                     DELETE PHOTO
                   </button>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
