"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Share2,
  ChevronRight,
  Truck,
  RotateCcw,
  Shield,
  Star,
} from "lucide-react";
import { Product, ProductColor } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { RatingStars } from "@/components/product/RatingStars";
import { PriceTag } from "@/components/product/PriceTag";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRelatedProducts } from "@/data/products";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [zoom, setZoom] = useState(false);

  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);
  const related = getRelatedProducts(product, 4);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
    toast.success(`${product.name} added to cart!`, {
      description: `Size: ${selectedSize} | Color: ${selectedColor.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href="/shop"
              className="hover:text-foreground transition-colors"
            >
              Shop
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href={`/shop?category=${product.category}`}
              className="hover:text-foreground transition-colors capitalize"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium line-clamp-1">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 cursor-zoom-in"
              onClick={() => setZoom(!zoom)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-500",
                      zoom ? "scale-150" : "scale-100"
                    )}
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.isNew && (
                  <Badge className="bg-emerald-500 text-white border-0">
                    New Arrival
                  </Badge>
                )}
                {product.isSale && (
                  <Badge className="bg-red-500 text-white border-0">Sale</Badge>
                )}
              </div>
            </motion.div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "relative w-20 h-24 rounded-xl overflow-hidden shrink-0 transition-all",
                      selectedImage === i
                        ? "ring-2 ring-gray-900 ring-offset-2"
                        : "opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground capitalize mb-2">
                {product.category} / {product.subcategory}
              </p>
              <h1 className="text-3xl lg:text-4xl font-black mb-3">
                {product.name}
              </h1>
              <RatingStars
                rating={product.rating}
                reviewCount={product.reviewCount}
                size="md"
              />
            </div>

            <PriceTag
              price={product.price}
              originalPrice={product.originalPrice}
              size="lg"
            />

            <Separator />

            {/* Color Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Color</h3>
                <span className="text-sm text-muted-foreground">
                  {selectedColor.name}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={cn(
                      "h-8 w-8 rounded-full border-2 transition-all",
                      selectedColor.name === color.name
                        ? "border-gray-900 scale-110 ring-2 ring-gray-900 ring-offset-2"
                        : "border-gray-200 hover:scale-110"
                    )}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Size</h3>
                <button className="text-sm text-primary underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "min-w-[48px] px-3 py-2 rounded-xl border text-sm font-medium transition-all",
                      selectedSize === size
                        ? "bg-gray-900 text-white border-gray-900"
                        : "border-border hover:border-gray-900 transition-colors"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <h3 className="font-semibold">Quantity</h3>
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity((q) => Math.min(q + 1, product.stock))}
                onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
                max={product.stock}
              />
              <span className="text-sm text-muted-foreground">
                {product.stock} in stock
              </span>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 h-14 text-base font-bold rounded-2xl"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  "h-14 w-14 rounded-2xl p-0 shrink-0 transition-colors",
                  wishlisted
                    ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                    : ""
                )}
                onClick={() => toggleItem(product)}
              >
                <Heart
                  className={cn("h-5 w-5", wishlisted && "fill-current")}
                />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 w-14 rounded-2xl p-0 shrink-0"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied to clipboard!");
                }}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: "Free shipping over $100" },
                { icon: RotateCcw, label: "30-day returns" },
                { icon: Shield, label: "2-year warranty" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 text-center"
                >
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Description & Reviews */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full max-w-md mb-8 h-12">
              <TabsTrigger value="description" className="flex-1">
                Description
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">
                Reviews ({product.reviewCount})
              </TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1">
                Shipping
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="max-w-2xl">
              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Details</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Category: <span className="capitalize">{product.category}</span></li>
                    <li>Subcategory: <span className="capitalize">{product.subcategory}</span></li>
                    <li>Stock: {product.stock} units</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md bg-white border text-xs capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              {product.reviews.length > 0 ? (
                <div className="space-y-6 max-w-2xl">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border rounded-xl p-5">
                      <div className="flex items-start gap-4">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0">
                          <Image
                            src={review.avatar}
                            alt={review.author}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold">{review.author}</h4>
                            <span className="text-xs text-muted-foreground">
                              {new Date(review.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-3.5 w-3.5",
                                  i < review.rating
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-gray-200 fill-gray-200"
                                )}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Star className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p>No reviews yet. Be the first to review this product!</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="shipping" className="max-w-2xl">
              <div className="space-y-4">
                {[
                  {
                    title: "Standard Shipping",
                    desc: "5-7 business days — Free on orders over $100",
                  },
                  {
                    title: "Express Shipping",
                    desc: "2-3 business days — $14.99",
                  },
                  {
                    title: "Overnight Shipping",
                    desc: "Next business day — $29.99",
                  },
                  {
                    title: "Returns",
                    desc: "Free returns within 30 days of purchase. Items must be in original condition.",
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <Truck className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">{title}</h4>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-black mb-8">You May Also Like</h2>
            <ProductGrid products={related} columns={4} />
          </div>
        )}
      </div>
    </div>
  );
}
