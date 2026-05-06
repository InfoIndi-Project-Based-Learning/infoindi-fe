import { Controller } from "react-hook-form";
import useRegisterForm from "../../../../hooks/auth/useRegisterForm";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";

const RegisterForm = () => {
  const { control, handleSubmit, isLoading, onSubmit } = useRegisterForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full">
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <Input
            placeholder="John Doe"
            onChange={field.onChange}
            value={field.value}
            error={fieldState.error?.message}
            label="FULLNAME"
            required
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <Input
            placeholder="john@example.com"
            onChange={field.onChange}
            value={field.value}
            error={fieldState.error?.message}
            label="EMAIL"
            required
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <Input
            placeholder="••••••••"
            onChange={field.onChange}
            value={field.value}
            error={fieldState.error?.message}
            label="PASSWORD"
            required
          />
        )}
      />
      <Controller
        control={control}
        name="password_confirmation"
        render={({ field, fieldState }) => (
          <Input
            placeholder="••••••••"
            onChange={field.onChange}
            value={field.value}
            error={fieldState.error?.message}
            label="CONFIRM PASSWORD"
            required
          />
        )}
      />
      <Button disabled={isLoading} className="w-full" type="submit" size="lg">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
