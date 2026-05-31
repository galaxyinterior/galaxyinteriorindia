"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs, doc, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mails, Phone, MapPin, Loader2, Sparkles, FolderKanban, Check, Layers, AlertCircle, Building, Home as HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const PROJECT_STATUSES = ["Initialized", "Under Audit", "Visit Scheduled", "In Progress", "Completed"];

export default function SubmissionsPage() {
  const [activeTab, setActiveTab] = useState<"consultations" | "projects" | "applied_services">("consultations");
  const [selectedSegment, setSelectedSegment] = useState<"all" | "residential" | "commercial">("all");
  
  const [consultations, setConsultations] = useState<any[]>([]);
  const [clientProjects, setClientProjects] = useState<any[]>([]);
  const [appliedServices, setAppliedServices] = useState<any[]>([]);
  const [responseInputs, setResponseInputs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [submittingResponseId, setSubmittingResponseId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const qConsults = query(collection(db, "consultations"), orderBy("createdAt", "desc"));
      const snapConsults = await getDocs(qConsults);
      const dataConsults: any[] = snapConsults.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()?.toLocaleString() || "Recent"
      }));
      setConsultations(dataConsults);

      const qProjects = query(collection(db, "client_projects"), orderBy("createdAt", "desc"));
      const snapProjects = await getDocs(qProjects);
      const dataProjects: any[] = snapProjects.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()?.toLocaleString() || "Recent"
      }));
      setClientProjects(dataProjects);

      const qApplied = query(collection(db, "applied_services"), orderBy("createdAt", "desc"));
      const snapApplied = await getDocs(qApplied);
      const dataApplied: any[] = snapApplied.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()?.toLocaleString() || "Recent"
      }));
      setAppliedServices(dataApplied);

      // Pre-fill response input states
      const inputs: Record<string, string> = {};
      dataApplied.forEach(item => {
        inputs[item.id] = item.adminResponse || "";
      });
      setResponseInputs(inputs);

    } catch (err) {
      console.error("Failed to fetch admin submissions data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (projectId: string, newStatus: string) => {
    setUpdatingId(projectId);
    try {
      const projectRef = doc(db, "client_projects", projectId);
      await updateDoc(projectRef, {
        status: newStatus,
        updatedAt: new Date()
      });

      setClientProjects(prev =>
        prev.map(p => (p.id === projectId ? { ...p, status: newStatus } : p))
      );

      const projectObj = clientProjects.find(p => p.id === projectId);
      if (projectObj) {
        await addDoc(collection(db, "notifications"), {
          uid: projectObj.uid,
          projectId: projectId,
          title: "Project Status Updated",
          message: `Your project "${projectObj.projectName}" status has been updated to "${newStatus}" by Lead Architect Sameer Ahmed.`,
          read: false,
          createdAt: serverTimestamp()
        });
      }
    } catch (err) {
      console.error("Failed to update project status", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleResponseSubmit = async (appId: string, clientUid: string, serviceName: string) => {
    const text = responseInputs[appId] || "";
    if (!text.trim()) {
      alert("Please enter a response note.");
      return;
    }
    setSubmittingResponseId(appId);
    try {
      const appRef = doc(db, "applied_services", appId);
      await updateDoc(appRef, {
        adminResponse: text,
        status: "Reviewed",
        updatedAt: new Date()
      });

      setAppliedServices(prev =>
        prev.map(item => (item.id === appId ? { ...item, adminResponse: text, status: "Reviewed" } : item))
      );

      await addDoc(collection(db, "notifications"), {
        uid: clientUid,
        title: "Service Application Reviewed",
        message: `Lead Architect Sameer Ahmed reviewed your "${serviceName}" application: "${text}"`,
        read: false,
        createdAt: serverTimestamp()
      });

      alert("Response submitted successfully!");
    } catch (err) {
      console.error("Failed to submit service response", err);
      alert("Failed to submit response. Please verify connection.");
    } finally {
      setSubmittingResponseId(null);
    }
  };

  // Filter client-side based on segment toggle
  const filteredConsultations = consultations.filter(c => {
    if (selectedSegment === "all") return true;
    return (c.projectSegment || "residential") === selectedSegment;
  });

  const filteredClientProjects = clientProjects.filter(p => {
    if (selectedSegment === "all") return true;
    return (p.projectSegment || "residential") === selectedSegment;
  });

  const filteredAppliedServices = appliedServices.filter(s => {
    if (selectedSegment === "all") return true;
    return (s.projectSegment || "residential") === selectedSegment;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 text-left">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            <Mails className="w-10 h-10 text-accent" /> Leads & Portal Plans
          </h1>
          <p className="text-white/40 mt-2 text-sm md:text-base">
            Audit standard site consultations, project setups, and service applications in real time.
          </p>
        </div>
        <Badge className="bg-[#051124] text-accent border border-accent/30 px-4 py-1 text-xs rounded-full shrink-0 w-fit">
          {filteredConsultations.length} Leads | {filteredClientProjects.length} Projects | {filteredAppliedServices.length} Service Apps
        </Badge>
      </div>

      {/* Control Bar: Submenu & Segment Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-2">
        {/* Tab Buttons */}
        <div className="flex gap-6 flex-wrap">
          <button
            onClick={() => setActiveTab("consultations")}
            className={`pb-3 font-bold text-xs uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "consultations"
                ? "border-accent text-accent"
                : "border-transparent text-white/30 hover:text-white"
            }`}
          >
            <Mails className="w-4 h-4 shrink-0" /> Consultation Inquiries ({filteredConsultations.length})
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`pb-3 font-bold text-xs uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "projects"
                ? "border-accent text-accent"
                : "border-transparent text-white/30 hover:text-white"
            }`}
          >
            <FolderKanban className="w-4 h-4 shrink-0" /> Custom Portal Projects ({filteredClientProjects.length})
          </button>

          <button
            onClick={() => setActiveTab("applied_services")}
            className={`pb-3 font-bold text-xs uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "applied_services"
                ? "border-accent text-accent"
                : "border-transparent text-white/30 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0" /> Service Applications ({filteredAppliedServices.length})
          </button>
        </div>

        {/* Segment Tabs */}
        <div className="bg-[#051124] border border-white/10 p-1 rounded-full flex items-center gap-1 w-fit shrink-0 self-start md:self-auto mb-3 md:mb-0">
          <button
            onClick={() => setSelectedSegment("all")}
            className={cn(
              "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all",
              selectedSegment === "all" ? "bg-white/15 text-white" : "text-white/40 hover:text-white"
            )}
          >
            All
          </button>
          <button
            onClick={() => setSelectedSegment("residential")}
            className={cn(
              "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1",
              selectedSegment === "residential" ? "bg-gold-gradient text-primary" : "text-white/40 hover:text-white"
            )}
          >
            🏠 Residential
          </button>
          <button
            onClick={() => setSelectedSegment("commercial")}
            className={cn(
              "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1",
              selectedSegment === "commercial" ? "bg-accent text-primary" : "text-white/40 hover:text-white"
            )}
          >
            🏢 Commercial
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center p-24">
          <Loader2 className="w-10 h-10 animate-spin text-white/20" />
        </div>
      ) : activeTab === "consultations" ? (
        filteredConsultations.length === 0 ? (
          <div className="border-dashed border-2 border-white/10 py-24 flex items-center justify-center rounded-2xl">
            <p className="text-white/30 font-medium uppercase tracking-widest text-xs font-black">No inquiries filtered under this segment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {filteredConsultations.map((sub) => (
              <Card key={sub.id} className="overflow-hidden border-l-4 border-l-accent border-white/10 bg-[#08162d] rounded-2xl shadow-none">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white capitalize">{sub.name || "Anonymous User"}</h3>
                        <div className="mt-1">
                          {(sub.projectSegment || "residential") === "commercial" ? (
                            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[7px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                              🏢 Commercial
                            </span>
                          ) : (
                            <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[7px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                              🏠 Residential
                            </span>
                          )}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[9px] bg-transparent border-white/10 text-white/40">
                        {sub.propertyType || "General Query"}
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm text-white/50">
                        <Phone className="w-4 h-4 text-white/30 shrink-0" />
                        <a href={`tel:${sub.phone}`} className="font-medium text-white/70">
                          {sub.phone || "No phone provided"}
                        </a>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-white/50">
                        <MapPin className="w-4 h-4 text-white/30 shrink-0" />
                        <span>{sub.location || "No location provided"}</span>
                      </div>
                      {sub.message && (
                        <div className="flex items-start gap-3 text-sm text-white/40 bg-white/5 p-2.5 rounded-lg border border-white/5">
                          <Mails className="w-4 h-4 text-white/20 shrink-0 mt-0.5" />
                          <span className="italic text-white/60 font-sans">"{sub.message}"</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-white/30">
                    <span>Received on</span>
                    <span>{sub.createdAt}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      ) : activeTab === "projects" ? (
        filteredClientProjects.length === 0 ? (
          <div className="border-dashed border-2 border-white/10 py-24 flex items-center justify-center rounded-2xl">
            <p className="text-white/30 font-medium uppercase tracking-widest text-xs font-black">No customized projects filtered under this segment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {filteredClientProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden border-l-4 border-l-accent border-white/10 bg-[#08162d] rounded-2xl shadow-none">
                <CardContent className="p-6 flex flex-col justify-between h-full space-y-6">
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white capitalize">{project.projectName}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <Badge className="bg-accent/15 text-accent border border-accent/20 text-[9px] font-black tracking-widest px-2.5 py-0.5 uppercase rounded-full">
                            {project.selectedPackage}
                          </Badge>
                          <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-black tracking-widest px-2.5 py-0.5 uppercase rounded-full">
                            {project.packagePricePaid}
                          </Badge>
                          {(project.projectSegment || "residential") === "commercial" ? (
                            <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-black tracking-widest px-2.5 py-0.5 uppercase rounded-full">
                              🏢 Commercial
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[9px] font-black tracking-widest px-2.5 py-0.5 uppercase rounded-full">
                              🏠 Residential
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Badge className="bg-white/5 text-white/40 border-none text-[9px] font-bold px-3 py-1 rounded-full">
                        TXN: {project.paymentTxId || "PAID"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/50 bg-white/5 p-3 rounded-xl border border-white/5 font-sans">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Client:</span>
                        <span className="font-bold text-white/80 truncate">{project.clientName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Phone:</span>
                        <a href={`tel:${project.clientPhone}`} className="font-semibold text-accent">{project.clientPhone}</a>
                      </div>
                    </div>
                  </div>

                  {project.customOptions && project.customOptions.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black text-white/30 uppercase tracking-widest block">Services Configured</span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.customOptions.map((opt: string, idx: number) => (
                          <span key={idx} className="bg-white/5 border border-white/10 text-[9px] font-bold text-white/50 px-2.5 py-1 rounded-md uppercase flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-400" /> {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-xs font-medium text-white/50 bg-white/5 p-4 rounded-xl border border-white/5 font-sans">
                    <div>
                      <span className="text-white/30 block text-[9px] font-black uppercase tracking-wider mb-1">Site Location</span>
                      <span className="font-bold text-white/80 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-white/30" /> {project.siteDetails?.location}
                      </span>
                    </div>
                    <div>
                      <span className="text-white/30 block text-[9px] font-black uppercase tracking-wider mb-1">Plot Area / Floors</span>
                      <span className="font-bold text-white/80 flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-white/30" /> {project.siteDetails?.plotSize} Sqft ({project.siteDetails?.floors} Floors)
                      </span>
                    </div>
                    {project.siteDetails?.remarks && (
                      <div className="col-span-2 pt-2 border-t border-white/5">
                        <span className="text-white/30 block text-[9px] font-black uppercase tracking-wider mb-1">Remarks & Details</span>
                        <span className="italic text-white/50">"{project.siteDetails?.remarks}"</span>
                      </div>
                    )}
                  </div>

                  {/* LIVE STATUS UPDATER */}
                  <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-accent/5 p-4 rounded-xl border border-accent/15 font-sans">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-xs font-black text-white uppercase tracking-widest">Update Client Status</span>
                    </div>

                    <div className="relative shrink-0 w-full sm:w-auto">
                      <select
                        value={project.status}
                        onChange={(e) => handleStatusChange(project.id, e.target.value)}
                        disabled={updatingId === project.id}
                        className="w-full sm:w-48 h-10 px-3 rounded-lg border border-white/10 bg-[#051124] text-white focus:outline-none focus:ring-1 focus:ring-accent text-xs font-bold appearance-none cursor-pointer pr-8"
                      >
                        {PROJECT_STATUSES.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                      {updatingId === project.id ? (
                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-accent" />
                      ) : (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-accent w-0 h-0" />
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-white/30">
                    <span>Initialized on</span>
                    <span>{project.createdAt}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      ) : (
        filteredAppliedServices.length === 0 ? (
          <div className="border-dashed border-2 border-white/10 py-24 flex items-center justify-center rounded-2xl">
            <p className="text-white/30 font-medium uppercase tracking-widest text-xs font-black">No service applications filtered under this segment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {filteredAppliedServices.map((service) => (
              <Card key={service.id} className="overflow-hidden border-l-4 border-l-accent border-white/10 bg-[#08162d] rounded-2xl shadow-none">
                <CardContent className="p-6 flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white capitalize">{service.serviceName}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <Badge className="bg-accent/15 text-accent border border-accent/20 text-[9px] font-black tracking-widest px-2.5 py-0.5 uppercase rounded-full">
                            {service.status || "Applied"}
                          </Badge>
                          {(service.projectSegment || "residential") === "commercial" ? (
                            <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-black tracking-widest px-2.5 py-0.5 uppercase rounded-full">
                              🏢 Commercial
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[9px] font-black tracking-widest px-2.5 py-0.5 uppercase rounded-full">
                              🏠 Residential
                            </Badge>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] text-white/35 font-bold uppercase tracking-widest">Service App</span>
                    </div>

                    <div className="space-y-2 text-sm text-white/50 bg-white/5 p-3.5 rounded-xl border border-white/5 font-sans">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest w-12 shrink-0">Client:</span>
                        <span className="font-bold text-white/80 truncate">{service.clientName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest w-12 shrink-0">Phone:</span>
                        <a href={`tel:${service.clientPhone}`} className="font-semibold text-accent">{service.clientPhone}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest w-12 shrink-0">Email:</span>
                        <a href={`mailto:${service.clientEmail}`} className="font-semibold text-white/70 truncate">{service.clientEmail}</a>
                      </div>
                    </div>
                  </div>

                  {/* LIVE RESPONSE PANEL */}
                  <div className="pt-4 border-t border-white/5 flex flex-col gap-3 bg-accent/5 p-4 rounded-xl border border-accent/15 text-left font-sans">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-xs font-black text-white uppercase tracking-widest">Architect Response Note</span>
                    </div>

                    <div className="space-y-3">
                      <textarea
                        placeholder="Type architect response and suggestions here (e.g. 'False ceiling design scheduled for Ranchi site audit, material estimated...')"
                        value={responseInputs[service.id] || ""}
                        onChange={(e) => setResponseInputs(prev => ({ ...prev, [service.id]: e.target.value }))}
                        disabled={submittingResponseId === service.id}
                        className="w-full h-20 px-3 py-2 rounded-lg border border-white/10 bg-[#051124] text-white placeholder-white/35 focus:outline-none focus:ring-1 focus:ring-accent text-xs font-bold font-sans"
                      />
                      <button
                        onClick={() => handleResponseSubmit(service.id, service.uid, service.serviceName)}
                        disabled={submittingResponseId === service.id}
                        className="w-full h-10 px-4 rounded-lg bg-accent text-primary text-xs font-black uppercase tracking-wider transition-all hover:bg-accent/90 active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        {submittingResponseId === service.id ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4 stroke-[2.5]" /> Submit Live Response
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-white/30">
                    <span>Applied on</span>
                    <span>{service.createdAt}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      )}
    </div>
  );
}
