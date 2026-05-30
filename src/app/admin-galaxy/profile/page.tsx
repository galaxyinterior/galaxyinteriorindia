"use client";

import { useState } from "react";
import { updatePassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserCircle, ShieldCheck, Loader2, AlertCircle } from "lucide-react";

export default function ProfileAdminPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [status, setStatus] = useState<{ type: 'idle'|'success'|'error', msg: string }>({ type: 'idle', msg: '' });
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setStatus({ type: 'error', msg: "New passwords do not match!" });
      return;
    }
    
    if (newPassword.length < 6) {
      setStatus({ type: 'error', msg: "New password must be at least 6 characters long." });
      return;
    }

    setLoading(true);
    setStatus({ type: 'idle', msg: "Validating and updating password..." });
    
    try {
      const user = auth.currentUser;
      if (!user || user.email !== "admin@galaxy.in") throw new Error("Unauthorized user.");
      
      await signInWithEmailAndPassword(auth, user.email, currentPassword);
      await updatePassword(user, newPassword);
      
      setStatus({ type: 'success', msg: "Administrator password updated securely!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error(err);
      setStatus({ type: 'error', msg: `Failed: ${err.message}` });
    }
    setLoading(false);
  };

  const inputClass = "bg-[#051124] border-white/10 text-white placeholder:text-white/20 focus:ring-accent";
  const labelClass = "text-xs font-bold text-white/40 uppercase tracking-widest";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-display font-bold text-white tracking-tight flex items-center gap-3">
          <UserCircle className="w-10 h-10 text-accent" /> Administrator Profile
        </h1>
        <p className="text-white/40 mt-2 text-lg">Manage your secure dashboard access credentials.</p>
      </div>

      <Card className="bg-[#08162d] border border-white/10 shadow-none rounded-2xl max-w-2xl">
        <CardHeader className="border-b border-white/5 pb-6 rounded-t-2xl">
          <CardTitle className="text-xl font-bold text-white">Update Password</CardTitle>
          <p className="text-sm text-white/40">Ensure your account is using a long, random password to stay secure.</p>
        </CardHeader>
        <CardContent className="pt-6">
          
          {status.msg && (
            <div className={`p-4 rounded-xl border flex items-center gap-3 mb-6 ${
              status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
              status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 
              'bg-accent/10 border-accent/20 text-accent'
            }`}>
              {status.type === 'success' ? <ShieldCheck className="w-5 h-5 shrink-0" /> : 
               status.type === 'error' ? <AlertCircle className="w-5 h-5 shrink-0" /> :
               <Loader2 className="w-5 h-5 shrink-0 animate-spin" />}
              <p className="font-medium text-sm">{status.msg}</p>
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-5">
            <div className="space-y-2">
              <label className={labelClass}>Current Password</label>
              <Input 
                type="password"
                placeholder="Enter your current password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={loading}
                required
                className={inputClass}
              />
            </div>
            
            <div className="py-2 border-t mt-4 border-white/5"></div>

            <div className="space-y-2">
              <label className={labelClass}>New Password</label>
              <Input 
                type="password"
                placeholder="Must be at least 6 characters" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Confirm New Password</label>
              <Input 
                type="password"
                placeholder="Re-enter new password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
                className={inputClass}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-accent text-primary font-bold h-12 mt-4">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
