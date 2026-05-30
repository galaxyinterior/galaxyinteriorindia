"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
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

  if (loading) return <div className="p-8 text-white/30 animate-pulse font-medium">Loading billing metrics...</div>;
  if (!billing) return <div className="p-8 text-white/30 font-medium">No active billing contract found. Defaulting to free credits.</div>;

  const isActive = billing.status === 'active';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto pb-20">
      <div>
        <h1 className="text-4xl font-display font-bold text-white tracking-tight flex items-center gap-3">
          <CreditCard className="w-10 h-10 text-accent" /> Billing & Plan
        </h1>
        <p className="text-white/40 mt-2 text-lg">Manage your Galaxy Interior website subscription, host capacity, and billing cycle.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className={`lg:col-span-2 bg-[#08162d] border shadow-none relative overflow-hidden rounded-2xl ${isActive ? 'border-emerald-500/20' : 'border-red-500/20'}`}>
             <div className={`absolute top-0 w-full h-0.5 ${isActive ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
             <CardContent className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6 mb-6">
                   <div>
                       <Badge variant="outline" className={`mb-2 font-bold px-3 py-1 ${isActive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                          {isActive ? <CheckCircle2 className="w-4 h-4 mr-1 inline" /> : <ShieldAlert className="w-4 h-4 mr-1 inline" />}
                          STATUS: {billing.status.toUpperCase()}
                       </Badge>
                       <h2 className="text-2xl font-bold text-white mb-1">{billing.planName || "Galaxy Architecture Master Plan"}</h2>
                       <p className="text-sm text-white/40">Includes Next.js Vercel Hosting, Firebase Real-Time DB, Code Storage.</p>
                   </div>
                   <div className="text-left md:text-right">
                       <p className="text-xs text-white/30 font-bold uppercase tracking-widest mb-1">Monthly Cycle</p>
                       <p className="text-4xl font-black text-white tracking-tighter">₹{billing.monthlyFee}<span className="text-sm text-white/40 font-medium tracking-normal">/mo</span></p>
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                   <div>
                       <h3 className="text-xs font-bold text-white/30 uppercase mb-2 tracking-widest">Next Invoice Date</h3>
                       <p className="text-xl font-bold text-white flex items-center gap-2">
                           {billing.dueDate} 
                           {!isActive && <AlertTriangle className="w-5 h-5 text-red-400" />}
                       </p>
                   </div>
                   <div>
                       <h3 className="text-xs font-bold text-white/30 uppercase mb-2 tracking-widest">Payment Method</h3>
                       <p className="text-base font-bold text-white">UPI / NEFT Auto-Pay</p>
                   </div>
                </div>

                <div className="mt-8">
                   <Link href={`https://wa.me/919931088808?text=I want to pay/renew my Galaxy Interior website subscription of ₹${billing.monthlyFee}.`} target="_blank" className="inline-flex w-full md:w-auto items-center justify-center bg-white text-[#051124] px-8 py-3 rounded-lg font-bold text-sm">
                       {isActive ? "Pay Advance Invoice" : "Clear Outstanding Due Now"}
                       <ExternalLink className="w-4 h-4 ml-2 opacity-50" />
                   </Link>
                   <p className="text-xs text-white/20 mt-3 font-medium">To modify your plan, please contact the developer via WhatsApp.</p>
                </div>
             </CardContent>
          </Card>

          <div className="space-y-6 lg:col-span-1">
             <Card className="bg-[#08162d] border border-white/10 shadow-none rounded-2xl h-full">
                 <CardContent className="p-8">
                    <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6">
                        <HardDrive className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Server Resources</h3>
                    <p className="text-sm text-white/40 mb-6 border-b border-white/5 pb-6">Usage metrics for your active deployment environment.</p>
                    
                    <div className="space-y-5">
                       <div>
                          <p className="text-sm font-bold text-white flex justify-between"><span>Media Storage Capacity</span> <span className="text-accent">{billing.storageUsed}</span></p>
                          <div className="w-full h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
                              <div className="bg-accent h-full rounded-full" style={{ width: '25%' }}></div>
                          </div>
                          <p className="text-xs text-white/30 mt-2">Included inside standard cloud limit.</p>
                       </div>
                       
                       <div className="pt-4 border-t border-white/5">
                          <p className="text-sm font-bold text-white flex justify-between items-center mb-2"><span>Monthly Bandwidth</span> <Infinity className="w-5 h-5 text-emerald-400" /></p>
                          <p className="text-xs text-white/30">Unlimited incoming site visitor traffic globally distributed via Edge network.</p>
                       </div>
                    </div>
                 </CardContent>
             </Card>
          </div>
      </div>
    </div>
  );
}
