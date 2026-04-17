
"use client";
import ServiceLayout from '../ServiceLayout';

export default function ThreeDDesignPage() {
  return (
    <ServiceLayout 
      title="3D Design"
      category="Service"
      description="See your dream home before it's built. Our photorealistic 3D renders allow you to visualize colors, lighting, and textures with absolute clarity, ensuring no surprises during actual execution."
      image="https://images.unsplash.com/photo-1600607687940-4e2a09695d51?q=80&w=1000"
      imageHint="3d interior render"
      points={[
        "3D Exterior Elevation Design",
        "3D Interior Visualization (Ultra-Realistic Renders)",
        "Walkthrough Design (Optional Premium Service)",
        "Material Texture Mapping",
        "Lighting Simulation & Shadows",
        "Virtual Reality Walkthroughs"
      ]}
    />
  );
}
