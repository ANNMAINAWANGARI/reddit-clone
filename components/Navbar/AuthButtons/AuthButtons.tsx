import { Button } from '@chakra-ui/react';
import React from 'react';
import { authModalState } from '../../../state/atoms/AuthModalAtom';
import {useSetRecoilState} from 'recoil'

type AuthButtonsProps = {
    
};

const AuthButtons:React.FC<AuthButtonsProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    return (
        <>
        <Button
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={()=>setAuthModalState({open:true,view:'login'})}
      >
        Log In
      </Button>
      <Button
        variant="solid"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={()=>setAuthModalState({open:true,view:'signup'})}
      >
        Sign Up
      </Button>
        </>
    )
}
export default AuthButtons;