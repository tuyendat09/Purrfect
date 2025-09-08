import { useRef } from "react";
import NormalInput from "../../Input/NormalInput";
import Button from "../../Button";
import Modal from "../Modal";
import ModalContent from "../ModalContent";
import ModalHeader from "../ModalHeader";
import ModalBody from "../ModalBody";
import ModalFooter from "../ModalFooter";

interface CreateClusterModalProps {
  isOpenModal: boolean;
  handleToggleModal: () => void;
}

export default function CreateClusterModal({
  isOpenModal,
  handleToggleModal,
}: CreateClusterModalProps) {
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
    <Modal isOpen={isOpenModal} onClose={handleToggleModal} size="md">
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
  );
}
