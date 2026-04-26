import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopPageClient } from "./ShopPageClient";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse our complete collection of premium clothes, shoes, leather goods, and accessories.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-gray-900 animate-spin" /></div>}>
      <ShopPageClient />
    </Suspense>
  );
}
