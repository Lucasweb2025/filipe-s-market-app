import { BRAND } from "@/config/brand";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-9",
  md: "h-11",
  lg: "h-16",
  xl: "h-24",
} as const;

interface BrandLogoProps {
  size?: keyof typeof sizes;
  className?: string;
}

export function BrandLogo({ size = "md", className }: BrandLogoProps) {
  return (
    <img
      src={BRAND.logo}
      alt={BRAND.name}
      className={cn("w-auto shrink-0 object-contain", sizes[size], className)}
      decoding="async"
    />
  );
}
