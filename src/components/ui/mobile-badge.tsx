import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const mobileBadgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[8px] font-black uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-accent text-primary shadow",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow",
        outline: "text-white/80 border-white/10 bg-white/5",
        primary: "border-white/10 bg-primary/90 text-white/90 shadow",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface MobileBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mobileBadgeVariants> {}

function MobileBadge({ className, variant, ...props }: MobileBadgeProps) {
  return (
    <div className={cn(mobileBadgeVariants({ variant }), className)} {...props} />
  );
}

export { MobileBadge, mobileBadgeVariants };
