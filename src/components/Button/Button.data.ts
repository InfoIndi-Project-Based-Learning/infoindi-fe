export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const buttonVariants = {
  primary: "bg-black hover:bg-gray-800 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
};
