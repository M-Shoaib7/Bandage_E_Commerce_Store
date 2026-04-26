"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { SearchBar } from "./SearchBar";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/shop",
    label: "Shop",
    children: [
      { href: "/shop?category=clothes", label: "Clothes" },
      { href: "/shop?category=shoes", label: "Shoes" },
      { href: "/shop?category=leather", label: "Leather Goods" },
      { href: "/shop?category=accessories", label: "Accessories" },
    ],
  },
  { href: "/shop?sort=newest", label: "New Arrivals" },
  { href: "/shop?sale=true", label: "Sale" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { toggleCart, getTotalItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const cartCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-white"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="h-8 w-8 rounded-lg bg-gray-900 flex items-center justify-center">
                <span className="text-white font-black text-sm">B</span>
              </div>
              <span className="text-xl font-black tracking-tight text-gray-900">
                Bandage
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() =>
                    link.children && setActiveDropdown(link.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "text-gray-900 bg-gray-100"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          activeDropdown === link.label && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.children && (
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl border shadow-lg py-2 z-50"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Search + Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block w-64 lg:w-80">
                <SearchBar />
              </div>

              <div className="flex items-center gap-1">
                <Link
                  href="/login"
                  className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  aria-label="Account"
                >
                  <User className="h-5 w-5" />
                </Link>

                <Link
                  href="/wishlist"
                  className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors relative"
                  aria-label="Wishlist"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>

                <button
                  onClick={toggleCart}
                  className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors relative"
                  aria-label="Cart"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-gray-900 text-white text-[10px] font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Mobile menu toggle */}
                <button
                  onClick={() => setIsMobileOpen(!isMobileOpen)}
                  className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  aria-label="Menu"
                >
                  {isMobileOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-30 bg-white border-b shadow-lg lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              <div className="mb-4">
                <SearchBar />
              </div>
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "text-gray-900 bg-gray-100"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
