import React from 'react';
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {IoFilterCircleOutline,IoNotificationsOutline,IoVideocamOutline,} from "react-icons/io5";

type IconsProps = {
    
};

const Icons:React.FC<IconsProps> = () => {
    
    return (
        <Flex>
            <Flex display={{base:'none',md:'flex'}} align='center' borderRight='1px solid' borderColor='gray.200'>
              {/* icons */}
             <Flex mr={1.5}ml={1.5}padding={1}cursor="pointer"borderRadius={4} _hover={{ bg: "gray.200" }}>
              <Icon as={BsArrowUpRightCircle} fontSize={20} />
             </Flex>
             <Flex mr={1.5} ml={1.5}padding={1}cursor="pointer"borderRadius={4}_hover={{ bg: "gray.200" }}>
              <Icon as={IoFilterCircleOutline} fontSize={22} />
             </Flex>
             <Flex mr={1.5}ml={1.5}padding={1}cursor="pointer"borderRadius={4}_hover={{ bg: "gray.200" }}>
              <Icon as={IoVideocamOutline} fontSize={22} />
             </Flex>
             {/* icons */}
            </Flex>
            <>
            <Flex mr={1.5} ml={1.5}padding={1}cursor="pointer"borderRadius={4}_hover={{ bg: "gray.200" }}>
             <Icon as={BsChatDots} fontSize={20} />
            </Flex>
            <Flex mr={1.5} ml={1.5} padding={1} cursor="pointer" borderRadius={4} _hover={{ bg: "gray.200" }}>
             <Icon as={IoNotificationsOutline} fontSize={20} />
            </Flex>
            <Flex display={{ base: "none", md: "flex" }} mr={3} ml={1.5} padding={1} cursor="pointer"borderRadius={4}  _hover={{ bg: "gray.200" }} onClick={()=>{}}>
             <Icon as={GrAdd} fontSize={20} />
            </Flex>
            </>
        </Flex>
    )
}
export default Icons;