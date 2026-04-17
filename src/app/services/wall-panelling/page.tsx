"use client";
import ServiceLayout from '../ServiceLayout';

export default function WallPanellingPage() {
  return (
    <ServiceLayout 
      title="Wall Panelling"
      category="Facility"
      description="Create breathtaking accent walls with our bespoke wall panelling services. We design and install rich wooden, fluted, and fabric-padded panels that act as incredible focal points in bedrooms and living areas."
      image="/generated/fac_wall_panelling.png"
      imageHint="wooden wall panelling"
      points={[
        "Fluted Wooden Panels",
        "Fabric & Leather Acoustic Panels",
        "Acrylic & Veneer Finishes",
        "Integrated Ambient Lighting"
      ]}
    />
  );
}
