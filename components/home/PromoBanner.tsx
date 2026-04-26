"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PromoBanner() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left - Dark */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gray-950 min-h-[400px] flex items-end p-8"
          >
            <Image
              src="/images/id_31_woolcoat_image01.jpg"
              alt="New Collection"
              fill
              className="object-cover opacity-50"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="relative z-10">
              <span className="inline-block text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
                New Season
              </span>
              <h3 className="text-3xl font-black text-white mb-3">
                2024 Winter
                <br />
                Collection
              </h3>
              <p className="text-white/70 text-sm mb-6">
                Luxurious coats, knitwear, and accessories for the colder months.
              </p>
              <Button
                className="rounded-full bg-white text-gray-900 hover:bg-gray-100"
                asChild
              >
                <Link href="/shop?sort=newest">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right - Light */}
          <div className="grid grid-rows-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden rounded-3xl bg-amber-50 min-h-[180px] flex items-end p-6"
            >
              <Image
                src="/images/id_categories_shoes_image.jpg"
                alt="Shoes"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-2xl p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">
                  Up to 40% Off
                </p>
                <p className="font-black text-lg">Premium Footwear</p>
                <Link
                  href="/shop?category=shoes&sale=true"
                  className="text-sm font-semibold flex items-center gap-1 mt-1 hover:gap-2 transition-all"
                >
                  Shop Sale <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden rounded-3xl bg-stone-900 min-h-[180px] flex items-end p-6"
            >
              <Image
                src="/images/id_categories_leather_image.jpg"
                alt="Leather"
                fill
                className="object-cover opacity-60"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-1">
                  Artisan Crafted
                </p>
                <p className="font-black text-xl text-white">
                  Leather Goods
                </p>
                <Link
                  href="/shop?category=leather"
                  className="text-sm font-semibold flex items-center gap-1 mt-1 text-white/80 hover:text-white hover:gap-2 transition-all"
                >
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
