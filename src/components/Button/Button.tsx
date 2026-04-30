import type { FC } from "react";
import type { ButtonProps } from "./Button.data";
import { buttonVariants, sizes, baseStyles } from "./Button.data";
import cn from "../../libs/clsx";

const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "default",
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        baseStyles,
        buttonVariants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
