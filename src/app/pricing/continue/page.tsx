"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Check, Phone, Mail, MapPin, ChevronRight, ChevronLeft, User, Lock, Loader2, Sparkles, 
  Building, Briefcase, Layers, Compass, Calendar, DollarSign, Clock, FileText, Camera, Share2 
} from 'lucide-react';
import Link from 'next/link';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';

const packageDetails: Record<string, { name: string; price: string; visits: string; suitable: string; benefits: string[] }> = {
  basic: {
    name: "Basic Package",
    price: "9,999",
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
  },
  custom: {
    name: "Custom / Large Project",
    price: "Custom",
    visits: "Custom Site Visits",
    suitable: "For Commercial, Malls & Large Buildings",
    benefits: [
      "Fully customized design parameters",
      "Direct oversight by Lead Architect Sameer Ahmed",
      "Material testing, reports & full logs",
      "100% transparency & milestone tracking",
      "Tailor-made budget optimization planning"
    ]
  }
};

const projectTypes = [
  { label: "Residential House", icon: "🏠" },
  { label: "Apartment / Flat", icon: "🏢" },
  { label: "Duplex", icon: "🏰" },
  { label: "Office", icon: "💼" },
  { label: "Shop / Showroom", icon: "🛍️" },
  { label: "Hotel / Restaurant", icon: "🏨" },
  { label: "Renovation", icon: "🔨" },
  { label: "Other", icon: "⚙️" }
];

const servicesList = [
  "2D Floor Plan", "3D Elevation Design", "Interior Design", "Exterior Design",
  "Modular Kitchen", "False Ceiling", "Wardrobe Design", "Furniture Work",
  "Construction Work", "Plumbing Work", "Electrical Work", "Solar Energy Solution"
];

const designStyles = ["Modern", "Luxury", "Minimal", "Traditional", "Contemporary"];

const documentsList = ["Site Photo", "Existing Plan", "Reference Design", "Video", "Measurement Details"];

const inquirySources = ["Facebook", "Instagram", "WhatsApp", "Google", "Website", "Reference"];

const GoogleIcon = () => (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

function RegisterFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialPackage = searchParams.get('package') || 'standard';
  
  const [selectedPkg, setSelectedPkg] = useState(initialPackage);
  const [accountType, setAccountType] = useState<'individual' | 'company'>('individual');
  const [authMethod, setAuthMethod] = useState<'google' | 'manual'>('google');
  const [currentStep, setCurrentStep] = useState(1);
  const [sameAsMobile, setSameAsMobile] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [googleUser, setGoogleUser] = useState<any>(null);
  
  // Full Form State mapping to GALAXY INTERIOR Enquiry Form PDF structure
  const [formData, setFormData] = useState({
    // Step 1: Credentials & Basic Info
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    companyName: '',
    companyGst: '',
    password: '',
    confirmPassword: '',

    // Step 2: Project Scope & Services
    projectType: 'Residential House',
    projectTypeOther: '',
    servicesRequired: [] as string[],

    // Step 3: Site & Engineering Details
    siteLocation: '',
    plotAreaSize: '',
    roadDirection: '',
    numberOfFloors: '',
    constructionType: 'New Construction',
    siteVisitRequired: 'Yes',

    // Step 4: Design Aesthetics
    preferredStyle: [] as string[],
    colorPreference: '',
    specialRequirement: '',

    // Step 5: Budget, Package & Timeline
    estimatedBudget: '',
    workStartDate: '',
    expectedCompletionTime: '',

    // Step 6: Additional Details & Address
    address: '',
    cityDistrict: '',
    documentsSubmitted: [] as string[],
    inquirySource: [] as string[],
    referredBy: ''
  });

  const activePkg = packageDetails[selectedPkg] || packageDetails.standard;

  // Listen to Firebase Auth state on mount to auto fast-fill if already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setGoogleUser(user);
        setFormData(prev => ({
          ...prev,
          name: user.displayName || '',
          email: user.email || ''
        }));
      } else {
        setGoogleUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Auto-sync WhatsApp number with mobile number if checked
  useEffect(() => {
    if (sameAsMobile) {
      setFormData(prev => ({
        ...prev,
        whatsapp: prev.phone
      }));
    }
  }, [formData.phone, sameAsMobile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCheckboxToggle = (field: 'servicesRequired' | 'preferredStyle' | 'documentsSubmitted' | 'inquirySource', value: string) => {
    setFormData(prev => {
      const currentList = prev[field] as string[];
      const newList = currentList.includes(value)
        ? currentList.filter(item => item !== value)
        : [...currentList, value];
      return {
        ...prev,
        [field]: newList
      };
    });
  };

  // Google OAuth Auth Trigger
  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setGoogleUser(user);
      setFormData(prev => ({
        ...prev,
        name: user.displayName || '',
        email: user.email || ''
      }));
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Google login failed. Please verify popup authorization.');
    }
  };

  // Google Auth Sign Out
  const handleGoogleSignOut = async () => {
    try {
      await signOut(auth);
      setGoogleUser(null);
      setFormData(prev => ({
        ...prev,
        name: '',
        email: ''
      }));
    } catch (err: any) {
      console.error(err);
    }
  };

  // Step Validation logic
  const isStepValid = () => {
    if (currentStep === 1) {
      if (googleUser) {
        if (!formData.phone || !formData.whatsapp) return false;
      } else {
        if (authMethod === 'google') return false; // Google fast-fill selected but not connected
        if (!formData.name || !formData.email || !formData.phone || !formData.whatsapp || !formData.password || !formData.confirmPassword) return false;
        if (formData.password !== formData.confirmPassword) return false;
        if (formData.password.length < 6) return false;
      }
      if (accountType === 'company' && !formData.companyName) return false;
      return true;
    }
    if (currentStep === 2) {
      if (!formData.projectType) return false;
      if (formData.projectType === 'Other' && !formData.projectTypeOther) return false;
      if (formData.servicesRequired.length === 0) return false;
      return true;
    }
    if (currentStep === 3) {
      if (!formData.siteLocation || !formData.plotAreaSize) return false;
      return true;
    }
    if (currentStep === 4) {
      if (formData.preferredStyle.length === 0) return false;
      return true;
    }
    if (currentStep === 5) {
      if (!formData.estimatedBudget || !formData.workStartDate || !formData.expectedCompletionTime) return false;
      return true;
    }
    if (currentStep === 6) {
      if (!formData.address || !formData.cityDistrict) return false;
      return true;
    }
    return true;
  };

  const handleNextStep = () => {
    setErrorMsg('');
    if (isStepValid()) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    } else {
      if (currentStep === 1) {
        if (!googleUser && authMethod === 'google') {
          setErrorMsg('Please continue with Google or toggle to the manual form to create an account.');
        } else if (!googleUser && formData.password !== formData.confirmPassword) {
          setErrorMsg('Passwords do not match.');
        } else if (!googleUser && formData.password.length < 6) {
          setErrorMsg('Portal password must be at least 6 characters.');
        } else {
          setErrorMsg('Please fill out all required fields to continue.');
        }
      } else {
        setErrorMsg('Please fill out all required fields to continue.');
      }
    }
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isStepValid()) {
      setErrorMsg('Please complete all fields to submit.');
      return;
    }

    setLoading(true);

    try {
      // 1. Sync comprehensive Enquiry Form + Registration metadata to Firestore registrations
      await addDoc(collection(db, "registrations"), {
        // Client credentials details
        googleUid: googleUser ? googleUser.uid : "Manual",
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        accountType: accountType,
        companyName: accountType === 'company' ? formData.companyName : "",
        companyGst: accountType === 'company' ? formData.companyGst : "",
        address: formData.address,
        cityDistrict: formData.cityDistrict,
        password: googleUser ? "" : formData.password,
        accountStatus: "active",

        // Project details
        projectType: formData.projectType === 'Other' ? `Other: ${formData.projectTypeOther}` : formData.projectType,
        servicesRequired: formData.servicesRequired,
        
        // Site details
        siteLocation: formData.siteLocation,
        plotAreaSize: formData.plotAreaSize,
        roadDirection: formData.roadDirection,
        numberOfFloors: formData.numberOfFloors,
        constructionType: formData.constructionType,
        siteVisitRequired: formData.siteVisitRequired,

        // Design Aesthetics
        preferredStyle: formData.preferredStyle,
        colorPreference: formData.colorPreference,
        specialRequirement: formData.specialRequirement,

        // Package / Plan, Budget & Timelines
        selectedPackage: activePkg.name,
        packagePrice: activePkg.price,
        estimatedBudget: formData.estimatedBudget,
        workStartDate: formData.workStartDate,
        expectedCompletionTime: formData.expectedCompletionTime,

        // Origin details
        documentsSubmitted: formData.documentsSubmitted,
        inquirySource: formData.inquirySource,
        referredBy: formData.referredBy,
        
        createdAt: serverTimestamp()
      });

      setSuccess(true);

      // 2. Open WhatsApp callback with complete GALAXY Enquiry Sheet details
      const whatsappMsg = `*GALAXY INTERIOR - New Project Enquiry*
----------------------------------------
*Account Profile (${googleUser ? 'Google OAuth' : 'Manual Sign-Up'}):*
- Client Name: ${formData.name}
- Phone: ${formData.phone}
- WhatsApp: ${formData.whatsapp}
- Email: ${formData.email}
- Account Type: ${accountType === 'company' ? `Company (${formData.companyName})` : 'Individual'}
${accountType === 'company' ? `- GSTIN: ${formData.companyGst || 'N/A'}\n` : ''}- Address: ${formData.address}, ${formData.cityDistrict}

*Project Scope:*
- Project Type: ${formData.projectType === 'Other' ? formData.projectTypeOther : formData.projectType}
- Services Required: ${formData.servicesRequired.join(', ')}

*Site Specifications:*
- Location: ${formData.siteLocation}
- Plot/Area Size: ${formData.plotAreaSize}
- Road Direction: ${formData.roadDirection || 'N/A'}
- No. of Floors: ${formData.numberOfFloors || 'N/A'}
- Work Nature: ${formData.constructionType}
- Site Visit Needed: ${formData.siteVisitRequired}

*Design & Plan Preferences:*
- Preferred Style: ${formData.preferredStyle.join(', ')}
- Colors: ${formData.colorPreference || 'N/A'}
- Special Requirements: ${formData.specialRequirement || 'N/A'}

*Budget & Timeline:*
- Plan Selected: ${activePkg.name} (${activePkg.price === 'Custom' ? 'Custom Pricing' : `₹${activePkg.price}/-`})
- Estimated Budget: ${formData.estimatedBudget}
- Work Start: ${formData.workStartDate}
- Completion Span: ${formData.expectedCompletionTime}

*Additional Details:*
- Documents Checked: ${formData.documentsSubmitted.join(', ') || 'None'}
- Inquiry Source: ${formData.inquirySource.join(', ') || 'Website'}
- Referred By: ${formData.referredBy || 'N/A'}`;

      setTimeout(() => {
        const whatsappUrl = `https://wa.me/919631980881?text=${encodeURIComponent(whatsappMsg)}`;
        window.open(whatsappUrl, '_blank');
      }, 1500);

    } catch (err: any) {
      console.error(err);
      setErrorMsg('Failed to process project enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="glass-card border-accent/20 bg-[#08162b] rounded-[32px] p-8 md:p-12 text-center max-w-xl mx-auto shadow-2xl animate-fade-up">
        <CardContent className="p-0 flex flex-col items-center justify-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center text-accent animate-pulse">
            <Check className="h-10 w-10 stroke-[3]" />
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Enquiry Completed!</h2>
          <p className="text-sm text-white/60 max-w-md leading-relaxed font-sans">
            Your detailed GALAXY INTERIOR Enquiry Form has been compiled, sync'ed to Firestore, and submitted successfully. We are now redirecting you to WhatsApp to connect with our senior site managers and engineers.
          </p>
          <div className="pt-4 w-full space-y-3">
            <a 
              href={`https://wa.me/919631980881?text=${encodeURIComponent(`Hi Galaxy Interior, my name is ${formData.name}. I have submitted my GALAXY INTERIOR Enquiry Form. Please audit my project details.`)}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full"
            >
              <Button className="w-full bg-accent hover:bg-accent/90 text-primary font-black uppercase tracking-widest h-14 rounded-full shadow-lg">
                Open WhatsApp Chat
              </Button>
            </a>
            <Link href="/" className="block w-full">
              <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 font-black uppercase tracking-widest h-14 rounded-full">
                Back To Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Left Panel Summary showing live client data progression
  const renderLiveProgressSummary = () => {
    return (
      <div className="space-y-4 pt-6 border-t border-white/10 text-[11px] text-white/70 font-sans leading-relaxed">
        <h4 className="text-[10px] font-black text-gold uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-accent animate-pulse" /> Live Form Audit
        </h4>
        
        {formData.name && (
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-white/40">Client:</span>
            <span className="font-bold text-white max-w-[120px] truncate">{formData.name}</span>
          </div>
        )}
        
        {formData.phone && (
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-white/40">Mobile:</span>
            <span className="font-semibold text-white">{formData.phone}</span>
          </div>
        )}

        {accountType === 'company' && formData.companyName && (
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-white/40">Company:</span>
            <span className="font-bold text-accent max-w-[120px] truncate">{formData.companyName}</span>
          </div>
        )}

        {formData.projectType && (
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-white/40">Project Type:</span>
            <span className="font-semibold text-white">{formData.projectType === 'Other' ? formData.projectTypeOther || 'Other' : formData.projectType}</span>
          </div>
        )}

        {formData.servicesRequired.length > 0 && (
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-white/40">Services:</span>
            <span className="font-semibold text-white max-w-[140px] truncate text-right">
              {formData.servicesRequired.join(', ')}
            </span>
          </div>
        )}

        {formData.plotAreaSize && (
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-white/40">Plot Area:</span>
            <span className="font-semibold text-white">{formData.plotAreaSize}</span>
          </div>
        )}

        {formData.preferredStyle.length > 0 && (
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-white/40">Design Style:</span>
            <span className="font-semibold text-white">{formData.preferredStyle.join(', ')}</span>
          </div>
        )}

        {formData.estimatedBudget && (
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-white/40">Est. Budget:</span>
            <span className="font-bold text-accent">{formData.estimatedBudget}</span>
          </div>
        )}
      </div>
    );
  };

  const stepsList = [
    { num: 1, label: "Profile" },
    { num: 2, label: "Services" },
    { num: 3, label: "Site Info" },
    { num: 4, label: "Aesthetics" },
    { num: 5, label: "Plan / Budget" },
    { num: 6, label: "Verification" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left side: Plan information & dynamic summary */}
      <div className="lg:col-span-5 space-y-6">
        <Card className="glass-card border-white/5 bg-[#08162b] rounded-[32px] p-6 shadow-xl">
          <CardContent className="p-0 space-y-6">
            <div>
              <span className="text-[10px] font-black text-accent uppercase tracking-widest">Enquiry Selected Plan</span>
              <h2 className="text-3xl font-black text-white uppercase tracking-wider mt-1">{activePkg.name}</h2>
              <div className="mt-3 bg-gold-gradient text-primary px-5 py-2 rounded-2xl text-xl font-black inline-block shadow-md">
                {activePkg.price === "Custom" ? "Custom Pricing" : `₹${activePkg.price}/-`}
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-white/90 text-sm font-semibold">
                <MapPin className="h-4.5 w-4.5 text-accent shrink-0" />
                <span>{activePkg.visits} ({activePkg.suitable})</span>
              </div>
            </div>

            {/* Dynamic visual representation of user inputs */}
            {renderLiveProgressSummary()}

            <div className="space-y-3 pt-6 border-t border-white/10">
              <h4 className="text-xs font-black text-gold uppercase tracking-widest mb-3">Core Client Benefits</h4>
              <ul className="space-y-2.5">
                {activePkg.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-2.5 text-xs font-semibold text-white/70 items-start leading-relaxed">
                    <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedPkg === 'custom' && (
              <div className="mt-6 pt-5 border-t border-white/10 space-y-4">
                <div>
                  <h4 className="text-xs font-black text-accent uppercase tracking-widest mb-1.5 font-sans">Direct Project Desk</h4>
                  <p className="text-[10px] text-white/50 font-semibold leading-relaxed font-sans">
                    Custom packages receive dedicated civil engineering audits. You can skip the flow and connect with our team directly.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a href="tel:+919122795726" className="flex-1">
                    <Button className="w-full bg-accent hover:bg-accent/90 text-primary font-black uppercase tracking-wider text-[10px] h-11 rounded-full shadow-md flex items-center justify-center gap-2 transition-all active:scale-95">
                      <Phone className="h-3.5 w-3.5 shrink-0" /> Call Us
                    </Button>
                  </a>
                  <a 
                    href={`https://wa.me/919631980881?text=${encodeURIComponent("Hi Galaxy Interior team, I would like to enquire about the Custom Pricing & Large Project package. Please contact me.")}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10 font-black uppercase tracking-wider text-[10px] h-11 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95">
                      WhatsApp Us
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right side: 6-Step Enquiry Form Wizard */}
      <div className="lg:col-span-7">
        <Card className="glass-card border-accent/20 bg-[#08162b] rounded-[32px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <CardContent className="p-0">
            {/* Header info */}
            <div className="mb-8">
              <span className="text-[10px] font-black text-accent uppercase tracking-widest">Enquiry Flow Panel</span>
              <h3 className="text-2xl font-black text-white uppercase tracking-wider mt-1">Client Enquiry Form</h3>
              <p className="text-xs text-white/50 font-semibold leading-relaxed mt-1">
                Step {currentStep} of 6: Mapped exactly to the GALAXY INTERIOR Client Sheet.
              </p>
            </div>

            {/* M3 Dynamic Step Progress Bar */}
            <div className="mb-10">
              <div className="flex items-center justify-between relative">
                {/* Background timeline connection lines */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-white/10 z-0"></div>
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-accent transition-all duration-500 z-0"
                  style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
                ></div>

                {stepsList.map((step) => {
                  const isActive = step.num === currentStep;
                  const isCompleted = step.num < currentStep;
                  return (
                    <button
                      key={step.num}
                      type="button"
                      onClick={() => {
                        // Allow navigating back or forward if already validated
                        if (step.num < currentStep || isStepValid()) {
                          setErrorMsg('');
                          setCurrentStep(step.num);
                        }
                      }}
                      className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                    >
                      <div 
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs transition-all duration-300 border ${
                          isActive 
                            ? 'bg-accent text-primary border-accent shadow-[0_0_12px_rgba(255,207,51,0.4)] scale-110' 
                            : isCompleted 
                              ? 'bg-[#08162b] text-accent border-accent' 
                              : 'bg-[#051124] text-white/40 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : step.num}
                      </div>
                      <span 
                        className={`text-[8px] font-black uppercase tracking-widest mt-2 hidden sm:block ${
                          isActive ? 'text-accent' : 'text-white/40'
                        }`}
                      >
                        {step.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1: WELCOME & REGISTRATION CREDENTIALS */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in duration-300">
                  {/* Account Type selector */}
                  <div className="space-y-2.5">
                    <label className="text-[10px] font-black text-white/50 uppercase tracking-widest block font-sans">Registration Account Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAccountType('individual')}
                        className={`py-3 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${
                          accountType === 'individual' 
                            ? 'bg-accent/15 text-accent border-accent/40 shadow-inner' 
                            : 'border-white/10 text-white/60 bg-white/5 hover:border-accent/40'
                        }`}
                      >
                        <span>👤</span> Individual
                      </button>
                      <button
                        type="button"
                        onClick={() => setAccountType('company')}
                        className={`py-3 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${
                          accountType === 'company' 
                            ? 'bg-accent/15 text-accent border-accent/40 shadow-inner' 
                            : 'border-white/10 text-white/60 bg-white/5 hover:border-accent/40'
                        }`}
                      >
                        <span>🏢</span> Company / Business
                      </button>
                    </div>
                  </div>

                  {/* Company Info Inputs */}
                  {accountType === 'company' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 transition-all duration-300 animate-fade-in">
                      <div className="relative w-full">
                        <Input 
                          name="companyName" 
                          value={formData.companyName}
                          onChange={handleChange}
                          required={accountType === 'company'} 
                          className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                          placeholder="Company Name" 
                        />
                        <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                          Company Name
                        </label>
                      </div>

                      <div className="relative w-full">
                        <Input 
                          name="companyGst" 
                          value={formData.companyGst}
                          onChange={handleChange}
                          className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                          placeholder="GSTIN (Optional)" 
                        />
                        <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                          GSTIN (Optional)
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Authentication Method Selector (Only shown if NOT authenticated with Google) */}
                  {!googleUser && (
                    <div className="space-y-2.5 pt-4 border-t border-white/5">
                      <label className="text-[10px] font-black text-white/50 uppercase tracking-widest block font-sans">Registration Method</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setErrorMsg('');
                            setAuthMethod('google');
                          }}
                          className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${
                            authMethod === 'google' 
                              ? 'bg-accent/15 text-accent border-accent/40 shadow-inner' 
                              : 'border-white/10 text-white/60 bg-white/5 hover:border-accent/40'
                          }`}
                        >
                          ⚡ Google Fast-Fill
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setErrorMsg('');
                            setAuthMethod('manual');
                          }}
                          className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${
                            authMethod === 'manual' 
                              ? 'bg-accent/15 text-accent border-accent/40 shadow-inner' 
                              : 'border-white/10 text-white/60 bg-white/5 hover:border-accent/40'
                          }`}
                        >
                          📝 Manual Form Only
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Google Authenticated Status Card */}
                  {googleUser && (
                    <div className="border border-accent/25 bg-accent/5 rounded-3xl p-5 md:p-6 shadow-md relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in pt-4 border-t border-white/5">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-full blur-xl pointer-events-none"></div>
                      <div className="flex items-center gap-4 text-left">
                        {googleUser.photoURL ? (
                          <img 
                            src={googleUser.photoURL} 
                            alt="Google Profile" 
                            className="w-12 h-12 rounded-full border border-accent/40 shadow-inner flex-shrink-0"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-black text-base flex-shrink-0">
                            {googleUser.displayName?.charAt(0) || 'G'}
                          </div>
                        )}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{googleUser.displayName || 'Google Partner'}</h4>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[8px] font-black tracking-widest px-2 py-0.5 uppercase flex items-center gap-1 rounded-full">
                              <Check className="h-2 w-2 stroke-[4]" /> Verified
                            </Badge>
                          </div>
                          <p className="text-[10px] text-white/50 font-semibold leading-none">{googleUser.email}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleGoogleSignOut}
                        className="px-4 py-2 border border-white/10 text-white/60 hover:text-white hover:border-white/30 rounded-full font-black text-[9px] uppercase tracking-widest transition-colors"
                      >
                        Disconnect
                      </button>
                    </div>
                  )}

                  {/* Rendering inputs dynamically based on method */}
                  {!googleUser && authMethod === 'google' && (
                    <div className="border border-white/10 bg-white/[0.01] rounded-3xl p-6 md:p-8 text-center space-y-4 shadow-inner pt-4 border-t border-white/5">
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-accent">
                        <Sparkles className="h-5 w-5 text-accent animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-black text-white uppercase tracking-widest">Connect Google Profile</h4>
                        <p className="text-[10px] text-white/50 font-semibold leading-relaxed max-w-sm mx-auto font-sans">
                          Use your Google account for instant authentication and automatic profile fast-fillout. No email or password typing required!
                        </p>
                      </div>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handleGoogleSignIn}
                          className="px-6 py-3.5 bg-white text-[#1f1f1f] hover:bg-white/95 rounded-full font-black text-xs uppercase tracking-wider flex items-center justify-center gap-3.5 mx-auto shadow-md transition-all active:scale-[0.98] font-sans border-2 border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                        >
                          <GoogleIcon /> Continue with Google
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Google Authenticated Fields Mode */}
                  {googleUser && (
                    <div className="space-y-6 pt-4 border-t border-white/5 animate-fade-down duration-300">
                      {/* Name & Email (Read-Only) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="relative w-full opacity-60">
                          <Input 
                            name="name" 
                            value={formData.name}
                            disabled
                            className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 bg-white/[0.01] text-white cursor-not-allowed font-sans"
                            placeholder="Client Name" 
                          />
                          <label className="absolute left-4 top-1.5 text-[9px] font-black text-gold uppercase tracking-widest font-sans">
                            Client Name (Google)
                          </label>
                        </div>

                        <div className="relative w-full opacity-60">
                          <Input 
                            name="email" 
                            value={formData.email}
                            disabled
                            className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 bg-white/[0.01] text-white cursor-not-allowed font-sans"
                            placeholder="Email Address" 
                          />
                          <label className="absolute left-4 top-1.5 text-[9px] font-black text-gold uppercase tracking-widest font-sans">
                            Email ID (Google)
                          </label>
                        </div>
                      </div>

                      {/* Contact Phone Inputs */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="relative w-full">
                          <Input 
                            name="phone" 
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required 
                            className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                            placeholder="Mobile Number" 
                          />
                          <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                            Mobile Number
                          </label>
                        </div>

                        <div className="relative w-full">
                          <Input 
                            name="whatsapp" 
                            type="tel"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            required 
                            disabled={sameAsMobile}
                            className={`h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans ${
                              sameAsMobile ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            placeholder="WhatsApp Number" 
                          />
                          <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                            WhatsApp Number
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 py-1">
                        <input 
                          type="checkbox" 
                          id="syncMobile" 
                          checked={sameAsMobile}
                          onChange={(e) => setSameAsMobile(e.target.checked)}
                          className="rounded border-white/20 bg-white/5 text-accent focus:ring-0 focus:ring-offset-0 focus:outline-none" 
                        />
                        <label htmlFor="syncMobile" className="text-[10px] text-white/60 cursor-pointer font-semibold select-none hover:text-white">
                          WhatsApp number is same as Mobile number
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Manual Input Fields Mode */}
                  {!googleUser && authMethod === 'manual' && (
                    <div className="space-y-6 pt-4 border-t border-white/5 animate-fade-down duration-300">
                      {/* Name & Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="relative w-full">
                          <Input 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            required 
                            className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                            placeholder="Client Name" 
                          />
                          <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                            Client Name
                          </label>
                        </div>

                        <div className="relative w-full">
                          <Input 
                            name="email" 
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required 
                            className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                            placeholder="Email ID" 
                          />
                          <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                            Email ID
                          </label>
                        </div>
                      </div>

                      {/* Contact Phone Inputs */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="relative w-full">
                          <Input 
                            name="phone" 
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required 
                            className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                            placeholder="Mobile Number" 
                          />
                          <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                            Mobile Number
                          </label>
                        </div>

                        <div className="relative w-full">
                          <Input 
                            name="whatsapp" 
                            type="tel"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            required 
                            disabled={sameAsMobile}
                            className={`h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans ${
                              sameAsMobile ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            placeholder="WhatsApp Number" 
                          />
                          <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                            WhatsApp Number
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 py-1">
                        <input 
                          type="checkbox" 
                          id="syncMobileManual" 
                          checked={sameAsMobile}
                          onChange={(e) => setSameAsMobile(e.target.checked)}
                          className="rounded border-white/20 bg-white/5 text-accent focus:ring-0 focus:ring-offset-0 focus:outline-none" 
                        />
                        <label htmlFor="syncMobileManual" className="text-[10px] text-white/60 cursor-pointer font-semibold select-none hover:text-white">
                          WhatsApp number is same as Mobile number
                        </label>
                      </div>

                      {/* Manual Password fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-white/5">
                        <div className="relative w-full">
                          <Input 
                            name="password" 
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required 
                            className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                            placeholder="Portal Password" 
                          />
                          <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                            Portal Password
                          </label>
                        </div>

                        <div className="relative w-full">
                          <Input 
                            name="confirmPassword" 
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required 
                            className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                            placeholder="Confirm Password" 
                          />
                          <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                            Confirm Password
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: PROJECT SCOPE & SERVICES */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in duration-300">
                  {/* Project Type */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/50 uppercase tracking-widest block font-sans">Project Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {projectTypes.map((type) => (
                        <button
                          key={type.label}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, projectType: type.label }))}
                          className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                            formData.projectType === type.label 
                              ? 'bg-accent/15 text-accent border-accent shadow-[0_0_8px_rgba(255,207,51,0.25)]' 
                              : 'border-white/5 text-white/60 bg-white/[0.01] hover:border-white/20'
                          }`}
                        >
                          <span className="text-xl">{type.icon}</span>
                          <span className="text-[9px] font-black uppercase tracking-wider leading-snug">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.projectType === 'Other' && (
                    <div className="relative w-full transition-all animate-fade-in">
                      <Input 
                        name="projectTypeOther" 
                        value={formData.projectTypeOther}
                        onChange={handleChange}
                        required={formData.projectType === 'Other'}
                        className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                        placeholder="Please Specify Project Type" 
                      />
                      <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                        Please Specify Project Type
                      </label>
                    </div>
                  )}

                  {/* Services Required */}
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <label className="text-[10px] font-black text-white/50 uppercase tracking-widest block font-sans">Service Required</label>
                    <div className="grid grid-cols-2 gap-2">
                      {servicesList.map((service) => {
                        const isSelected = formData.servicesRequired.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => handleCheckboxToggle('servicesRequired', service)}
                            className={`p-3 rounded-2xl border text-left flex items-center justify-between text-[10px] font-black uppercase tracking-wider transition-all ${
                              isSelected 
                                ? 'bg-accent/10 border-accent/50 text-accent shadow-sm' 
                                : 'border-white/5 text-white/60 bg-white/[0.01] hover:border-white/10'
                            }`}
                          >
                            <span>{service}</span>
                            <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-all ${
                              isSelected ? 'bg-accent border-accent text-primary' : 'border-white/20 bg-transparent'
                            }`}>
                              {isSelected && <Check className="h-2 w-2 stroke-[4]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: SITE & ENGINEERING DETAILS */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative w-full">
                      <Input 
                        name="siteLocation" 
                        value={formData.siteLocation}
                        onChange={handleChange}
                        required 
                        className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                        placeholder="Site Location" 
                      />
                      <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                        Site Location
                      </label>
                    </div>

                    <div className="relative w-full">
                      <Input 
                        name="plotAreaSize" 
                        value={formData.plotAreaSize}
                        onChange={handleChange}
                        required 
                        className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                        placeholder="Plot / Area Size" 
                      />
                      <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                        Plot / Area Size
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative w-full">
                      <Input 
                        name="roadDirection" 
                        value={formData.roadDirection}
                        onChange={handleChange}
                        className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                        placeholder="Road Direction" 
                      />
                      <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                        Road Direction
                      </label>
                    </div>

                    <div className="relative w-full">
                      <Input 
                        name="numberOfFloors" 
                        value={formData.numberOfFloors}
                        onChange={handleChange}
                        className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                        placeholder="Number of Floors" 
                      />
                      <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                        Number of Floors
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-white/5">
                    {/* Construction / Renovation */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/50 uppercase tracking-widest block font-sans">Work Scope</label>
                      <div className="flex gap-2">
                        {["New Construction", "Renovation"].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, constructionType: type }))}
                            className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider border transition-all ${
                              formData.constructionType === type 
                                ? 'bg-accent/15 text-accent border-accent' 
                                : 'border-white/5 text-white/60 bg-white/[0.01]'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Site Visit Required */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/50 uppercase tracking-widest block font-sans">Site Visit Required</label>
                      <div className="flex gap-2">
                        {["Yes", "No"].map((choice) => (
                          <button
                            key={choice}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, siteVisitRequired: choice }))}
                            className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider border transition-all ${
                              formData.siteVisitRequired === choice 
                                ? 'bg-accent/15 text-accent border-accent' 
                                : 'border-white/5 text-white/60 bg-white/[0.01]'
                            }`}
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: DESIGN REQUIREMENTS & PREFERENCES */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in duration-300">
                  {/* Preferred Style */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/50 uppercase tracking-widest block font-sans">Preferred Style</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {designStyles.map((style) => {
                        const isSelected = formData.preferredStyle.includes(style);
                        return (
                          <button
                            key={style}
                            type="button"
                            onClick={() => handleCheckboxToggle('preferredStyle', style)}
                            className={`p-3 rounded-2xl border text-center text-[10px] font-black uppercase tracking-wider transition-all ${
                              isSelected 
                                ? 'bg-accent/15 border-accent text-accent shadow-sm' 
                                : 'border-white/5 text-white/60 bg-white/[0.01] hover:border-white/10'
                            }`}
                          >
                            {style}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Color Preference */}
                  <div className="relative w-full pt-4 border-t border-white/5">
                    <Input 
                      name="colorPreference" 
                      value={formData.colorPreference}
                      onChange={handleChange}
                      className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                      placeholder="Color Preference" 
                    />
                    <label className="absolute left-4 top-8 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-8 peer-placeholder-shown:font-semibold peer-focus:top-5.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-5.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                      Color Preference
                    </label>
                  </div>

                  {/* Special Requirement Text Area */}
                  <div className="relative w-full pt-4">
                    <textarea 
                      name="specialRequirement" 
                      value={formData.specialRequirement}
                      onChange={handleChange}
                      rows={4}
                      className="w-full p-4 rounded-2xl border border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 focus:outline-none text-xs font-sans leading-relaxed"
                      placeholder="Any Special Requirements / Remarks" 
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: BUDGET, PLAN & TIMELINES */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-fade-in duration-300">
                  {/* Select Pricing Plan inside the flow directly */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/50 uppercase tracking-widest block font-sans">Select Pricing Plan Package</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['basic', 'standard', 'premium', 'custom'].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setSelectedPkg(p)}
                          className={`py-3.5 rounded-2xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                            selectedPkg === p 
                              ? 'bg-accent text-primary border-accent shadow-[0_0_8px_rgba(255,207,51,0.25)]' 
                              : 'border-white/10 text-white/60 bg-white/5 hover:border-accent/40'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-white/5">
                    {/* Estimated Budget */}
                    <div className="relative w-full">
                      <Input 
                        name="estimatedBudget" 
                        value={formData.estimatedBudget}
                        onChange={handleChange}
                        required 
                        className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                        placeholder="Estimated Budget" 
                      />
                      <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                        Estimated Budget
                      </label>
                    </div>

                    {/* Expected Completion Time */}
                    <div className="relative w-full">
                      <Input 
                        name="expectedCompletionTime" 
                        value={formData.expectedCompletionTime}
                        onChange={handleChange}
                        required 
                        className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                        placeholder="Expected Completion Span" 
                      />
                      <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                        Completion Span
                      </label>
                    </div>

                    {/* Work Start Date */}
                    <div className="relative w-full">
                      <Input 
                        name="workStartDate" 
                        type="date"
                        value={formData.workStartDate}
                        onChange={handleChange}
                        required 
                        className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                        placeholder="Work Start Date" 
                      />
                      <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                        Work Start Date
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: VERIFICATION, SUBMISSION & INQUIRY SOURCE */}
              {currentStep === 6 && (
                <div className="space-y-6 animate-fade-in duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Site Address */}
                    <div className="relative w-full">
                      <Input 
                        name="address" 
                        value={formData.address}
                        onChange={handleChange}
                        required 
                        className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                        placeholder="Site Address" 
                      />
                      <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                        Site Address
                      </label>
                    </div>

                    {/* City / District */}
                    <div className="relative w-full">
                      <Input 
                        name="cityDistrict" 
                        value={formData.cityDistrict}
                        onChange={handleChange}
                        required 
                        className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                        placeholder="City / District" 
                      />
                      <label className="absolute left-4 top-4 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-semibold peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                        City / District
                      </label>
                    </div>
                  </div>

                  {/* Documents Submitted */}
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <label className="text-[10px] font-black text-white/50 uppercase tracking-widest block font-sans">Documents Submitted</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {documentsList.map((doc) => {
                        const isSelected = formData.documentsSubmitted.includes(doc);
                        return (
                          <button
                            key={doc}
                            type="button"
                            onClick={() => handleCheckboxToggle('documentsSubmitted', doc)}
                            className={`p-3 rounded-2xl border text-center text-[10px] font-black uppercase tracking-wider transition-all ${
                              isSelected 
                                ? 'bg-accent/15 border-accent text-accent shadow-sm' 
                                : 'border-white/5 text-white/60 bg-white/[0.01] hover:border-white/10'
                            }`}
                          >
                            {doc}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Inquiry Source */}
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <label className="text-[10px] font-black text-white/50 uppercase tracking-widest block font-sans">Inquiry Source</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {inquirySources.map((src) => {
                        const isSelected = formData.inquirySource.includes(src);
                        return (
                          <button
                            key={src}
                            type="button"
                            onClick={() => handleCheckboxToggle('inquirySource', src)}
                            className={`p-3 rounded-2xl border text-center text-[10px] font-black uppercase tracking-wider transition-all ${
                              isSelected 
                                ? 'bg-accent/15 border-accent text-accent shadow-sm' 
                                : 'border-white/5 text-white/60 bg-white/[0.01] hover:border-white/10'
                            }`}
                          >
                            {src}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Referred By */}
                  <div className="relative w-full pt-4 border-t border-white/5">
                    <Input 
                      name="referredBy" 
                      value={formData.referredBy}
                      onChange={handleChange}
                      className="h-14 px-4 pt-4 pb-1 rounded-2xl border-white/20 focus:border-accent bg-white/[0.02] text-white focus:ring-0 focus-visible:ring-0 peer placeholder:text-transparent font-sans"
                      placeholder="Referred By (Optional)" 
                    />
                    <label className="absolute left-4 top-8 text-xs font-semibold text-white/50 uppercase tracking-widest pointer-events-none transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-8 peer-placeholder-shown:font-semibold peer-focus:top-5.5 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-gold peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-5.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:text-gold font-sans">
                      Referred By (Optional)
                    </label>
                  </div>
                </div>
              )}

              {errorMsg && (
                <p className="text-xs font-bold text-red-500 italic animate-pulse font-sans pt-2">{errorMsg}</p>
              )}

              {/* Navigation triggers */}
              <div className="pt-8 border-t border-white/10 flex gap-4">
                {currentStep > 1 && (
                  <Button 
                    type="button" 
                    onClick={handlePrevStep}
                    variant="outline"
                    className="flex-1 h-14 border-white/10 text-white hover:bg-white/5 rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <ChevronLeft className="h-4 w-4 stroke-[3]" /> Back
                  </Button>
                )}

                {currentStep < 6 ? (
                  <Button 
                    type="button" 
                    onClick={handleNextStep}
                    className="flex-1 h-14 bg-accent hover:bg-accent/90 text-primary rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
                  >
                    Next Step <ChevronRight className="h-4 w-4 stroke-[3]" />
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1 h-14 bg-gold-gradient hover:opacity-95 text-primary rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg relative overflow-hidden"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        Confirm & Submit Enquiry <Check className="h-4 w-4 stroke-[3]" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="bg-[#051124] text-white min-h-screen pt-28 pb-16">
      <section className="py-12 relative overflow-hidden bg-logo-radial border-b border-white/5 mb-12">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-accent/15 text-accent border border-accent/25 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
            VERIFIED REGISTRATION
          </Badge>
          <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white uppercase font-sans">
            Galaxy Partner Portal
          </h1>
          <p className="text-xs md:text-sm text-white/60 font-medium max-w-xl mx-auto mt-2 font-sans">
            Establish your registered client profile for seamless site audits, material auditing, and direct coordination.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="h-10 w-10 text-accent animate-spin" />
            <p className="text-sm font-semibold text-white/50 uppercase tracking-widest">Loading Package Registration Form...</p>
          </div>
        }>
          <RegisterFormContent />
        </Suspense>
      </div>
    </div>
  );
}
