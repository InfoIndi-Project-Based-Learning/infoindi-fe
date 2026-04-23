import type { FC } from "react";
import type { ButtonProps } from "./Button.data";
import { buttonVariants } from "./Button.data";

const Button: FC<ButtonProps> = ({ variant = "primary", ...props }) => {
  <button className={buttonVariants[variant]} {...props}></button>;
};

export default Button;
