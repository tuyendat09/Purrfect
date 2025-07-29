interface ModalBodyProps {
  children?: React.ReactNode;
}

export default function ModalBody({ children }: ModalBodyProps) {
  console.log("modal body render");
  return <div className="mb-4">{children}</div>;
}
