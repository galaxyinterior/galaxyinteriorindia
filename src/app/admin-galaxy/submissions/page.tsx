"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mails, Phone, MapPin, Building, Loader2 } from "lucide-react";

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    try {
      const q = query(collection(db, "consultations"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()?.toLocaleString() || "Recent"
      }));
      setSubmissions(data);
    } catch (err) {
      console.error("Failed to fetch submissions", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight flex items-center gap-3">
            <Mails className="w-10 h-10 text-green-500" /> Client Consultations
          </h1>
          <p className="text-gray-500 mt-2 text-lg">View all incoming inquiries from the website forms.</p>
        </div>
        <Badge className="bg-green-100 text-green-800 border-none px-4 py-1 text-sm rounded-full">
          {submissions.length} Total Leads
        </Badge>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-24">
          <Loader2 className="w-10 h-10 animate-spin text-primary opacity-50" />
        </div>
      ) : submissions.length === 0 ? (
        <Card className="border-dashed border-2 py-24 bg-gray-50 flex items-center justify-center">
            <p className="text-gray-400 font-medium">No contact submissions found yet.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {submissions.map((sub) => (
            <Card key={sub.id} className="overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-l-primary group">
              <CardContent className="p-6 relative">
                
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900 capitalize">{sub.name || "Anonymous User"}</h3>
                  <Badge variant="outline" className="text-xs bg-gray-50 border-gray-200">
                    {sub.propertyType || "General Query"}
                  </Badge>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                    <a href={`tel:${sub.phone}`} className="hover:text-primary transition-colors font-medium">
                      {sub.phone || "No phone provided"}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>{sub.location || "No location provided"}</span>
                  </div>
                  {sub.message && (
                     <div className="flex items-start gap-3 text-sm text-gray-600">
                        <Mails className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                        <span className="italic">"{sub.message}"</span>
                     </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs font-bold text-gray-400">
                  <span>Received on</span>
                  <span>{sub.createdAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
