"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const shipping = totalPrice > 100 ? 0 : 9.99;
  const tax = totalPrice * 0.1;
  const orderTotal = totalPrice + shipping + tax;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-lg font-bold">
              <ShoppingBag className="h-5 w-5" />
              Shopping Cart
              {totalItems > 0 && (
                <span className="ml-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full py-16 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Looks like you haven&apos;t added anything yet
                </p>
                <Button onClick={closeCart} asChild>
                  <Link href="/shop">Start Shopping</Link>
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-3"
                  >
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm leading-tight line-clamp-2 mb-1">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <span>Size: {item.selectedSize}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <div
                            className="h-3 w-3 rounded-full border border-gray-300"
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
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                          <button
                            onClick={() =>
                              removeItem(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor.name
                              )
                            }
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t space-y-3 bg-background">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (10%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>{formatPrice(orderTotal)}</span>
              </div>
            </div>
            {totalPrice < 100 && (
              <p className="text-xs text-muted-foreground text-center">
                Add {formatPrice(100 - totalPrice)} more for free shipping!
              </p>
            )}
            <Button
              className="w-full h-12 text-base font-semibold"
              asChild
              onClick={closeCart}
            >
              <Link href="/checkout">
                Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full"
              asChild
              onClick={closeCart}
            >
              <Link href="/cart">View Full Cart</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
