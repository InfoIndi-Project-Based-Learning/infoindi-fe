import { useForm } from "react-hook-form";
import type { LoginType } from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../libs/zod/authValidation";
import useAuthMutation from "./useAuthMutation";

const useLoginForm = () => {
  const { login } = useAuthMutation();
  const {
    control,
    formState: { isLoading },
    handleSubmit,
    register,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginType) => {
    login.mutate(data);
  };

  return {
    control,
    isLoading,
    handleSubmit,
    onSubmit,
    register,
  };
};

export default useLoginForm;
