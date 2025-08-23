interface ModalBodyProps {
  children?: React.ReactNode;
}

export default function ModalBody({ children }: ModalBodyProps) {
  return <div className="mb-4">{children}</div>;
}
