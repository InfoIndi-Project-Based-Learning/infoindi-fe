import type { LucideIcon } from "lucide-react";
import type { InputProps } from "./Input.data";
import cn from "../../libs/clsx";

const Input = ({
  label,
  type,
  error,
  prefixIcon,
  suffixIcon,
  onClickPrefixIcon,
  onClickSuffixIcon,
  placeholder,
  required,
  ...props
}: InputProps) => {
  const PrefixIconComponent = prefixIcon;
  const SuffixIconComponent = suffixIcon;
  return (
    <div className="space-y-1 ">
      <label className="text-sm font-semibold block">
        {label} {required && <span className="text-red-500 text-xs">*</span>}
      </label>
      <div className="relative">
        {PrefixIconComponent && (
          <PrefixIconComponent
            size={18}
            onClick={onClickPrefixIcon}
            className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#BCA4D2]"
          />
        )}
        {SuffixIconComponent && (
          <SuffixIconComponent
            size={18}
            onClick={onClickSuffixIcon}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#BCA4D2]"
          />
        )}
        <input
          type={type || "text"}
          placeholder={placeholder}
          className={cn(
            "block w-full bg-[#F3F0FF] border border-gray-200   py-2 placeholder:text-xs placeholder:text-[#BCA4D2] focus:outline-none rounded-3xl",
            PrefixIconComponent ? "pl-10" : "pl-4",
            SuffixIconComponent ? "pr-10" : "pr-4",
          )}
          {...props}
        />
      </div>
      <p className="text-xs text-red-500 italic">{error}</p>
    </div>
  );
};

export default Input;
