"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
  className?: string;
}

export function CategoryCard({
  id,
  name,
  description,
  image,
  count,
  className,
}: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn("group relative overflow-hidden rounded-2xl cursor-pointer", className)}
    >
      <Link href={`/shop?category=${id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <p className="text-sm font-medium text-white/70 mb-1">
              {count} Products
            </p>
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <p className="text-sm text-white/80 mb-3">{description}</p>
            <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all duration-200">
              Shop Now
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
