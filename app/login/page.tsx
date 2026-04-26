"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ArrowRight, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import type { Metadata } from "next";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Logged in successfully!", {
      description: `Welcome back, ${data.email}`,
    });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
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
            <h1 className="text-2xl font-black mb-1">Welcome back</h1>
            <p className="text-muted-foreground text-sm">
              Sign in to your Bandage account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`pl-9 pr-10 ${errors.password ? "border-red-400" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Signing in...
                </div>
              ) : (
                <>
                  Sign In
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
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right - Visual */}
      <div className="hidden lg:block flex-1 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/id_categories_cloth_image.jpg')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-900/40" />
        <div className="relative z-10 flex items-end h-full p-16">
          <div className="text-white">
            <h2 className="text-4xl font-black mb-4">
              Discover Your
              <br />
              Perfect Style
            </h2>
            <p className="text-white/70 max-w-xs">
              Join thousands of fashion enthusiasts who trust Bandage for their
              premium wardrobe needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
