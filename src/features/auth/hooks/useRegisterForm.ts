import { useForm } from "react-hook-form";
import useAuthMutation from "./use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema/auth-schema";
import type { RegisterType } from "../types/auth-type";

const useRegisterForm = () => {
  const { register } = useAuthMutation();
  const {
    control,
    formState: { isLoading },
    handleSubmit,
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = (data: RegisterType) => {
    register.mutate(data);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
  };
};

export default useRegisterForm;
