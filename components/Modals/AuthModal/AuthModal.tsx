import {
    Button, Flex, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import {useRecoilState} from 'recoil';
import { authModalState } from '../../../state/atoms/AuthModalAtom';
import AuthInputs from './AuthInputs';
import AuthButtons from './AuthButtons';
type AuthModalProps = {
    
};

const AuthModal:React.FC<AuthModalProps> = () => {
    const [modalState, setModalState] = useRecoilState(authModalState);
    const handleClose = () =>
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
    return (
         <>

      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
          {modalState.view === "login" && "Login"}
          {modalState.view === "signup" && "Sign Up"}
          {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  pb={6}>
            <Flex
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      width="70%">
              <AuthButtons/>
              <AuthInputs/>
              {/* <ResetPassword/> */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
    )
}
export default AuthModal;