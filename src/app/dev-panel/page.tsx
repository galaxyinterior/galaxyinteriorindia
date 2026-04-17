"use client";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Server, GlobeLock, CheckCircle2 } from "lucide-react";

export default function DevBillingPage() {
   const [billing, setBilling] = useState({
       status: 'active',
       monthlyFee: '1500',
       dueDate: '2026-04-01',
       planName: 'Cloud Premium Hosting',
       storageUsed: '1.2GB/5GB'
   });
   const [loading, setLoading] = useState(true);
   const [saving, setSaving] = useState(false);
   const [notif, setNotif] = useState("");

   useEffect(() => {
     async function fetch() {
       try {
         const snap = await getDoc(doc(db, "system_settings", "billing"));
         if (snap.exists()) {
             setBilling(snap.data() as any);
         }
       } catch(err) {
         console.error("No default billing config found. Saving will create one.");
       }
       setLoading(false);
     }
     fetch();
   }, []);

   const handleSave = async () => {
      setSaving(true);
      try {
          await setDoc(doc(db, "system_settings", "billing"), billing, { merge: true });
          setNotif("Live payload deployed to client system.");
          setTimeout(() => setNotif(""), 3000);
      } catch (err) {
          alert("Database write error.");
      }
      setSaving(false);
   };

   if (loading) return <div className="text-zinc-500 font-mono animate-pulse">Initializing Database Connectors...</div>;

   return (
       <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
           <div className="mb-10 border-b border-white/10 pb-6 flex items-end justify-between">
               <div>
                 <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                     Server Matrix Console
                 </h1>
                 <p className="text-zinc-400 mt-2 font-mono text-sm">Force-override client permissions, locks, and billing arrays.</p>
               </div>
               
               {notif && (
                  <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 px-4 py-2 rounded flex items-center gap-2 text-sm font-bold font-mono animate-in slide-in-from-right-8">
                     <CheckCircle2 className="w-4 h-4" /> {notif}
                  </div>
               )}
           </div>

           <Card className="bg-[#151515] border-white/5 shadow-2xl">
               <CardHeader className="border-b border-white/5 pb-6 bg-black/40">
                   <div className="flex items-center gap-3">
                       <GlobeLock className="w-8 h-8 text-indigo-400" />
                       <div>
                          <CardTitle className="text-xl font-bold text-white uppercase tracking-wider">Client Site Override</CardTitle>
                          <p className="text-zinc-500 text-sm mt-1">Changes are instantly persisted via WebSockets to admin active sessions.</p>
                       </div>
                   </div>
               </CardHeader>
               
               <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                   
                   <div className="space-y-6">
                       <h3 className="font-bold text-zinc-300 border-b border-white/5 pb-2 text-sm uppercase tracking-widest">Global Status Toggle</h3>
                       
                       <div className="space-y-3">
                           <label className="text-xs font-mono font-bold text-zinc-500 uppercase">Master Access Switch</label>
                           <select 
                               value={billing.status}
                               onChange={e => setBilling({...billing, status: e.target.value})}
                               className={`w-full h-12 bg-black border rounded-lg px-4 text-sm font-bold shadow-inner outline-none focus:ring-2 focus:ring-indigo-500/50 ${billing.status === 'active' ? 'border-emerald-500/50 text-emerald-400' : 'border-red-500/50 text-red-400'}`}
                           >
                               <option value="active">🟢 ACTIVE / ONLINE</option>
                               <option value="overdue">🟡 OVERDUE (SHOW WARNING)</option>
                               <option value="blocked">🔴 BLOCKED (LOCK SITE ADMIN)</option>
                           </select>
                       </div>
                       
                       <div className="space-y-3">
                           <label className="text-xs font-mono font-bold text-zinc-500 uppercase mt-4">Subscription Title</label>
                           <input 
                               value={billing.planName}
                               onChange={e => setBilling({...billing, planName: e.target.value})}
                               className="w-full h-12 bg-black border border-white/10 rounded-lg px-4 text-white text-sm focus:border-indigo-500 outline-none" 
                           />
                       </div>
                   </div>

                   <div className="space-y-6 border-l border-white/5 pl-0 md:pl-8">
                       <h3 className="font-bold text-zinc-300 border-b border-white/5 pb-2 text-sm uppercase tracking-widest">Billing Metrics Array</h3>
                       
                       <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                               <label className="text-xs font-mono font-bold text-zinc-500 uppercase">Monthly Fee (₹)</label>
                               <input 
                                   value={billing.monthlyFee}
                                   onChange={e => setBilling({...billing, monthlyFee: e.target.value})}
                                   className="w-full h-12 bg-black/50 border border-white/10 rounded-lg px-4 text-white font-mono text-sm focus:border-indigo-500 outline-none" 
                               />
                           </div>
                           <div className="space-y-2">
                               <label className="text-xs font-mono font-bold text-zinc-500 uppercase">Final Due Date</label>
                               <input 
                                   value={billing.dueDate}
                                   onChange={e => setBilling({...billing, dueDate: e.target.value})}
                                   placeholder="YYYY-MM-DD"
                                   className="w-full h-12 bg-black/50 border border-white/10 rounded-lg px-4 text-white font-mono text-sm focus:border-indigo-500 outline-none" 
                               />
                           </div>
                       </div>
                       
                       <div className="space-y-2">
                           <label className="text-xs font-mono font-bold text-zinc-500 uppercase flex items-center justify-between">
                               <span>Storage Consumption</span>
                               <Server className="w-3 h-3 text-indigo-400" />
                           </label>
                           <input 
                               value={billing.storageUsed}
                               onChange={e => setBilling({...billing, storageUsed: e.target.value})}
                               className="w-full h-12 bg-indigo-950/20 border border-indigo-500/20 text-indigo-300 rounded-lg px-4 font-mono text-sm outline-none" 
                           />
                       </div>
                       
                       <Button onClick={handleSave} disabled={saving} className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold font-mono tracking-wider mt-4">
                           {saving ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "DEPLOY OVERRIDES"}
                       </Button>
                   </div>
               </CardContent>
           </Card>
           
           <div className="mt-8 flex items-start gap-4 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
               <div className="mt-1 w-2 h-2 rounded-full bg-yellow-500 animate-pulse shrink-0"></div>
               <p className="text-xs text-yellow-500/80 font-mono leading-relaxed">
                  Warning: Setting the master access switch to BLOCKED or OVERDUE will instantly trigger a full-screen unclosable modal over the authorized user's interface, blocking structural and system settings. Ensure you have properly configured the Amount Due before initiating blockade protocols.
               </p>
           </div>
       </div>
   );
}
