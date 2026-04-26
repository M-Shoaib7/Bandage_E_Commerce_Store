"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { products } from "@/data/products";
import { ProductCategory } from "@/types";
import { cn } from "@/lib/utils";

const tabs: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "clothes", label: "Clothes" },
  { id: "shoes", label: "Shoes" },
  { id: "leather", label: "Leather" },
  { id: "accessories", label: "Accessories" },
];

export function BestSellers() {
  const [activeTab, setActiveTab] = useState<ProductCategory | "all">("all");

  const filtered =
    activeTab === "all"
      ? products.slice(0, 8)
      : products.filter((p) => p.category === activeTab).slice(0, 8);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4"
        >
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              Top Picks
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all group"
          >
            View All
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
                activeTab === tab.id
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <ProductGrid products={filtered} columns={4} />
      </div>
    </section>
  );
}
