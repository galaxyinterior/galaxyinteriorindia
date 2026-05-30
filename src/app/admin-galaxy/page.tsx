"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, ImageIcon, MonitorPlay, Mails, Loader2, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function AdminOverviewPage() {
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecent() {
      try {
        const q = query(collection(db, "consultations"), orderBy("createdAt", "desc"), limit(5));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()?.toLocaleString() || "Just now"
        }));
        setRecentSubmissions(data);
      } catch (err) {
        console.error("Failed to fetch recent submissions", err);
      }
      setLoading(false);
    }
    fetchRecent();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-white/50 mt-2">Welcome back to the Galaxy Interior management panel.</p>
        </div>
        <div className="p-3 bg-accent/10 border border-accent/20 rounded-xl flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
          </span>
          <span className="font-bold text-accent text-sm">System Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        <Link href="/admin-galaxy/gallery">
          <Card className="cursor-pointer bg-[#08162d] border border-white/10 shadow-none rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-black text-white/40 uppercase tracking-widest">Gallery Uploads</CardTitle>
              <ImageIcon className="text-accent w-5 h-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Manage</div>
              <p className="text-xs text-white/40 mt-1">Add or remove portfolio shots</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin-galaxy/slideshow">
          <Card className="cursor-pointer bg-[#08162d] border border-white/10 shadow-none rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-black text-white/40 uppercase tracking-widest">Hero Slideshow</CardTitle>
              <MonitorPlay className="text-accent w-5 h-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Configure</div>
              <p className="text-xs text-white/40 mt-1">Homepage hero banners & text</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin-galaxy/projects">
          <Card className="cursor-pointer bg-[#08162d] border border-white/10 shadow-none rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-black text-white/40 uppercase tracking-widest">Manage Projects</CardTitle>
              <LayoutDashboard className="text-accent w-5 h-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Configure</div>
              <p className="text-xs text-white/40 mt-1">Completed, ongoing, and upcoming sites</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin-galaxy/products">
          <Card className="cursor-pointer bg-[#08162d] border border-white/10 shadow-none rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-black text-white/40 uppercase tracking-widest">Manage Products</CardTitle>
              <ShoppingBag className="text-accent w-5 h-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Configure</div>
              <p className="text-xs text-white/40 mt-1">Modular kitchen & custom fittings</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin-galaxy/submissions">
          <Card className="cursor-pointer bg-[#08162d] border border-white/10 shadow-none rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-black text-white/40 uppercase tracking-widest">Leads & Portal Plans</CardTitle>
              <Mails className="text-accent w-5 h-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">View</div>
              <p className="text-xs text-white/40 mt-1">Audit standard inquiries & client custom projects</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-xl font-bold font-display text-white">Recent Inquiries</h2>
             <Link href="/admin-galaxy/submissions" className="text-sm font-bold text-accent flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
          
          <Card className="bg-[#08162d] border border-white/10 shadow-none rounded-2xl">
            <CardContent className="p-0">
              {loading ? (
                <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-white/20" /></div>
              ) : recentSubmissions.length === 0 ? (
                <div className="p-12 text-center text-white/30 font-medium">No recent inquiries found.</div>
              ) : (
                <div className="divide-y divide-white/5">
                  {recentSubmissions.map((sub) => (
                    <div key={sub.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                       <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-white text-lg capitalize">{sub.name || "Anonymous User"}</h3>
                            <Badge variant="outline" className="bg-transparent border-white/10 text-white/50 text-[9px]">{sub.propertyType || "General Query"}</Badge>
                          </div>
                          <p className="text-sm text-white/40 line-clamp-1">{sub.message || "Interested in services or consultation."}</p>
                       </div>
                       <div className="text-left md:text-right shrink-0">
                          <p className="text-sm font-bold text-accent">{sub.phone}</p>
                          <p className="text-xs text-white/30 mt-1">{sub.createdAt}</p>
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
           <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 shadow-none rounded-2xl">
              <CardContent className="p-8 text-center">
                 <LayoutDashboard className="w-12 h-12 mx-auto mb-4 text-accent opacity-80" />
                 <h3 className="text-2xl font-bold mb-2 text-white">Welcome Admin</h3>
                 <p className="text-sm text-white/50">Manage portfolio images, incoming leads, and homepage slides easily.</p>
              </CardContent>
           </Card>
        </div>
      </div>

    </div>
  );
}
