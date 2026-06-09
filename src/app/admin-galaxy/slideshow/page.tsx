"use client";

import { useState, useEffect, useRef } from "react";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonitorPlay, CheckCircle2, Loader2, AlertCircle, Edit3, X, Image as ImageIcon } from "lucide-react";
import { validateImageFile, uploadImageToStorage } from "@/lib/media-upload";
import ImageCropperModal from "@/components/admin/ImageCropperModal";

export default function SlideshowAdminPage() {
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [priceTag, setPriceTag] = useState("");

  const [desktopFile, setDesktopFile] = useState<File | null>(null);
  const [desktopPreview, setDesktopPreview] = useState("");
  
  const [mobileFile, setMobileFile] = useState<File | null>(null);
  const [mobilePreview, setMobilePreview] = useState("");

  const [cropperConfig, setCropperConfig] = useState<{
    isOpen: boolean;
    imageSrc: string;
    aspectRatio: number;
    target: 'desktop' | 'mobile' | 'edit-desktop' | 'edit-mobile';
  }>({ isOpen: false, imageSrc: "", aspectRatio: 16/9, target: 'desktop' });
  
  const [slides, setSlides] = useState<any[]>([]);
  const [status, setStatus] = useState<{ type: 'idle'|'success'|'error', msg: string }>({ type: 'idle', msg: '' });
  const [loading, setLoading] = useState(false);

  // Edit State
  const [editingSlide, setEditingSlide] = useState<any | null>(null);
  const [editHeading, setEditHeading] = useState("");
  const [editSubheading, setEditSubheading] = useState("");
  const [editPriceTag, setEditPriceTag] = useState("");
  const [editDesktopFile, setEditDesktopFile] = useState<File | null>(null);
  const [editDesktopPreview, setEditDesktopPreview] = useState("");
  const [editMobileFile, setEditMobileFile] = useState<File | null>(null);
  const [editMobilePreview, setEditMobilePreview] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  const hiddenDesktopInput = useRef<HTMLInputElement>(null);
  const hiddenMobileInput = useRef<HTMLInputElement>(null);
  const hiddenEditDesktopInput = useRef<HTMLInputElement>(null);
  const hiddenEditMobileInput = useRef<HTMLInputElement>(null);

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, target: 'desktop' | 'mobile' | 'edit-desktop' | 'edit-mobile') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const error = validateImageFile(file);
    if (error) {
      alert(error);
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCropperConfig({
        isOpen: true,
        imageSrc: reader.result as string,
        aspectRatio: (target === 'desktop' || target === 'edit-desktop') ? 16/9 : 9/16,
        target
      });
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset input so same file can be selected again
  };

  const onCropComplete = (croppedFile: File) => {
    const previewUrl = URL.createObjectURL(croppedFile);
    if (cropperConfig.target === 'desktop') {
      setDesktopFile(croppedFile);
      setDesktopPreview(previewUrl);
    } else if (cropperConfig.target === 'mobile') {
      setMobileFile(croppedFile);
      setMobilePreview(previewUrl);
    } else if (cropperConfig.target === 'edit-desktop') {
      setEditDesktopFile(croppedFile);
      setEditDesktopPreview(previewUrl);
    } else if (cropperConfig.target === 'edit-mobile') {
      setEditMobileFile(croppedFile);
      setEditMobilePreview(previewUrl);
    }
    setCropperConfig({ ...cropperConfig, isOpen: false });
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!desktopFile || !mobileFile) {
      setStatus({ type: 'error', msg: "Please provide both Desktop (16:9) and Mobile (9:16) cropped images." });
      return;
    }
    setLoading(true);
    setStatus({ type: 'idle', msg: "Publishing slide media..." });
    try {
      const desktopUrl = await uploadImageToStorage(desktopFile, "slideshow");
      const mobileUrl = await uploadImageToStorage(mobileFile, "slideshow");
      
      await addDoc(collection(db, "slideshow"), {
        type: 'image', url: desktopUrl, mobileUrl: mobileUrl, heading, subheading, price: priceTag,
        storageType: "firebase-storage",
        createdAt: serverTimestamp()
      });
      setStatus({ type: 'success', msg: "New slide successfully added to homepage!" });
      setDesktopFile(null); setDesktopPreview("");
      setMobileFile(null); setMobilePreview("");
      setHeading(""); setSubheading(""); setPriceTag("");
    } catch (err: any) {
      console.error(err);
      setStatus({ type: 'error', msg: `Publish failed: ${err.message}` });
    }
    setLoading(false);
  };

  const openEditModal = (slide: any) => {
    setEditingSlide(slide);
    setEditHeading(slide.heading || "");
    setEditSubheading(slide.subheading || "");
    setEditPriceTag(slide.price || "");
    setEditDesktopFile(null);
    setEditDesktopPreview(slide.url || "");
    setEditMobileFile(null);
    setEditMobilePreview(slide.mobileUrl || slide.url || "");
  };

  const closeEditModal = () => {
    setEditingSlide(null);
  };

  const handleUpdateSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;
    setEditLoading(true);
    try {
      let finalDesktopUrl = editingSlide.url;
      let finalMobileUrl = editingSlide.mobileUrl || editingSlide.url;

      if (editDesktopFile) {
        finalDesktopUrl = await uploadImageToStorage(editDesktopFile, "slideshow");
      }
      if (editMobileFile) {
        finalMobileUrl = await uploadImageToStorage(editMobileFile, "slideshow");
      }

      const slideRef = doc(db, "slideshow", editingSlide.id);
      await updateDoc(slideRef, {
        heading: editHeading,
        subheading: editSubheading,
        price: editPriceTag,
        url: finalDesktopUrl,
        mobileUrl: finalMobileUrl,
      });

      alert("Slide updated successfully!");
      closeEditModal();
    } catch (err: any) {
      console.error("Update failed", err);
      alert(`Update failed: ${err.message}`);
    } finally {
      setEditLoading(false);
    }
  };

  const inputClass = "bg-[#051124] border-white/10 text-white placeholder:text-white/20 focus:ring-accent";
  const labelClass = "text-xs font-bold text-white/40 uppercase tracking-widest";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto pb-20">
      {cropperConfig.isOpen && (
        <ImageCropperModal
          imageSrc={cropperConfig.imageSrc}
          aspectRatio={cropperConfig.aspectRatio}
          onCropComplete={onCropComplete}
          onCancel={() => setCropperConfig({ ...cropperConfig, isOpen: false })}
        />
      )}

      <div>
        <h1 className="text-4xl font-display font-bold text-white tracking-tight flex items-center gap-3">
          <MonitorPlay className="w-10 h-10 text-accent" /> Hero Slideshow
        </h1>
        <p className="text-white/40 mt-2 text-lg">Add or edit sliding banners. Ensure to upload both Mobile (9:16) and Desktop (16:9) crops.</p>
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
            
            {/* Image Selection row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Desktop Image */}
               <div className="space-y-2 border border-white/5 p-4 rounded-xl bg-white/5 text-center">
                  <label className={`${labelClass} block mb-4 text-left`}>Desktop Background (16:9)</label>
                  <input type="file" accept="image/*" ref={hiddenDesktopInput} className="hidden" onChange={(e) => handleFileSelect(e, 'desktop')} disabled={loading} />
                  
                  {desktopPreview ? (
                    <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-white/10 mb-4">
                      <img src={desktopPreview} alt="Desktop Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="aspect-video bg-[#051124] rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center mb-4 text-white/30">
                       <ImageIcon className="w-8 h-8 mb-2" />
                       <span className="text-xs">No Image Selected</span>
                    </div>
                  )}

                  <Button type="button" variant="outline" onClick={() => hiddenDesktopInput.current?.click()} className="border-white/10 bg-[#051124] text-white w-full" disabled={loading}>
                    {desktopPreview ? "Replace Desktop Image" : "Select & Crop Desktop Image"}
                  </Button>
               </div>

               {/* Mobile Image */}
               <div className="space-y-2 border border-white/5 p-4 rounded-xl bg-white/5 text-center flex flex-col">
                  <label className={`${labelClass} block mb-4 text-left`}>Mobile Background (9:16)</label>
                  <input type="file" accept="image/*" ref={hiddenMobileInput} className="hidden" onChange={(e) => handleFileSelect(e, 'mobile')} disabled={loading} />
                  
                  <div className="flex-1 flex flex-col items-center justify-center">
                    {mobilePreview ? (
                      <div className="relative w-32 aspect-[9/16] bg-black rounded-lg overflow-hidden border border-white/10 mb-4 shrink-0">
                        <img src={mobilePreview} alt="Mobile Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-32 aspect-[9/16] bg-[#051124] rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center mb-4 text-white/30 shrink-0">
                        <ImageIcon className="w-6 h-6 mb-2" />
                        <span className="text-[10px]">No Image</span>
                      </div>
                    )}
                  </div>

                  <Button type="button" variant="outline" onClick={() => hiddenMobileInput.current?.click()} className="border-white/10 bg-[#051124] text-white w-full" disabled={loading}>
                    {mobilePreview ? "Replace Mobile Image" : "Select & Crop Mobile Image"}
                  </Button>
               </div>
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Heading (Large Text)</label>
              <Input placeholder="e.g. Designing Dreams, Delivering Peace" value={heading} onChange={(e) => setHeading(e.target.value)} required className={inputClass} disabled={loading}/>
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Subheading (Description Text)</label>
              <Textarea placeholder="Enter a brief paragraph describing the slide..." value={subheading} onChange={(e) => setSubheading(e.target.value)} rows={3} required className={inputClass} disabled={loading}/>
            </div>
            
            <div className="space-y-2">
              <label className={labelClass}>Price/Highlight Tag</label>
              <Input placeholder="e.g. Bespoke Plans Available" value={priceTag} onChange={(e) => setPriceTag(e.target.value)} required className={inputClass} disabled={loading}/>
            </div>

            <Button type="submit" disabled={loading || !desktopFile || !mobileFile} className="w-full bg-accent text-primary font-bold h-12 mt-4 text-sm">
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
                <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => openEditModal(slide)} 
                    className="bg-accent text-primary p-2 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform"
                    title="Edit Slide"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(slide.id)} 
                    className="bg-red-600 text-white p-2 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform"
                    title="Delete Slide"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative w-full aspect-video bg-white/5">
                    <img src={slide.url} alt={slide.heading} className="w-full h-full object-cover" />
                    {slide.mobileUrl && (
                      <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur text-white text-[8px] px-2 py-1 rounded font-bold uppercase tracking-widest border border-white/10">
                        Has Mobile Crop
                      </div>
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

      {/* Edit Modal */}
      {editingSlide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="bg-[#08162d] rounded-2xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={closeEditModal} className="absolute top-4 right-4 text-white/30 hover:text-white p-1.5 rounded-lg bg-white/5">
              <X className="w-5 h-5" />
            </button>
            <CardHeader className="border-b border-white/5 pb-5">
              <CardTitle className="flex items-center gap-2 font-bold text-xl uppercase text-white">
                <Edit3 className="w-5 h-5 text-accent" /> Edit Slide Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleUpdateSlide} className="space-y-4">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Edit Desktop Image */}
                  <div className="space-y-2 border border-white/5 p-4 rounded-xl bg-white/5 text-center">
                      <label className={`${labelClass} block mb-2 text-left`}>Update Desktop Background</label>
                      <input type="file" accept="image/*" ref={hiddenEditDesktopInput} className="hidden" onChange={(e) => handleFileSelect(e, 'edit-desktop')} disabled={editLoading} />
                      
                      <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-white/10 mb-4">
                        <img src={editDesktopPreview} alt="Desktop Preview" className="w-full h-full object-cover" />
                      </div>

                      <Button type="button" variant="outline" onClick={() => hiddenEditDesktopInput.current?.click()} className="border-white/10 bg-[#051124] text-white w-full text-xs" disabled={editLoading}>
                        Replace & Crop
                      </Button>
                  </div>

                  {/* Edit Mobile Image */}
                  <div className="space-y-2 border border-white/5 p-4 rounded-xl bg-white/5 text-center flex flex-col">
                      <label className={`${labelClass} block mb-2 text-left`}>Update Mobile Background</label>
                      <input type="file" accept="image/*" ref={hiddenEditMobileInput} className="hidden" onChange={(e) => handleFileSelect(e, 'edit-mobile')} disabled={editLoading} />
                      
                      <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="relative w-32 aspect-[9/16] bg-black rounded-lg overflow-hidden border border-white/10 mb-4 shrink-0">
                          <img src={editMobilePreview} alt="Mobile Preview" className="w-full h-full object-cover" />
                        </div>
                      </div>

                      <Button type="button" variant="outline" onClick={() => hiddenEditMobileInput.current?.click()} className="border-white/10 bg-[#051124] text-white w-full text-xs" disabled={editLoading}>
                        Replace & Crop
                      </Button>
                  </div>
                </div>

                <div className="space-y-1.5 mt-4">
                  <label className={labelClass}>Heading</label>
                  <Input value={editHeading} onChange={(e) => setEditHeading(e.target.value)} disabled={editLoading} required className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Subheading</label>
                  <Textarea value={editSubheading} onChange={(e) => setEditSubheading(e.target.value)} disabled={editLoading} rows={3} required className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Price Tag</label>
                  <Input value={editPriceTag} onChange={(e) => setEditPriceTag(e.target.value)} disabled={editLoading} required className={inputClass} />
                </div>

                <div className="flex gap-3 pt-3">
                  <Button type="button" variant="outline" onClick={closeEditModal} disabled={editLoading} className="flex-1 rounded-lg border-white/10 bg-transparent text-white">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={editLoading} className="flex-1 bg-accent text-primary font-bold rounded-lg">
                    {editLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  );
}
