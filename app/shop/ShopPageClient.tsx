"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, Grid2X2, LayoutList } from "lucide-react";
import { products } from "@/data/products";
import { FilterState, ProductCategory, SortOption } from "@/types";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Pagination } from "@/components/shop/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 12;

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export function ShopPageClient() {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [gridView, setGridView] = useState<2 | 3 | 4>(4);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 800],
    sizes: [],
    colors: [],
    sortBy: "featured",
  });

  // Sync URL params to filters
  useEffect(() => {
    const category = searchParams.get("category") as ProductCategory | null;
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") as SortOption | null;

    setFilters((prev) => ({
      ...prev,
      categories: category ? [category] : [],
      sortBy: sort || "featured",
    }));
    setCurrentPage(1);
  }, [searchParams]);

  const searchQuery = searchParams.get("search") || "";

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Price
    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Sizes
    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        filters.sizes.some((s) => p.sizes.includes(s))
      );
    }

    // Colors
    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => filters.colors.includes(c.name))
      );
    }

    // Sort
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [filters, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setFilters((prev) => ({ ...prev, sortBy: value as SortOption }));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-black mb-2">
              {searchQuery
                ? `Results for "${searchQuery}"`
                : filters.categories.length === 1
                ? filters.categories[0].charAt(0).toUpperCase() +
                  filters.categories[0].slice(1)
                : "All Products"}
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                {/* Mobile filter trigger */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="lg:hidden gap-2"
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader className="mb-6">
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <FilterSidebar
                      filters={filters}
                      onFiltersChange={handleFiltersChange}
                    />
                  </SheetContent>
                </Sheet>

                {/* Active filter tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  {filters.categories.map((cat) => (
                    <span
                      key={cat}
                      className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-sm"
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      <button
                        onClick={() =>
                          handleFiltersChange({
                            ...filters,
                            categories: filters.categories.filter(
                              (c) => c !== cat
                            ),
                          })
                        }
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {/* Grid toggle */}
                <div className="hidden sm:flex items-center rounded-lg border overflow-hidden">
                  <button
                    onClick={() => setGridView(4)}
                    className={cn(
                      "p-2 transition-colors",
                      gridView === 4
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-100"
                    )}
                    aria-label="4-column grid"
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setGridView(3)}
                    className={cn(
                      "p-2 transition-colors",
                      gridView === 3
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-100"
                    )}
                    aria-label="3-column grid"
                  >
                    <LayoutList className="h-4 w-4" />
                  </button>
                </div>

                {/* Sort */}
                <Select
                  value={filters.sortBy}
                  onValueChange={handleSortChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            <ProductGrid
              products={paginatedProducts}
              columns={gridView}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="mt-12"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
