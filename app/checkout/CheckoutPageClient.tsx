"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  CreditCard,
  Lock,
  ChevronRight,
  CheckCircle2,
  User,
  MapPin,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn, formatPrice, generateOrderId } from "@/lib/utils";
import Link from "next/link";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter your full address"),
  city: z.string().min(2, "Please enter your city"),
  state: z.string().min(2, "Please enter your state"),
  postalCode: z.string().min(4, "Please enter a valid postal code"),
  country: z.string().min(2, "Please select your country"),
  cardNumber: z
    .string()
    .min(16, "Card number must be 16 digits")
    .max(19, "Invalid card number"),
  cardExpiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Use MM/YY format"),
  cardCvc: z
    .string()
    .min(3, "CVC must be 3-4 digits")
    .max(4, "CVC must be 3-4 digits"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const steps = ["Shipping", "Payment", "Review"];

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function CheckoutPageClient() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const handleNextStep = async () => {
    const fields =
      step === 0
        ? (["firstName", "lastName", "email", "phone", "address", "city", "state", "postalCode", "country"] as const)
        : (["cardNumber", "cardExpiry", "cardCvc"] as const);

    const valid = await trigger(fields);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));

    const orderId = generateOrderId();
    clearCart();
    router.push(`/order-success?orderId=${orderId}&total=${total.toFixed(2)}`);
  };

  if (items.length === 0 && step === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Button asChild>
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-lg bg-gray-900 flex items-center justify-center">
              <span className="text-white font-black text-sm">B</span>
            </div>
            <span className="text-xl font-black tracking-tight">Bandage</span>
          </Link>

          {/* Steps */}
          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      i < step
                        ? "bg-emerald-500 text-white"
                        : i === step
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                  </div>
                  <span
                    className={`text-sm font-medium hidden sm:block ${
                      i === step ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Step 0: Shipping */}
              {step === 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">Contact & Shipping</h2>
                      <p className="text-sm text-muted-foreground">
                        Where should we send your order?
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="First Name"
                      error={errors.firstName?.message}
                      required
                    >
                      <Input
                        {...register("firstName")}
                        placeholder="John"
                        className={errors.firstName ? "border-red-400" : ""}
                      />
                    </FormField>
                    <FormField
                      label="Last Name"
                      error={errors.lastName?.message}
                      required
                    >
                      <Input
                        {...register("lastName")}
                        placeholder="Doe"
                        className={errors.lastName ? "border-red-400" : ""}
                      />
                    </FormField>
                    <FormField
                      label="Email"
                      error={errors.email?.message}
                      required
                    >
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="john@example.com"
                        className={cn(
                          errors.email ? "border-red-400" : "",
                          "col-span-2"
                        )}
                      />
                    </FormField>
                    <FormField
                      label="Phone"
                      error={errors.phone?.message}
                      required
                    >
                      <Input
                        {...register("phone")}
                        placeholder="+1 (555) 000-0000"
                        className={errors.phone ? "border-red-400" : ""}
                      />
                    </FormField>
                    <div className="col-span-2">
                      <FormField
                        label="Address"
                        error={errors.address?.message}
                        required
                      >
                        <Input
                          {...register("address")}
                          placeholder="123 Main Street, Apt 4B"
                          className={errors.address ? "border-red-400" : ""}
                        />
                      </FormField>
                    </div>
                    <FormField
                      label="City"
                      error={errors.city?.message}
                      required
                    >
                      <Input
                        {...register("city")}
                        placeholder="New York"
                        className={errors.city ? "border-red-400" : ""}
                      />
                    </FormField>
                    <FormField
                      label="State"
                      error={errors.state?.message}
                      required
                    >
                      <Input
                        {...register("state")}
                        placeholder="NY"
                        className={errors.state ? "border-red-400" : ""}
                      />
                    </FormField>
                    <FormField
                      label="Postal Code"
                      error={errors.postalCode?.message}
                      required
                    >
                      <Input
                        {...register("postalCode")}
                        placeholder="10001"
                        className={errors.postalCode ? "border-red-400" : ""}
                      />
                    </FormField>
                    <FormField
                      label="Country"
                      error={errors.country?.message}
                      required
                    >
                      <Input
                        {...register("country")}
                        placeholder="United States"
                        className={errors.country ? "border-red-400" : ""}
                      />
                    </FormField>
                  </div>

                  <Button
                    type="button"
                    size="lg"
                    className="w-full mt-6 rounded-xl"
                    onClick={handleNextStep}
                  >
                    Continue to Payment
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}

              {/* Step 1: Payment */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">Payment Details</h2>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Lock className="h-3.5 w-3.5" />
                        Secured by SSL encryption
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      label="Card Number"
                      error={errors.cardNumber?.message}
                      required
                    >
                      <Input
                        {...register("cardNumber")}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={errors.cardNumber ? "border-red-400" : ""}
                      />
                    </FormField>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="Expiry Date"
                        error={errors.cardExpiry?.message}
                        required
                      >
                        <Input
                          {...register("cardExpiry")}
                          placeholder="MM/YY"
                          maxLength={5}
                          className={errors.cardExpiry ? "border-red-400" : ""}
                        />
                      </FormField>
                      <FormField
                        label="CVC"
                        error={errors.cardCvc?.message}
                        required
                      >
                        <Input
                          {...register("cardCvc")}
                          placeholder="123"
                          maxLength={4}
                          className={errors.cardCvc ? "border-red-400" : ""}
                        />
                      </FormField>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="flex-1 rounded-xl"
                      onClick={() => setStep(0)}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      size="lg"
                      className="flex-1 rounded-xl"
                      onClick={handleNextStep}
                    >
                      Review Order
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Review */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">Review Your Order</h2>
                      <p className="text-sm text-muted-foreground">
                        Please confirm all details before placing your order
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedSize}`}
                        className="flex gap-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="relative w-14 h-16 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm line-clamp-1">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.selectedSize} • {item.selectedColor.name} • Qty: {item.quantity}
                          </p>
                          <p className="font-semibold text-sm mt-1">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="flex-1 rounded-xl"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        <>
                          <Lock className="h-4 w-4" />
                          Place Order — {formatPrice(total)}
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex items-center gap-3"
                    >
                      <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                        <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-gray-700 text-white text-[10px] font-bold flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.selectedSize}
                        </p>
                      </div>
                      <span className="text-sm font-semibold shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-emerald-600">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-base pt-1">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

