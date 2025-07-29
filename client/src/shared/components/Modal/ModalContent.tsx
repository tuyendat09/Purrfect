import { ModalContext } from "./ModalContext";

export default function ModalContent({
  children,
}: {
  children: (onClose: () => void) => React.ReactNode;
}) {
  console.log("modal content render");
  return (
    <ModalContext.Provider
      value={{
        onClose: () => window.dispatchEvent(new CustomEvent("modal-close")),
      }}
    >
      {children(() => window.dispatchEvent(new CustomEvent("modal-close")))}
    </ModalContext.Provider>
  );
}
