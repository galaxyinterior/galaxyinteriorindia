"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Layers, 
  MessageSquare,
  CreditCard,
  UserCircle,
  LogOut,
  Loader2,
  FolderGit2,
  ShoppingBag,
  Star
} from "lucide-react";

export default function AdminWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === '/admin-galaxy/login';
  
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [billingStatus, setBillingStatus] = useState<any>(null);

  useEffect(() => {
    let unsubBilling: () => void;
    
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user && (user.email === 'admin@galaxy.in' || user.email === 'dev@akm.com')) {
        
        if (user.email === 'dev@akm.com') {
           // Direct to Dev Panel, they shouldn't be rendering AdminWrapper components
           if (isLogin) router.push('/dev-panel');
        } else {
           setAuthenticated(true);
           if (isLogin) router.push('/admin-galaxy');
           
           // Admin specifically fetches their live billing constraints
           unsubBilling = onSnapshot(doc(db, "system_settings", "billing"), (docSnap) => {
               if (docSnap.exists()) {
                   setBillingStatus(docSnap.data());
               }
           });
        }
        
      } else {
        setAuthenticated(false);
        if (!isLogin) router.push('/admin-galaxy/login');
      }
      setLoading(false);
    });
    
    return () => {
       unsubscribeAuth();
       if (unsubBilling) unsubBilling();
    };
  }, [isLogin, router, pathname]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin-galaxy/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#051124]">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
      </div>
    );
  }

  // Prevent flash of protected content while redirecting to login
  if (!authenticated && !isLogin) return null;

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[100dvh] bg-[#051124] text-white font-sans">
      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden md:flex w-64 bg-[#051124] border-r border-white/5 flex-col items-start p-6 space-y-8 h-[100dvh] sticky top-0 shadow-lg shrink-0 z-40">
        <div className="flex items-center gap-3 w-full border-b border-white/10 pb-4">
          <div className="h-9 w-9 rounded-full overflow-hidden border border-accent/30 bg-[#08162d] flex items-center justify-center shrink-0">
            <img src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-base font-black tracking-tighter leading-none text-white">GALAXY</span>
            <span className="text-[6.5px] font-black tracking-[0.28em] text-accent mt-0.5">ADMIN PANEL</span>
          </div>
        </div>
        
        <nav className="flex flex-col space-y-1.5 w-full flex-grow overflow-y-auto pr-1">
          <Link href="/admin-galaxy" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider ${pathname === '/admin-galaxy' ? 'bg-accent/15 text-accent border-l-2 border-accent' : 'text-white/60'}`}>
            <LayoutDashboard className="w-4 h-4 shrink-0 text-accent"/> Overview
          </Link>
          <Link href="/admin-galaxy/gallery" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider ${pathname?.includes('/gallery') ? 'bg-accent/15 text-accent border-l-2 border-accent' : 'text-white/60'}`}>
            <ImageIcon className="w-4 h-4 shrink-0 text-accent"/> Gallery Upload
          </Link>
          <Link href="/admin-galaxy/slideshow" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider ${pathname?.includes('/slideshow') ? 'bg-accent/15 text-accent border-l-2 border-accent' : 'text-white/60'}`}>
            <Layers className="w-4 h-4 shrink-0 text-accent"/> Slideshow Manage
          </Link>
          <Link href="/admin-galaxy/categories" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider ${pathname?.includes('/categories') ? 'bg-accent/15 text-accent border-l-2 border-accent' : 'text-white/60'}`}>
            <LayoutDashboard className="w-4 h-4 shrink-0 text-accent"/> Categories
          </Link>
          <Link href="/admin-galaxy/projects" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider ${pathname?.includes('/projects') ? 'bg-accent/15 text-accent border-l-2 border-accent' : 'text-white/60'}`}>
            <FolderGit2 className="w-4 h-4 shrink-0 text-accent"/> Manage Projects
          </Link>
          <Link href="/admin-galaxy/products" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider ${pathname?.includes('/products') ? 'bg-accent/15 text-accent border-l-2 border-accent' : 'text-white/60'}`}>
            <ShoppingBag className="w-4 h-4 shrink-0 text-accent"/> Manage Products
          </Link>
          <Link href="/admin-galaxy/services" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider ${pathname?.includes('/services') ? 'bg-accent/15 text-accent border-l-2 border-accent' : 'text-white/60'}`}>
            <Layers className="w-4 h-4 shrink-0 text-accent"/> Manage Services
          </Link>
          <Link href="/admin-galaxy/submissions" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider ${pathname?.includes('/submissions') ? 'bg-accent/15 text-accent border-l-2 border-accent' : 'text-white/60'}`}>
            <MessageSquare className="w-4 h-4 shrink-0 text-accent"/> Leads & Portal
          </Link>
          <Link href="/admin-galaxy/reviews" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider ${pathname?.includes('/reviews') ? 'bg-accent/15 text-accent border-l-2 border-accent' : 'text-white/60'}`}>
            <Star className="w-4 h-4 shrink-0 text-accent"/> Moderate Reviews
          </Link>
          <Link href="/admin-galaxy/billing" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider ${pathname?.includes('/billing') ? 'bg-accent/15 text-accent border-l-2 border-accent' : 'text-white/60'}`}>
            <CreditCard className="w-4 h-4 shrink-0 text-accent"/> Billing
          </Link>
          
          <div className="pt-6 pb-1">
            <p className="text-[9px] font-black text-white/30 uppercase tracking-widest px-4">Account</p>
          </div>
          
          <Link href="/admin-galaxy/profile" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider ${pathname?.includes('/profile') ? 'bg-accent/15 text-accent border-l-2 border-accent' : 'text-white/60'}`}>
            <UserCircle className="w-4 h-4 shrink-0 text-accent"/> Profile Settings
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400 text-[11px] font-black uppercase tracking-wider w-full text-left mt-2">
            <LogOut className="w-4 h-4 text-red-400"/> Secure Logout
          </button>
        </nav>

        <div className="w-full text-[10px] text-white/30 mt-auto text-center font-bold uppercase tracking-wider pt-4 border-t border-white/5">
           Galaxy Interior &copy; 2026
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-5 md:p-10 pb-24 md:pb-10 bg-[#051124] relative min-h-[100dvh] text-white">
        {children}
      </main>

      {/* Bottom Navigation (Mobile Viewports) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#051124] text-white flex items-center justify-around px-2 py-3.5 z-50 border-t border-white/5 shadow-2xl pb-safe">
        <Link href="/admin-galaxy" className={`flex flex-col items-center gap-1 p-2 ${pathname === '/admin-galaxy' ? 'text-accent' : 'text-white/40'}`}>
          <LayoutDashboard className="w-5 h-5"/>
          <span className="text-[8.5px] font-black uppercase tracking-wider">Home</span>
        </Link>
        <Link href="/admin-galaxy/gallery" className={`flex flex-col items-center gap-1 p-2 ${pathname?.includes('/gallery') ? 'text-accent' : 'text-white/40'}`}>
          <ImageIcon className="w-5 h-5"/>
          <span className="text-[8.5px] font-black uppercase tracking-wider">Gallery</span>
        </Link>
        <Link href="/admin-galaxy/slideshow" className={`flex flex-col items-center gap-1 p-2 ${pathname?.includes('/slideshow') ? 'text-accent' : 'text-white/40'}`}>
          <Layers className="w-5 h-5"/>
          <span className="text-[8.5px] font-black uppercase tracking-wider">Slides</span>
        </Link>
        <Link href="/admin-galaxy/submissions" className={`flex flex-col items-center gap-1 p-2 ${pathname?.includes('/submissions') ? 'text-accent' : 'text-white/40'}`}>
          <MessageSquare className="w-5 h-5"/>
          <span className="text-[8.5px] font-black uppercase tracking-wider">Leads</span>
        </Link>
        <Link href="/admin-galaxy/profile" className={`flex flex-col items-center gap-1 p-2 ${pathname?.includes('/profile') ? 'text-accent' : 'text-white/40'}`}>
          <UserCircle className="w-5 h-5"/>
          <span className="text-[8.5px] font-black uppercase tracking-wider">Profile</span>
        </Link>
      </nav>

      {/* Admin Subscription Blocker Modal */}
      {billingStatus && (billingStatus.status === 'overdue' || billingStatus.status === 'blocked') && (
         <div className="absolute inset-0 z-[9999] bg-black/80 backdrop-blur-[8px] flex items-center justify-center p-4">
             <div className="bg-[#08162d] border border-red-500/20 rounded-[32px] p-8 md:p-12 max-w-lg w-full text-center shadow-2xl animate-in zoom-in-95 duration-500 scale-100 ring-4 ring-white/5 text-white">
                <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                   <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-white font-display mb-2">{billingStatus.status === 'blocked' ? 'Account Blocked' : 'Payment Overdue'}</h2>
                <p className="text-xs text-white/50 mb-8 font-medium font-sans leading-relaxed">To restore access to your website management dashboard, please clear the outstanding subscription invoice immediately.</p>
                
                <div className="bg-[#051124] rounded-2xl p-5 mb-8 text-left space-y-3 border border-red-500/20 relative overflow-hidden text-xs font-sans">
                   <div className="flex justify-between items-center border-b border-white/5 pb-2 relative z-10"><span className="text-white/40 font-bold uppercase tracking-wider text-[9px]">Plan Active</span><span className="font-bold text-white">{billingStatus.planName || 'Galaxy Suite'}</span></div>
                   <div className="flex justify-between items-center border-b border-white/5 pb-2"><span className="text-white/40 font-bold uppercase tracking-wider text-[9px]">Total Amount Due</span><span className="font-black text-lg text-red-400">₹{billingStatus.monthlyFee}</span></div>
                   <div className="flex justify-between items-center"><span className="text-white/40 font-bold uppercase tracking-wider text-[9px]">Final Due Date</span><span className="font-bold text-white">{billingStatus.dueDate}</span></div>
                </div>

                <Link href={`https://wa.me/919931088808?text=Hi, I want to clear my overdue Galaxy Interior Website bill of ${billingStatus.monthlyFee}`} target="_blank" className="w-full flex items-center justify-center bg-gold-gradient text-primary font-black uppercase tracking-widest text-xs h-13 rounded-full shadow-lg transition-transform hover:scale-[1.02]">
                   Pay Now to Restore Access
                </Link>
                
                <div className="mt-6">
                  <button onClick={handleLogout} className="text-[10px] font-black text-white/30 hover:text-red-400 transition-colors uppercase tracking-widest">Logout Administrator</button>
                </div>
             </div>
         </div>
      )}
    </div>
  );
}
