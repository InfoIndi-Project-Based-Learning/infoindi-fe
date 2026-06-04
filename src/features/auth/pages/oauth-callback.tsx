import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "@/features/auth/hooks/use-auth-store";
import { Loader2 } from "lucide-react";
import api from "@/lib/api";
import type { User } from "@/features/user/types/user-type";

export function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const token = searchParams.get("token");
    
    if (token) {
      // Temporarily set token in Zustand so axios interceptor picks it up
      useAuthStore.setState({ token });
      
      // Fetch user profile
      api.get<User>("/auth/me")
        .then((res) => {
          if (res.data) {
            setAuth(token, res.data);
            navigate("/dashboard", { replace: true });
          } else {
            throw new Error("No user data returned");
          }
        })
        .catch(() => {
          navigate("/auth/login?error=oauth_failed", { replace: true });
        });
    } else {
      // No token in URL, redirect back to login
      navigate("/auth/login", { replace: true });
    }
  }, [searchParams, navigate, setAuth]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">Mengautentikasi...</h2>
          <p className="text-sm text-gray-500 mt-1">Mohon tunggu sebentar, kami sedang menyiapkan akun Anda.</p>
        </div>
      </div>
    </div>
  );
}
