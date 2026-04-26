"use client";

import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  columns?: 2 | 3 | 4;
  className?: string;
}

function ProductSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-5 w-20" />
    </div>
  );
}

export function ProductGrid({
  products,
  loading,
  columns = 4,
  className,
}: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  };

  if (loading) {
    return (
      <div className={cn("grid gap-6", gridCols[columns], className)}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
