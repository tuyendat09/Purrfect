import Logo from "@/shared/components/Logo";

interface FormHeaderProps {
  logo?: boolean;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function FormHeader({
  logo,
  title,
  subtitle,
  className,
}: FormHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      {logo && <Logo className="size-12 mx-auto" />}
      <h3 className="font-serif text-2xl mt-4 mb-2">{title}</h3>
      {subtitle && <p className="text-sm text-gray-neutral-400">{subtitle}</p>}
    </div>
  );
}
