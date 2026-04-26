"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getFeaturedProducts } from "@/data/products";

export function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              Bestsellers
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2">
              Featured Products
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all group"
          >
            View All Products
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <ProductGrid products={featured} columns={4} />
      </div>
    </section>
  );
}
