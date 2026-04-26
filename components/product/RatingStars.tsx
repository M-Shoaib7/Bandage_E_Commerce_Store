"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

export function RatingStars({
  rating,
  reviewCount,
  size = "md",
  showCount = true,
}: RatingStarsProps) {
  const sizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const partial = !filled && i < rating;

          return (
            <div key={i} className="relative">
              <Star
                className={cn(sizes[size], "text-gray-200 fill-gray-200")}
              />
              {(filled || partial) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? "100%" : `${(rating % 1) * 100}%` }}
                >
                  <Star
                    className={cn(
                      sizes[size],
                      "text-amber-400 fill-amber-400"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showCount && (
        <span className={cn(textSizes[size], "text-muted-foreground")}>
          {rating.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="ml-1">({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
}
