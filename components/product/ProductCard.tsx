"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { RatingStars } from "./RatingStars";
import { PriceTag } from "./PriceTag";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const router = useRouter();
  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, product.sizes[0], product.colors[0]);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("group relative", className)}
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images[1]) setImgIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setImgIndex(0);
      }}
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-2xl bg-gray-50 aspect-[3/4]">
          <Image
            src={product.images[imgIndex] || product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white border-0 text-xs">
                New
              </Badge>
            )}
            {product.isSale && (
              <Badge className="bg-red-500 hover:bg-red-500 text-white border-0 text-xs">
                Sale
              </Badge>
            )}
            {product.isBestseller && (
              <Badge className="bg-amber-500 hover:bg-amber-500 text-white border-0 text-xs">
                Best
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div
            className={cn(
              "absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300",
              isHovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            )}
          >
            <button
              onClick={handleWishlist}
              className={cn(
                "h-9 w-9 rounded-full flex items-center justify-center shadow-md transition-colors",
                wishlisted
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-700 hover:bg-red-500 hover:text-white"
              )}
              aria-label="Add to wishlist"
            >
              <Heart className={cn("h-4 w-4", wishlisted && "fill-current")} />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/product/${product.slug}`); }}
              className="h-9 w-9 rounded-full bg-white text-gray-700 flex items-center justify-center shadow-md hover:bg-gray-900 hover:text-white transition-colors"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Add Button */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 p-3 transition-all duration-300",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <button
              onClick={handleQuickAdd}
              className="w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              Quick Add
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-3 space-y-1.5">
          <p className="text-xs text-muted-foreground capitalize">
            {product.category}
          </p>
          <h3 className="font-medium text-sm leading-tight line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <RatingStars
            rating={product.rating}
            reviewCount={product.reviewCount}
            size="sm"
          />
          <PriceTag
            price={product.price}
            originalPrice={product.originalPrice}
            size="sm"
          />

          {/* Color swatches */}
          <div className="flex items-center gap-1.5 pt-0.5">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.name}
                title={color.name}
                className="h-3.5 w-3.5 rounded-full border border-gray-200 cursor-pointer hover:scale-125 transition-transform"
                style={{ backgroundColor: color.hex }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
