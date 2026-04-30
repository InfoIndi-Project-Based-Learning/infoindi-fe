export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "outline";
  size?: "sm" | "default" | "lg";
}

export const buttonVariants = {
  primary: "bg-black hover:bg-gray-800 text-white px-2 ",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 ",
  destructive: "bg-red-500 hover:bg-red-400 text-white",
  outline: "border border-gray-800 text-gray-800 hover:bg-gray-100 bg-white",
};

export const baseStyles =
  "inline-flex gap-2 justify-center items-center font-semibold cursor-pointer rounded-md";

export const sizes = {
  sm: "px-2 py-1 text-sm",
  default: "px-3 py-1.5",
  lg: "px-4 py-2",
};
