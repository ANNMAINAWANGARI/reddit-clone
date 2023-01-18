import React from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Icon,
    Flex,
    Text,
  } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';
import { signOut, User } from 'firebase/auth';
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import {CgLogOut, CgProfile} from 'react-icons/cg';
import { MdOutlineLogin } from "react-icons/md";
import { auth } from '../../../firebase/clientApp';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../state/atoms/AuthModalAtom';
import { communityState } from '../../../state/atoms/CommunitiesAtom';

type UserMenuProps = {
    user?:User | null
};

const UserMenu:React.FC<UserMenuProps> = ({user}) => {
  const resetCommunityState = useSetRecoilState(communityState)
    const logOut = ()=>{
        signOut(auth)
        resetCommunityState()
    }
    const setAuthModalState = useSetRecoilState(authModalState)
    return (
        <Menu>
  <MenuButton cursor='pointer' padding='0px 6px' borderRadius={4}  _hover={{ outline: "1px solid", outlineColor: "gray.200" }}>
    {user?(
        <Flex align='center'>
        <Flex align='center'>
         <>
          <Icon fontSize={24} mr={1} color="gray.300" as={FaRedditSquare}/>
         </>
         <Flex direction = 'column' fontSize='8pt'align='flex-start'mr={8} display={{base:'none',lg:'flex'}}>
            <Text fontWeight={700}>{user?.displayName || user?.email?.split('@')[0] }</Text>
            <Flex>
                <Icon as={IoSparkles} mr={1} color='brand.100'/>
                <Text color='gray.400'>1 karma</Text>
            </Flex>
         </Flex>
         <ChevronDownIcon/>
        </Flex>
        </Flex>
    ):(
        <>
        <Icon fontSize={24} mr={1} color="gray.400" as={VscAccount} />
        </>
    )}
  </MenuButton>
  <MenuList>
    <MenuItem>
     <Flex alignItems="center">
        <Icon fontSize={20} mr={2} as={CgProfile}/>
        Profile
     </Flex>
    </MenuItem>
    {user? (
        <>
        <MenuDivider />
        <MenuItem
            fontSize="10pt"
            fontWeight={700}
            _hover={{ bg: "blue.500", color: "white" }}
            onClick={logOut}
          >
            <Flex alignItems="center">
              <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
              Log Out
            </Flex>
          </MenuItem>
          </>
    ):(
        <>
        <MenuItem
            fontSize="10pt"
            fontWeight={700}
            _hover={{ bg: "blue.500", color: "white" }}
            onClick={()=>setAuthModalState({open:true,view:'login'})}
          >
            <Flex alignItems="center">
              <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
              Log In/Sign Up
            </Flex>
          </MenuItem>
        </>
    )}
  </MenuList>
</Menu>
    )
}
export default UserMenu;