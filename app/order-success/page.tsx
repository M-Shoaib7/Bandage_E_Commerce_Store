"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Package,
  Mail,
  ArrowRight,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-UNKNOWN";
  const total = searchParams.get("total") || "0.00";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-10 text-center text-white">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle2 className="h-10 w-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-black mb-2">Order Confirmed!</h1>
          <p className="text-emerald-100">
            Thank you for shopping with Bandage
          </p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* Order Details */}
          <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Package className="h-4 w-4" />
                <span className="text-sm">Order ID</span>
              </div>
              <span className="font-mono font-semibold text-sm">{orderId}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-sm">Total Paid</span>
              </div>
              <span className="font-bold text-lg">${total}</span>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {[
              {
                icon: Mail,
                text: "Confirmation email sent to your inbox",
                done: true,
              },
              {
                icon: Package,
                text: "Your order is being processed",
                done: false,
              },
              { icon: ArrowRight, text: "Estimated delivery: 5-7 days", done: false },
            ].map(({ icon: Icon, text, done }) => (
              <div key={text} className="flex items-center gap-3">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                    done ? "bg-emerald-100" : "bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      done ? "text-emerald-600" : "text-muted-foreground"
                    }`}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-2">
            <Button size="lg" className="rounded-xl w-full" asChild>
              <Link href="/shop">
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl w-full"
              asChild
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
