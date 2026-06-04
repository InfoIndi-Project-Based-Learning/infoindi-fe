import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import useAuthStore from "@/features/auth/hooks/use-auth-store";
import type { User } from "../../user/types/user-type";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle, ArrowRight, GraduationCap } from "lucide-react";

export function VerifyEmailHandlerPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuth, token } = useAuthStore();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const id = searchParams.get("id");
  const hash = searchParams.get("hash");
  const expires = searchParams.get("expires");
  const signature = searchParams.get("signature");

  useEffect(() => {
    const performVerification = async () => {
      if (!id || !hash || !expires || !signature) {
        setStatus("error");
        setErrorMessage("Link verifikasi tidak valid atau tidak lengkap.");
        return;
      }

      try {
        // Call backend verify route
        await api.get(`/auth/email/verify/${id}/${hash}`, {
          params: { expires, signature }
        });

        // Fetch updated user status
        const response = await api.get<User>("/auth/me");
        const updatedUser = response.data;

        // If logged in, update user in store
        if (token) {
          setAuth(token, updatedUser);
        }

        setStatus("success");
        toast.success("Email Anda berhasil diverifikasi!");
      } catch (err: any) {
        setStatus("error");
        setErrorMessage(
          err.response?.data?.message || "Tautan verifikasi salah atau telah kedaluwarsa."
        );
      }
    };

    performVerification();
  }, [id, hash, expires, signature, token, setAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-400/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="inline-flex justify-center mb-2">
            <div className="bg-blue-600/10 p-3 rounded-2xl border border-blue-600/20">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Verifikasi Email
          </h2>
        </div>

        <Card className="border border-slate-100/80 shadow-2xl shadow-slate-200/50 bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden">
          <CardContent className="p-6 md:p-8 text-center space-y-6">
            {status === "loading" && (
              <div className="space-y-4 py-4">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
                <h3 className="text-lg font-bold text-gray-800">Memproses Verifikasi</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                  Sedang memproses tautan verifikasi Anda dengan server. Mohon tunggu sebentar...
                </p>
              </div>
            )}

            {status === "success" && (
              <div className="space-y-5 py-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-800">Verifikasi Berhasil!</h3>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                    Selamat, email Anda telah diverifikasi. Sekarang Anda dapat menggunakan seluruh layanan InfoIndi.
                  </p>
                </div>
                <Button
                  onClick={() => navigate("/dashboard", { replace: true })}
                  className="w-full gap-2 rounded-xl h-11 font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01]"
                >
                  Masuk ke Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-5 py-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-50 border border-rose-100 text-rose-600">
                  <XCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-800">Verifikasi Gagal</h3>
                  <p className="text-xs text-rose-600 bg-rose-50 border border-rose-100/50 px-4 py-2.5 rounded-xl font-medium max-w-xs mx-auto leading-relaxed mt-2">
                    {errorMessage}
                  </p>
                </div>
                <Button
                  onClick={() => navigate("/auth/login", { replace: true })}
                  className="w-full gap-2 rounded-xl h-11 font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.01]"
                >
                  Kembali ke Login
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
