"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Lock, Mail, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Monitor auth state on mount: if already authenticated, auto redirect to dashboard
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/consult-online");
      } else {
        setPageLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Handle Google OAuth
  const handleGoogleLogin = async () => {
    setErrorMsg("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(auth, provider);
      router.push("/consult-online");
    } catch (err: any) {
      console.error("Google Auth error", err);
      setErrorMsg("Google Sign-In cancelled or failed popup authorization.");
      setLoading(false);
    }
  };

  // Handle Email Login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please fill in all credentials.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/consult-online");
    } catch (err: any) {
      console.error("Email Login error", err);
      if (err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        setErrorMsg("Incorrect email or portal password.");
      } else {
        setErrorMsg(err.message || "Failed to authenticate.");
      }
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-galaxy-dark space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest animate-pulse">Syncing Portal...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-galaxy-dark flex items-center justify-center p-4 md:p-8 text-white relative bg-logo-radial bg-logo-mandala">
      
      <div className="max-w-md w-full space-y-8 animate-fade-up">
        {/* Brand Banner */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3 justify-center mb-2">
            <div className="h-10 w-10 rounded-full overflow-hidden border border-accent/30 bg-white/5 flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="Galaxy Interior Logo" 
                width={36} 
                height={36} 
                className="object-contain" 
              />
            </div>
            <div className="text-left flex flex-col">
              <span className="text-lg font-black tracking-tighter leading-none text-white">GALAXY</span>
              <span className="text-[7.5px] font-black tracking-[0.25em] text-accent mt-0.5">INTERIOR</span>
            </div>
          </Link>
          
          <Badge className="bg-accent/15 text-accent border border-accent/20 text-[8.5px] font-black tracking-widest px-3.5 py-1 uppercase rounded-full">
            Client Login Desk
          </Badge>
          <h1 className="text-2xl md:text-3xl font-black uppercase text-white font-display">
            Welcome to <span className="text-gold">Project Hub</span>
          </h1>
          <p className="text-xs text-white/50 max-w-xs mx-auto leading-relaxed">
            Log in to customize engineering layouts, process starter packages, and monitor construction steps.
          </p>
        </div>

        {/* Elevating M3 Card Form */}
        <Card className="glass-card border-accent/20 bg-[#08162d] rounded-[32px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none"></div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-200 text-xs rounded-2xl font-semibold flex items-center gap-2.5">
              <span className="text-base">⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-5">
            {/* Curved M3 Inputs */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-white/50 uppercase tracking-widest pl-1 block font-sans">Email Address</label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="e.g. name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="h-13 bg-white/[0.02] border-white/10 rounded-xl focus:border-accent text-white pl-10 font-sans"
                  required
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 shrink-0" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center pl-1">
                <label className="text-[9px] font-black text-white/50 uppercase tracking-widest block font-sans">Portal Password</label>
              </div>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="h-13 bg-white/[0.02] border-white/10 rounded-xl focus:border-accent text-white pl-10 font-sans"
                  required
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 shrink-0" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-gradient text-primary font-black uppercase tracking-widest text-xs h-13 rounded-full flex items-center justify-center gap-2 mt-6 shadow-lg"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Enter Client Dashboard <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Separation Divider */}
          <div className="my-6 flex items-center justify-center gap-3 relative">
            <div className="h-[1px] bg-white/10 flex-1"></div>
            <span className="text-[9px] font-black uppercase tracking-wider text-white/30">Or Fast Onboard</span>
            <div className="h-[1px] bg-white/10 flex-1"></div>
          </div>

          {/* Google OAuth Login Button */}
          <Button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white hover:bg-gray-100 text-primary font-black uppercase tracking-wider text-xs h-13 rounded-full flex items-center justify-center gap-3 shadow-md"
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </Button>

          {/* New User Account Fast Route */}
          <p className="text-center text-[10px] text-white/40 mt-6 uppercase tracking-wider font-bold">
            New client?{" "}
            <Link href="/consult-online" className="text-accent hover:underline font-black">
              Start Project Onboarding
            </Link>
          </p>
        </Card>

        {/* Quick Assist Escape Trigger */}
        <div className="flex items-center justify-between gap-4 bg-white/[0.01] border border-white/5 rounded-2xl p-4 text-xs font-medium text-white/50 leading-relaxed shadow-sm">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-4.5 h-4.5 text-accent shrink-0" />
            <span>Facing login trouble?</span>
          </div>
          <a 
            href="https://wa.me/919631980881" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent hover:underline font-bold uppercase tracking-wider text-[9px] shrink-0"
          >
            Direct WhatsApp Help ⚡
          </a>
        </div>

        {/* Back to Home Screen Trigger */}
        <div className="text-center pt-2">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/40 hover:text-accent text-[10px] font-black uppercase tracking-widest transition-colors"
          >
            ← Back to Home Screen
          </Link>
        </div>
      </div>

    </div>
  );
}
