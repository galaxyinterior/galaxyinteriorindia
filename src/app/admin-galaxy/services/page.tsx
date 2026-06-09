"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { validateImageFile, uploadImageToStorage, uploadImagesToStorage } from "@/lib/media-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, PlusCircle, CheckCircle2, Loader2, AlertCircle, Trash2, Edit3, X, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminServicesPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [mode, setMode] = useState("residential");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const [editingService, setEditingService] = useState<any | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editMode, setEditMode] = useState("residential");
  const [editPrice, setEditPrice] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editDescription, setEditDescription] = useState("");

  const [services, setServices] = useState<any[]>([]);
  const [uploadStatus, setUploadStatus] = useState<{ type: 'idle'|'success'|'error', msg: string }>({ type: 'idle', msg: '' });
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setServices(fetched);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this service?")) {
       try { await deleteDoc(doc(db, "services", id)); }
       catch (err) { console.error("Delete failed:", err); alert("Failed to delete the service."); }
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || (!imageUrl && !imageFile) || !description) {
      setUploadStatus({ type: 'error', msg: "Please fill in all required fields." });
      return;
    }
    setLoading(true);
    setUploadStatus({ type: 'idle', msg: "Saving service..." });
    try {
      let finalImageUrl = imageUrl;
      if (imageFile) {
        const fileError = validateImageFile(imageFile);
        if (fileError) {
          setUploadStatus({ type: 'error', msg: fileError });
          setLoading(false);
          return;
        }
        finalImageUrl = await uploadImageToStorage(imageFile, "services");
      }
      
      const generatedSlug = slug.trim() || name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      await addDoc(collection(db, "services"), {
        name, slug: generatedSlug, mode, price: price ? Number(price) : null, image: finalImageUrl, desc: description,
        storageType: imageFile ? "firebase-storage" : "external-link",
        createdAt: serverTimestamp()
      });
      
      setUploadStatus({ type: 'success', msg: "Service added successfully!" });
      setName(""); setSlug(""); setMode("residential"); setPrice(""); setImageUrl(""); setImageFile(null); setDescription("");
    } catch (err: any) {
      console.error("Failed to add service:", err);
      setUploadStatus({ type: 'error', msg: `Saving failed: ${err.message}` });
    }
    setLoading(false);
  };

  const openEditModal = (service: any) => {
    setEditingService(service);
    setEditName(service.name);
    setEditSlug(service.slug);
    setEditMode(service.mode || "residential");
    setEditPrice(service.price ? String(service.price) : "");
    setEditImageUrl(service.image);
    setEditImageFile(null);
    setEditDescription(service.desc);
  };

  const closeEditModal = () => setEditingService(null);

  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editName || (!editImageUrl && !editImageFile) || !editDescription) {
      alert("Please fill in all required fields.");
      return;
    }
    setEditLoading(true);
    try {
      let finalImageUrl = editImageUrl;
      if (editImageFile) {
        const fileError = validateImageFile(editImageFile);
        if (fileError) {
          alert(fileError);
          setEditLoading(false);
          return;
        }
        finalImageUrl = await uploadImageToStorage(editImageFile, "services");
      }
      
      const generatedSlug = editSlug.trim() || editName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const serviceRef = doc(db, "services", editingService.id);
      await updateDoc(serviceRef, {
        name: editName, slug: generatedSlug, mode: editMode, price: editPrice ? Number(editPrice) : null,
        image: finalImageUrl, desc: editDescription,
        storageType: editImageFile ? "firebase-storage" : "external-link",
        updatedAt: serverTimestamp()
      });
      setEditingService(null);
      alert("Service updated successfully!");
    } catch (err: any) {
      console.error("Failed to update service", err);
      alert(`Update failed: ${err.message}`);
    } finally {
      setEditLoading(false);
    }
  };

  const inputClass = "bg-[#051124] border-white/10 text-white placeholder:text-white/20 focus:ring-accent";
  const selectClass = "w-full h-10 px-3 border border-white/10 bg-[#051124] text-white rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-accent";
  const labelClass = "text-xs font-bold text-white/40 uppercase tracking-widest";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-4xl font-display font-bold text-white tracking-tight flex items-center gap-3">
          <Briefcase className="w-10 h-10 text-accent" /> Services Manager
        </h1>
        <p className="text-white/40 mt-2 text-lg">Add and manage custom expertise and services on the homepage.</p>
      </div>

      {uploadStatus.msg && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 ${
          uploadStatus.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
          uploadStatus.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 
          'bg-accent/10 border-accent/20 text-accent'
        }`}>
          {uploadStatus.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : 
           uploadStatus.type === 'error' ? <AlertCircle className="w-5 h-5 shrink-0" /> :
           <Loader2 className="w-5 h-5 shrink-0 animate-spin" />}
          <p className="font-medium text-sm">{uploadStatus.msg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Add Service Form */}
        <div className="lg:col-span-5">
          <Card className="bg-[#08162d] border border-white/10 shadow-none rounded-2xl">
            <CardHeader className="border-b border-white/5 pb-6 rounded-t-2xl">
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-white">
                <PlusCircle className="text-accent w-6 h-6" /> Add Custom Service
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleAddService} className="space-y-4">
                <div className="space-y-1.5">
                  <label className={labelClass}>Service Name</label>
                  <Input placeholder="e.g. Turnkey Interior" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} required className={inputClass} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={labelClass}>Service Mode</label>
                    <select value={mode} onChange={(e) => setMode(e.target.value)} disabled={loading} className={selectClass}>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Price (Optional)</label>
                    <Input type="number" placeholder="e.g. 150000" value={price} onChange={(e) => setPrice(e.target.value)} disabled={loading} className={inputClass} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={labelClass}>Custom Slug (Optional)</label>
                  <Input placeholder="e.g. turnkey-interior" value={slug} onChange={(e) => setSlug(e.target.value)} disabled={loading} className={inputClass} />
                </div>

                <div className="space-y-1.5">
                  <label className={labelClass}>Upload Image</label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setImageFile(file);
                      if (file) setImageUrl("");
                    }}
                    disabled={loading}
                    className={inputClass}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className={labelClass}>OR Image URL</label>
                  <Input placeholder="https://..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} disabled={loading || !!imageFile} className={inputClass} />
                </div>

                <div className="space-y-1.5">
                  <label className={labelClass}>Short Description</label>
                  <Textarea placeholder="Describe the service offering..." value={description} onChange={(e) => setDescription(e.target.value)} disabled={loading} rows={3} required className={inputClass} />
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-accent text-primary font-bold h-11 mt-4">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Service"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Existing Services List */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="bg-[#08162d] border border-white/10 shadow-none rounded-2xl">
            <CardHeader className="border-b border-white/5 pb-4 rounded-t-2xl flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold text-white">Active Custom Services</CardTitle>
              <Badge variant="outline" className="bg-transparent border-white/10 text-white/40">{services.length} Total</Badge>
            </CardHeader>
            <CardContent className="pt-6">
              {services.length === 0 ? (
                <div className="text-center py-12 text-white/30 font-medium">
                  No custom services added yet. Hardcoded services are displayed by default.
                </div>
              ) : (
                <div className="space-y-4">
                  {services.map((srv) => (
                    <div key={srv.id} className="p-4 border border-white/5 rounded-xl flex gap-4 bg-white/5 items-start">
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-[#051124]">
                        <img src={srv.image} alt={srv.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-bold text-white text-sm truncate uppercase">{srv.name}</h4>
                          <Badge className="text-[9px] uppercase font-bold bg-accent/20 text-accent border-none">{srv.mode}</Badge>
                          {srv.price && <Badge variant="outline" className="text-[9px] uppercase font-black text-green-400 border-green-400/20">₹{Number(srv.price).toLocaleString("en-IN")}</Badge>}
                        </div>
                        <p className="text-xs text-white/40 line-clamp-2 mt-2">{srv.desc}</p>
                      </div>

                      <div className="flex flex-col gap-1.5 shrink-0">
                        <button onClick={() => openEditModal(srv)} className="p-2 text-accent/70 rounded-lg" title="Edit Service">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(srv.id)} className="p-2 text-red-400/70 rounded-lg" title="Delete Service">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="bg-[#08162d] rounded-2xl border border-white/10 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={closeEditModal} className="absolute top-4 right-4 text-white/30 p-1.5 rounded-lg">
              <X className="w-5 h-5" />
            </button>
            <CardHeader className="border-b border-white/5 pb-5">
              <CardTitle className="flex items-center gap-2 font-bold text-xl uppercase text-white">
                <Edit3 className="w-5 h-5 text-accent" /> Edit Service Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleUpdateService} className="space-y-4">
                <div className="space-y-1.5">
                  <label className={labelClass}>Service Name</label>
                  <Input value={editName} onChange={(e) => setEditName(e.target.value)} disabled={editLoading} required className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={labelClass}>Mode</label>
                    <select value={editMode} onChange={(e) => setEditMode(e.target.value)} disabled={editLoading} className={selectClass}>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Price (Optional)</label>
                    <Input type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} disabled={editLoading} className={inputClass} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Slug</label>
                  <Input value={editSlug} onChange={(e) => setEditSlug(e.target.value)} disabled={editLoading} className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Upload New Image</label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setEditImageFile(file);
                      if (file) setEditImageUrl("");
                    }}
                    disabled={editLoading}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Image Link URL</label>
                  <Input value={editImageUrl} onChange={(e) => setEditImageUrl(e.target.value)} disabled={editLoading || !!editImageFile} className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Short Description</label>
                  <Textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} disabled={editLoading} rows={3} required className={inputClass} />
                </div>
                <div className="flex gap-3 pt-3">
                  <Button type="button" variant="outline" onClick={closeEditModal} disabled={editLoading} className="flex-1 rounded-lg border-white/10 bg-transparent text-white">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={editLoading} className="flex-1 bg-accent text-primary font-bold rounded-lg">
                    {editLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
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
