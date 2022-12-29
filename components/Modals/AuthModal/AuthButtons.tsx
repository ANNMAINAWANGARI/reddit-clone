import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React ,{useState} from "react";
import {useSignInWithGoogle, useSignInWithTwitter} from 'react-firebase-hooks/auth'
import {auth} from '../../../firebase/clientApp';
import {FIREBASE_ERRORS} from '../../../firebase/errors'

type AuthButtonsProps = {
    
};

const AuthButtons:React.FC<AuthButtonsProps> = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [formError,setFormError]= useState('');
  return (
        <Flex direction="column" mb={4} width="100%">
        <Button
          variant="oauth"
          mb={2}
          isLoading={loading}
          onClick={() => {signInWithGoogle()}}
          
        >
          <Image src="/images/google-logo.png" height="20px" mr={4} />
          Continue with Google
        </Button>
        <Button
          variant="oauth"
          mb={2}
          onClick={() => {}}
          
        >
          <Image src="/images/twitter-logo.png" height="20px" mr={4} />
          Continue with Twitter
        </Button>
        {formError || error && <p style={{color:'red',display:'flex',alignItems:'center',justifyContent:'center'}}>{formError|| FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}</p>}
        
      </Flex>
      )}
    

export default AuthButtons;