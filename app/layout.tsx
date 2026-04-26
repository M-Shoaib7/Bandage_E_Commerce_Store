import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bandage Store — Premium Fashion",
    template: "%s | Bandage Store",
  },
  description:
    "Discover premium clothes, shoes, leather goods, and accessories at Bandage Store. Elevate your style with our curated collection of luxury fashion.",
  keywords: [
    "fashion",
    "clothing",
    "shoes",
    "leather",
    "accessories",
    "luxury",
    "premium",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Bandage Store",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="pt-16 lg:pt-20 min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
