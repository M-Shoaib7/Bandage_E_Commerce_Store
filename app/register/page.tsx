"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ArrowRight, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val, "You must accept the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { terms: false },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Account created successfully!", {
      description: `Welcome to Bandage, ${data.firstName}!`,
    });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Visual */}
      <div className="hidden lg:block flex-1 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=80')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-900/40" />
        <div className="relative z-10 flex items-end h-full p-16">
          <div className="text-white">
            <div className="flex gap-3 mb-8">
              {[
                { value: "120K+", label: "Happy customers" },
                { value: "4.9", label: "Average rating" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-black">{value}</div>
                  <div className="text-white/60 text-xs">{label}</div>
                </div>
              ))}
            </div>
            <h2 className="text-4xl font-black mb-4">
              Join the Bandage
              <br />
              Community
            </h2>
            <p className="text-white/70 max-w-xs">
              Get early access to new collections, exclusive member pricing, and
              personalized style recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-lg bg-gray-900 flex items-center justify-center">
              <span className="text-white font-black text-sm">B</span>
            </div>
            <span className="text-xl font-black tracking-tight">Bandage</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-black mb-1">Create account</h1>
            <p className="text-muted-foreground text-sm">
              Start your style journey with Bandage
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...register("firstName")}
                    placeholder="John"
                    className={`pl-9 ${errors.firstName ? "border-red-400" : ""}`}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-xs text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label>Last Name</Label>
                <Input
                  {...register("lastName")}
                  placeholder="Doe"
                  className={errors.lastName ? "border-red-400" : ""}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="john@example.com"
                  className={`pl-9 ${errors.email ? "border-red-400" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className={`pl-9 pr-10 ${errors.password ? "border-red-400" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Repeat your password"
                  className={`pl-9 ${errors.confirmPassword ? "border-red-400" : ""}`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={watch("terms")}
                onCheckedChange={(checked) =>
                  setValue("terms", checked as boolean)
                }
                className="mt-0.5"
              />
              <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-relaxed">
                I agree to the{" "}
                <Link href="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
            {errors.terms && (
              <p className="text-xs text-red-500">{errors.terms.message}</p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Creating account...
                </div>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-2 text-xs text-muted-foreground">
                or continue with
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {["Google", "Apple"].map((provider) => (
                <Button key={provider} variant="outline" className="rounded-xl">
                  {provider}
                </Button>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
