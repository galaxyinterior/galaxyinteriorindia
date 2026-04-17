
"use client";
import ServiceLayout from '../ServiceLayout';

export default function ConstructionPage() {
  return (
    <ServiceLayout 
      title="Construction"
      category="Service"
      description="Galaxy Interior offers full-service home construction from foundation to finish. We use premium materials and expert site supervision to build luxury villas and residences across Godda and Ranchi."
      image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000"
      imageHint="construction site building"
      points={[
        "End-to-End Civil Work",
        "Premium Material Usage (UltraTech, Tata Steel)",
        "Daily On-Site Supervision",
        "Timely Project Handover",
        "5-Year Construction Warranty"
      ]}
      brands={["UltraTech", "Tata Steel", "JSW", "ACC"]}
    />
  );
}
