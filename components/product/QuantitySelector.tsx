"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = "md",
  className,
}: QuantitySelectorProps) {
  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-border overflow-hidden",
        size === "sm" ? "h-8" : "h-10",
        className
      )}
    >
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className={cn(
          "flex items-center justify-center transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed",
          size === "sm" ? "w-8 h-8" : "w-10 h-10"
        )}
        aria-label="Decrease quantity"
      >
        <Minus className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
      </button>
      <span
        className={cn(
          "font-medium tabular-nums select-none",
          size === "sm" ? "w-8 text-sm text-center" : "w-10 text-base text-center"
        )}
      >
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className={cn(
          "flex items-center justify-center transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed",
          size === "sm" ? "w-8 h-8" : "w-10 h-10"
        )}
        aria-label="Increase quantity"
      >
        <Plus className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
      </button>
    </div>
  );
}
