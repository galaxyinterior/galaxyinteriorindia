"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    CookingPot, Home, BedDouble, Utensils, LayoutGrid, Bath, Briefcase, BookOpen, Sparkles, Tv, Layers, Baby, DoorOpen, Maximize, Mountain, Square, GlassWater, Wine, Lamp, Building2, Palette
} from 'lucide-react';
import { cn } from "@/lib/utils";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const designCategories = [
    { name: 'Modular Kitchen', href: '/design-ideas/modular-kitchen' },
    { name: 'Living Room', href: '/design-ideas/living-room' },
    { name: 'Master Bedroom', href: '/design-ideas/master-bedroom' },
    { name: 'Dining Room', href: '/design-ideas/dining-room' },
    { name: 'Wardrobe', href: '/design-ideas/wardrobe' },
    { name: 'Bathroom', href: '/design-ideas/bathroom' },
    { name: 'Home Office', href: '/design-ideas/home-office' },
    { name: 'Study Room', href: '/design-ideas/study-room' },
    { name: 'Guest Bedroom', href: '/design-ideas/guest-bedroom' },
    { name: 'Pooja Room', href: '/design-ideas/pooja-room' },
    { name: 'TV Unit', href: '/design-ideas/tv-unit' },
    { name: 'False Ceiling', href: '/design-ideas/false-ceiling' },
    { name: 'Kids Bedroom', href: '/design-ideas/kids-bedroom' },
    { name: 'Foyer', href: '/design-ideas/foyer' },
    { name: 'Space Saving Furniture', href: '/design-ideas/space-saving-furniture' },
    { name: 'Balcony', href: '/design-ideas/balcony' },
    { name: 'Tiles', href: '/design-ideas/tiles' },
    { name: 'Kitchen Sinks', href: '/design-ideas/kitchen-sinks' },
    { name: 'Doors', href: '/design-ideas/doors' },
    { name: 'Windows', href: '/design-ideas/windows' },
    { name: 'Staircase', href: '/design-ideas/staircase' },
    { name: 'Flooring', href: '/design-ideas/flooring' },
    { name: 'Wall Decor', href: '/design-ideas/wall-decor' },
    { name: 'Crockery Units', href: '/design-ideas/crockery-units' },
    { name: 'Wall Paint', href: '/design-ideas/wall-paint' },
    { name: 'Home Bar', href: '/design-ideas/home-bar' },
    { name: 'Wallpaper', href: '/design-ideas/wallpaper' },
];


export default function DesignIdeasNav() {
    const pathname = usePathname();

    return (
        <div className="relative">
            <Carousel opts={{ align: "start", dragFree: true }}>
                <CarouselContent className="-ml-4">
                    {designCategories.map((category) => (
                        <CarouselItem key={category.name} className="pl-4 basis-auto">
                            <Link
                                href={category.href}
                                className={cn(
                                    "block py-2 px-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                                    pathname === category.href
                                        ? "border-primary text-primary"
                                        : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                                )}
                            >
                                {category.name}
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                 <div className="hidden md:block">
                    <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm" />
                    <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm" />
                </div>
            </Carousel>
        </div>
    );
}
