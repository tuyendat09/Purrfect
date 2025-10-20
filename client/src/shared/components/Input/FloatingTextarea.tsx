import { clsx } from "clsx";

// Props for the FloatingInput component, extending all standard input attributes
interface FloatingTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  errorMessage?: string;
  classNames?: string;
  clearBackground?: boolean;
}

export default function FloatingTextarea({
  name,
  label,
  errorMessage,
  classNames = "",
  clearBackground = false,
  ...inputProps // Accepts all other input props
}: FloatingTextareaProps) {
  return (
    <div className={`relative mb-4 ${classNames}`}>
      {errorMessage && (
        <p className="text-red-500 text-sm mb-1">{errorMessage}</p>
      )}
      <textarea
        cols={10}
        rows={4}
        id={name}
        placeholder=" "
        name={name}
        className={clsx(
          clearBackground
            ? "border-gray-neutral-400 border text-black"
            : "bg-[#1d1d1d] text-white",
          `peer block w-full rounded-2xl  px-6 py-5 text-sm border-gray-300 appearance-none focus:outline-none focus:ring-0 resize-none`
        )}
        {...inputProps}
      />
      <label
        htmlFor={name}
        className="absolute text-sm text-[#aaaaaa] duration-300 transform scale-75 cursor-text -translate-y-4 top-5 z-0 origin-[0] start-6
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          peer-[&:not(:placeholder-shown)]:scale-75
          peer-[&:not(:placeholder-shown)]:-translate-y-4"
      >
        {label}
      </label>
    </div>
  );
}
