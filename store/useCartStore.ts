"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product, ProductColor } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (
    product: Product,
    quantity: number,
    selectedSize: string,
    selectedColor: ProductColor
  ) => void;
  removeItem: (productId: string, selectedSize: string, selectedColor: string) => void;
  updateQuantity: (
    productId: string,
    selectedSize: string,
    selectedColor: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity, selectedSize, selectedColor) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedSize === selectedSize &&
            item.selectedColor.name === selectedColor.name
        );

        if (existingIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingIndex].quantity += quantity;
          set({ items: updatedItems, isOpen: true });
        } else {
          set({
            items: [...items, { product, quantity, selectedSize, selectedColor }],
            isOpen: true,
          });
        }
      },

      removeItem: (productId, selectedSize, selectedColor) => {
        set({
          items: get().items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedSize === selectedSize &&
                item.selectedColor.name === selectedColor
              )
          ),
        });
      },

      updateQuantity: (productId, selectedSize, selectedColor, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, selectedSize, selectedColor);
          return;
        }
        const updatedItems = get().items.map((item) =>
          item.product.id === productId &&
          item.selectedSize === selectedSize &&
          item.selectedColor.name === selectedColor
            ? { ...item, quantity }
            : item
        );
        set({ items: updatedItems });
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ),
    }),
    {
      name: "bandage-cart",
    }
  )
);
