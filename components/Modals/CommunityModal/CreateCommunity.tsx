import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
  } from '@chakra-ui/react'

type CreateCommunityProps = {
    open:boolean,
    handleClose:()=>void
};

const CreateCommunity:React.FC<CreateCommunityProps> = ({open, handleClose}) => {
    
    return (
        <>
        
  
        <Modal isOpen={open} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              yoo
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleClose}>
                Close
              </Button>
              <Button variant='ghost'>Create Community</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}
export default CreateCommunity;