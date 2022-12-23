import { Flex } from '@chakra-ui/react';
import React from 'react';
import AuthButtons from '../AuthButtons/AuthButtons';
import MenuWrapper from '../MenuWrapper/MenuWrapper';
import AuthModal from '../../Modals/AuthModal/AuthModal';

type RightItemProps = {
    
};

const RightItem:React.FC<RightItemProps> = () => {
    
    return (
        <>
      <AuthModal />
      <Flex justifyContent="space-between" alignItems="center">
         <AuthButtons />
        {/* <MenuWrapper /> */}
      </Flex>
    </>
    )
}
export default RightItem;