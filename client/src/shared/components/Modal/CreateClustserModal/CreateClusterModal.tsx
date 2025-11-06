"use client";

import { useRef } from "react";
import NormalInput from "../../Input/NormalInput";
import Button from "../../Button";
import Modal from "../Modal";
import ModalContent from "../ModalContent";
import ModalHeader from "../ModalHeader";
import ModalBody from "../ModalBody";
import ModalFooter from "../ModalFooter";
import { useCreateCluster } from "@/shared/hook/useCreateCluster";

interface CreateClusterModalProps {
  isOpenModal: boolean;
  handleToggleModal: () => void;
}

export default function CreateClusterModal({
  isOpenModal,
  handleToggleModal,
}: CreateClusterModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { handleCreateCluster } = useCreateCluster();

  return (
    <Modal isOpen={isOpenModal} onClose={handleToggleModal} size="md">
      <ModalContent>
        <ModalHeader>
          <div className="text-center font-normal">
            <h1 className="font-serif mb-3">New Cluster</h1>
            <p className="text-sm mb-3">A colection of elements</p>
          </div>
        </ModalHeader>
        <ModalBody>
          <NormalInput
            inputClassName="!bg-gray-neutral-300 my-5"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (inputRef.current) {
                  handleCreateCluster(inputRef.current.value);
                }
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
            onClick={() => {
              if (inputRef.current) {
                handleCreateCluster(inputRef.current.value);
              }
            }}
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
