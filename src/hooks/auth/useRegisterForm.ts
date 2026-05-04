import { useForm } from "react-hook-form";
import useAuthMutation from "./useAuthMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../libs/zod/authValidation";
import type { RegisterType } from "../../types/auth";

const useRegisterForm = () => {
  const { register } = useAuthMutation();
  const {
    control,
    formState: { isLoading },
    handleSubmit,
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
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
