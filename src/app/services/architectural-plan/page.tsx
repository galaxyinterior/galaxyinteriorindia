
"use client";
import ServiceLayout from '../ServiceLayout';

export default function ArchitecturalPlanPage() {
  return (
    <ServiceLayout 
      title="Architectural Plan"
      category="Service"
      description="Professional architectural planning is the foundation of a safe and beautiful home. Galaxy Interior provides expert blueprints that balance aesthetics with structural integrity, tailored specifically for Jharkhand's geography."
      image="/arctiture.jpg"
      imageHint="architectural blueprints"
      points={[
        "Complete Architectural Layout Design",
        "Space Utilization Planning",
        "Structural Analysis & RCC Design",
        "Vastu-Based Planning (Optional)",
        "Modern Exterior Elevation Design",
        "Municipal Approval Ready Blueprints"
      ]}
      brands={["AutoCAD", "SketchUp", "Revit", "V-Ray"]}
      serviceKey="Architectural"
    />
  );
}
