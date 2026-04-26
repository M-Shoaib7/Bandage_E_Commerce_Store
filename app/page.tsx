import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PromoBanner } from "@/components/home/PromoBanner";
import { BestSellers } from "@/components/home/BestSellers";
import { Testimonials } from "@/components/home/Testimonials";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { StatsSection } from "@/components/home/StatsSection";

export const metadata: Metadata = {
  title: "Bandage Store — Premium Fashion",
  description:
    "Discover premium clothes, shoes, leather goods, and accessories. Elevate your style with our curated collection.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <FeaturedProducts />
      <PromoBanner />
      <BestSellers />
      <Testimonials />
      <NewsletterSection />
    </>
  );
}
