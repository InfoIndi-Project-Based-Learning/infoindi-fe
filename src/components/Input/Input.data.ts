import type { LucideIcon } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefixIcon?: LucideIcon;
  suffixIcon?: LucideIcon;
  onClickPrefixIcon?: () => void;
  onClickSuffixIcon?: () => void;
}
