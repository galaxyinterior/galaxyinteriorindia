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
  Loader2
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
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  // Prevent flash of protected content while redirecting to login
  if (!authenticated && !isLogin) return null;

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden md:flex w-64 bg-galaxy-dark text-white flex-col items-start p-6 space-y-8 h-full sticky top-0 shadow-lg shrink-0 z-40">
        <div className="text-2xl font-display font-bold text-accent drop-shadow-sm w-full border-b border-white/10 pb-4">
          Galaxy <span className="text-white">Admin</span>
        </div>
        
        <nav className="flex flex-col space-y-2 w-full flex-grow">
          <Link href="/admin-galaxy" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${pathname === '/admin-galaxy' ? 'bg-primary/20 text-primary' : 'hover:bg-white/10'}`}>
            <LayoutDashboard className="w-5 h-5 text-accent"/> Overview
          </Link>
          <Link href="/admin-galaxy/gallery" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${pathname?.includes('/gallery') ? 'bg-primary/20 text-primary' : 'hover:bg-white/10'}`}>
            <ImageIcon className="w-5 h-5 text-accent"/> Gallery Upload
          </Link>
          <Link href="/admin-galaxy/slideshow" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${pathname?.includes('/slideshow') ? 'bg-primary/20 text-primary' : 'hover:bg-white/10'}`}>
            <Layers className="w-5 h-5 text-accent"/> Slideshow Manage
          </Link>
          <Link href="/admin-galaxy/submissions" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${pathname?.includes('/submissions') ? 'bg-primary/20 text-primary' : 'hover:bg-white/10'}`}>
            <MessageSquare className="w-5 h-5 text-accent"/> Consultations
          </Link>
          <Link href="/admin-galaxy/billing" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${pathname?.includes('/billing') ? 'bg-primary/20 text-primary' : 'hover:bg-white/10'}`}>
            <CreditCard className="w-5 h-5 text-accent"/> Billing
          </Link>
          
          <div className="pt-8 pb-2">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest px-4">Account</p>
          </div>
          
          <Link href="/admin-galaxy/profile" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${pathname?.includes('/profile') ? 'bg-primary/20 text-primary' : 'hover:bg-white/10'}`}>
            <UserCircle className="w-5 h-5 text-accent"/> Profile Settings
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-300 transition-colors text-sm font-medium w-full text-left">
            <LogOut className="w-5 h-5"/> Secure Logout
          </button>
        </nav>

        <div className="w-full text-xs text-white/40 mt-auto text-center font-medium">
           Galaxy Interior &copy; 2026
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-10 pb-24 md:pb-10 bg-gray-50 relative h-full safe-area-bottom">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-galaxy-dark text-white flex items-center justify-around px-2 py-3 z-50 border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] pb-safe">
        <Link href="/admin-galaxy" className={`flex flex-col items-center gap-1 p-2 transition-colors ${pathname === '/admin-galaxy' ? 'text-primary' : 'text-white/50 hover:text-white'}`}>
          <LayoutDashboard className="w-5 h-5"/>
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="/admin-galaxy/gallery" className={`flex flex-col items-center gap-1 p-2 transition-colors ${pathname?.includes('/gallery') ? 'text-primary' : 'text-white/50 hover:text-white'}`}>
          <ImageIcon className="w-5 h-5"/>
          <span className="text-[10px] font-bold">Gallery</span>
        </Link>
        <Link href="/admin-galaxy/slideshow" className={`flex flex-col items-center gap-1 p-2 transition-colors ${pathname?.includes('/slideshow') ? 'text-primary' : 'text-white/50 hover:text-white'}`}>
          <Layers className="w-5 h-5"/>
          <span className="text-[10px] font-bold">Slides</span>
        </Link>
        <Link href="/admin-galaxy/submissions" className={`flex flex-col items-center gap-1 p-2 transition-colors ${pathname?.includes('/submissions') ? 'text-primary' : 'text-white/50 hover:text-white'}`}>
          <MessageSquare className="w-5 h-5"/>
          <span className="text-[10px] font-bold">Leads</span>
        </Link>
        <Link href="/admin-galaxy/profile" className={`flex flex-col items-center gap-1 p-2 transition-colors ${pathname?.includes('/profile') ? 'text-primary' : 'text-white/50 hover:text-white'}`}>
          <UserCircle className="w-5 h-5"/>
          <span className="text-[10px] font-bold">Profile</span>
        </Link>
      </nav>

      {/* Admin Subscription Blocker Modal */}
      {billingStatus && (billingStatus.status === 'overdue' || billingStatus.status === 'blocked') && (
         <div className="absolute inset-0 z-[9999] bg-black/80 backdrop-blur-[8px] flex items-center justify-center p-4">
             <div className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-2xl animate-in zoom-in-95 duration-500 scale-100 ring-4 ring-white/10">
                <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                   <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                </div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">{billingStatus.status === 'blocked' ? 'Account Blocked' : 'Payment Overdue'}</h2>
                <p className="text-gray-500 mb-8 font-medium">To restore access to your website management dashboard, please clear the outstanding subscription invoice immediately.</p>
                
                <div className="bg-red-50/50 rounded-2xl p-5 mb-8 text-left space-y-3 border border-red-100 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-16 h-16 bg-red-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                   <div className="flex justify-between items-center text-sm border-b border-red-100 pb-2 relative z-10"><span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Plan Active</span><span className="font-bold text-gray-900">{billingStatus.planName || 'Galaxy Suite'}</span></div>
                   <div className="flex justify-between items-center text-sm border-b border-red-100 pb-2"><span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Total Amount Due</span><span className="font-bold text-xl text-red-600">₹{billingStatus.monthlyFee}</span></div>
                   <div className="flex justify-between items-center text-sm"><span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Final Due Date</span><span className="font-bold text-gray-900">{billingStatus.dueDate}</span></div>
                </div>

                <Link href={`https://wa.me/919931088808?text=Hi, I want to clear my overdue Galaxy Interior Website bill of ${billingStatus.monthlyFee}`} target="_blank" className="w-full flex items-center justify-center bg-accent hover:bg-accent/90 text-primary font-bold h-14 rounded-xl text-lg transition-transform hover:scale-105">
                   Pay Now to Restore Access
                </Link>
                
                <div className="mt-6">
                  <button onClick={handleLogout} className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest">Logout Administrator</button>
                </div>
             </div>
         </div>
      )}
    </div>
  );
}
