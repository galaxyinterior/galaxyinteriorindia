"use client";

import { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { storage, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, UploadCloud, CheckCircle2, Loader2, AlertCircle, Layers } from "lucide-react";

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
        const fileRef = ref(storage, `gallery/${Date.now()}_${singleFile.name}`);
        await uploadBytesResumable(fileRef, singleFile);
        url = await getDownloadURL(fileRef);
      }
      
      await addDoc(collection(db, "gallery"), {
        title: singleTitle || "Untitled",
        url,
        createdAt: serverTimestamp()
      });
      
      setStatus({ type: 'success', msg: "Image successfully added to gallery!" });
      setSingleFile(null);
      setSingleTitle("");
      setSingleUrlLink("");
      
      // Reset form input manually
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
        <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight flex items-center gap-3">
          <ImageIcon className="w-10 h-10 text-primary" /> Gallery Upload
        </h1>
        <p className="text-gray-500 mt-2 text-lg">Add new photos to the portfolio gallery securely via Firebase.</p>
      </div>

      {status.msg && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 transition-colors ${
          status.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 
          status.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 
          'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : 
           status.type === 'error' ? <AlertCircle className="w-5 h-5 shrink-0" /> :
           <Loader2 className="w-5 h-5 shrink-0 animate-spin" />}
          <p className="font-medium text-sm">{status.msg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Single Upload Card */}
        <Card className="border-gray-200 shadow-md">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-6 rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <UploadCloud className="text-primary w-6 h-6" /> Single Upload
            </CardTitle>
            <p className="text-sm text-gray-500">Upload one photo with a specific title.</p>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSingleUpload} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Photo Title</label>
                <Input 
                  placeholder="e.g. Modern Living Room Design" 
                  value={singleTitle}
                  onChange={(e) => setSingleTitle(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <div className="space-y-4 border p-4 rounded-xl bg-gray-50/50">
                <div className="space-y-2 opacity-50 relative group">
                  <label className="text-sm font-bold text-gray-700 block">Option 1: Upload File (Disabled)</label>
                  <div className="absolute -top-10 left-0 bg-red-600 text-white text-xs px-3 py-1 rounded hidden group-hover:block z-10 whitespace-nowrap">
                     Uploading files requires configured container storage. Please use Links.
                  </div>
                  <Input 
                    id="singleFile"
                    type="file" 
                    accept="image/*"
                    disabled={true}
                  />
                </div>
                <div className="relative flex items-center py-1">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase">USE LINK ONLY</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Option 2: Paste Image Link</label>
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
                  />
                </div>
              </div>
              <Button type="submit" disabled={loading || (!singleFile && !singleUrlLink)} className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Image to Gallery"}
              </Button>
            </form>
          </CardContent>
        </Card>

      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">Current Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.length === 0 && <p className="text-gray-500 italic col-span-full">No active photos in gallery. Add one above.</p>}
          {images.map(img => (
             <div key={img.id} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square">
                <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                   <p className="text-white font-bold text-sm line-clamp-1 mb-2">{img.title}</p>
                   <button 
                     onClick={() => handleDelete(img.id)} 
                     className="w-full bg-red-600 hover:bg-red-700 text-white text-xs py-2 rounded-lg font-bold shadow-lg transition-colors"
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
