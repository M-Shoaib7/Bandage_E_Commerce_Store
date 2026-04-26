"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

export function CartPageClient() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.1;
  const total = subtotal - discount + shipping + tax;

  const handleCoupon = () => {
    if (coupon.toUpperCase() === "BANDAGE10") {
      setCouponApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-black mb-8">
          Shopping Cart
          {items.length > 0 && (
            <span className="ml-3 text-lg font-normal text-muted-foreground">
              ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
          )}
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Button size="lg" className="rounded-full" asChild>
              <Link href="/shop">
                Start Shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    className="bg-white rounded-2xl p-5 flex gap-5"
                  >
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="relative w-24 h-28 rounded-xl overflow-hidden bg-gray-50 shrink-0"
                    >
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4 mb-1">
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-semibold hover:text-primary transition-colors line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() =>
                            removeItem(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name
                            )
                          }
                          className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                          aria-label="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                        <span>Size: {item.selectedSize}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1.5">
                          <div
                            className="h-3.5 w-3.5 rounded-full border border-gray-200"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <QuantitySelector
                          quantity={item.quantity}
                          size="sm"
                          onIncrease={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name,
                              item.quantity + 1
                            )
                          }
                          onDecrease={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name,
                              item.quantity - 1
                            )
                          }
                        />
                        <span className="font-bold text-lg">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              {/* Coupon */}
              <div className="bg-white rounded-2xl p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Coupon Code
                </h3>
                {couponApplied ? (
                  <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl">
                    <span className="text-sm text-emerald-700 font-medium">
                      ✓ BANDAGE10 applied — 10% off!
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter code (BANDAGE10)"
                      className="flex-1"
                      onKeyDown={(e) => e.key === "Enter" && handleCoupon()}
                    />
                    <Button variant="outline" onClick={handleCoupon}>
                      Apply
                    </Button>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-2xl p-5 space-y-3">
                <h3 className="font-bold text-lg">Order Summary</h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount (10%)</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-emerald-600">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax (10%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                {subtotal < 100 && (
                  <p className="text-xs text-amber-600 bg-amber-50 p-2.5 rounded-lg">
                    Add {formatPrice(100 - subtotal)} more for free shipping!
                  </p>
                )}
                <Button
                  size="lg"
                  className="w-full h-12 font-bold rounded-xl mt-2"
                  asChild
                >
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-xl"
                  asChild
                >
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
