import { useMutation } from "@tanstack/react-query";
import { loginService, registerService } from "../services/auth-service";
import useAuthStore from "./use-auth-store";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/utils/getErrorMessage";
import api from "@/lib/api";

const useLoginMutation = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      // Support both backend formats: token or access_token
      const token = data.data.token || (data.data as any).access_token;
      const user = data.data.user;
      
      setAuth(token, user);
      toast.success("Login Berhasil!");
      
      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });
};

const useRegisterMutation = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerService,
    onSuccess: (data) => {
      const token = data.data.token || (data.data as any).access_token;
      const user = data.data.user;
      
      setAuth(token, user);
      toast.success("Register Berhasil!");
      
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });
};

const useLogoutMutation = () => {
  const { removeAuth } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      return api.post("/auth/logout", {});
    },
    onSuccess: () => {
      removeAuth();
      toast.success("Logout Berhasil!");
      navigate("/auth/login");
    },
    onError: () => {
      // Even if API logout fails, clear local session
      removeAuth();
      navigate("/auth/login");
    },
  });
};

const useAuth = () => {
  const login = useLoginMutation();
  const register = useRegisterMutation();
  const logout = useLogoutMutation();
  return { login, register, logout };
};

export default useAuth;

