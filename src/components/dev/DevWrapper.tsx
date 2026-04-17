"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { ShieldAlert, LogOut, Loader2, Database, Key } from "lucide-react";

export default function DevWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Hardcode block to allow ONLY the exact dev email to access this UI layer
      if (user && user.email === 'dev@akm.com') {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        router.push('/admin-galaxy/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin-galaxy/login');
  };

  if (loading) {
     return (
        <div className="h-screen w-full flex items-center justify-center bg-zinc-950 font-mono text-green-500">
           Terminating Protocol... <Loader2 className="w-4 h-4 ml-2 animate-spin" />
        </div>
     );
  }

  if (!authenticated) return null;

  return (
    <div className="flex h-screen bg-[#0E0E0E] text-zinc-300 font-sans overflow-hidden">
      <aside className="w-64 bg-black flex flex-col p-6 sticky top-0 shrink-0 border-r border-white/5 shadow-2xl z-50">
        <div className="font-bold flex items-center gap-2 text-xl text-emerald-400 border-b border-white/10 pb-6 mb-6 font-mono tracking-tight cursor-default">
           <ShieldAlert className="w-6 h-6" /> ROOT_ACCESS
        </div>
        
        <nav className="flex-1 space-y-2">
           <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-600 mb-3 px-2">Controls</p>
           <Link href="/dev-panel" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-sm border border-emerald-500/20">
             <Database className="w-4 h-4" /> Client Overrides
           </Link>
           <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 opacity-50 cursor-not-allowed text-sm font-bold">
             <Key className="w-4 h-4" /> API Credentials
           </div>
        </nav>
        
        <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-950/30 border border-red-900/30 hover:bg-red-900/50 text-red-500 transition-colors text-xs uppercase tracking-wider font-bold w-full">
           <LogOut className="w-4 h-4" /> Terminate Link
        </button>
      </aside>
      
      <main className="flex-1 overflow-y-auto relative bg-[#0E0E0E]">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-[#0e0e0e] to-[#0e0e0e] pointer-events-none" />
         <div className="relative z-10 p-6 md:p-12">
           {children}
         </div>
      </main>
    </div>
  )
}
