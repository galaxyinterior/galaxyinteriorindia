"use client";
import ServiceLayout from '../ServiceLayout';

export default function AutomationLightingPage() {
  return (
    <ServiceLayout 
      title="Automation Lighting"
      category="Facility"
      description="Bring your home into the future with smart automation and mood lighting. Control ambiance, color temperatures, and energy efficiency seamlessly from your smartphone for the ultimate luxury living experience."
      image="/generated/hero_interior_1.png"
      imageHint="smart home lighting automation"
      points={[
        "Smart Home Light Automation",
        "App & Voice Controlled Ambient Lighting",
        "Energy Efficient LED Systems",
        "Custom Mood & Scene Creation"
      ]}
    />
  );
}
