"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, ArrowRight, Sparkles, Filter, Paintbrush, Home, CookingPot, Wrench, Zap, Trash2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Category definitions
const PRODUCT_CATEGORIES = [
  { id: "all", label: "All Products", icon: <ShoppingBag className="w-4 h-4" /> },
  { id: "kitchen", label: "Modular Kitchen", icon: <CookingPot className="w-4 h-4" /> },
  { id: "furniture", label: "Furniture Sets", icon: <Paintbrush className="w-4 h-4" /> },
  { id: "wardrobe", label: "Wardrobes", icon: <Home className="w-4 h-4" /> },
  { id: "lighting", label: "Smart Lighting", icon: <Zap className="w-4 h-4" /> },
  { id: "other", label: "Other Fittings", icon: <Wrench className="w-4 h-4" /> }
];

// Fallback Mock Products
const MOCK_PRODUCTS = [
  {
    id: "prod-1",
    name: "Galaxy Acrylic Modular Kitchen Set",
    category: "kitchen",
    price: 185000,
    image: "/generated/kitchen_offer_bg.png",
    description: "Seamless scratch-resistant acrylic cabinets, custom quartz countertop, integrated auto-clean motion chimney and premium Hettich soft-close tandem drawers.",
    specifications: "L-Shaped Modular, Custom Quartz stone, German soft-close drawers, Anti-damp backing"
  },
  {
    id: "prod-2",
    name: "Royale Velvet Chesterfield Sofa Set",
    category: "furniture",
    price: 65000,
    image: "/generated/srv_interior.png",
    description: "Elegant 5-seater high-density foam sofa upholstered with water-resistant royale velvet, supported by double-treated custom solid teakwood frames.",
    specifications: "5-Seater Set, Teakwood core base, Spill-resistant Velvet, 40-Density premium padding"
  },
  {
    id: "prod-3",
    name: "Elegance Sliding Double Wardrobe",
    category: "wardrobe",
    price: 95000,
    image: "/generated/3d_split_bedroom.png",
    description: "Floor-to-ceiling modern sliding wardrobe with high-gloss laminates, integrated drawer light sensors, and full-length vanity mirrors.",
    specifications: "Double sliding track, High-Gloss laminate overlays, Automatic LED lighting, 8x6 ft standard size"
  },
  {
    id: "prod-4",
    name: "Smart Wi-Fi Dimmable LED Strip Light",
    category: "lighting",
    price: 12500,
    image: "/generated/hero_interior_1.png",
    description: "Smart voice-activated dimmable LED strip set. Integrates seamlessly into architectural cove ceilings and wall panels, offering 16 million colors.",
    specifications: "Wi-Fi Smart Control, Alexa & Google Home compatible, Dimmable profiles, 12V low voltage safety"
  },
  {
    id: "prod-5",
    name: "Acoustic Gypsum Drop False Ceiling Kit",
    category: "other",
    price: 28000,
    image: "/generated/fac_false_ceiling.png",
    description: "Pre-engineered soundproof gypsum ceiling drop grids. Finished with Birla wall putty layers, spotlight cutouts, and dedicated LED light channels.",
    specifications: "Saint-Gobain Gypsum sheets, Double layer sound insulation, Spot & Cove ready, 10x10 ft kit"
  },
  {
    id: "prod-6",
    name: "Interlocking Fluted Charcoal TV Wall Slat",
    category: "other",
    price: 8500,
    image: "/generated/interior_gallery_1.png",
    description: "Waterproof, termite-resistant interlocking charcoal textured fluted backdrops. Ideal for premium visual panels behind TV sets and beds.",
    specifications: "Charcoal composite, Interlocking slats, Damp & Termite proof, 9.5x1 ft per modular slat"
  }
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Fallback to mock products if Firestore collection is empty
      setProducts(fetched.length > 0 ? fetched : MOCK_PRODUCTS);
      setLoading(false);
    }, (error) => {
      console.warn("Firestore connection warning, loading mock products:", error);
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter products by category
  const filteredProducts = products.filter(prod => {
    if (activeCategory === "all") return true;
    return prod.category === activeCategory;
  });

  return (
    <div className="bg-[#051124] min-h-screen text-white pt-24 pb-20 relative overflow-hidden">
      {/* Background Mandala Backdrop */}
      <div className="absolute inset-0 bg-logo-radial opacity-35 pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-accent/80 font-bold uppercase tracking-widest text-[9px] mb-8 justify-center">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="text-white/20">/</span>
          <span className="text-accent">Products Catalog</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-up">
          <Badge className="mb-4 rounded-full bg-accent text-primary font-black tracking-[0.20em] px-5 py-2 border-none shadow-md text-[10px] uppercase">
            Premium Catalog
          </Badge>
          <h1 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tight text-white leading-none mb-6">
            Interior <span className="text-gold italic">Products</span>
          </h1>
          <p className="max-w-xl mx-auto text-xs md:text-sm text-white/60 font-semibold leading-relaxed">
            Discover our curated, high-end modular products and customized fixtures designed to elevate your living environments.
          </p>
          <div className="w-20 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-4xl mx-auto animate-fade-up">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 border ${
                activeCategory === cat.id
                  ? "border-accent bg-accent/15 text-white shadow-[0_0_15px_rgba(255,207,51,0.15)]"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-accent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 animate-fade-up">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group bg-[#08162d] border border-white/10 rounded-[12px] sm:rounded-[18px] md:rounded-[24px] overflow-hidden hover:border-accent/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-accent/5 flex flex-col justify-between h-full">
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-black/40 border-b border-white/5">
                    <img
                      loading="lazy"
                      src={product.image || "/generated/srv_interior.png"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Category Overlay */}
                    <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                      <Badge className="rounded-full bg-primary/90 text-white/90 border border-white/10 font-bold text-[7px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 sm:px-3 sm:py-1 shadow-md">
                        {PRODUCT_CATEGORIES.find(c => c.id === product.category)?.label || "Fittings"}
                      </Badge>
                    </div>

                    {/* Price Overlay */}
                    <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4">
                      <Badge className="rounded-full bg-accent text-primary font-black text-[8px] sm:text-xs tracking-wider px-2 py-0.5 sm:px-4 sm:py-1.5 shadow-md border-none">
                        ₹{Number(product.price).toLocaleString("en-IN")}*
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-2.5 sm:p-4 md:p-6 space-y-1.5 sm:space-y-3">
                    <h3 className="text-[10px] sm:text-sm md:text-xl font-bold uppercase tracking-tight text-white group-hover:text-accent transition-colors leading-tight font-display line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-white/60 text-[9px] sm:text-xs leading-relaxed line-clamp-2 sm:line-clamp-3 font-semibold">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="px-2.5 sm:px-4 md:px-6 pb-2.5 sm:pb-4 md:pb-6 pt-1 sm:pt-2">
                  <Button 
                    onClick={() => setSelectedProduct(product)} 
                    variant="outline" 
                    className="w-full text-[8px] sm:text-xs font-black uppercase tracking-wider border-white/10 hover:border-accent text-white hover:text-accent bg-transparent rounded-lg sm:rounded-xl h-8 sm:h-10"
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Dynamic Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <Card className="bg-[#08162d] border border-white/15 rounded-[28px] max-w-2xl w-full text-white relative overflow-hidden animate-fade-up max-h-[90vh] overflow-y-auto">
              <div className="absolute inset-0 bg-logo-radial opacity-30 -z-10" />
              
              {/* Image banner */}
              <div className="relative aspect-video w-full bg-black/40 border-b border-white/10">
                <img loading="lazy" src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedProduct(null)} 
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white font-black flex items-center justify-center border border-white/15"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <Badge className="bg-accent text-primary font-black uppercase text-[9px] tracking-widest rounded-full px-3 py-1 mb-2.5 border-none">
                    {PRODUCT_CATEGORIES.find(c => c.id === selectedProduct.category)?.label}
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-display leading-tight">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-gold font-black text-xl mt-2">
                    ₹{Number(selectedProduct.price).toLocaleString("en-IN")} <span className="text-xs text-white/50 font-normal">(*Estimated Unit Price)</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-accent">Product Description</h4>
                  <p className="text-xs text-white/70 leading-relaxed font-semibold">{selectedProduct.description}</p>
                </div>

                {selectedProduct.specifications && (
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-accent">Specifications & Features</h4>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {selectedProduct.specifications.split(",").map((spec: string, i: number) => (
                        <Badge key={i} variant="outline" className="bg-white/5 border-white/10 text-white text-[10px] py-1 px-3 rounded-lg font-semibold">
                          {spec.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex gap-4">
                  <Button asChild className="flex-1 rounded-full h-12 font-black uppercase tracking-wider bg-accent hover:bg-accent/90 text-primary">
                    <Link href={`/contact?service=Interior%20Project&message=Interested%20in%20product:%20${encodeURIComponent(selectedProduct.name)}`}>
                      Enquire / Order Custom Fit
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                  <Button 
                    onClick={() => setSelectedProduct(null)} 
                    variant="outline" 
                    className="rounded-full h-12 px-6 font-black uppercase tracking-wider border-white/20 hover:border-accent text-white hover:text-accent bg-transparent"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}
