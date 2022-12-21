import React from 'react';
import { Flex, Spacer, Image, Text } from '@chakra-ui/react'
import SearchInput from './SearchInput/SearchInput';
import RightItem from './RightItem/RightItem';
import AuthModal from '../Modals/AuthModal/AuthModal';
type NavbarProps = {
    
};

const Navbar:React.FC<NavbarProps> = () => {
    
    return (
        <Flex
        bg="white"
        height="44px"
        padding="6px 12px"
        justifyContent={{ md: "space-between" }}>
            <Flex
            align="center"
            width={{ base: "40px", md: "auto" }}
            mr={{ base: 0, md: 2 }}
            gap='2'
            cursor="pointer">
                <Image src='/images/logo.png' height="30px" alt='logo'/>
                
                <Text display={{ base: "none", md: "unset" }}>reddit</Text>
            </Flex>
            {/* <Directory/> */}
            
            <SearchInput/>
            <RightItem/>
        </Flex>
    )
}
export default Navbar;