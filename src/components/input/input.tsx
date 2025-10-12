interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-[31.3rem] h-[3.4rem] border border-black rounded-[0.9rem] p-4 ${className}`}
    />
  );
}
