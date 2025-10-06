interface ModalBodyProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ModalBody({ children, className }: ModalBodyProps) {
  
  return <div className={`mb-4 ${className}`}>{children}</div>;
}
