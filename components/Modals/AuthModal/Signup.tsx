
import React , {useState} from 'react';
import { Button, Flex, Text, Input } from "@chakra-ui/react";
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../state/atoms/AuthModalAtom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';


type SignupProps = {
    
};

const Signup:React.FC<SignupProps> = () => {
    const [signupForm, setSignupForm] = useState({ email:'', password:'', confirmPassword: "", })
    const [createUserWithEmailAndPassword,user,loading,error,] = useCreateUserWithEmailAndPassword(auth);
    const [formError,setFormError]= useState('');
    const submit = (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      if (error) setFormError('');
      if (signupForm.password !== signupForm.confirmPassword){
        setFormError('Passwords do not match')
        return;
      }
      createUserWithEmailAndPassword(signupForm.email, signupForm.password)
    }
    const setAuthModalState = useSetRecoilState(authModalState)
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setSignupForm(prev =>({
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
      <Input
                name="confirmPassword"
                placeholder="confirm password"
                type="password"
                onChange={onChange}
                mb={2}
                fontSize='10pt'
                _placeholder={{color:'gray.500'}}
                _hover={{bg:'white',border:'1px solid',borderColor:'blue.500'}}
                _focus={{outline:'none',bg:'white',border:'1px solid',borderColor:'blue.500'}}
                bg='gray.50'
      />
      {formError && <p style={{color:'red',display:'flex',alignItems:'center',justifyContent:'center'}}>{formError}</p>}
            <Button
                width="100%"
                height="36px"
                mb={2}
                mt={2}
                isLoading={loading}
                type="submit"
      >
               Sign Up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Have an account?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() => {setAuthModalState((prev)=>({
            ...prev,
            view:'login'
          }))}}
        >
          LOG IN
        </Text>
      </Flex>
        </form>
    )
}
export default Signup;