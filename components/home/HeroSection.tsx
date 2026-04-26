"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    headline: "Elevate Your",
    highlight: "Personal Style",
    subtext:
      "Discover our new season collection crafted for those who appreciate quality and timeless elegance.",
    cta: "Shop Collection",
    ctaLink: "/shop",
    secondaryCta: "Explore Lookbook",
    image:
      "/images/main.jpg",
    badge: "New Season 2024",
  },
  {
    id: 2,
    headline: "Premium Leather",
    highlight: "Craftsmanship",
    subtext:
      "Handcrafted leather goods that develop character with age. Built to last a lifetime.",
    cta: "Shop Leather",
    ctaLink: "/shop?category=leather",
    secondaryCta: "Learn More",
    image:
      "/images/id_categories_leather_image.jpg",
    badge: "Timeless Quality",
  },
  {
    id: 3,
    headline: "Step Into",
    highlight: "Luxury Footwear",
    subtext:
      "From Oxfords to sneakers, find the perfect pair to complete every look.",
    cta: "Shop Shoes",
    ctaLink: "/shop?category=shoes",
    secondaryCta: "View All",
    image:
      "/images/id_categories_shoes_image.jpg",
    badge: "New Arrivals",
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[current];

  return (
    <section className="relative h-[85vh] min-h-[560px] max-h-[860px] overflow-hidden bg-gray-950">
      {/* Background Image */}
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={{
            enter: (dir: number) => ({
              x: dir > 0 ? "100%" : "-100%",
              opacity: 0,
            }),
            center: { x: 0, opacity: 1 },
            exit: (dir: number) => ({
              x: dir > 0 ? "-100%" : "100%",
              opacity: 0,
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.headline}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium mb-6">
                {slide.badge}
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-none mb-4">
                {slide.headline}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
                  {slide.highlight}
                </span>
              </h1>

              <p className="text-lg text-white/80 mb-8 max-w-md leading-relaxed">
                {slide.subtext}
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                <Button size="xl" className="bg-white text-gray-900 hover:bg-gray-100 font-bold rounded-full" asChild>
                  <Link href={slide.ctaLink}>
                    {slide.cta}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white hover:text-white hover:bg-white/10 border border-white/30 rounded-full"
                  asChild
                >
                  <Link href="/shop">{slide.secondaryCta}</Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? "w-8 h-2 bg-white"
                    : "w-2 h-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
