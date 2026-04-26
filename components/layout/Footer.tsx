import Link from "next/link";
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const footerLinks = {
  shop: [
    { href: "/shop?category=clothes", label: "Clothes" },
    { href: "/shop?category=shoes", label: "Shoes" },
    { href: "/shop?category=leather", label: "Leather Goods" },
    { href: "/shop?category=accessories", label: "Accessories" },
    { href: "/shop?sort=newest", label: "New Arrivals" },
    { href: "/shop?sale=true", label: "Sale" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/press", label: "Press" },
    { href: "/sustainability", label: "Sustainability" },
    { href: "/blog", label: "Journal" },
  ],
  support: [
    { href: "/faq", label: "FAQ" },
    { href: "/shipping", label: "Shipping & Returns" },
    { href: "/size-guide", label: "Size Guide" },
    { href: "/contact", label: "Contact Us" },
    { href: "/track-order", label: "Track Order" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
};

const socialLinks = [
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center">
                <span className="text-gray-900 font-black text-sm">B</span>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Bandage
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Premium fashion crafted for those who appreciate quality, style,
              and timeless elegance. Elevate your wardrobe with Bandage.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 shrink-0" />
                <span>hello@bandagestore.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>123 Fashion St, New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex flex-col gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                >
                  <div className="h-8 w-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} Bandage Store. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs">We accept:</span>
            {["Visa", "MC", "Amex", "PayPal"].map((card) => (
              <div
                key={card}
                className="h-6 px-2 rounded bg-gray-800 text-[10px] font-medium flex items-center text-gray-300"
              >
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
