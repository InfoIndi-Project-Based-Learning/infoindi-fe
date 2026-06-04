import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/features/auth/hooks/use-auth-store";
import type { User } from "../../user/types/user-type";
import api from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, RefreshCw, LogOut, ArrowRight, GraduationCap, CheckCircle2 } from "lucide-react";

export function VerifyEmailPage() {
  const { user, token, setAuth, removeAuth } = useAuthStore();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // Redirect if already verified
  useEffect(() => {
    if (user?.email_verified_at) {
      navigate("/dashboard", { replace: true });
    }
    
    if (!user) {
      navigate("/auth/login", { replace: true });
    }
  }, [user, navigate]);

  const handleResend = async () => {
    setIsSending(true);
    try {
      await api.post("/auth/email/verification-notification", {});
      toast.success("Link verifikasi baru telah dikirim ke email UB Anda!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal mengirim link verifikasi.");
    } finally {
      setIsSending(false);
    }
  };

  const handleCheckVerification = async () => {
    setIsChecking(true);
    try {
      const response = await api.get<User>("/auth/me");
      const updatedUser = response.data;
      
      if (updatedUser.email_verified_at) {
        setAuth(token, updatedUser);
        toast.success("Email Anda telah berhasil diverifikasi!");
        
        // Check profile completion to route correctly
        if (!updatedUser.is_profile_complete && updatedUser.role === "user") {
          navigate("/settings", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      } else {
        toast.error("Email Anda belum diverifikasi. Silakan periksa inbox atau folder spam email UB Anda.");
      }
    } catch (err: any) {
      toast.error("Gagal memeriksa status verifikasi.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleLogout = () => {
    removeAuth();
    toast.success("Berhasil keluar.");
    navigate("/auth/login", { replace: true });
  };

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
            Verifikasi Email Kampus Anda
          </h2>
          <p className="text-sm text-gray-500 font-normal leading-relaxed max-w-xs mx-auto">
            Satu langkah lagi untuk bergabung ke ekosistem eksklusif mahasiswa di Indonesia.
          </p>
        </div>

        <Card className="border border-slate-100/80 shadow-2xl shadow-slate-200/50 bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden">
          <CardContent className="p-6 md:p-8 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 border border-blue-100 text-blue-600 animate-pulse">
              <Mail className="w-8 h-8" />
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-600 leading-relaxed">
                Kami telah mengirimkan tautan verifikasi ke email:
              </p>
              <div className="bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl inline-block font-semibold text-gray-800 text-sm tracking-wide">
                {user?.email}
              </div>
              <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed pt-1">
                Silakan klik tombol dalam email tersebut untuk memverifikasi akun Anda. Periksa folder <strong>Spam</strong> atau <strong>Promosi</strong> jika tidak ada di Inbox.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Button
                onClick={handleCheckVerification}
                disabled={isChecking}
                className="w-full gap-2 rounded-xl h-11 font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.01]"
              >
                {isChecking ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Memeriksa...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Saya Sudah Verifikasi
                  </>
                )}
              </Button>

              <Button
                onClick={handleResend}
                disabled={isSending}
                variant="outline"
                className="w-full gap-2 rounded-xl h-11 font-semibold border-slate-200 text-gray-700 hover:bg-slate-50 transition-all hover:scale-[1.01]"
              >
                {isSending ? "Mengirim ulang..." : "Kirim Ulang Link Verifikasi"}
              </Button>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-3 text-slate-300 text-[10px] uppercase tracking-wider font-semibold">Atau</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 hover:text-rose-600 hover:underline transition-all mx-auto"
            >
              <LogOut className="w-3.5 h-3.5" />
              Keluar / Gunakan Email Lain
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
