import { cn } from "@/lib/utils";
import { formatPrice, calculateDiscount } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceTag({
  price,
  originalPrice,
  size = "md",
  className,
}: PriceTagProps) {
  const sizes = {
    sm: { price: "text-base font-semibold", original: "text-xs", badge: "text-xs px-1.5 py-0.5" },
    md: { price: "text-xl font-bold", original: "text-sm", badge: "text-xs px-2 py-0.5" },
    lg: { price: "text-3xl font-bold", original: "text-base", badge: "text-sm px-2.5 py-1" },
  };

  const discount = originalPrice ? calculateDiscount(originalPrice, price) : 0;

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      <span className={cn(sizes[size].price, "text-foreground")}>
        {formatPrice(price)}
      </span>
      {originalPrice && (
        <>
          <span className={cn(sizes[size].original, "text-muted-foreground line-through")}>
            {formatPrice(originalPrice)}
          </span>
          <span
            className={cn(
              sizes[size].badge,
              "rounded-full bg-red-100 text-red-600 font-semibold"
            )}
          >
            -{discount}%
          </span>
        </>
      )}
    </div>
  );
}
