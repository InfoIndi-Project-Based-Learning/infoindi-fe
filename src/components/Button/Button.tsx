import type { FC } from "react";
import type { ButtonProps } from "./Button.data";
import { buttonVariants, sizes, baseStyles } from "./Button.data";

const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "default",
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={`${baseStyles} ${sizes[size]} ${buttonVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
