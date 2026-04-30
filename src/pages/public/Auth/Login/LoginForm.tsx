import { Controller } from "react-hook-form";
import useLoginForm from "../../../../hooks/auth/useLoginForm";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";

const LoginForm = () => {
  const { control, handleSubmit, isLoading, onSubmit } = useLoginForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-sm">
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <Input
            label="EMAIL"
            onChange={field.onChange}
            placeholder="Enter your email"
            value={field.value}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <Input
            label="PASSWORD"
            type="password"
            onChange={field.onChange}
            placeholder="*********"
            value={field.value}
            error={fieldState.error?.message}
          />
        )}
      />
      <Button disabled={isLoading} className="w-full" type="submit">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
