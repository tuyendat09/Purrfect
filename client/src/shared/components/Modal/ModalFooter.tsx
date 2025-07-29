interface ModalFooterProps {
  children: React.ReactNode;
}

export default function ModalFooter({ children }: ModalFooterProps) {
  console.log("modal footer render");
  return <div className="flex justify-end gap-2">{children}</div>;
}
