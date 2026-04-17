"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, Mail, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== "admin@galaxy.in" && email !== "dev@akm.com") {
      setError("Access denied. Unauthorized administrator email.");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Wait for AdminWrapper to detect auth and trigger the router push
    } catch (err: any) {
      setError("Invalid authentication credentials. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-none overflow-hidden rounded-2xl animate-in zoom-in-95 duration-500">
        <div className="bg-galaxy-dark p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 border border-white/20 shadow-inner">
               <Lock className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white tracking-widest uppercase">Galaxy Admin</h1>
            <p className="text-white/60 text-sm mt-2">Secure Dashboard Access</p>
        </div>
        
        <CardContent className="p-8 pb-10">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg flex items-start gap-2 border border-red-100 animate-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="font-medium mt-0.5">{error}</p>
              </div>
            )}
            
            <div className="space-y-2 relative">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Administrator Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@galaxy.in"
                  className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 relative">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Secure Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  required
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-12 bg-accent hover:bg-accent/90 text-primary font-bold text-lg mt-2">
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {loading ? "Authenticating..." : "Login to Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
