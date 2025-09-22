import Modal from "../Modal";
import ModalContent from "../ModalContent";
import ModalBody from "../ModalBody";
import UserProfilePicture from "../../User/UserProfilePicutre";
import NormalInput from "../../Input/NormalInput";

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
  return (
    <Modal isOpen={isOpenModal} onClose={handleToggleModal} size="xl">
      <ModalContent>
        <ModalBody>
          <div>
            <div className="flex">
              <div className="shrink-0 gap-4 min-w-[180px] max-w-[250px] w-[34.25%] border-r pr-5  border-r-gray-neutral-500   flex flex-col justify-between">
                <div>
                  <UserProfilePicture
                    size="md"
                    userProfilePicture={userProfilePicture}
                  />
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="bg-gray-neutral-300 p-3 rounded-lg">
                    Profile
                  </li>
                  <li className="bg-gray-neutral-300 p-3 rounded-lg">
                    Account
                  </li>
                  <li className="bg-gray-neutral-300 p-3 rounded-lg">
                    Password
                  </li>
                  <li className="bg-gray-neutral-300 p-3 rounded-lg">
                    Password
                  </li>
                  <li className="bg-gray-neutral-300 p-3 rounded-lg">
                    Password
                  </li>
                  <li className="bg-gray-neutral-300 p-3 rounded-lg">
                    Password
                  </li>
                </ul>
              </div>
              <div className=" w-full h-full px-10  relative">
                <button
                  onClick={handleToggleModal}
                  className="absolute right-0 hover:bg-gray-neutral-300 cursor-pointer transition rounded-full px-3 py-1"
                >
                  X
                </button>
                <div>
                  <h1 className="font-serif mb-5 text-xl">Profile</h1>
                  <div>
                    <NormalInput
                      inputClassName="border-gray-neutral-500 border"
                      placeholder="123"
                      name="321"
                    />
                    <NormalInput
                      inputClassName="border-gray-neutral-500 border"
                      placeholder="123"
                      name="321"
                    />
                    <NormalInput
                      inputClassName="border-gray-neutral-500 border"
                      placeholder="123"
                      name="321"
                    />
                    <NormalInput
                      inputClassName="border-gray-neutral-500 border"
                      placeholder="123"
                      name="321"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
