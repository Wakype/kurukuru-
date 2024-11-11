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

export default function AboutModal({ isOpen, onClose }) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent className="bg-[#833bdb]">
        <ModalHeader>ABOUT THIS WEB</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>this web just for waste my time, idk why, but i like it lmao</p>
          <p>Herta is character from Honkai Star Rail</p>
        </ModalBody>
        <ModalFooter>
          <p className="text-left mr-10">All rights® are belong to HOYOVERSE</p>
          <Button colorScheme="facebook" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
