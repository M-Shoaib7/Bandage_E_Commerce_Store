"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-gray-950 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="h-7 w-7 text-amber-300" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-white/60 mb-8">
            Subscribe to our newsletter for exclusive offers, early access to
            new collections, and style inspiration delivered to your inbox.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 text-emerald-400 py-4"
            >
              <CheckCircle2 className="h-6 w-6" />
              <p className="font-semibold">
                You&apos;re subscribed! Welcome to the Bandage community.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="h-12 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30"
              />
              <Button
                type="submit"
                size="lg"
                className="rounded-full bg-white text-gray-900 hover:bg-gray-100 shrink-0 font-semibold px-6"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          )}
          <p className="text-white/40 text-xs mt-4">
            No spam, ever. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
