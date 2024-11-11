import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

export default function UpdateLogModal({ isOpen, onClose }) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent className="bg-[#833bdb]">
        <ModalHeader>UPDATE LOG</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">v1.1</h2>
            <ul className="list-disc list-inside">
              <li>!! NEW !! 📱 Mobile Responsive</li>
              <li>Herta appear animation fixed</li>
              <li>Soon, I&apos;ll add country and leaderboard 👌</li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">v1.0</h2>
            <ul className="list-disc list-inside">
              <li>
                Web still on development (will be another update incoming 🤔)
              </li>
              <li>
                If you spam the squish button, Herta will break. The function is
                kinda buggy (I&apos;ll fix it soon 👀)
              </li>
              <li>Soon, I&apos;ll add country and leaderboard 😎</li>
            </ul>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="facebook" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
