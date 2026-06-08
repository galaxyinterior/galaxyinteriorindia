"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { validateImageFile, uploadImageToStorage } from "@/lib/media-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderGit2, PlusCircle, CheckCircle2, Loader2, AlertCircle, Trash2, MapPin, Edit3, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminProjectsPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("interior");
  const [status, setStatus] = useState("completed");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("interior");
  const [editStatus, setEditStatus] = useState("completed");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editLocation, setEditLocation] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [projects, setProjects] = useState<any[]>([]);
  const [uploadStatus, setUploadStatus] = useState<{ type: 'idle'|'success'|'error', msg: string }>({ type: 'idle', msg: '' });
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(fetched);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this project from the database?")) {
       try {
         await deleteDoc(doc(db, "projects", id));
       } catch (err) {
         console.error("Delete failed:", err);
         alert("Failed to delete the project.");
       }
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || (!imageUrl && !imageFile) || !location || !description) {
      setUploadStatus({ type: 'error', msg: "Please fill in all required fields." });
      return;
    }
    setLoading(true);
    setUploadStatus({ type: 'idle', msg: "Saving project details to database..." });
    try {
      let finalImageUrl = imageUrl;
      if (imageFile) {
        const fileError = validateImageFile(imageFile);
        if (fileError) {
          setUploadStatus({ type: 'error', msg: fileError });
          setLoading(false);
          return;
        }
        finalImageUrl = await uploadImageToStorage(imageFile, "projects");
      }
      await addDoc(collection(db, "projects"), {
        title, category, status, image: finalImageUrl, location, description,
        storageType: imageFile ? "firebase-storage" : "external-link",
        createdAt: serverTimestamp()
      });
      setUploadStatus({ type: 'success', msg: "Project added successfully!" });
      setTitle(""); setCategory("interior"); setStatus("completed");
      setImageUrl(""); setImageFile(null); setLocation(""); setDescription("");
    } catch (err: any) {
      console.error("Failed to add project:", err);
      setUploadStatus({ type: 'error', msg: `Saving failed: ${err.message}` });
    }
    setLoading(false);
  };

  const openEditModal = (project: any) => {
    setEditingProject(project);
    setEditTitle(project.title);
    setEditCategory(project.category || "interior");
    setEditStatus(project.status || "completed");
    setEditImageUrl(project.image);
    setEditImageFile(null);
    setEditLocation(project.location);
    setEditDescription(project.description);
  };

  const closeEditModal = () => setEditingProject(null);

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    if (!editTitle || (!editImageUrl && !editImageFile) || !editLocation || !editDescription) {
      alert("Please fill in all fields.");
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
        finalImageUrl = await uploadImageToStorage(editImageFile, "projects");
      }
      const projectRef = doc(db, "projects", editingProject.id);
      await updateDoc(projectRef, {
        title: editTitle, category: editCategory, status: editStatus,
        image: finalImageUrl, location: editLocation, description: editDescription,
        storageType: editImageFile ? "firebase-storage" : "external-link",
        updatedAt: serverTimestamp()
      });
      setEditingProject(null);
      alert("Project updated successfully!");
    } catch (err: any) {
      console.error("Failed to update project", err);
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
          <FolderGit2 className="w-10 h-10 text-accent" /> Projects Manager
        </h1>
        <p className="text-white/40 mt-2 text-lg">Add, update, or remove active, ongoing, or upcoming projects on the public projects page.</p>
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
        {/* Add Project Form */}
        <div className="lg:col-span-5">
          <Card className="bg-[#08162d] border border-white/10 shadow-none rounded-2xl">
            <CardHeader className="border-b border-white/5 pb-6 rounded-t-2xl">
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-white">
                <PlusCircle className="text-accent w-6 h-6" /> Add Project
              </CardTitle>
              <p className="text-sm text-white/40">Add completed, ongoing, or upcoming works.</p>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleAddProject} className="space-y-4">
                <div className="space-y-1.5">
                  <label className={labelClass}>Project Title</label>
                  <Input placeholder="e.g. Ranchi Luxury Penthouse" value={title} onChange={(e) => setTitle(e.target.value)} disabled={loading} required className={inputClass} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={labelClass}>Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} disabled={loading} className={selectClass}>
                      <option value="interior">Interior Design</option>
                      <option value="construction">Construction</option>
                      <option value="3d-design">3D Design</option>
                      <option value="other">Other Services</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} disabled={loading} className={selectClass}>
                      <option value="completed">Completed</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="upcoming">Upcoming</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={labelClass}>Location</label>
                  <Input placeholder="e.g. Ranchi, Jharkhand" value={location} onChange={(e) => setLocation(e.target.value)} disabled={loading} required className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Upload Project Image</label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (!file) {
                        setImageFile(null);
                        return;
                      }
                      const fileError = validateImageFile(file);
                      if (fileError) {
                        setUploadStatus({ type: 'error', msg: fileError });
                        e.currentTarget.value = "";
                        setImageFile(null);
                        return;
                      }
                      setImageFile(file);
                      setImageUrl("");
                    }}
                    disabled={loading}
                    className={inputClass}
                  />
                  <p className="text-[10px] text-white/20">Max image size: 1 MB.</p>
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Image Link URL</label>
                  <Input placeholder="https://example.com/project-image.png" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} disabled={loading || !!imageFile} className={inputClass} />
                  <p className="text-[10px] text-white/20">Link is optional if you upload a file.</p>
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Description</label>
                  <Textarea placeholder="Describe the scope, materials used, size..." value={description} onChange={(e) => setDescription(e.target.value)} disabled={loading} rows={4} required className={inputClass} />
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-accent text-primary font-bold h-11 mt-4">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Project"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Existing Projects List */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="bg-[#08162d] border border-white/10 shadow-none rounded-2xl">
            <CardHeader className="border-b border-white/5 pb-4 rounded-t-2xl flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold text-white">Active Projects</CardTitle>
              <Badge variant="outline" className="bg-transparent border-white/10 text-white/40">{projects.length} Total</Badge>
            </CardHeader>
            <CardContent className="pt-6">
              {projects.length === 0 ? (
                <div className="text-center py-12 text-white/30 font-medium">
                  No custom projects uploaded yet. Showing public fallback mock data.
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-4 border border-white/5 rounded-xl flex gap-4 bg-white/5 items-start">
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-[#051124]">
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-bold text-white text-sm truncate uppercase">{proj.title}</h4>
                          <Badge variant="outline" className="text-[9px] uppercase font-black bg-transparent border-white/10 text-white/40">{proj.status}</Badge>
                          <Badge className="text-[9px] uppercase font-bold bg-accent/20 text-accent border-none">{proj.category}</Badge>
                        </div>
                        <p className="flex items-center gap-1 text-[10px] text-white/30 font-bold uppercase">
                          <MapPin className="w-3 h-3 text-accent" />
                          {proj.location}
                        </p>
                        <p className="text-xs text-white/40 line-clamp-2">{proj.description}</p>
                      </div>

                      <div className="flex flex-col gap-1.5 shrink-0">
                        <button onClick={() => openEditModal(proj)} className="p-2 text-accent/70 rounded-lg" title="Edit Project">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(proj.id)} className="p-2 text-red-400/70 rounded-lg" title="Delete Project">
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
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="bg-[#08162d] rounded-2xl border border-white/10 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={closeEditModal} className="absolute top-4 right-4 text-white/30 p-1.5 rounded-lg">
              <X className="w-5 h-5" />
            </button>
            <CardHeader className="border-b border-white/5 pb-5">
              <CardTitle className="flex items-center gap-2 font-bold text-xl uppercase text-white">
                <Edit3 className="w-5 h-5 text-accent" /> Edit Project Details
              </CardTitle>
              <p className="text-xs text-white/30">Update project credentials display properties instantly.</p>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleUpdateProject} className="space-y-4">
                <div className="space-y-1.5">
                  <label className={labelClass}>Project Title</label>
                  <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} disabled={editLoading} required className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={labelClass}>Category</label>
                    <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)} disabled={editLoading} className={selectClass}>
                      <option value="interior">Interior Design</option>
                      <option value="construction">Construction</option>
                      <option value="3d-design">3D Design</option>
                      <option value="other">Other Services</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Status</label>
                    <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} disabled={editLoading} className={selectClass}>
                      <option value="completed">Completed</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="upcoming">Upcoming</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Location</label>
                  <Input value={editLocation} onChange={(e) => setEditLocation(e.target.value)} disabled={editLoading} required className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Upload New Image</label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (!file) {
                        setEditImageFile(null);
                        return;
                      }
                      const fileError = validateImageFile(file);
                      if (fileError) {
                        alert(fileError);
                        e.currentTarget.value = "";
                        setEditImageFile(null);
                        return;
                      }
                      setEditImageFile(file);
                      setEditImageUrl("");
                    }}
                    disabled={editLoading}
                    className={inputClass}
                  />
                  <p className="text-[10px] text-white/20">Max image size: 1 MB.</p>
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Image Link URL</label>
                  <Input value={editImageUrl} onChange={(e) => setEditImageUrl(e.target.value)} disabled={editLoading || !!editImageFile} className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Description</label>
                  <Textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} disabled={editLoading} rows={4} required className={inputClass} />
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
