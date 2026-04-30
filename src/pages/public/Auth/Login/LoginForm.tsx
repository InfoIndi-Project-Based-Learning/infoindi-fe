import { Controller } from "react-hook-form";
import useLoginForm from "../../../../hooks/auth/useLoginForm";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    isLoading,
    onSubmit,
    handleShowPassword,
    showPassword,
  } = useLoginForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full">
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <Input
            label="EMAIL"
            onChange={field.onChange}
            placeholder="Enter your email"
            value={field.value}
            prefixIcon={Mail}
            error={fieldState.error?.message}
            required
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <Input
            label="PASSWORD"
            type={showPassword ? "text" : "password"}
            onChange={field.onChange}
            placeholder="*********"
            value={field.value}
            prefixIcon={LockKeyhole}
            error={fieldState.error?.message}
            onClickSuffixIcon={handleShowPassword}
            suffixIcon={!showPassword ? Eye : EyeOff}
            required
          />
        )}
      />
      <Button disabled={isLoading} className="w-full" type="submit" size="lg">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
