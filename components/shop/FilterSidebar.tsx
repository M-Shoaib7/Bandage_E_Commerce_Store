"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FilterState, ProductCategory } from "@/types";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const categories: { id: ProductCategory; label: string }[] = [
  { id: "clothes", label: "Clothes" },
  { id: "shoes", label: "Shoes" },
  { id: "leather", label: "Leather Goods" },
  { id: "accessories", label: "Accessories" },
];

const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];
const allColors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Navy", hex: "#000080" },
  { name: "Camel", hex: "#C19A6B" },
  { name: "Burgundy", hex: "#800020" },
  { name: "Tan", hex: "#D2B48C" },
  { name: "Charcoal", hex: "#36454F" },
  { name: "Brown", hex: "#795548" },
];

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3 text-sm font-semibold text-foreground"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && <div className="pb-4">{children}</div>}
      <Separator />
    </div>
  );
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  className,
}: FilterSidebarProps) {
  const toggleCategory = (category: ProductCategory) => {
    const updated = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: updated });
  };

  const toggleSize = (size: string) => {
    const updated = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onFiltersChange({ ...filters, sizes: updated });
  };

  const toggleColor = (color: string) => {
    const updated = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onFiltersChange({ ...filters, colors: updated });
  };

  const handleReset = () => {
    onFiltersChange({
      categories: [],
      priceRange: [0, 800],
      sizes: [],
      colors: [],
      sortBy: "featured",
    });
  };

  const hasFilters =
    filters.categories.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 800;

  return (
    <aside className={cn("w-64 shrink-0", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-base">Filters</h2>
        {hasFilters && (
          <button
            onClick={handleReset}
            className="text-sm text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-0 divide-y">
        <Section title="Category">
          <div className="space-y-2.5 pt-1">
            {categories.map(({ id, label }) => (
              <div key={id} className="flex items-center gap-2">
                <Checkbox
                  id={`cat-${id}`}
                  checked={filters.categories.includes(id)}
                  onCheckedChange={() => toggleCategory(id)}
                />
                <Label htmlFor={`cat-${id}`} className="cursor-pointer font-normal">
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Price Range">
          <div className="pt-2 px-1">
            <Slider
              min={0}
              max={800}
              step={10}
              value={filters.priceRange}
              onValueChange={(val) =>
                onFiltersChange({
                  ...filters,
                  priceRange: val as [number, number],
                })
              }
              className="mb-4"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{formatPrice(filters.priceRange[0])}</span>
              <span>{formatPrice(filters.priceRange[1])}</span>
            </div>
          </div>
        </Section>

        <Section title="Size">
          <div className="flex flex-wrap gap-2 pt-1">
            {allSizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                  filters.sizes.includes(size)
                    ? "bg-foreground text-background border-foreground"
                    : "border-border hover:border-foreground transition-colors"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Color">
          <div className="flex flex-wrap gap-2 pt-2">
            {allColors.map(({ name, hex }) => (
              <button
                key={name}
                title={name}
                onClick={() => toggleColor(name)}
                className={cn(
                  "h-7 w-7 rounded-full transition-all border-2",
                  filters.colors.includes(name)
                    ? "border-primary scale-110 ring-2 ring-primary ring-offset-2"
                    : "border-gray-200 hover:scale-110"
                )}
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
        </Section>
      </div>
    </aside>
  );
}
