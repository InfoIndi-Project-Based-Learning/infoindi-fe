import type { InputProps } from "./Input.data";

const Input = ({ label, type, error, placeholder, ...props }: InputProps) => {
  return (
    <div className="space-y-1 ">
      <label className="text-sm font-semibold block">{label}</label>
      <input
        type={type || "text"}
        placeholder={placeholder}
        className="block w-full bg-[#F3F0FF] border border-gray-200  px-4 py-1.5 placeholder:text-xs focus:outline-none rounded-3xl"
        {...props}
      />
      <p className="text-xs text-red-500 italic">{error}</p>
    </div>
  );
};

export default Input;
