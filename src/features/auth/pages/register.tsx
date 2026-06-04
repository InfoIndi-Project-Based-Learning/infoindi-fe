import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "@/features/auth/hooks/use-auth";
import { registerSchema } from "../schema/auth-schema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterType } from "../types/auth-type";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, GraduationCap, ArrowLeft, Eye, EyeOff, Check, Sparkles, Store, Trophy, Briefcase, Loader2 } from "lucide-react";
import api from "@/lib/api";

export function RegisterPage() {
  const { register: registerMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      const res = await api.get<{ url: string }>("/auth/google/redirect");
      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Google login failed", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const { control, handleSubmit, watch } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const passwordValue = watch("password", "");

  // Real-time password validation criteria
  const hasMinLength = passwordValue.length >= 8;
  const hasUppercase = /[A-Z]/.test(passwordValue);
  const hasNumber = /\d/.test(passwordValue);
  const hasSymbol = /[@$!%*?&#]/.test(passwordValue);

  const criteriaMetCount = [hasMinLength, hasUppercase, hasNumber, hasSymbol].filter(Boolean).length;
  const strengthPercentage = passwordValue ? (criteriaMetCount / 4) * 100 : 0;

  const getStrengthConfig = () => {
    if (!passwordValue) return { label: "Belum diisi", color: "bg-slate-200", textColor: "text-slate-400" };
    if (criteriaMetCount === 1) return { label: "Sangat Lemah", color: "bg-rose-500", textColor: "text-rose-500" };
    if (criteriaMetCount === 2) return { label: "Lemah", color: "bg-rose-400", textColor: "text-rose-400" };
    if (criteriaMetCount === 3) return { label: "Cukup Aman", color: "bg-amber-500", textColor: "text-amber-500" };
    return { label: "Sangat Kuat", color: "bg-emerald-500", textColor: "text-emerald-500" };
  };

  const strength = getStrengthConfig();

  const onSubmit = (data: RegisterType) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
      {/* Back Button for mobile */}
      <div className="lg:hidden absolute top-4 left-4 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 bg-white/90 backdrop-blur-sm px-3.5 py-2 rounded-xl shadow-sm border border-slate-100 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Beranda
        </Link>
      </div>

      {/* Left Panel - Hero/Illustration (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[50%] bg-gradient-to-br from-blue-600 via-indigo-900 to-purple-950 p-12 text-white flex-col justify-between relative overflow-hidden shrink-0">
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-blue-500/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-purple-500/20 blur-[100px] pointer-events-none" />

        {/* Top Header of Left Panel */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/">
            <img src="/logo-white.png" alt="InfoIndi" className="h-10 w-auto hover:opacity-90 transition-opacity" />
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 shadow-inner"
          >
            <ArrowLeft className="w-4 h-4 text-amber-300" />
            Kembali
          </Link>
        </div>

        {/* Welcome Section */}
        <div className="relative z-10 my-auto py-12 space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3 h-3" /> Eksklusif Mahasiswa
            </div>
            <h2 className="text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight max-w-xl">
              Gabung Sekarang, <br />
              Temukan <span className="text-amber-300">Ekosistem Kampusmu</span>.
            </h2>
            <p className="text-slate-200/90 font-light text-base max-w-lg leading-relaxed">
              Jadilah bagian dari jaringan mahasiswa di InfoIndi. Mulai tawarkan jasa kreatifmu, jual produk bermanfaat, atau cari info lomba bergengsi.
            </p>
          </div>
        </div>

        {/* Brand Footer */}
        <div className="relative z-10 text-xs text-slate-400 border-t border-white/10 pt-6 flex justify-between items-center">
          <span>&copy; {new Date().getFullYear()} InfoIndi UB. All rights reserved.</span>
          <Link to="/" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
        </div>
      </div>

      {/* Right Panel - Form Container */}
      <div className="w-full lg:w-[55%] xl:w-[50%] flex items-center justify-center p-6 md:p-8 min-h-screen relative">

        {/* Centralized Card */}
        <div className="w-full max-w-md space-y-6 my-4">
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-4 lg:hidden">
              <img src="/logo-primary.png" alt="InfoIndi" className="h-12 w-auto" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Daftar Akun Baru
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-normal leading-relaxed">
              Silakan isi formulir di bawah ini menggunakan alamat email Anda untuk membuat akun Anda.
            </p>
          </div>

          <Card className="border border-slate-100 shadow-xl shadow-slate-100/50 bg-white rounded-2xl overflow-hidden">
            <CardContent className="p-6 md:p-7">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Controller
                  name="username"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <Label htmlFor="username" className="font-semibold text-gray-700">Username</Label>
                      <Input
                        {...field}
                        id="username"
                        type="text"
                        placeholder="Username"
                        className="rounded-xl border-slate-200 px-4 py-3 h-11 focus:ring-2 focus:ring-blue-500/20"
                      />
                      {fieldState.error && (
                        <p className="text-red-500 text-xs font-semibold mt-1 flex items-center gap-1">
                          <span>&bull;</span> {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-semibold text-gray-700">Email Kampus</Label>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="nama.anda@example.com"
                        className="rounded-xl border-slate-200 px-4 py-3 h-11 focus:ring-2 focus:ring-blue-500/20"
                      />
                      {fieldState.error && (
                        <p className="text-red-500 text-xs font-semibold mt-1 flex items-center gap-1">
                          <span>&bull;</span> {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <Label htmlFor="password" className="font-semibold text-gray-700">Password</Label>
                      <div className="relative">
                        <Input
                          {...field}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="rounded-xl border-slate-200 pl-4 pr-11 py-3 h-11 focus:ring-2 focus:ring-blue-500/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                        </button>
                      </div>

                      {/* Password Validation Live Checklist */}
                      {passwordValue && (
                        <div className="mt-3 space-y-2.5 p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="flex items-center justify-between text-xs font-semibold mb-1">
                            <span className="text-gray-500">Kekuatan Password:</span>
                            <span className={strength.textColor}>{strength.label}</span>
                          </div>
                          
                          {/* Progress bar */}
                          <div className="h-1.5 w-full bg-slate-200/70 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${strength.color} transition-all duration-500`}
                              style={{ width: `${strengthPercentage}%` }}
                            />
                          </div>

                          {/* Checklist items */}
                          <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs pt-1.5 border-t border-slate-200/50 mt-1">
                            <div className="flex items-center gap-1.5">
                              {hasMinLength ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3.5] shrink-0" />
                              ) : (
                                <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 shrink-0" />
                              )}
                              <span className={hasMinLength ? "text-emerald-700 font-semibold" : "text-gray-500"}>Min. 8 Karakter</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {hasUppercase ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3.5] shrink-0" />
                              ) : (
                                <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 shrink-0" />
                              )}
                              <span className={hasUppercase ? "text-emerald-700 font-semibold" : "text-gray-500"}>Huruf Kapital</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {hasNumber ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3.5] shrink-0" />
                              ) : (
                                <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 shrink-0" />
                              )}
                              <span className={hasNumber ? "text-emerald-700 font-semibold" : "text-gray-500"}>Ada Angka</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {hasSymbol ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3.5] shrink-0" />
                              ) : (
                                <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 shrink-0" />
                              )}
                              <span className={hasSymbol ? "text-emerald-700 font-semibold" : "text-gray-500"}>Ada Simbol</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {fieldState.error && (
                        <p className="text-red-500 text-xs font-semibold mt-1 flex items-center gap-1">
                          <span>&bull;</span> {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="password_confirmation"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <Label htmlFor="passwordConfirmation" className="font-semibold text-gray-700">
                        Konfirmasi Password
                      </Label>
                      <div className="relative">
                        <Input
                          {...field}
                          id="passwordConfirmation"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="rounded-xl border-slate-200 pl-4 pr-11 py-3 h-11 focus:ring-2 focus:ring-blue-500/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                        </button>
                      </div>
                      {fieldState.error && (
                        <p className="text-red-500 text-xs font-semibold mt-1 flex items-center gap-1">
                          <span>&bull;</span> {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full gap-2 rounded-xl h-11 font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.01] mt-2"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? (
                    <>Mendaftar...</>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      Daftar Sekarang
                    </>
                  )}
                </Button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-100"></div>
                  <span className="flex-shrink mx-3 text-slate-400 text-[10px] uppercase tracking-wider font-semibold">Atau</span>
                  <div className="flex-grow border-t border-slate-100"></div>
                </div>

                <Button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isGoogleLoading}
                  className="w-full gap-2 rounded-xl h-11 font-semibold bg-white border border-slate-200 text-gray-700 hover:bg-slate-50/80 shadow-sm transition-all hover:scale-[1.01] flex items-center justify-center"
                >
                  {isGoogleLoading ? (
                    <Loader2 className="w-4.5 h-4.5 animate-spin text-gray-500" />
                  ) : (
                    <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.642 1.09 14.99 0 12 0 7.354 0 3.307 2.667 1.284 6.56l3.982 3.205z"
                      />
                      <path
                        fill="#4285F4"
                        d="M23.455 12.273c0-.818-.073-1.609-.209-2.373H12v4.5h6.427c-.277 1.455-1.1 2.69-2.336 3.527l3.627 2.818c2.127-1.963 3.355-4.854 3.355-8.472z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.266 14.235A7.077 7.077 0 0 1 4.909 12c0-.79.136-1.55.357-2.265L1.284 6.53A11.934 11.934 0 0 0 0 12c0 2.01.5 3.904 1.382 5.57l3.884-3.335z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.955-1.077 7.94-2.918l-3.627-2.818c-1.005.673-2.29 1.073-3.832 1.073-2.954 0-5.46-1.996-6.355-4.673L2.144 17.89C4.167 21.78 8.214 24 12 24z"
                      />
                    </svg>
                  )}
                  Daftar dengan Google
                </Button>
              </form>

              <div className="mt-6 border-t border-slate-100 pt-4 text-center text-sm text-gray-600">
                Sudah punya akun?{" "}
                <Link to="/auth/login" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                  Masuk di sini
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
