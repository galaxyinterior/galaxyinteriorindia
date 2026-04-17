"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, ImageIcon, MonitorPlay, Mails, Loader2, ArrowRight } from "lucide-react";
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
      <div className="flex items-center justify-between border-b pb-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 mt-2">Welcome back to the Galaxy Interior management panel.</p>
        </div>
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
          <span className="font-bold text-blue-900 text-sm">System Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Link href="/admin-galaxy/gallery" className="group">
          <Card className="hover:border-primary transition-colors cursor-pointer shadow-sm hover:shadow-md bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">Gallery Uploads</CardTitle>
              <ImageIcon className="text-primary w-5 h-5 group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">Manage</div>
              <p className="text-xs text-gray-500 mt-1">Add or remove portfolio shots</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin-galaxy/slideshow" className="group">
          <Card className="hover:border-accent transition-colors cursor-pointer shadow-sm hover:shadow-md bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">Hero Slideshow</CardTitle>
              <MonitorPlay className="text-accent w-5 h-5 group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">Configure</div>
              <p className="text-xs text-gray-500 mt-1">Homepage hero banners & text</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin-galaxy/submissions" className="group">
          <Card className="hover:border-green-500 transition-colors cursor-pointer shadow-sm hover:shadow-md bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">Consultations</CardTitle>
              <Mails className="text-green-500 w-5 h-5 group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">View</div>
              <p className="text-xs text-gray-500 mt-1">Incoming queries and leads</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-xl font-bold font-display text-gray-900">Recent Inquiries</h2>
             <Link href="/admin-galaxy/submissions" className="text-sm font-bold text-primary hover:text-accent transition-colors flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
          
          <Card className="shadow-sm border-gray-200">
            <CardContent className="p-0">
              {loading ? (
                <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
              ) : recentSubmissions.length === 0 ? (
                <div className="p-12 text-center text-gray-500 font-medium">No recent inquiries found.</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {recentSubmissions.map((sub) => (
                    <div key={sub.id} className="p-5 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                       <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-gray-900 text-lg capitalize">{sub.name || "Anonymous User"}</h3>
                            <Badge variant="outline" className="bg-white">{sub.propertyType || "General Query"}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-1">{sub.message || "Interested in services or consultation."}</p>
                       </div>
                       <div className="text-left md:text-right shrink-0">
                          <p className="text-sm font-bold text-primary">{sub.phone}</p>
                          <p className="text-xs text-gray-400 mt-1">{sub.createdAt}</p>
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
           <Card className="shadow-sm border-gray-200 bg-gradient-to-br from-primary to-primary/80 text-white border-none">
              <CardContent className="p-8 text-center">
                 <LayoutDashboard className="w-12 h-12 mx-auto mb-4 opacity-80" />
                 <h3 className="text-2xl font-bold mb-2">Welcome Admin</h3>
                 <p className="text-sm text-white/80">Manage portfolio images, incoming leads, and homepage slides easily.</p>
              </CardContent>
           </Card>
        </div>
      </div>

    </div>
  );
}
