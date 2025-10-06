interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function ModalContent({
  children,
  className,
}: ModalContentProps) {
  return <div className={className}>{children}</div>;
}
