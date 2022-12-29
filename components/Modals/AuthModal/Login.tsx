import React , {useState} from 'react';
import { Button, Flex, Text, Input } from "@chakra-ui/react";
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../state/atoms/AuthModalAtom';
import {auth} from '../../../firebase/clientApp';
import {FIREBASE_ERRORS} from '../../../firebase/errors'
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
const [signInWithEmailAndPassword, user,loading,error] = useSignInWithEmailAndPassword(auth);
const [formError,setFormError]= useState('');
    const [loginForm, setLoginForm] = useState({
        email:'',
        password:''
    })
    const submit = (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      if (error) setFormError('');
      signInWithEmailAndPassword(loginForm.email,loginForm.password)
    }
    const setAuthModalState = useSetRecoilState(authModalState)
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setLoginForm(prev =>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    return (
        <form onSubmit={submit}>
            <Input
                   required
                   name="email"
                   placeholder="email"
                   type="email"
                   mb={2}
                   onChange={onChange}
                   fontSize='10pt'
                   _placeholder={{color:'gray.500'}}
                   _hover={{bg:'white',border:'1px solid',borderColor:'blue.500'}}
                   _focus={{outline:'none',bg:'white',border:'1px solid',borderColor:'blue.500'}}
                   bg='gray.50'/>
            <Input
                name="password"
                placeholder="password"
                type="password"
                onChange={onChange}
                mb={2}
                fontSize='10pt'
                _placeholder={{color:'gray.500'}}
                _hover={{bg:'white',border:'1px solid',borderColor:'blue.500'}}
                _focus={{outline:'none',bg:'white',border:'1px solid',borderColor:'blue.500'}}
                bg='gray.50'
      />
      {formError || error && <p style={{color:'red',display:'flex',alignItems:'center',justifyContent:'center'}}>{formError|| FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}</p>}
            <Button
                width="100%"
                height="36px"
                mb={2}
                mt={2}
                type="submit"
      >
               Log In
      </Button>
      <Flex justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          Forgot your password?
        </Text>
        <Text
          fontSize="9pt"
          color="blue.500"
          cursor="pointer"
          onClick={() => {}}
        >
          Reset
        </Text>
      </Flex>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>New here?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() => {setAuthModalState((prev)=>({
            ...prev,
            view:'signup'
          }))}}
        >
          SIGN UP
        </Text>
      </Flex>
        </form>
    )
}
export default Login;