"use client";

import { motion } from "framer-motion";
import { CategoryCard } from "@/components/product/CategoryCard";
import { categories } from "@/data/products";

export function CategoriesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Collections
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            From everyday essentials to statement pieces, explore our curated
            categories.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <CategoryCard {...cat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
