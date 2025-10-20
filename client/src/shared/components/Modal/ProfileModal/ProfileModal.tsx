import Modal from "../Modal";
import ModalContent from "../ModalContent";
import ModalBody from "../ModalBody";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";
import useChangeContent from "./hook/useChangeContent";
import { useProfile } from "@/components/Root/_profile/store/ProfileContext";

interface ProfileModalProps {
  isOpenModal: boolean;
  handleToggleModal: () => void;
}
export default function ProfileModal({
  isOpenModal,
  handleToggleModal,
}: ProfileModalProps) {
  
  const user = useProfile();
  const { handleChangeContent, content } = useChangeContent();

  return (
    <Modal
      className="min-h-[580px] flex flex-col relative"
      isOpen={isOpenModal}
      onClose={handleToggleModal}
      size="xl"
    >
      <div className="absolute w-0.25 h-full bg-gray-neutral-400 top-0 left-[33%]" />
      <div className="absolute h-0.25 w-full bg-gray-neutral-400 bottom-[13%] right-0" />

      <ModalContent className="flex flex-col flex-grow">
        <ModalBody className="flex">
          <ProfileSidebar
            content={content}
            handleChangeContent={handleChangeContent}
            userProfilePicture={user?.profilePicture}
          />
          <ProfileContent contentState={content} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
