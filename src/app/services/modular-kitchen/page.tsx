
"use client";
import ServiceLayout from '../ServiceLayout';

export default function ModularKitchenPage() {
  return (
    <ServiceLayout 
      title="Modular Kitchen"
      category="Facility"
      description="Galaxy Interior creates kitchens that are a joy to cook in. We use ergonomic designs and premium hardware like Hettich to ensure maximum storage and smooth operation."
      image="https://images.unsplash.com/photo-1613082374567-52aefdea4f3a?q=80&w=1000"
      imageHint="modern modular kitchen"
      points={[
        "Ergonomic L/U/Island Layouts",
        "Soft-Close Hardware (Hettich)",
        "Waterproof Cabinetry",
        "Quartz & Granite Countertops",
        "Chimney & Hob Integration"
      ]}
      brands={["Hettich", "Godrej", "Hafele", "Faber"]}
    />
  );
}
