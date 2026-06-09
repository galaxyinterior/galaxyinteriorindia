"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tags, PlusCircle, Trash2, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminCategoriesPage() {
  const [name, setName] = useState("");
  const [type, setType] = useState<"project" | "product">("project");
  
  const [categories, setCategories] = useState<any[]>([]);
  const [status, setStatus] = useState<{ type: 'idle'|'success'|'error', msg: string }>({ type: 'idle', msg: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "categories"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(fetched);
    });
    return () => unsubscribe();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setStatus({ type: 'error', msg: "Please enter a category name." });
      return;
    }
    setLoading(true);
    setStatus({ type: 'idle', msg: "Adding category..." });
    try {
      const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await addDoc(collection(db, "categories"), {
        name: name.trim(),
        slug,
        type,
        createdAt: serverTimestamp()
      });
      setStatus({ type: 'success', msg: "Category added successfully!" });
      setName("");
      setTimeout(() => setStatus({ type: 'idle', msg: '' }), 3000);
    } catch (err: any) {
      console.error("Failed to add category:", err);
      setStatus({ type: 'error', msg: `Saving failed: ${err.message}` });
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
       try { await deleteDoc(doc(db, "categories", id)); }
       catch (err) { console.error("Delete failed:", err); alert("Failed to delete category."); }
    }
  };

  const projectCategories = categories.filter(c => c.type === 'project');
  const productCategories = categories.filter(c => c.type === 'product');

  const inputClass = "bg-[#051124] border-white/10 text-white placeholder:text-white/20 focus:ring-accent";
  const selectClass = "w-full h-10 px-3 border border-white/10 bg-[#051124] text-white rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-accent";
  const labelClass = "text-xs font-bold text-white/40 uppercase tracking-widest";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-4xl font-display font-bold text-white tracking-tight flex items-center gap-3">
          <Tags className="w-10 h-10 text-accent" /> Categories Manager
        </h1>
        <p className="text-white/40 mt-2 text-lg">Add custom categories for your projects and products.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Add Category Form */}
        <div className="lg:col-span-5">
          <Card className="bg-[#08162d] border border-white/10 shadow-none rounded-2xl">
            <CardHeader className="border-b border-white/5 pb-6 rounded-t-2xl">
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-white">
                <PlusCircle className="text-accent w-6 h-6" /> Add Category
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleAddCategory} className="space-y-4">
                <div className="space-y-1.5">
                  <label className={labelClass}>Category Target</label>
                  <select value={type} onChange={(e) => setType(e.target.value as any)} disabled={loading} className={selectClass}>
                    <option value="project">For Projects</option>
                    <option value="product">For Products</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Category Name</label>
                  <Input placeholder="e.g. Minimalist Furniture" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} required className={inputClass} />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-accent text-primary font-bold h-11 mt-4">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Category"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Existing Categories Lists */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="bg-[#08162d] border border-white/10 shadow-none rounded-2xl">
            <CardHeader className="border-b border-white/5 pb-4 rounded-t-2xl flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold text-white">Project Categories</CardTitle>
              <Badge variant="outline" className="bg-transparent border-white/10 text-white/40">{projectCategories.length} Total</Badge>
            </CardHeader>
            <CardContent className="pt-6">
              {projectCategories.length === 0 ? (
                <p className="text-sm text-white/30 italic">No project categories found.</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {projectCategories.map(c => (
                    <div key={c.id} className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                      <span className="text-sm text-white">{c.name}</span>
                      <button onClick={() => handleDelete(c.id)} className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#08162d] border border-white/10 shadow-none rounded-2xl">
            <CardHeader className="border-b border-white/5 pb-4 rounded-t-2xl flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold text-white">Product Categories</CardTitle>
              <Badge variant="outline" className="bg-transparent border-white/10 text-white/40">{productCategories.length} Total</Badge>
            </CardHeader>
            <CardContent className="pt-6">
              {productCategories.length === 0 ? (
                <p className="text-sm text-white/30 italic">No product categories found.</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {productCategories.map(c => (
                    <div key={c.id} className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                      <span className="text-sm text-white">{c.name}</span>
                      <button onClick={() => handleDelete(c.id)} className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-3.5 h-3.5" />
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
