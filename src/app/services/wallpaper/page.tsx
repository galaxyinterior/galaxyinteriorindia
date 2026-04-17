"use client";
import ServiceLayout from '../ServiceLayout';

export default function WallpaperPage() {
  return (
    <ServiceLayout 
      title="Wallpaper"
      category="Facility"
      description="Elevate your walls with our extensive collection of high-end wallpapers. From textured luxury finishes to geometric patterns and classic florals, our imported wall coverings make a grand statement in any room."
      image="/generated/fac_wallpaper.png"
      imageHint="luxury bedroom wallpaper"
      points={[
        "Imported Luxury Wallpapers",
        "Custom 3D & Textured Designs",
        "Seamless Edge-to-Edge Installation",
        "Durable & Washable Options"
      ]}
    />
  );
}
