"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, PlusCircle, CheckCircle2, Loader2, AlertCircle, Trash2, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminProductsPage() {
  // Input fields state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("kitchen");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [description, setDescription] = useState("");

  const [products, setProducts] = useState<any[]>([]);
  const [uploadStatus, setUploadStatus] = useState<{ type: 'idle'|'success'|'error', msg: string }>({ type: 'idle', msg: '' });
  const [loading, setLoading] = useState(false);

  // Fetch products from Firestore
  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(fetched);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this product from the catalog?")) {
       try {
         await deleteDoc(doc(db, "products", id));
       } catch (err) {
         console.error("Delete failed:", err);
         alert("Failed to delete the product.");
       }
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !imageUrl || !description || !specifications) {
      setUploadStatus({ type: 'error', msg: "Please fill in all required fields." });
      return;
    }

    setLoading(true);
    setUploadStatus({ type: 'idle', msg: "Saving product to catalog..." });

    try {
      await addDoc(collection(db, "products"), {
        name,
        category,
        price: Number(price),
        image: imageUrl,
        specifications,
        description,
        createdAt: serverTimestamp()
      });

      setUploadStatus({ type: 'success', msg: "Product added successfully!" });
      setName("");
      setCategory("kitchen");
      setPrice("");
      setImageUrl("");
      setSpecifications("");
      setDescription("");

    } catch (err: any) {
      console.error("Failed to add product:", err);
      setUploadStatus({ type: 'error', msg: `Saving failed: ${err.message}` });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight flex items-center gap-3">
          <ShoppingBag className="w-10 h-10 text-primary" /> Products Manager
        </h1>
        <p className="text-gray-500 mt-2 text-lg">Manage modular products, smart switches, wardrobes, and custom lighting displayed on the public catalog page.</p>
      </div>

      {uploadStatus.msg && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 transition-colors ${
          uploadStatus.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 
          uploadStatus.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 
          'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          {uploadStatus.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : 
           uploadStatus.type === 'error' ? <AlertCircle className="w-5 h-5 shrink-0" /> :
           <Loader2 className="w-5 h-5 shrink-0 animate-spin" />}
          <p className="font-medium text-sm">{uploadStatus.msg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Add Product Form */}
        <div className="lg:col-span-5">
          <Card className="border-gray-200 shadow-md bg-white">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-6 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <PlusCircle className="text-primary w-6 h-6" /> Add Product
              </CardTitle>
              <p className="text-sm text-gray-500">Insert custom modular products into the catalog.</p>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase">Product Name</label>
                  <Input 
                    placeholder="e.g. Galaxy Acrylic Modular Kitchen Set" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      disabled={loading}
                      className="w-full h-10 px-3 border border-gray-200 bg-white rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="kitchen">Modular Kitchen</option>
                      <option value="furniture">Furniture Sets</option>
                      <option value="wardrobe">Wardrobes</option>
                      <option value="lighting">Smart Lighting</option>
                      <option value="other">Other Fittings</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase">Estimated Price (₹)</label>
                    <Input 
                      type="number"
                      placeholder="e.g. 185000" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase">Image Link URL</label>
                  <Input 
                    placeholder="https://example.com/product-image.png" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <p className="text-[10px] text-gray-400">Use generated watermarked links from public folders or galleries.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase">Specifications (Comma separated)</label>
                  <Input 
                    placeholder="e.g. L-Shaped, Quartz Countertop, Hettich drawers" 
                    value={specifications}
                    onChange={(e) => setSpecifications(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <p className="text-[10px] text-gray-400">Separate specs with commas to display them as distinct tags.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase">Description</label>
                  <Textarea 
                    placeholder="Provide full dimensions, material standards, styling guidelines, and brand integrations..." 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading}
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 mt-4">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Product"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Existing Products List */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="border-gray-200 shadow-md bg-white">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4 rounded-t-xl flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold">Active Products</CardTitle>
              <Badge variant="outline" className="bg-white">{products.length} Total</Badge>
            </CardHeader>
            <CardContent className="pt-6">
              {products.length === 0 ? (
                <div className="text-center py-12 text-gray-400 font-medium">
                  No custom products uploaded yet. Showing public fallback mock data.
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((prod) => (
                    <div key={prod.id} className="p-4 border rounded-xl flex gap-4 bg-gray-50/50 items-start hover:border-gray-300 transition-all">
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border bg-white">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-bold text-gray-900 text-sm truncate uppercase">{prod.name}</h4>
                          <Badge className="text-[9px] uppercase font-bold bg-primary text-white">{prod.category}</Badge>
                        </div>
                        <p className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase">
                          <Tag className="w-3 h-3 text-primary" />
                          ₹{Number(prod.price).toLocaleString("en-IN")}
                        </p>
                        <p className="text-xs text-gray-600 line-clamp-2">{prod.description}</p>
                      </div>

                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all shrink-0 self-center"
                        title="Delete Product"
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
