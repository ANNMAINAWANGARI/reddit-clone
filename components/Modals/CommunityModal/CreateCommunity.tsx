import React,{useState} from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    Divider,
    Text,
    Input,
    Stack,
    Checkbox,
    Flex,
    Icon,
  } from '@chakra-ui/react'
import { BsFillPersonFill } from 'react-icons/bs';
import { doc, getDoc, runTransaction, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, firestore } from '../../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

type CreateCommunityProps = {
    open:boolean,
    handleClose:()=>void
};

const CreateCommunity:React.FC<CreateCommunityProps> = ({open, handleClose}) => {
    const [communityName, setCommunityName] =useState('')
    const [charsRemaining,setCharsRemaining]= useState(21)
    const [communityType,setCommunityType] = useState('public')
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState('')
    const [user] = useAuthState(auth)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        if (event.target.value.length > 21) return;
        setCommunityName(event.target.value);
        setCharsRemaining(21 - event.target.value.length);
    }
    const onCommunityTypeChange = ( event: React.ChangeEvent<HTMLInputElement>)=>{
      const {target: { name },} = event;
      if (name === communityType) return;
       setCommunityType(name);
    }
const handleCreateCommunity = async()=>{
  if(error)setError('')
  const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (format.test(communityName) || communityName.length < 3) {
  setError(
      "Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores."
    );
    return;
  }
  setLoading(true)
try{
  const communityDocRef = doc(firestore, 'communities',communityName)
  await runTransaction(firestore,async(transaction)=>{
    const communityDocSnap = await transaction.get(communityDocRef)
    if(communityDocSnap.exists()){
      throw new Error(`Sorry, r/${communityName} is already taken. Try another`)
     
    }
    await transaction.set(communityDocRef,{
      creatorId:user?.uid,
      createdAt:serverTimestamp(),
      numberOfMembers:1,
      privacyType:communityType
    })
    transaction.set(doc(firestore,`users/${user?.uid}/communitySnippets`,communityName),{
      communityId:communityName,
      isModerator:true
    })
  })
 
}catch(error:any){
  console.log('handleCreateCommunityError',error?.message)
  setError(error?.message)
}



 
  setLoading(false)
}
    return (
        <>
        
  
        <Modal isOpen={open} onClose={handleClose} size='lg'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader display="flex"flexDirection="column"fontSize={15}padding={3}>Create a Community</ModalHeader>
            <Box pr={3} pl={3}>
                <Divider/>
                <ModalCloseButton />
                <ModalBody display="flex" flexDirection="column" padding="10px 0px">
                 <Text fontWeight={600} fontSize={15}>Name</Text>
                 <Text fontSize={11} color="gray.500">Community names including capitalization cannot be changed</Text>
                 <Text color="gray.400"position="relative"top="28px"left="10px"width="20px">r/</Text>
                 <Input
                   position="relative"
                   name="name"
                   value={communityName}
                   onChange={handleChange}
                   pl="22px"
                   type={""}
                   size="sm"
                 />
                 <Text fontSize="9pt" color={charsRemaining === 0 ? "red" : "gray.500"}>{charsRemaining} characers remaining</Text>
                 <Box mt={4} mb={4}>
                  {error && <Text fontSize="9pt" color="red" pt={1}> {error} </Text>}
                  <Text fontWeight={600} fontSize={15}>Community Type</Text>
                  <Stack spacing={2} pt={1}>
                   <Checkbox colorScheme="blue"name="public"isChecked={communityType === "public"}onChange={onCommunityTypeChange}>
                    <Flex alignItems="center">
                      <Icon as={BsFillPersonFill} mr={2} color="gray.500" />
                      <Text fontSize="10pt" mr={1}>Public</Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>Anyone can view, post, and comment to this community</Text>
                    </Flex>
                   </Checkbox>
                   <Checkbox colorScheme="blue"name="restricted"isChecked={communityType === "restricted"}onChange={onCommunityTypeChange}>
                    <Flex alignItems="center">
                      <Icon as={BsFillPersonFill} mr={2} color="gray.500" />
                      <Text fontSize="10pt" mr={1}>Restricted</Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>Anyone can view this community, but only approved users can post</Text>
                    </Flex>
                   </Checkbox>
                   <Checkbox colorScheme="blue"name="private"isChecked={communityType === "private"}onChange={onCommunityTypeChange}>
                    <Flex alignItems="center">
                      <Icon as={BsFillPersonFill} mr={2} color="gray.500" />
                      <Text fontSize="10pt" mr={1}>Private</Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>Only approved users can view and submit to this community</Text>
                    </Flex>
                   </Checkbox>
                  </Stack>
                 </Box>
                </ModalBody>
            </Box>
            
            
  
            <ModalFooter  bg="gray.100" borderRadius="0px 0px 10px 10px">
              <Button variant="outline" height="30px" mr={2} onClick={handleClose}>
                Cancel
              </Button>
              <Button
               variant="solid"
               height="30px"
               onClick={handleCreateCommunity}
               isLoading={loading}
              >
               Create Community
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}
export default CreateCommunity;