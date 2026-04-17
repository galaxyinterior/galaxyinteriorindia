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
      
      // Re-authenticate to ensure recent login requirement is met
      await signInWithEmailAndPassword(auth, user.email, currentPassword);
      
      // Proceed to update password
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

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight flex items-center gap-3">
          <UserCircle className="w-10 h-10 text-primary" /> Administrator Profile
        </h1>
        <p className="text-gray-500 mt-2 text-lg">Manage your secure dashboard access credentials.</p>
      </div>

      <Card className="border-gray-200 shadow-sm max-w-2xl">
        <CardHeader className="bg-gray-50/80 border-b pb-6 rounded-t-xl">
          <CardTitle className="text-xl font-bold text-gray-900">Update Password</CardTitle>
          <p className="text-sm text-gray-500">Ensure your account is using a long, random password to stay secure.</p>
        </CardHeader>
        <CardContent className="pt-6">
          
          {status.msg && (
            <div className={`p-4 rounded-xl border flex items-center gap-3 mb-6 transition-colors ${
              status.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 
              status.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 
              'bg-blue-50 border-blue-200 text-blue-800'
            }`}>
              {status.type === 'success' ? <ShieldCheck className="w-5 h-5 shrink-0" /> : 
               status.type === 'error' ? <AlertCircle className="w-5 h-5 shrink-0" /> :
               <Loader2 className="w-5 h-5 shrink-0 animate-spin" />}
              <p className="font-medium text-sm">{status.msg}</p>
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Current Password</label>
              <Input 
                type="password"
                placeholder="Enter your current password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            
            <div className="py-2 border-t mt-4 border-gray-100"></div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">New Password</label>
              <Input 
                type="password"
                placeholder="Must be at least 6 characters" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Confirm New Password</label>
              <Input 
                type="password"
                placeholder="Re-enter new password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 mt-4">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
