import Modal from "../Modal";
import ModalContent from "../ModalContent";
import ModalBody from "../ModalBody";
import Button from "../../Button";
import ModalFooter from "../ModalFooter";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";
import useChangeContent from "./hook/useChangeContent";

interface ProfileModalProps {
  isOpenModal: boolean;
  handleToggleModal: () => void;
  userProfilePicture?: string;
}
export default function ProfileModal({
  isOpenModal,
  handleToggleModal,
  userProfilePicture,
}: ProfileModalProps) {
  const { handleChangeContent, content } = useChangeContent();

  return (
    <Modal
      className="min-h-[580px] flex flex-col relative"
      isOpen={isOpenModal}
      onClose={handleToggleModal}
      size="xl"
    >
      <div className="absolute w-0.25 h-full bg-gray-neutral-400 top-0 left-[33%]" />
      <ModalContent className="flex flex-col flex-grow">
        <ModalBody className="flex">
          <ProfileSidebar
            handleChangeContent={handleChangeContent}
            userProfilePicture={userProfilePicture}
          />
          <ProfileContent contentState={content} />
        </ModalBody>
      </ModalContent>
      <ModalFooter>
        <Button variant="black" size="md">
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}
