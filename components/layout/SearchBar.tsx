"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = query.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <form onSubmit={handleSearch}>
        <div
          className={cn(
            "flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-200",
            isFocused
              ? "border-primary shadow-sm bg-background"
              : "border-border bg-muted/50"
          )}
        >
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              setIsFocused(true);
              setIsOpen(true);
            }}
            onBlur={() => setIsFocused(false)}
            placeholder="Search products..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground min-w-0"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {isOpen && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background rounded-xl border shadow-lg z-50 overflow-hidden"
          >
            {results.length > 0 ? (
              <div>
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                  >
                    <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {product.category}
                      </p>
                    </div>
                    <span className="text-sm font-semibold shrink-0">
                      {formatPrice(product.price)}
                    </span>
                  </Link>
                ))}
                <div className="px-4 py-2 border-t">
                  <button
                    onClick={() => {
                      router.push(`/shop?search=${encodeURIComponent(query)}`);
                      setIsOpen(false);
                      setQuery("");
                    }}
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    See all results for &quot;{query}&quot;
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-muted-foreground">
                  No results for &quot;{query}&quot;
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
