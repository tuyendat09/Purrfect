import { lazy, useRef } from "react";
import NormalInput from "../../Input/NormalInput";
import Button from "../../Button";

import useToggle from "@/shared/hook/useToggle";
const Modal = lazy(() => import("@/shared/components/Modal/Modal"));
const ModalContent = lazy(
  () => import("@/shared/components/Modal/ModalContent")
);
const ModalBody = lazy(() => import("@/shared/components/Modal/ModalBody"));
const ModalFooter = lazy(() => import("@/shared/components/Modal/ModalFooter"));
const ModalHeader = lazy(() => import("@/shared/components/Modal/ModalHeader"));

interface CreateClusterModalProps {
  children: React.ReactNode;
}

export default function CreateClusterModal({
  children,
}: CreateClusterModalProps) {
  const { toggle, handleToggle } = useToggle();
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleAsyncImportCreateCluster() {
    const { handleCreateCluster } = await import(
      "@/shared/utils/handleCreateCluster"
    );
    if (inputRef.current) {
      handleCreateCluster(inputRef.current.value);
    }
  }
  return (
    <>
      <div onClick={() => handleToggle()}>{children}</div>
      {toggle && (
        <Modal isOpen={toggle} onClose={handleToggle} size="md">
          <ModalContent>
            <ModalHeader>
              <div className="text-center font-normal">
                <h1 className="font-serif">New Cluster</h1>
                <p className="text-sm">A colection of elements</p>
              </div>
            </ModalHeader>
            <ModalBody>
              <NormalInput
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAsyncImportCreateCluster();
                  }
                }}
                ref={inputRef}
                borderRadius="full"
                placeholder="Cluster name"
                name="cluster-name"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={handleAsyncImportCreateCluster}
                fullWidth
                size="lg"
                variant="black"
              >
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
