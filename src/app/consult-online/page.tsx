"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Check, Phone, Mail, MapPin, ChevronRight, ChevronLeft, User, Lock, Loader2, Sparkles,
  Building, Briefcase, Layers, Compass, Calendar, DollarSign, Clock, FileText, Zap, LogOut,
  HelpCircle, ShieldCheck, CreditCard, CheckCircle2, AlertCircle, PlusCircle, Bell, Settings,
  Home, ClipboardList, MessageSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db, auth } from "@/lib/firebase";
import { collection, doc, getDoc, setDoc, addDoc, query, where, onSnapshot, orderBy, serverTimestamp, writeBatch, getDocs } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const packageDetails: Record<string, { name: string; price: string; priceNum: number; visits: string; suitable: string; benefits: string[] }> = {
  basic: {
    name: "Basic Package",
    price: "9,999",
    priceNum: 9999,
    visits: "6 Site Visits",
    suitable: "Projects up to 1000 Sqft",
    benefits: [
      "Affordable professional support",
      "Better contractor coordination",
      "Saves client time during construction",
      "Regular professional site monitoring",
      "Smooth basic construction management",
      "Reduces basic construction mistakes"
    ]
  },
  standard: {
    name: "Standard Package",
    price: "17,999",
    priceNum: 17999,
    visits: "10 Site Visits",
    suitable: "Projects from 1000 – 1800 Sqft",
    benefits: [
      "Better material & labour management",
      "Smooth and organized construction",
      "Regular professional monitoring",
      "Reduces unnecessary expenses",
      "Faster coordination between client & contractor",
      "Better work quality control",
      "Saves client time and effort",
      "Professional construction support"
    ]
  },
  premium: {
    name: "Premium Package",
    price: "29,999",
    priceNum: 29999,
    visits: "15 Site Visits",
    suitable: "Projects above 1800 Sqft",
    benefits: [
      "Stress-free construction handling",
      "Better finishing & quality control",
      "Faster and smoother execution",
      "Regular updates and transparency",
      "Professional construction management support",
      "Better project monitoring & coordination",
      "Saves client effort and valuable time",
      "Smooth execution from start to finishing"
    ]
  }
};

const commercialPackageDetails: Record<string, { name: string; price: string; priceNum: number; visits: string; suitable: string; benefits: string[] }> = {
  basic: {
    name: "Commercial Starter",
    price: "14,999",
    priceNum: 14999,
    visits: "8 Site Visits",
    suitable: "Office / Shop up to 1500 Sqft",
    benefits: [
      "Affordable commercial consultation",
      "Professional spatial structural layout",
      "Standard electrical / safety routing guidance",
      "Saves business setup and contractor time",
      "Dedicated workspace layout monitoring",
      "Basic business zoning compliance check"
    ]
  },
  standard: {
    name: "Business Growth",
    price: "24,999",
    priceNum: 24999,
    visits: "12 Site Visits",
    suitable: "Malls / Hotels from 1500 – 3500 Sqft",
    benefits: [
      "Optimized material & luxury showroom finish",
      "Workstation desks and wiring blueprints",
      "Regular corporate structural reviews",
      "Substantial expense and delay reduction",
      "Faster engineer-to-contractor coordination",
      "Workspace high-durability tile audit",
      "Vastu and airflow alignment checks",
      "Premium commercial space planning support"
    ]
  },
  premium: {
    name: "Enterprise Custom",
    price: "39,999",
    priceNum: 39999,
    visits: "20 Site Visits",
    suitable: "Hospitals / Schools above 3500 Sqft",
    benefits: [
      "Stress-free commercial tower construction",
      "Stunning modern lobby & entrance structural designs",
      "3D workspace virtual walkthrough layout included",
      "Advanced automated ventilation & energy blue-charts",
      "Priority structural architect consulting support",
      "Regular progress report and timeline syncing",
      "Comprehensive fire safety clearance routing",
      "Complete high-fidelity setup from core to finish"
    ]
  }
};

const serviceOptions = [
  { id: "false_ceiling", label: "False Ceiling", icon: "🌌" },
  { id: "wallpaper", label: "Wallpaper Art", icon: "🖼️" },
  { id: "wall_paints", label: "Premium Wall Paints", icon: "🎨" },
  { id: "tiles_flooring", label: "Tiles Flooring", icon: "🧱" },
  { id: "wooden_flooring", label: "Wooden Flooring", icon: "🪵" },
  { id: "pvc_work", label: "PVC Ceiling & Panelling", icon: "🧼" },
  { id: "modular_kitchen", label: "Modular Kitchen Setup", icon: "🍳" },
  { id: "wardrobes", label: "Luxury Wardrobes & TV Units", icon: "📺" },
  { id: "architectural_blueprint", label: "Architectural & 2D Sizing Plan", icon: "📐" },
  { id: "three_d_elevation", label: "3D Rendering & VR Walkthrough", icon: "🕶️" },
  { id: "plumbing_electrical", label: "Electrical & Plumbing blue-charts", icon: "🔌" },
  { id: "solar_consulting", label: "Green Energy Solar Blueprint", icon: "☀️" }
];

const commercialServiceOptions = [
  { id: "corp_ceiling", label: "Corporate False Ceiling", icon: "🌌" },
  { id: "cabin_grids", label: "Smart Cabin Partitions", icon: "🚪" },
  { id: "desk_wiring", label: "Workstation Desk Wiring", icon: "🔌" },
  { id: "heavy_flooring", label: "Heavy-Duty Tiles Flooring", icon: "🧱" },
  { id: "display_units", label: "Retail Showroom Display Units", icon: "🛍️" },
  { id: "lobby_panelling", label: "Lobby & Reception Panelling", icon: "🏢" },
  { id: "structural_layout", label: "Office Tower Structural Plan", icon: "📐" },
  { id: "workspace_walkthrough", label: "3D Workspace VR Walkthrough", icon: "🕶️" },
  { id: "safety_routing", label: "Electrical & Fire Blue-Charts", icon: "🔥" },
  { id: "ventilation_solar", label: "Automated HVAC & Solar Consulting", icon: "☀️" }
];

export default function ConsultOnlinePage() {
  const router = useRouter();

  // Active Tab View inside Isolated Dashboard: 'overview' | 'projects' | 'initialize' | 'notifications' | 'profile' | 'support'
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "initialize" | "notifications" | "profile" | "support">("overview");

  // Portal views: 'loading' | 'onboard' | 'complete-profile' | 'app'
  const [portalState, setPortalState] = useState<"loading" | "onboard" | "complete-profile" | "app">("loading");

  // Portal Onboarding Form Flow states
  const [onboardView, setOnboardView] = useState<"signup" | "login">("signup");
  const [onboardMethod, setOnboardMethod] = useState<"select" | "email">("select");
  const [onboardName, setOnboardName] = useState("");
  const [onboardEmail, setOnboardEmail] = useState("");
  const [onboardPassword, setOnboardPassword] = useState("");
  const [onboardPhone, setOnboardPhone] = useState("");
  const [onboardAddress, setOnboardAddress] = useState("");
  const [onboardError, setOnboardError] = useState("");
  const [onboardLoading, setOnboardLoading] = useState(false);
  
  // Auth states
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Complete Profile Form states
  const [profilePhone, setProfilePhone] = useState("");
  const [profileAddress, setProfileAddress] = useState("");
  const [profileError, setProfileError] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  // Firestore collections data state
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [notificationsList, setNotificationsList] = useState<any[]>([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [appliedServicesList, setAppliedServicesList] = useState<any[]>([]);
  const [loadingAppliedServices, setLoadingAppliedServices] = useState(true);
  const [subTab, setSubTab] = useState<"projects" | "applied">("projects");

  // Profile Edit states
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  // Project Onboarding Wizard state
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedPkg, setSelectedPkg] = useState<"basic" | "standard" | "premium">("standard");
  const [checkedServices, setCheckedServices] = useState<string[]>(["false_ceiling", "modular_kitchen", "three_d_elevation"]);
  const [siteLocation, setSiteLocation] = useState("");
  const [plotSize, setPlotSize] = useState("");
  const [floorsCount, setFloorsCount] = useState("1");
  const [specialRemarks, setSpecialRemarks] = useState("");
  const [wizardError, setWizardError] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const [projectSegment, setProjectSegment] = useState<"residential" | "commercial">("residential");
  const [propertyType, setPropertyType] = useState("Duplex House");

  const handleSegmentChange = (segment: "residential" | "commercial") => {
    setProjectSegment(segment);
    if (segment === "commercial") {
      setPropertyType("Corporate Office");
      setCheckedServices(["corp_ceiling", "cabin_grids", "workspace_walkthrough"]);
    } else {
      setPropertyType("Duplex House");
      setCheckedServices(["false_ceiling", "modular_kitchen", "three_d_elevation"]);
    }
  };

  // Watch Auth state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await syncUserProfile(user);
      } else {
        setCurrentUser(null);
        setUserProfile(null);
        setPortalState("onboard");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Sync client profile details with Firestore 'users'
  const syncUserProfile = async (user: any) => {
    setPortalState("loading");
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const data = userSnapshot.data();
        setUserProfile(data);
        setEditName(data.name || "");
        setEditAge(data.age ? String(data.age) : "");
        setEditPhone(data.phone || "");
        setEditAddress(data.address || "");

        // Check profile parameters completeness (Phone and Address are required)
        if (!data.phone || !data.address) {
          setPortalState("complete-profile");
        } else {
          setPortalState("app");
          subscribeToProjects(user.uid);
          subscribeToNotifications(user.uid);
          subscribeToAppliedServices(user.uid);
        }
      } else {
        // Newly created Google users might not have a Firestore doc yet
        const initialProfile = {
          uid: user.uid,
          name: user.displayName || "",
          email: user.email || "",
          age: "",
          phone: "",
          address: "",
          membershipType: "Standard Member",
          provider: user.providerData[0]?.providerId || "google",
          createdAt: new Date().toISOString()
        };
        await setDoc(userDocRef, initialProfile);
        setUserProfile(initialProfile);
        setPortalState("complete-profile");
      }
    } catch (err) {
      console.error("Failed to sync profile", err);
      router.push("/login");
    }
  };

  // Subscribe to client's projects in real time
  const subscribeToProjects = (uid: string) => {
    setLoadingProjects(true);
    const q = query(
      collection(db, "client_projects"),
      where("uid", "==", uid),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projects = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAtFormatted: doc.data().createdAt?.toDate()?.toLocaleDateString() || "Recently"
      }));
      setProjectsList(projects);
      setLoadingProjects(false);
    }, (error) => {
      console.error("Firestore projects lookup failed", error);
      setLoadingProjects(false);
    });
    return unsubscribe;
  };

  // Subscribe to client's applied services in real time
  const subscribeToAppliedServices = (uid: string) => {
    setLoadingAppliedServices(true);
    const q = query(
      collection(db, "applied_services"),
      where("uid", "==", uid),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const services = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAtFormatted: doc.data().createdAt?.toDate()?.toLocaleDateString() || "Recently"
      }));
      setAppliedServicesList(services);
      setLoadingAppliedServices(false);
    }, (error) => {
      console.error("Firestore applied services lookup failed", error);
      setLoadingAppliedServices(false);
    });
    return unsubscribe;
  };

  // Subscribe to client's notifications in real time
  const subscribeToNotifications = (uid: string) => {
    setLoadingNotifications(true);
    const q = query(
      collection(db, "notifications"),
      where("uid", "==", uid),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAtFormatted: doc.data().createdAt?.toDate()?.toLocaleString() || "Just now"
      }));
      setNotificationsList(notifications);
      setUnreadNotificationsCount(notifications.filter((n: any) => !n.read).length);
      setLoadingNotifications(false);
    }, (error) => {
      console.error("Firestore notifications lookup failed", error);
      setLoadingNotifications(false);
    });
    return unsubscribe;
  };

  // Mark all notifications as read
  const markAllNotificationsAsRead = async () => {
    try {
      const unreadAlerts = notificationsList.filter((n: any) => !n.read);
      if (unreadAlerts.length === 0) return;

      const batch = writeBatch(db);
      unreadAlerts.forEach((alert) => {
        const docRef = doc(db, "notifications", alert.id);
        batch.update(docRef, { read: true });
      });
      await batch.commit();
    } catch (err) {
      console.error("Failed to mark notifications as read", err);
    }
  };

  // Onboard: Handle Google signup/login
  const handleGoogleOnboard = async () => {
    setOnboardError("");
    setOnboardLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error("Google Onboard error", err);
      setOnboardError("Google Sign-In failed or was cancelled.");
    } finally {
      setOnboardLoading(false);
    }
  };

  // Onboard: Handle Manual email signup
  const handleOnboardSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setOnboardError("");
    
    if (!onboardName || !onboardEmail || !onboardPassword || !onboardPhone || !onboardAddress) {
      setOnboardError("All profile fields are required for onboarding.");
      return;
    }

    setOnboardLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, onboardEmail, onboardPassword);
      const user = userCredential.user;

      const initialProfile = {
        uid: user.uid,
        name: onboardName,
        email: onboardEmail,
        age: "",
        phone: onboardPhone,
        address: onboardAddress,
        membershipType: "Standard Member",
        provider: "email",
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, "users", user.uid), initialProfile);
      
      setOnboardName("");
      setOnboardEmail("");
      setOnboardPassword("");
      setOnboardPhone("");
      setOnboardAddress("");
      setOnboardMethod("select");
      
      setUserProfile(initialProfile);
      setCurrentUser(user);
      setPortalState("app");
      subscribeToProjects(user.uid);
      subscribeToNotifications(user.uid);
    } catch (err: any) {
      console.error("Email signup onboarding failed", err);
      if (err.code === "auth/email-already-in-use") {
        setOnboardError("This email address is already registered inside our portal.");
      } else {
        setOnboardError(err.message || "Onboarding failed. Please try again.");
      }
    } finally {
      setOnboardLoading(false);
    }
  };

  // Onboard: Handle Manual email login
  const handleOnboardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setOnboardError("");

    if (!onboardEmail || !onboardPassword) {
      setOnboardError("Please provide your email and password.");
      return;
    }

    setOnboardLoading(true);
    try {
      await signInWithEmailAndPassword(auth, onboardEmail, onboardPassword);
    } catch (err: any) {
      console.error("Email login onboarding failed", err);
      if (err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        setOnboardError("Incorrect credentials. Please verify your portal details.");
      } else {
        setOnboardError(err.message || "Failed to log in.");
      }
    } finally {
      setOnboardLoading(false);
    }
  };

  // Profile: Submit missing contacts
  const handleProfileCompleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError("");
    setProfileLoading(true);

    if (!profilePhone || !profileAddress) {
      setProfileError("Phone number and site address are mandatory.");
      setProfileLoading(false);
      return;
    }

    try {
      const updatedFields = {
        phone: profilePhone,
        address: profileAddress
      };
      await setDoc(doc(db, "users", currentUser.uid), updatedFields, { merge: true });
      
      setUserProfile((prev: any) => ({ ...prev, ...updatedFields }));
      setPortalState("app");
      subscribeToProjects(currentUser.uid);
      subscribeToNotifications(currentUser.uid);
    } catch (err: any) {
      console.error("Failed to complete profile fields", err);
      setProfileError("Database sync failed. Please try again.");
    } finally {
      setProfileLoading(false);
    }
  };

  // Profile Settings: Edit Profile Form submit
  const handleEditProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    setEditSuccess(false);

    if (!editName || !editAge || !editPhone || !editAddress) {
      alert("All fields are required.");
      setEditLoading(false);
      return;
    }

    try {
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(userRef, {
        name: editName,
        age: editAge,
        phone: editPhone,
        address: editAddress
      }, { merge: true });
      
      setUserProfile((prev: any) => ({
        ...prev,
        name: editName,
        age: editAge,
        phone: editPhone,
        address: editAddress
      }));

      setEditSuccess(true);
      setTimeout(() => setEditSuccess(false), 4000);
    } catch (err) {
      console.error("Failed to update profile settings", err);
      alert("Failed to save settings. Please try again.");
    } finally {
      setEditLoading(false);
    }
  };

  // Sign Out Anchor Trigger
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err) {
      console.error("Sign-out process failed", err);
    }
  };

  // Wizard: Toggle service item checks
  const handleServiceToggle = (id: string) => {
    setCheckedServices(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Wizard: Proceed steps validator
  const handleWizardNext = () => {
    setWizardError("");
    if (wizardStep === 1) {
      setWizardStep(2);
    } else if (wizardStep === 2) {
      if (checkedServices.length === 0) {
        setWizardError("Please select at least one design/construction service.");
        return;
      }
      setWizardStep(3);
    }
  };

  // Wizard: Confirm & Project final sync (Offline Setup)
  const handleSimulatedPaymentSubmit = async () => {
    setWizardError("");
    if (!siteLocation || !plotSize) {
      setWizardError("Site location and area size are mandatory to configure estimations.");
      return;
    }
    setPaymentLoading(true);

    const activePackages = projectSegment === "commercial" ? commercialPackageDetails : packageDetails;
    const activePkg = activePackages[selectedPkg];

    try {
      // 1. Sync custom project configuration to Firestore 'client_projects'
      const currentServiceOptions = projectSegment === "commercial" ? commercialServiceOptions : serviceOptions;
      const customServicesNames = currentServiceOptions
        .filter(opt => checkedServices.includes(opt.id))
        .map(opt => opt.label);

      const projectDoc = {
        uid: currentUser.uid,
        clientName: userProfile.name,
        clientPhone: userProfile.phone,
        clientAddress: userProfile.address,
        projectName: `${userProfile.name}'s ${propertyType}`,
        projectSegment: projectSegment,
        propertyType: propertyType,
        selectedPackage: activePkg.name,
        packagePricePaid: "Offline Setup",
        priceNumPaid: activePkg.priceNum,
        customOptions: customServicesNames,
        siteDetails: {
          location: siteLocation,
          plotSize: plotSize,
          floors: floorsCount,
          remarks: specialRemarks
        },
        paymentStatus: "Pending Setup",
        paymentTxId: "Offline / Manual",
        status: "Initialized", // Initialized -> Under Audit -> Visit Scheduled -> In Progress -> Completed
        createdAt: serverTimestamp()
      };

      // 2. Also log an admin lead record under 'consultations' for double compatibility with standard submissions dashboard!
      await addDoc(collection(db, "consultations"), {
        name: userProfile.name,
        phone: userProfile.phone,
        location: siteLocation,
        propertyType: `${projectSegment === "commercial" ? "🏢 Commercial" : "🏠 Residential"}: ${propertyType} (${activePkg.name})`,
        projectSegment: projectSegment,
        message: `Structured plan initialized via dashboard. Setup Mode: Offline/Manual. Custom options: ${customServicesNames.join(", ")}. Site size: ${plotSize} Sqft. Remarks: ${specialRemarks}`,
        createdAt: serverTimestamp()
      });

      await addDoc(collection(db, "client_projects"), projectDoc);

      // 3. Create initial notification
      await addDoc(collection(db, "notifications"), {
        uid: currentUser.uid,
        title: "Project Initialized",
        message: `Your ${projectSegment} project "${userProfile.name}'s ${propertyType}" has been successfully initialized! Our team will contact you offline for payments.`,
        read: false,
        createdAt: serverTimestamp()
      });

      setPaymentSuccess(true);
      
      // Trigger Webhook post to Make.com for email notification
      fetch("https://hook.eu1.make.com/xv4lp625r8o1ree9sgyd7416dkn4kz7n", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          accountOwner: userProfile.name || "Client",
          phone: userProfile.phone || "N/A",
          email: currentUser.email || "N/A",
          segment: projectSegment,
          basePlan: activePkg.name,
          propertyType: propertyType,
          floors: floorsCount,
          customOptions: customServicesNames,
          siteLocation: siteLocation,
          areaSize: plotSize,
          remarks: specialRemarks || ""
        })
      }).catch(err => {
        console.error("Webhook POST failure:", err);
      });

      setTimeout(() => {
        setPaymentLoading(false);
        setPaymentSuccess(false);
        setWizardStep(1);
        setSiteLocation("");
        setPlotSize("");
        setFloorsCount("1");
        setSpecialRemarks("");
        setActiveTab("projects");
      }, 2000);

    } catch (err: any) {
      console.error("GATEWAY SYNC FAILURE", err);
      setWizardError("Project initialization failed. Please check your Firestore database connection.");
      setPaymentLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-galaxy-dark text-white overflow-hidden font-sans relative">
      
      {/* 1. Loading Overlay Screen */}
      {portalState === "loading" && (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-galaxy-dark space-y-4 z-[99]">
          <Loader2 className="w-12 h-12 text-accent animate-spin stroke-[2.5]" />
          <p className="text-white/60 font-black tracking-widest text-[10px] uppercase animate-pulse">Syncing Portal Session...</p>
        </div>
      )}

      {/* 2. Onboarding Form Flow Screen (Sign Up / Sign In) */}
      {portalState === "onboard" && (
        <div className="h-screen w-full flex items-center justify-center bg-galaxy-dark p-4 z-[90] overflow-y-auto bg-logo-radial bg-logo-mandala text-white relative">
          <div className="max-w-md w-full space-y-6 animate-fade-up py-8">
            
            {/* Brand Banner */}
            <div className="text-center space-y-2">
              <Link href="/" className="inline-flex items-center gap-3 justify-center mb-1">
                <div className="h-9 w-9 rounded-full overflow-hidden border border-accent/30 bg-white/5 flex items-center justify-center">
                  <Image 
                    src="/logo.png" 
                    alt="Galaxy Interior Logo" 
                    width={32} 
                    height={32} 
                    className="object-contain" 
                  />
                </div>
                <div className="text-left flex flex-col">
                  <span className="text-base font-black tracking-tighter leading-none text-white">GALAXY</span>
                  <span className="text-[7px] font-black tracking-[0.25em] text-accent mt-0.5">INTERIOR</span>
                </div>
              </Link>
              
              <Badge className="bg-accent/15 text-accent border border-accent/20 text-[8px] font-black tracking-widest px-3 py-0.5 uppercase rounded-full">
                Project Onboarding Gate
              </Badge>
              <h1 className="text-xl md:text-2xl font-black uppercase text-white font-display">
                {onboardView === "signup" ? "Initialize Your " : "Welcome Back to "} 
                <span className="text-gold">Residence Plan</span>
              </h1>
              <p className="text-[10px] text-white/50 max-w-xs mx-auto leading-relaxed">
                {onboardView === "signup" 
                  ? "Onboard your account to configure services, pay simulated package fees, and trace blueprints."
                  : "Sign in to access your customized layout dashboard, active checklists, and progress logs."}
              </p>
            </div>

            {/* Premium Onboarding Card */}
            <Card className="glass-card border-accent/20 bg-[#08162d] rounded-[28px] p-6 shadow-2xl relative overflow-hidden">
              {onboardError && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-200 text-[10px] rounded-xl font-bold flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{onboardError}</span>
                </div>
              )}

              {/* A. SELECT SIGNUP METHOD (GOOGLE OR EMAIL) */}
              {onboardMethod === "select" && (
                <div className="space-y-4">
                  {/* Google OAuth Login Button */}
                  <Button
                    type="button"
                    onClick={handleGoogleOnboard}
                    disabled={onboardLoading}
                    className="w-full bg-white hover:bg-gray-100 text-primary font-black uppercase tracking-wider text-[10px] h-12 rounded-full flex items-center justify-center gap-3 shadow-md transition-all active:scale-95"
                  >
                    <svg className="h-4.5 w-4.5 shrink-0" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </Button>

                  <div className="flex items-center justify-center gap-3 relative my-4">
                    <div className="h-[1px] bg-white/10 flex-1"></div>
                    <span className="text-[8px] font-black uppercase tracking-wider text-white/35">Or Use Email</span>
                    <div className="h-[1px] bg-white/10 flex-1"></div>
                  </div>

                  {onboardView === "signup" ? (
                    <Button
                      type="button"
                      onClick={() => setOnboardMethod("email")}
                      className="w-full bg-accent hover:bg-accent/90 text-primary font-black uppercase tracking-widest text-[10px] h-12 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                    >
                      <Mail className="w-4.5 h-4.5" /> Start Onboarding Setup
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => setOnboardMethod("email")}
                      className="w-full bg-accent hover:bg-accent/90 text-primary font-black uppercase tracking-widest text-[10px] h-12 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                    >
                      <Lock className="w-4.5 h-4.5" /> Enter Password Portal
                    </Button>
                  )}

                  {/* Onboarding View Toggle */}
                  <div className="text-center pt-2 border-t border-white/5 mt-4">
                    {onboardView === "signup" ? (
                      <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider">
                        Already have a portal account?{" "}
                        <button 
                          onClick={() => {
                            setOnboardView("login");
                            setOnboardError("");
                          }} 
                          className="text-accent hover:underline font-black"
                        >
                          Log In Direct
                        </button>
                      </p>
                    ) : (
                      <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider">
                        New client?{" "}
                        <button 
                          onClick={() => {
                            setOnboardView("signup");
                            setOnboardError("");
                          }} 
                          className="text-accent hover:underline font-black"
                        >
                          Start Onboarding
                        </button>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* B. EMAIL ONBOARDING (SIGN UP FORM FLOW) */}
              {onboardMethod === "email" && onboardView === "signup" && (
                <form onSubmit={handleOnboardSignup} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[8.5px] font-black text-white/50 uppercase tracking-widest pl-1 block">Full Name</label>
                    <Input
                      type="text"
                      placeholder="e.g. Sameer Kumar"
                      value={onboardName}
                      onChange={(e) => setOnboardName(e.target.value)}
                      disabled={onboardLoading}
                      className="h-11 bg-white/[0.02] border-white/10 rounded-xl text-xs focus:border-accent text-white"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8.5px] font-black text-white/50 uppercase tracking-widest pl-1 block">Email Address</label>
                    <Input
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={onboardEmail}
                      onChange={(e) => setOnboardEmail(e.target.value)}
                      disabled={onboardLoading}
                      className="h-11 bg-white/[0.02] border-white/10 rounded-xl text-xs focus:border-accent text-white"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8.5px] font-black text-white/50 uppercase tracking-widest pl-1 block">Portal Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={onboardPassword}
                      onChange={(e) => setOnboardPassword(e.target.value)}
                      disabled={onboardLoading}
                      className="h-11 bg-white/[0.02] border-white/10 rounded-xl text-xs focus:border-accent text-white"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8.5px] font-black text-white/50 uppercase tracking-widest pl-1 block">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="e.g. +91 96319 80881"
                      value={onboardPhone}
                      onChange={(e) => setOnboardPhone(e.target.value)}
                      disabled={onboardLoading}
                      className="h-11 bg-white/[0.02] border-white/10 rounded-xl text-xs focus:border-accent text-white"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8.5px] font-black text-white/50 uppercase tracking-widest pl-1 block">Site Location Address</label>
                    <Textarea
                      placeholder="House No, Road name, Block, City, State"
                      value={onboardAddress}
                      onChange={(e) => setOnboardAddress(e.target.value)}
                      disabled={onboardLoading}
                      className="bg-white/[0.02] border-white/10 rounded-xl text-xs focus:border-accent text-white min-h-[70px]"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <Button
                      type="submit"
                      disabled={onboardLoading}
                      className="w-full bg-gold-gradient text-primary font-black uppercase tracking-wider text-[10px] h-12 rounded-full flex items-center justify-center gap-2 mt-2 shadow-lg"
                    >
                      {onboardLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register & Start Dashboard"}
                    </Button>

                    <Button
                      type="button"
                      onClick={() => setOnboardMethod("select")}
                      disabled={onboardLoading}
                      variant="outline"
                      className="w-full border-white/10 text-white/50 hover:text-white font-black uppercase tracking-widest text-[8.5px] h-10 rounded-full"
                    >
                      ← Back to Options
                    </Button>
                  </div>
                </form>
              )}

              {/* C. EMAIL ONBOARDING (MANUAL LOGIN FORM FLOW) */}
              {onboardMethod === "email" && onboardView === "login" && (
                <form onSubmit={handleOnboardLogin} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[8.5px] font-black text-white/50 uppercase tracking-widest pl-1 block">Email Address</label>
                    <Input
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={onboardEmail}
                      onChange={(e) => setOnboardEmail(e.target.value)}
                      disabled={onboardLoading}
                      className="h-11 bg-white/[0.02] border-white/10 rounded-xl text-xs focus:border-accent text-white"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8.5px] font-black text-white/50 uppercase tracking-widest pl-1 block">Portal Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={onboardPassword}
                      onChange={(e) => setOnboardPassword(e.target.value)}
                      disabled={onboardLoading}
                      className="h-11 bg-white/[0.02] border-white/10 rounded-xl text-xs focus:border-accent text-white"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <Button
                      type="submit"
                      disabled={onboardLoading}
                      className="w-full bg-gold-gradient text-primary font-black uppercase tracking-wider text-[10px] h-12 rounded-full flex items-center justify-center gap-2 mt-2 shadow-lg"
                    >
                      {onboardLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log In & Open Dashboard"}
                    </Button>

                    <Button
                      type="button"
                      onClick={() => setOnboardMethod("select")}
                      disabled={onboardLoading}
                      variant="outline"
                      className="w-full border-white/10 text-white/50 hover:text-white font-black uppercase tracking-widest text-[8.5px] h-10 rounded-full"
                    >
                      ← Back to Options
                    </Button>
                  </div>
                </form>
              )}
            </Card>

            {/* Back to Home Screen Trigger */}
            <div className="text-center pt-2">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-white/40 hover:text-accent text-[9.5px] font-black uppercase tracking-widest transition-colors"
              >
                ← Back to Home Screen
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 3. Complete Profile Form view (missing phone/address) */}
      {portalState === "complete-profile" && (
        <div className="h-screen w-full flex items-center justify-center bg-galaxy-dark p-4 z-[90] overflow-y-auto bg-logo-radial bg-logo-mandala">
          <div className="max-w-lg w-full space-y-8 animate-fade-up">
            <div className="text-center space-y-3">
              <span className="text-[10px] font-black text-accent uppercase tracking-widest bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full">
                Verification Required
              </span>
              <h1 className="text-3xl font-black uppercase text-white mt-3 font-display">
                Complete <span className="text-gold">Profile First</span>
              </h1>
              <p className="text-xs text-white/50 leading-relaxed max-w-sm mx-auto">
                Please finalize your contact settings and location coordinates to verify logistics.
              </p>
            </div>

            <Card className="glass-card border-accent/20 bg-[#08162d] rounded-[28px] p-6 md:p-8 shadow-2xl relative">
              {profileError && (
                <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/20 text-red-200 text-xs rounded-xl font-semibold">
                  {profileError}
                </div>
              )}

              <form onSubmit={handleProfileCompleteSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-white/40 uppercase tracking-widest pl-1">Client Email (Verified)</label>
                  <Input
                    type="email"
                    value={currentUser?.email}
                    disabled
                    className="h-13 bg-white/[0.01] border-white/5 text-white/40 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black text-white/50 uppercase tracking-widest pl-1 block font-sans">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="h-13 bg-white/[0.02] border-white/10 rounded-xl focus:border-accent text-white font-sans"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black text-white/50 uppercase tracking-widest pl-1 block font-sans">Site/Delivery Address</label>
                  <Textarea
                    placeholder="House No, Road name, Block, City, State"
                    value={profileAddress}
                    onChange={(e) => setProfileAddress(e.target.value)}
                    className="bg-white/[0.02] border-white/10 rounded-xl focus:border-accent text-white min-h-[90px] font-sans"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={profileLoading}
                  className="w-full bg-gold-gradient text-primary font-black uppercase tracking-wider text-xs h-13 rounded-full flex items-center justify-center gap-2 mt-4"
                >
                  {profileLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Save & Continue to Dashboard"
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      )}

      {/* 3. Fully Isolated Dashboard App */}
      {portalState === "app" && (
        <>
          {/* Sidebar Navigation - Desktop */}
          <aside className="hidden md:flex w-64 bg-[#051124] border-r border-white/5 flex-col items-start p-6 space-y-8 h-full sticky top-0 shadow-lg shrink-0 z-40">
            <div className="flex items-center gap-3 w-full border-b border-white/10 pb-4">
              <div className="h-9 w-9 rounded-full overflow-hidden border border-accent/30 bg-[#08162d]">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-base font-black tracking-tighter leading-none text-white">GALAXY</span>
                <span className="text-[6.5px] font-black tracking-[0.28em] text-accent mt-0.5">PORTAL</span>
              </div>
            </div>

            <nav className="flex flex-col space-y-1.5 w-full flex-grow">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all text-xs font-black uppercase tracking-widest text-left mb-2 border border-white/5 bg-white/[0.01]"
              >
                <Compass className="w-4 h-4 shrink-0 text-accent" /> Back to Website
              </Link>

              <button
                onClick={() => setActiveTab("overview")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs font-black uppercase tracking-widest text-left ${
                  activeTab === "overview" ? "bg-accent/15 text-accent font-black shadow-inner" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Home className="w-4 h-4 shrink-0 text-accent" /> Overview
              </button>

              <button
                onClick={() => setActiveTab("projects")}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-xs font-black uppercase tracking-widest text-left ${
                  activeTab === "projects" ? "bg-accent/15 text-accent font-black shadow-inner" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <ClipboardList className="w-4 h-4 shrink-0 text-accent" /> My Projects
                </span>
                {projectsList.length > 0 && (
                  <Badge className="bg-accent/20 text-accent border border-accent/20 text-[8px] px-2 rounded-full font-bold">
                    {projectsList.length}
                  </Badge>
                )}
              </button>

              <button
                onClick={() => setActiveTab("initialize")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs font-black uppercase tracking-widest text-left ${
                  activeTab === "initialize" ? "bg-accent/15 text-accent font-black shadow-inner" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Zap className="w-4 h-4 shrink-0 text-accent" /> Start Project
              </button>

              <button
                onClick={() => {
                  setActiveTab("notifications");
                  markAllNotificationsAsRead();
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-xs font-black uppercase tracking-widest text-left ${
                  activeTab === "notifications" ? "bg-accent/15 text-accent font-black shadow-inner" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Bell className="w-4 h-4 shrink-0 text-accent" /> Notifications
                </span>
                {unreadNotificationsCount > 0 && (
                  <Badge className="bg-red-500 text-white text-[8px] px-1.5 rounded-full font-bold animate-pulse">
                    {unreadNotificationsCount}
                  </Badge>
                )}
              </button>

              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs font-black uppercase tracking-widest text-left ${
                  activeTab === "profile" ? "bg-accent/15 text-accent font-black shadow-inner" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Settings className="w-4 h-4 shrink-0 text-accent" /> Settings
              </button>

              <button
                onClick={() => setActiveTab("support")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs font-black uppercase tracking-widest text-left ${
                  activeTab === "support" ? "bg-accent/15 text-accent font-black shadow-inner" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <HelpCircle className="w-4 h-4 shrink-0 text-accent" /> Help desk
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/20 text-red-300 transition-colors text-xs font-black uppercase tracking-widest text-left mt-8"
              >
                <LogOut className="w-4 h-4 text-red-400" /> Logout
              </button>
            </nav>

            <div className="w-full text-[9px] text-white/30 text-center font-bold uppercase tracking-wider mt-auto border-t border-white/5 pt-4">
              Galaxy Interior &copy; 2026
            </div>
          </aside>

          {/* Main Dashboard Panel */}
          <main className="flex-1 overflow-y-auto p-5 md:p-10 pb-24 md:pb-10 bg-galaxy-dark h-full relative">
            
            {/* OVERVIEW PANEL */}
            {activeTab === "overview" && (
              <div className="space-y-8 animate-fade-up max-w-5xl">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/10 pb-6">
                  <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white font-display">Dashboard Overview</h1>
                    <p className="text-xs text-white/50 mt-1 font-medium">Quick indicators, ongoing projects, and unread client notifications.</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap shrink-0">
                    <Link href="/">
                      <Button
                        variant="outline"
                        className="border-white/10 hover:bg-white/5 text-white/70 font-black uppercase tracking-widest text-[9px] h-10 px-5 rounded-full flex items-center gap-1.5"
                      >
                        <Compass className="w-3.5 h-3.5 text-accent" /> Back to Website
                      </Button>
                    </Link>
                    <Button
                      onClick={() => setActiveTab("initialize")}
                      className="bg-accent hover:bg-accent/90 text-primary font-black uppercase tracking-widest text-[9px] h-10 px-5 rounded-full flex items-center gap-1.5 shadow-md shrink-0 w-fit"
                    >
                      <PlusCircle className="w-3.5 h-3.5" /> Start New Project
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <Card className="glass-card bg-[#08162d] border-white/5 p-5 rounded-[20px] shadow-md flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-black text-accent uppercase tracking-widest block mb-0.5">Initialized Projects</span>
                      <span className="text-3xl font-black text-white">{projectsList.length}</span>
                    </div>
                    <ClipboardList className="w-10 h-10 text-accent/20 shrink-0" />
                  </Card>

                  <Card className="glass-card bg-[#08162d] border-white/5 p-5 rounded-[20px] shadow-md flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-black text-accent uppercase tracking-widest block mb-0.5">Unread Alerts</span>
                      <span className="text-3xl font-black text-white">{unreadNotificationsCount}</span>
                    </div>
                    <Bell className="w-10 h-10 text-accent/20 shrink-0" />
                  </Card>

                  <Card className="glass-card bg-[#08162d] border-white/5 p-5 rounded-[20px] shadow-md flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-black text-accent uppercase tracking-widest block mb-0.5">Authorized User</span>
                      <span className="text-xs font-bold text-white truncate max-w-[150px] block">{userProfile?.name}</span>
                    </div>
                    <User className="w-10 h-10 text-accent/20 shrink-0" />
                  </Card>
                </div>

                {/* Recent Projects list */}
                <div className="space-y-4">
                  <h2 className="text-base font-black uppercase tracking-widest text-accent flex items-center gap-1.5">
                    <Layers className="w-4 h-4 shrink-0" /> Active construction timelines
                  </h2>

                  {loadingProjects ? (
                    <div className="py-10 text-center"><Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" /></div>
                  ) : projectsList.length === 0 ? (
                    <Card className="border border-dashed border-white/10 p-12 text-center rounded-[20px]">
                      <p className="text-xs text-white/40 uppercase font-black tracking-widest">No active projects customized yet</p>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {projectsList.slice(0, 2).map((project) => (
                        <Card key={project.id} className="glass-card bg-[#08162d] border-white/5 p-5 rounded-[20px] shadow-md relative overflow-hidden flex flex-col justify-between min-h-[110px]">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="font-bold text-sm text-white capitalize">{project.projectName}</h3>
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="text-[8px] font-black text-accent uppercase tracking-widest">{project.selectedPackage}</span>
                                {project.projectSegment === "commercial" ? (
                                  <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                                    🏢 Commercial
                                  </span>
                                ) : (
                                  <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                                    🏠 Residential
                                  </span>
                                )}
                              </div>
                            </div>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[7px] font-black uppercase tracking-widest rounded-full">
                              {project.status}
                            </Badge>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* MY PROJECTS PANEL */}
            {activeTab === "projects" && (
              <div className="space-y-8 animate-fade-up max-w-5xl">
                <div className="border-b border-white/10 pb-6">
                  <h1 className="text-3xl font-black uppercase tracking-tight text-white font-display">My Construction Projects</h1>
                  <p className="text-xs text-white/50 mt-1 font-medium">Live monitoring dashboards synced in real-time with site coordinators.</p>
                </div>

                {/* Sub Tab Switcher */}
                <div className="flex border-b border-white/5 gap-6 mb-6">
                  <button
                    onClick={() => setSubTab("projects")}
                    className={`pb-2.5 font-bold text-xs uppercase tracking-widest border-b-2 transition-all flex items-center gap-1.5 ${
                      subTab === "projects"
                        ? "border-accent text-accent"
                        : "border-transparent text-white/30 hover:text-white"
                    }`}
                  >
                    <ClipboardList className="w-3.5 h-3.5 shrink-0" /> Custom Plans ({projectsList.length})
                  </button>

                  <button
                    onClick={() => setSubTab("applied")}
                    className={`pb-2.5 font-bold text-xs uppercase tracking-widest border-b-2 transition-all flex items-center gap-1.5 ${
                      subTab === "applied"
                        ? "border-accent text-accent"
                        : "border-transparent text-white/30 hover:text-white"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 shrink-0" /> Applied Services ({appliedServicesList.length})
                  </button>
                </div>

                {subTab === "projects" ? (
                  loadingProjects ? (
                    <div className="py-20 text-center"><Loader2 className="w-10 h-10 text-accent animate-spin mx-auto" /></div>
                  ) : projectsList.length === 0 ? (
                    <Card className="border border-dashed border-white/10 p-12 text-center rounded-[24px]">
                      <p className="text-xs text-white/40 uppercase font-black tracking-widest">No projects found. Use the configurator wizard to start.</p>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 animate-fade-in">
                      {projectsList.map((project) => {
                        const statusesList = ["Initialized", "Under Audit", "Visit Scheduled", "In Progress", "Completed"];
                        const currentStatusIdx = statusesList.indexOf(project.status) !== -1 ? statusesList.indexOf(project.status) : 0;
                        return (
                          <Card key={project.id} className="glass-card bg-[#08162d] border-white/5 p-6 rounded-[24px] shadow-md relative overflow-hidden space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 text-left">
                              <div>
                                <h3 className="font-bold text-lg text-white capitalize">{project.projectName}</h3>
                                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                  <Badge className="bg-accent/15 text-accent border border-accent/20 text-[7.5px] font-black uppercase tracking-widest px-2 rounded-full">{project.selectedPackage}</Badge>
                                  <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[7.5px] font-black uppercase tracking-widest px-2 rounded-full">{project.packagePricePaid}</Badge>
                                  {project.projectSegment === "commercial" ? (
                                    <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[7.5px] font-black uppercase tracking-widest px-2 rounded-full">🏢 Commercial</Badge>
                                  ) : (
                                    <Badge className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 text-[7.5px] font-black uppercase tracking-widest px-2 rounded-full">🏠 Residential</Badge>
                                  )}
                                </div>
                              </div>
                              <span className="text-[8.5px] text-white/30 font-bold uppercase tracking-widest">TXN: {project.paymentTxId}</span>
                            </div>

                            {/* Customized services selected */}
                            {project.customOptions && project.customOptions.length > 0 && (
                              <div>
                                <span className="text-[8px] font-black text-white/30 uppercase tracking-widest block pl-0.5 mb-1.5">Custom Sizing Options</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {project.customOptions.map((opt: string, idx: number) => (
                                    <span key={idx} className="bg-white/5 border border-white/10 text-[8px] font-bold text-white/70 px-2.5 py-1 rounded-md uppercase">
                                      {opt}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Dimensions & Location */}
                            <div className="grid grid-cols-2 gap-4 text-xs font-sans text-white/60 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                              <div>
                                <span className="text-white/30 block text-[8px] font-black uppercase tracking-wider mb-1">Site Location</span>
                                <span className="font-bold text-white flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5 text-accent" /> {project.siteDetails?.location}
                                </span>
                              </div>
                              <div>
                                <span className="text-white/30 block text-[8px] font-black uppercase tracking-wider mb-1">Plot Dimensions / Sizing</span>
                                <span className="font-bold text-white flex items-center gap-1">
                                  <Layers className="w-3.5 h-3.5 text-accent" /> {project.siteDetails?.plotSize} Sqft ({project.siteDetails?.floors} Floors)
                                </span>
                              </div>
                            </div>

                            {/* Status timeline progress visual indicator */}
                            <div className="space-y-3 pt-2">
                              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                <span className="text-white/40">Construction Siting Stage</span>
                                <span className="text-accent">{project.status}</span>
                              </div>
                              <div className="flex items-center gap-2 relative">
                                {statusesList.map((st, sIdx) => {
                                  const isCompleted = sIdx <= currentStatusIdx;
                                  const isActive = sIdx === currentStatusIdx;
                                  return (
                                    <div key={sIdx} className="flex-1 flex flex-col items-center">
                                      <div className={`h-1.5 w-full rounded-full transition-all duration-500 ${
                                        isCompleted ? isActive ? "bg-accent shadow-[0_0_8px_rgba(255,207,51,0.6)]" : "bg-emerald-500" : "bg-white/10"
                                      }`} />
                                      <span className={`text-[7px] font-bold mt-1.5 uppercase ${isActive ? "text-accent font-black" : isCompleted ? "text-emerald-400" : "text-white/20"}`}>
                                        {st}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-white/30">
                              <span>Initialized on</span>
                              <span>{project.createdAtFormatted}</span>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  )
                ) : (
                  loadingAppliedServices ? (
                    <div className="py-20 text-center"><Loader2 className="w-10 h-10 text-accent animate-spin mx-auto" /></div>
                  ) : appliedServicesList.length === 0 ? (
                    <Card className="border border-dashed border-white/10 p-12 text-center rounded-[24px]">
                      <p className="text-xs text-white/40 uppercase font-black tracking-widest">No service applications filed yet.</p>
                      <p className="text-[10px] text-white/35 mt-2">Go to our services page to apply for false ceiling, modular kitchens, wall painting, or lighting layout with one click!</p>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in text-left">
                      {appliedServicesList.map((service) => (
                        <Card key={service.id} className="glass-card bg-[#08162d] border-white/5 p-6 rounded-[24px] shadow-md relative overflow-hidden space-y-4">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="font-bold text-base text-white capitalize">{service.serviceName}</h3>
                              <span className="text-[8px] text-white/40 font-bold uppercase tracking-widest block mt-0.5">Applied on {service.createdAtFormatted}</span>
                            </div>
                            <Badge className="bg-accent/15 text-accent border border-accent/20 text-[7px] font-black uppercase tracking-widest rounded-full px-2 py-0.5">
                              {service.status || "Applied"}
                            </Badge>
                          </div>
                          
                          {service.adminResponse ? (
                            <div className="p-4 bg-accent/5 border border-accent/15 rounded-xl space-y-1 mt-2 animate-fade-in">
                              <span className="text-[8px] font-black text-accent uppercase tracking-widest block">Sameer Ahmed (Architect Response):</span>
                              <p className="text-xs font-bold text-white/95 leading-relaxed italic">"{service.adminResponse}"</p>
                              <span className="text-[6.5px] text-white/30 block mt-1 font-semibold uppercase">Live synced response</span>
                            </div>
                          ) : (
                            <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                              <p className="text-[9.5px] font-medium text-white/40 italic">"Our engineering panel is actively auditing your service specifications. Live replies will update in real time here."</p>
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  )
                )}
              </div>
            )}

            {/* INITIALIZE PROJECT PANEL */}
            {activeTab === "initialize" && (() => {
              const activePackages = projectSegment === "commercial" ? commercialPackageDetails : packageDetails;
              const activeServiceOptions = projectSegment === "commercial" ? commercialServiceOptions : serviceOptions;
              return (
                <div className="space-y-8 animate-fade-up max-w-4xl">
                  <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-black uppercase tracking-tight text-white font-display">Initialize New Project</h1>
                      <p className="text-xs text-white/50 mt-1 font-medium">Use the custom builder flow below to specify site layout, custom drawings package, and structural requirements.</p>
                    </div>
                  </div>

                  {/* Segment Switcher Toggle */}
                  <div className="flex justify-center">
                    <div className="bg-[#051124] border border-white/10 p-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
                      <button
                        type="button"
                        onClick={() => handleSegmentChange("residential")}
                        className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                          projectSegment === "residential"
                            ? "bg-gold-gradient text-primary shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        🏠 Residential
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSegmentChange("commercial")}
                        className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                          projectSegment === "commercial"
                            ? "bg-accent text-primary shadow-[0_0_12px_rgba(255,207,51,0.4)]"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        🏢 Commercial
                      </button>
                    </div>
                  </div>

                  {/* M3 Steps Timeline */}
                  <div className="flex items-center justify-between relative max-w-lg mx-auto mb-10 pt-4">
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-white/5 z-0"></div>
                    <div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-accent transition-all duration-500 z-0"
                      style={{ width: `${((wizardStep - 1) / 2) * 100}%` }}
                    ></div>

                    {[1, 2, 3].map((stepNum) => {
                      const stepLabels = ["Package Base", "Custom Services", "Site Specs"];
                      const isActive = stepNum === wizardStep;
                      const isCompleted = stepNum < wizardStep;
                      return (
                        <div key={stepNum} className="relative z-10 flex flex-col items-center">
                          <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-[10px] border transition-all duration-300 ${
                              isActive 
                                ? 'bg-accent text-primary border-accent shadow-[0_0_8px_rgba(255,207,51,0.5)]' 
                                : isCompleted 
                                  ? 'bg-galaxy-dark text-accent border-accent' 
                                  : 'bg-[#051124] text-white/20 border-white/5'
                            }`}
                          >
                            {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : stepNum}
                          </div>
                          <span className={`text-[7px] font-black uppercase tracking-widest mt-2 hidden sm:block ${
                            isActive ? "text-accent" : "text-white/30"
                          }`}>
                            {stepLabels[stepNum - 1]}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Wizard Card Sheets */}
                  <Card className="glass-card border-accent/20 bg-[#08162d] rounded-[28px] p-6 md:p-8 shadow-2xl relative">
                    {paymentSuccess ? (
                      <div className="p-8 text-center space-y-4 animate-fade-in max-w-md mx-auto">
                        <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                          <ShieldCheck className="w-8 h-8 stroke-[2.5]" />
                        </div>
                        <h3 className="font-black text-lg text-white uppercase tracking-wider font-display">Project Initialized!</h3>
                        <p className="text-xs text-white/50 leading-relaxed font-sans font-medium">
                          Your project has been successfully configured under offline manual billing setup. Syncing credentials and launching WhatsApp desk...
                        </p>
                      </div>
                    ) : (
                      <>
                        {wizardError && (
                          <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/20 text-red-200 text-xs rounded-xl font-semibold flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                            <span>{wizardError}</span>
                          </div>
                        )}

                        {/* STEP 1: SELECT STARTING PACKAGE */}
                        {wizardStep === 1 && (
                          <div className="space-y-6">
                            <div className="text-center space-y-2">
                              <h3 className="font-bold text-lg text-white uppercase tracking-wider font-display">Step 1: Choose Starting Package</h3>
                              <p className="text-xs text-white/50 leading-relaxed max-w-sm mx-auto font-sans font-medium">
                                Our starter packages setup site-audits, core structural layouts, and foundational blueprint mapping.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {(["basic", "standard", "premium"] as const).map((pkgKey) => {
                                const pkg = activePackages[pkgKey];
                                const isSelected = selectedPkg === pkgKey;
                                return (
                                  <div
                                    key={pkgKey}
                                    onClick={() => setSelectedPkg(pkgKey)}
                                    className={`p-5 rounded-[20px] border cursor-pointer transition-all flex flex-col justify-between gap-4 relative overflow-hidden ${
                                      isSelected 
                                        ? "bg-accent/5 border-accent shadow-lg" 
                                        : "border-white/5 bg-white/[0.01] hover:border-white/10"
                                    }`}
                                  >
                                    {isSelected && (
                                      <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-accent flex items-center justify-center text-primary">
                                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                                      </div>
                                    )}

                                    <div className="space-y-2">
                                      <span className={`text-[7px] font-black uppercase tracking-wider ${isSelected ? "text-accent" : "text-white/40"}`}>{projectSegment === "commercial" ? "Business Base" : "Starter Base"}</span>
                                      <h4 className="font-black text-white text-base leading-tight uppercase">{pkg.name}</h4>
                                      <p className="text-[10px] text-white/50 font-medium font-sans">{pkg.suitable}</p>
                                      
                                      <div className="pt-2">
                                        <span className="text-2xl font-black text-white">₹{pkg.price}</span>
                                        <span className="text-[8px] text-white/40 block font-bold tracking-widest mt-0.5">ONCE OFF INITIALIZATION</span>
                                      </div>
                                    </div>

                                    <div className="border-t border-white/5 pt-3 space-y-2 text-[9px] font-sans font-semibold text-white/70">
                                      <div className="flex items-center gap-1.5 text-accent font-bold mb-1">
                                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                                        <span>{pkg.visits}</span>
                                      </div>
                                      {pkg.benefits.slice(0, 3).map((bf, bIdx) => (
                                        <div key={bIdx} className="flex gap-2 items-start leading-relaxed text-left">
                                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                          <span>{bf}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            <div className="flex justify-end pt-4 border-t border-white/5">
                              <Button
                                onClick={handleWizardNext}
                                className="bg-accent hover:bg-accent/90 text-primary font-black uppercase tracking-widest text-[9px] h-12 px-8 rounded-full flex items-center gap-1.5 shadow-md"
                              >
                                Configure Custom Services <ChevronRight className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* STEP 2: CHECKLIST SERVICES SELECTION */}
                        {wizardStep === 2 && (
                          <div className="space-y-6">
                            <div className="text-center space-y-2">
                              <h3 className="font-bold text-lg text-white uppercase tracking-wider font-display">Step 2: Customize Services Checklist</h3>
                              <p className="text-xs text-white/50 leading-relaxed max-w-sm mx-auto font-sans font-medium">
                                Add specific elements you want us to handle, or remove items you wish to audit manually.
                              </p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {activeServiceOptions.map((opt) => {
                                const isChecked = checkedServices.includes(opt.id);
                                return (
                                  <div
                                    key={opt.id}
                                    onClick={() => handleServiceToggle(opt.id)}
                                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-3 relative overflow-hidden select-none ${
                                      isChecked 
                                        ? "bg-accent/15 border-accent/30 text-accent font-bold" 
                                        : "border-white/5 bg-white/[0.01] hover:border-white/10 text-white/60"
                                    }`}
                                  >
                                    <span className="text-base shrink-0">{opt.icon}</span>
                                    <div className="flex flex-col text-left">
                                      <span className="text-[10px] uppercase tracking-wide leading-tight">{opt.label}</span>
                                    </div>
                                    
                                    {isChecked && (
                                      <div className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-accent flex items-center justify-center text-primary">
                                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-white/5">
                              <Button
                                onClick={() => setWizardStep(1)}
                                variant="outline"
                                className="border-white/10 hover:bg-white/5 text-white/60 font-black uppercase tracking-widest text-[9px] h-12 px-6 rounded-full"
                              >
                                Back
                              </Button>
                              
                              <Button
                                onClick={handleWizardNext}
                                className="bg-accent hover:bg-accent/90 text-primary font-black uppercase tracking-widest text-[9px] h-12 px-8 rounded-full flex items-center gap-1.5 shadow-md"
                              >
                                Input Site Specifications <ChevronRight className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* STEP 3: SITE SPECS */}
                        {wizardStep === 3 && (
                          <div className="space-y-6">
                            <div className="text-center space-y-2">
                              <h3 className="font-bold text-lg text-white uppercase tracking-wider font-display">Step 3: Site Specifications & Logistics</h3>
                              <p className="text-xs text-white/50 leading-relaxed max-w-sm mx-auto font-sans font-medium">
                                Input dimensions and plot location parameters to assign local civil engineers immediately.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                              <div className="space-y-1">
                                <label className="text-[9px] font-black text-white/40 uppercase tracking-widest pl-1 block font-sans">Construction Siting Location</label>
                                <Input
                                  type="text"
                                  placeholder="e.g. Ashok Nagar, Ranchi"
                                  value={siteLocation}
                                  onChange={(e) => setSiteLocation(e.target.value)}
                                  className="h-13 bg-white/[0.02] border-white/10 rounded-xl focus:border-accent text-white font-sans"
                                  required
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[9px] font-black text-white/40 uppercase tracking-widest pl-1 block font-sans">Plot / Area Sizing (Sqft)</label>
                                <Input
                                  type="text"
                                  placeholder="e.g. 1200 Sqft"
                                  value={plotSize}
                                  onChange={(e) => setPlotSize(e.target.value)}
                                  className="h-13 bg-white/[0.02] border-white/10 rounded-xl focus:border-accent text-white font-sans"
                                  required
                                />
                              </div>

                              <div className="space-y-1 font-sans">
                                <label className="text-[9px] font-black text-white/40 uppercase tracking-widest pl-1 block">Property Layout Type</label>
                                <select
                                  value={propertyType}
                                  onChange={(e) => setPropertyType(e.target.value)}
                                  className="w-full h-13 px-4 rounded-xl border border-white/10 focus:border-accent bg-[#08162d] text-white focus:outline-none text-xs font-semibold appearance-none cursor-pointer"
                                >
                                  {projectSegment === "commercial" ? (
                                    <>
                                      <option value="Corporate Office">🏢 Corporate Office</option>
                                      <option value="Retail Shop / Showroom">🛍️ Retail Shop / Showroom</option>
                                      <option value="School / College / Institution">🏫 School / College / Institution</option>
                                      <option value="Shopping Mall">🏬 Shopping Mall</option>
                                      <option value="Hotel / Restaurant / Cafe">🍽️ Hotel / Restaurant / Cafe</option>
                                      <option value="Hospital / Clinic">🏥 Hospital / Clinic</option>
                                      <option value="Commercial Building / Office Tower">🏗️ Commercial Building / Office Tower</option>
                                    </>
                                  ) : (
                                    <>
                                      <option value="1 BHK House">🏠 1 BHK House</option>
                                      <option value="2 BHK Apartment">🏢 2 BHK Apartment</option>
                                      <option value="Duplex House">🏡 Duplex House</option>
                                      <option value="Luxury Villa">🏰 Luxury Villa</option>
                                      <option value="Bungalow">🌄 Bungalow</option>
                                    </>
                                  )}
                                </select>
                              </div>

                              <div className="space-y-1 font-sans">
                                <label className="text-[9px] font-black text-white/40 uppercase tracking-widest pl-1 block">Space Height / Floors Siting</label>
                                <select
                                  value={floorsCount}
                                  onChange={(e) => setFloorsCount(e.target.value)}
                                  className="w-full h-13 px-4 rounded-xl border border-white/10 focus:border-accent bg-[#08162d] text-white focus:outline-none text-xs font-semibold appearance-none cursor-pointer"
                                >
                                  {projectSegment === "commercial" ? (
                                    <>
                                      <option value="Single Floor Shop">🏪 Single Floor Shop</option>
                                      <option value="Commercial Space">📐 Commercial Space</option>
                                      <option value="Multi-floor Showroom">🏢 Multi-floor Showroom</option>
                                      <option value="Commercial Tower (G+4)">🏗️ Commercial Tower (G+4)</option>
                                    </>
                                  ) : (
                                    <>
                                      <option value="Single Floor (G)">G (Single Floor)</option>
                                      <option value="Duplex (G+1)">G+1 (Duplex)</option>
                                      <option value="Triplex (G+2)">G+2 (Triplex)</option>
                                      <option value="Villa / Bungalow">Villa / Bungalow Space</option>
                                    </>
                                  )}
                                </select>
                              </div>
                            </div>

                            <div className="space-y-1 text-left">
                              <label className="text-[9px] font-black text-white/50 uppercase tracking-widest pl-1 block font-sans">Special Requirements / Custom Remarks</label>
                              <Textarea
                                placeholder={projectSegment === "commercial" ? "e.g. Modern executive cabin, heavy server workspace layouts, open collaborative desks, safety certifications preferred..." : "e.g. East facing road entrance, open modular kitchen design preference, structural audit needed..."}
                                value={specialRemarks}
                                onChange={(e) => setSpecialRemarks(e.target.value)}
                                className="bg-white/[0.02] border-white/10 rounded-xl focus:border-accent text-white min-h-[90px] font-sans text-xs"
                              />
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-white/5">
                              <Button
                                onClick={() => setWizardStep(2)}
                                variant="outline"
                                className="border-white/10 hover:bg-white/5 text-white/60 font-black uppercase tracking-widest text-[9px] h-12 px-6 rounded-full"
                              >
                                Back
                              </Button>
                              
                              <Button
                                onClick={handleSimulatedPaymentSubmit}
                                disabled={paymentLoading}
                                className="bg-accent hover:bg-accent/90 text-primary font-black uppercase tracking-widest text-[9px] h-12 px-8 rounded-full flex items-center gap-1.5 shadow-md"
                              >
                                {paymentLoading ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin shrink-0" /> Initializing...
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 className="w-4 h-4 shrink-0" /> Confirm & Initialize Project <ChevronRight className="w-4 h-4" />
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </Card>
                </div>
              );
            })()}

            {/* NOTIFICATIONS PANEL */}
            {activeTab === "notifications" && (
              <div className="space-y-8 animate-fade-up max-w-4xl">
                <div className="border-b border-white/10 pb-6 flex justify-between items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white font-display">Client Notifications</h1>
                    <p className="text-xs text-white/50 mt-1 font-medium">Real-time status updates and messages from our engineering staff.</p>
                  </div>
                  
                  {unreadNotificationsCount > 0 && (
                    <Button 
                      onClick={markAllNotificationsAsRead}
                      variant="outline"
                      className="border-accent text-accent hover:bg-accent/15 text-[8.5px] font-black uppercase tracking-widest h-9 px-4 rounded-full"
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>

                {loadingNotifications ? (
                  <div className="py-20 text-center"><Loader2 className="w-10 h-10 text-accent animate-spin mx-auto" /></div>
                ) : notificationsList.length === 0 ? (
                  <Card className="border border-dashed border-white/10 p-12 text-center rounded-[24px]">
                    <p className="text-xs text-white/40 uppercase font-black tracking-widest">No alerts or notifications logged yet.</p>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {notificationsList.map((notification) => (
                      <Card key={notification.id} className={`border-white/5 p-4 rounded-[20px] shadow-md relative overflow-hidden transition-all flex items-start gap-4 ${
                        notification.read ? "bg-white/[0.01] border-white/5" : "bg-accent/5 border-accent/20"
                      }`}>
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          notification.read ? "bg-white/10 text-white/45" : "bg-accent/20 text-accent"
                        }`}>
                          <Bell className="w-4 h-4" />
                        </div>
                        <div className="space-y-1.5 flex-1 text-left min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="font-bold text-sm text-white capitalize leading-tight">{notification.title}</h4>
                            <span className="text-[7.5px] text-white/30 font-bold uppercase tracking-widest">{notification.createdAtFormatted}</span>
                          </div>
                          <p className="text-xs text-white/60 leading-relaxed font-sans">{notification.message}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SETTINGS PANEL */}
            {activeTab === "profile" && (
              <div className="space-y-8 animate-fade-up max-w-2xl">
                <div className="border-b border-white/10 pb-6">
                  <h1 className="text-3xl font-black uppercase tracking-tight text-white font-display">Profile Settings</h1>
                  <p className="text-xs text-white/50 mt-1 font-medium">Update account names, contact information, and coordinates.</p>
                </div>

                <Card className="glass-card border-accent/20 bg-[#08162d] rounded-[24px] p-6 shadow-md">
                  <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4 mb-5">
                    <div>
                      <p className="text-[9px] font-black text-accent uppercase tracking-[0.25em]">Profile Overview</p>
                      <h2 className="text-xl font-black text-white mt-1 font-display">Your account details</h2>
                    </div>
                    <div className="h-12 w-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-accent" />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Name</p>
                      <p className="mt-1 text-sm font-bold text-white break-words">{userProfile?.name || "Not available"}</p>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Email</p>
                      <p className="mt-1 text-sm font-bold text-white break-words">{currentUser?.email || userProfile?.email || "Not available"}</p>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Age</p>
                      <p className="mt-1 text-sm font-bold text-white">{userProfile?.age || "Not added"}</p>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Membership Type</p>
                      <p className="mt-1 text-sm font-bold text-white">{userProfile?.membershipType || "Standard Member"}</p>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:col-span-2">
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Location</p>
                      <p className="mt-1 text-sm font-bold text-white break-words">{userProfile?.address || "Not available"}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge className="bg-accent/15 text-accent border border-accent/20 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                      {userProfile?.provider || "google"} account
                    </Badge>
                    <Badge className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                      Verified session
                    </Badge>
                  </div>
                </Card>

                <Card className="glass-card border-white/5 bg-[#08162d] rounded-[24px] p-6 shadow-md">
                  {editSuccess && (
                    <div className="mb-5 p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs rounded-xl font-semibold flex items-center gap-2">
                      <ShieldCheck className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                      <span>Account settings saved successfully!</span>
                    </div>
                  )}

                  <form onSubmit={handleEditProfileSubmit} className="space-y-5">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-white/50 uppercase tracking-widest pl-1 block font-sans">Full Name</label>
                      <Input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        disabled={editLoading}
                        className="h-13 bg-white/[0.02] border-white/10 rounded-xl focus:border-accent text-white font-sans"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-white/50 uppercase tracking-widest pl-1 block font-sans">Age</label>
                      <Input
                        type="number"
                        min="1"
                        max="120"
                        value={editAge}
                        onChange={(e) => setEditAge(e.target.value)}
                        disabled={editLoading}
                        className="h-13 bg-white/[0.02] border-white/10 rounded-xl focus:border-accent text-white font-sans"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-white/50 uppercase tracking-widest pl-1 block font-sans">Contact Phone Number</label>
                      <Input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        disabled={editLoading}
                        className="h-13 bg-white/[0.02] border-white/10 rounded-xl focus:border-accent text-white font-sans"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-white/50 uppercase tracking-widest pl-1 block font-sans">Location / Siting Address</label>
                      <Textarea
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        disabled={editLoading}
                        className="bg-white/[0.02] border-white/10 rounded-xl focus:border-accent text-white min-h-[90px] font-sans"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={editLoading}
                      className="w-full bg-gold-gradient text-primary font-black uppercase tracking-wider text-xs h-13 rounded-full flex items-center justify-center gap-2 mt-4"
                    >
                      {editLoading ? <Loader2 className="w-4.5 h-4.5 animate-spin" /> : "Save Account Settings"}
                    </Button>
                  </form>
                </Card>
              </div>
            )}

            {/* SUPPORT PANEL */}
            {activeTab === "support" && (
              <div className="space-y-8 animate-fade-up max-w-2xl">
                <div className="border-b border-white/10 pb-6">
                  <h1 className="text-3xl font-black uppercase tracking-tight text-white font-display">Client Help & Support</h1>
                  <p className="text-xs text-white/50 mt-1 font-medium">Connect directly with senior project supervisors and structural architects.</p>
                </div>

                <Card className="glass-card border-accent/20 bg-[#08162d] rounded-[24px] p-6 shadow-md space-y-6 text-center">
                  <HelpCircle className="w-16 h-16 text-accent/30 mx-auto animate-pulse" />
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-white uppercase tracking-wider font-display">Chat with Lead Architect</h3>
                    <p className="text-xs text-white/50 max-w-sm mx-auto leading-relaxed font-sans">
                      Need specialized blueprints or having trouble initializing starter packages? Sameer Ahmed is available to assist immediately.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto pt-4">
                    <a href="tel:+919122795726" className="flex-1">
                      <Button className="w-full bg-accent hover:bg-accent/90 text-primary font-black uppercase tracking-widest text-[9.5px] h-12 rounded-full flex items-center justify-center gap-1.5 shadow-md">
                        <Phone className="w-4 h-4 shrink-0" /> Call Direct
                      </Button>
                    </a>

                    <a 
                      href={`https://wa.me/919631980881?text=${encodeURIComponent(`Hi Galaxy Interior, I am logged in as "${userProfile?.name}" and need help tracking my customized blueprint project.`)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/15 font-black uppercase tracking-widest text-[9.5px] h-12 rounded-full flex items-center justify-center gap-1.5">
                        <MessageSquare className="w-4 h-4 shrink-0 text-accent" /> WhatsApp
                      </Button>
                    </a>
                  </div>
                </Card>
              </div>
            )}

          </main>

          {/* Bottom Navigation Drawer (Mobile Viewports Only) */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#051124] text-white flex items-center justify-around px-2 py-3.5 z-50 border-t border-white/5 shadow-2xl pb-safe">
            <button 
              onClick={() => setActiveTab("overview")} 
              className={`flex flex-col items-center gap-1 p-2 ${activeTab === "overview" ? "text-accent" : "text-white/40"}`}
            >
              <Home className="w-5 h-5"/>
              <span className="text-[8.5px] font-black uppercase tracking-wider">Home</span>
            </button>

            <button 
              onClick={() => setActiveTab("projects")} 
              className={`flex flex-col items-center gap-1 p-2 relative ${activeTab === "projects" ? "text-accent" : "text-white/40"}`}
            >
              <ClipboardList className="w-5 h-5"/>
              <span className="text-[8.5px] font-black uppercase tracking-wider">Projects</span>
              {projectsList.length > 0 && (
                <span className="absolute top-1 right-2 bg-accent text-primary text-[6.5px] font-black h-3.5 w-3.5 rounded-full flex items-center justify-center border border-[#051124]">
                  {projectsList.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setActiveTab("initialize")} 
              className={`flex flex-col items-center gap-1 p-2 ${activeTab === "initialize" ? "text-accent" : "text-white/40"}`}
            >
              <Zap className="w-5 h-5"/>
              <span className="text-[8.5px] font-black uppercase tracking-wider">Start</span>
            </button>

            <button 
              onClick={() => {
                setActiveTab("notifications");
                markAllNotificationsAsRead();
              }} 
              className={`flex flex-col items-center gap-1 p-2 relative ${activeTab === "notifications" ? "text-accent" : "text-white/40"}`}
            >
              <Bell className="w-5 h-5"/>
              <span className="text-[8.5px] font-black uppercase tracking-wider">Alerts</span>
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1.5 bg-red-500 text-white text-[6.5px] font-black h-3.5 w-3.5 rounded-full flex items-center justify-center border border-[#051124] animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setActiveTab("profile")} 
              className={`flex flex-col items-center gap-1 p-2 ${activeTab === "profile" ? "text-accent" : "text-white/40"}`}
            >
              <Settings className="w-5 h-5"/>
              <span className="text-[8.5px] font-black uppercase tracking-wider">Settings</span>
            </button>

            <button 
              onClick={handleLogout} 
              className="flex flex-col items-center gap-1 p-2 text-red-400 hover:text-red-600"
            >
              <LogOut className="w-5 h-5"/>
              <span className="text-[8.5px] font-black uppercase tracking-wider">Exit</span>
            </button>
          </nav>
        </>
      )}

    </div>
  );
}
