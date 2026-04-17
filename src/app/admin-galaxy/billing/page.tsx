"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, ExternalLink, HardDrive, Infinity, CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function BillingAdminPage() {
  const [billing, setBilling] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBilling() {
       const snap = await getDoc(doc(db, "system_settings", "billing"));
       if (snap.exists()) setBilling(snap.data());
       setLoading(false);
    }
    fetchBilling();
  }, []);

  if (loading) return <div className="p-8 text-gray-500 animate-pulse">Loading billing metrics...</div>;
  if (!billing) return <div className="p-8 text-gray-500">No active billing contract found. Defaulting to free credits.</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto pb-20">
      <div>
        <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight flex items-center gap-3">
          <CreditCard className="w-10 h-10 text-primary" /> Billing & Plan
        </h1>
        <p className="text-gray-500 mt-2 text-lg">Manage your Galaxy Interior website subscription, host capacity, and billing cycle.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className={`lg:col-span-2 shadow-sm border ${billing.status === 'active' ? 'border-green-200' : 'border-red-200'} relative overflow-hidden`}>
             <div className={`absolute top-0 w-full h-1 ${billing.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
             <CardContent className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-6 mb-6">
                   <div>
                       <Badge variant="outline" className={`mb-2 font-bold px-3 py-1 ${billing.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                          {billing.status === 'active' ? <CheckCircle2 className="w-4 h-4 mr-1 inline" /> : <ShieldAlert className="w-4 h-4 mr-1 inline" />}
                          STATUS: {billing.status.toUpperCase()}
                       </Badge>
                       <h2 className="text-2xl font-bold text-gray-900 mb-1">{billing.planName || "Galaxy Architecture Master Plan"}</h2>
                       <p className="text-sm text-gray-500">Includes Next.js Vercel Hosting, Firebase Real-Time DB, Code Storage.</p>
                   </div>
                   <div className="text-left md:text-right">
                       <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Monthly Cycle</p>
                       <p className="text-4xl font-black text-gray-900 tracking-tighter">₹{billing.monthlyFee}<span className="text-sm text-gray-500 font-medium tracking-normal">/mo</span></p>
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                   <div>
                       <h3 className="text-sm font-bold text-gray-500 uppercase mb-2 tracking-widest">Next Invoice Date</h3>
                       <p className="text-xl font-bold text-gray-900 flex items-center gap-2">
                           {billing.dueDate} 
                           {billing.status !== 'active' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                       </p>
                   </div>
                   <div>
                       <h3 className="text-sm font-bold text-gray-500 uppercase mb-2 tracking-widest">Payment Method</h3>
                       <p className="text-base font-bold text-gray-900 items-center">
                           UPI / NEFT Auto-Pay
                       </p>
                   </div>
                </div>

                <div className="mt-8">
                   <Link href={`https://wa.me/919931088808?text=I want to pay/renew my Galaxy Interior website subscription of ₹${billing.monthlyFee}.`} target="_blank" className="inline-flex w-full md:w-auto items-center justify-center bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-lg font-bold text-sm transition-transform hover:scale-105">
                       {billing.status === 'active' ? "Pay Advance Invoice" : "Clear Outstanding Due Now" }
                       <ExternalLink className="w-4 h-4 ml-2 opacity-50" />
                   </Link>
                   <p className="text-xs text-gray-400 mt-3 font-medium">To modify your plan, please contact the developer via WhatsApp.</p>
                </div>
             </CardContent>
          </Card>

          <div className="space-y-6 lg:col-span-1">
             <Card className="shadow-sm border border-gray-100 h-full bg-blue-50/30">
                 <CardContent className="p-8">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                        <HardDrive className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Server Resources</h3>
                    <p className="text-sm text-gray-500 mb-6 border-b border-gray-200 pb-6">Usage metrics for your active deployment environment.</p>
                    
                    <div className="space-y-5">
                       <div>
                          <p className="text-sm font-bold text-gray-700 flex justify-between"><span>Media Storage Capacity</span> <span className="text-blue-600">{billing.storageUsed}</span></p>
                          <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                              <div className="bg-blue-500 h-full rounded-full" style={{ width: '25%' }}></div>
                          </div>
                          <p className="text-xs text-gray-400 mt-2">Included inside standard cloud limit.</p>
                       </div>
                       
                       <div className="pt-4">
                          <p className="text-sm font-bold text-gray-700 flex justify-between items-center mb-2"><span>Monthly Bandwidth</span> <Infinity className="w-5 h-5 text-green-500" /></p>
                          <p className="text-xs text-gray-400">Unlimited incoming site visitor traffic globally distributed via Edge network.</p>
                       </div>
                    </div>
                 </CardContent>
             </Card>
          </div>
      </div>
    </div>
  );
}
