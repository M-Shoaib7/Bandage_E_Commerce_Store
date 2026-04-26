"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (!get().isWishlisted(product.id)) {
          set({ items: [...get().items, product] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },

      toggleItem: (product) => {
        if (get().isWishlisted(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      isWishlisted: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: "bandage-wishlist",
    }
  )
);
