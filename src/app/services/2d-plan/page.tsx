
"use client";
import ServiceLayout from '../ServiceLayout';

export default function TwoDPlanPage() {
  return (
    <ServiceLayout 
      title="2D Plan"
      category="Service"
      description="Detailed 2D floor plans are essential for precise construction and furniture layout. Our experts in Godda and Ranchi create high-accuracy maps of your living space to ensure maximum utility of every square foot."
      image="/2dplan.jpg"
      imageHint="floor plan drawing"
      points={[
        "2D Floor Plans (Fully Detailed)",
        "Working Drawings for Site Execution",
        "Sectional & Elevation Drawings",
        "Furniture Layout Plans",
        "Electrical & Plumbing Coordination Maps",
        "Accurate Area Calculations"
      ]}
    />
  );
}
