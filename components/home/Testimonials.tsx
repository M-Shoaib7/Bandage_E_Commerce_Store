"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alexandra Chen",
    role: "Fashion Blogger",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
    text: "Bandage has completely transformed my wardrobe. The quality of every piece is exceptional, and the customer service is unmatched. I'm a customer for life!",
    product: "Merino Wool Crewneck Sweater",
  },
  {
    id: 2,
    name: "James Harrison",
    role: "Creative Director",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    rating: 5,
    text: "The leather goods are absolutely stunning. My messenger bag has received so many compliments, and it only gets better with age. Worth every penny.",
    product: "Handstitched Leather Messenger Bag",
  },
  {
    id: 3,
    name: "Sarah Mitchell",
    role: "Interior Designer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
    text: "I was skeptical about buying luxury fashion online, but Bandage exceeded all expectations. The packaging alone is beautiful, and the products are even better.",
    product: "Italian Leather Oxford Shoes",
  },
  {
    id: 4,
    name: "Marcus Thompson",
    role: "Entrepreneur",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5,
    text: "Bandage is my go-to for investment pieces. Everything is thoughtfully designed and built to last. The tailored blazer is the best purchase I've made this year.",
    product: "Tailored Wool Blend Blazer",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Don&apos;t just take our word for it — hear from our community of
            discerning fashion lovers.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col"
            >
              <Quote className="h-6 w-6 text-primary/20 mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-3.5 w-3.5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <p className="text-xs text-primary font-medium mb-3">
                Purchased: {t.product}
              </p>
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-gray-100">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
