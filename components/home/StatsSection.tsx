"use client";

import { motion } from "framer-motion";
import { Package, Users, Star, Truck } from "lucide-react";

const stats = [
  { icon: Package, value: "2,400+", label: "Premium Products" },
  { icon: Users, value: "120K+", label: "Happy Customers" },
  { icon: Star, value: "4.9/5", label: "Average Rating" },
  { icon: Truck, value: "Free", label: "Shipping Over $100" },
];

export function StatsSection() {
  return (
    <section className="border-b bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <stat.icon className="h-6 w-6 text-amber-300" />
              </div>
              <div>
                <div className="text-2xl font-black">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
