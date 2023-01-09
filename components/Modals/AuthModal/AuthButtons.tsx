import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React ,{useEffect, useState} from "react";
import {useSignInWithGoogle, useSignInWithTwitter} from 'react-firebase-hooks/auth'
import {auth, firestore} from '../../../firebase/clientApp';
import {FIREBASE_ERRORS} from '../../../firebase/errors'

type AuthButtonsProps = {
    
};

const AuthButtons:React.FC<AuthButtonsProps> = () => {
  const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth);
  const [formError,setFormError]= useState('');

  const createdUserDocument = async(user:User)=>{
    const userDocRef = doc(firestore,'users',user.uid)
    await setDoc(userDocRef,JSON.parse(JSON.stringify(user)))
  }

  useEffect(()=>{
    if(userCred){
      createdUserDocument(userCred.user)
    }
   },[userCred])
  return (
        <Flex direction="column" mb={4} width="100%">
        <Button
          variant="oauth"
          mb={2}
          isLoading={loading}
          onClick={() => {signInWithGoogle()}}
          
        >
          <Image src="/images/google-logo.png" height="20px" mr={4} alt=''/>
          Continue with Google
        </Button>
        <Button
          variant="oauth"
          mb={2}
          onClick={() => {}}
          
        >
          <Image src="/images/twitter-logo.png" height="20px" mr={4} alt=''/>
          Continue with Twitter
        </Button>
        {formError || error && <p style={{color:'red',display:'flex',alignItems:'center',justifyContent:'center'}}>{formError|| FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}</p>}
        
      </Flex>
      )}
    

export default AuthButtons;