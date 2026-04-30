import { useMutation } from "@tanstack/react-query";
import { loginService, registerService } from "../../services/authService";
import useAuthStore from "./useAuthStore";

const useLoginMutation = () => {
  const { setAuth } = useAuthStore();
  return useMutation({
    mutationFn: loginService,
    onSuccess: (res) => {
      const {
        data: { user, access_token },
      } = res;
      setAuth(access_token, user);
      window.location.href = "/";
    },
    onError: (err) => console.log(err),
  });
};

const useRegisterMutation = () => {
  const { setAuth } = useAuthStore();
  return useMutation({
    mutationFn: registerService,
    onSuccess: (res) => {
      const {
        data: { user, access_token },
      } = res;
      setAuth(access_token, user);
      window.location.href = "/";
    },
    onError: (err) => console.log(err),
  });
};

const useAuthMutation = () => {
  const login = useLoginMutation();
  const register = useRegisterMutation();
  return { login, register };
};

export default useAuthMutation;
