import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { authModalState } from '../../../state/atoms/AuthModalAtom';
import Login from './Login';
import Signup from './Signup';
type AuthInputsProps = {
    
};

const AuthInputs:React.FC<AuthInputsProps> = () => {
    const modalState = useRecoilValue(authModalState);
    return (
        <Flex direction="column" alignItems="center" width="100%" mt={4}>
            {modalState.view === "login" ? (
        <Login  />
      ) : (
        <Signup  />
      )}
        </Flex>
    )
}
export default AuthInputs;