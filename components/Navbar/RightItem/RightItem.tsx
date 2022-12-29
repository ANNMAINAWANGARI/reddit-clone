import { Flex, Button } from '@chakra-ui/react';
import React from 'react';
import AuthButtons from '../AuthButtons/AuthButtons';
import MenuWrapper from '../MenuWrapper/MenuWrapper';
import AuthModal from '../../Modals/AuthModal/AuthModal';
import { signOut } from 'firebase/auth';
import {auth} from '../../../firebase/clientApp';

type RightItemProps = {
    user:any
};

const RightItem:React.FC<RightItemProps> = ({user}) => {
    
    return (
        <>
      <AuthModal />
      <Flex justifyContent="space-between" alignItems="center">
        {user ? <Button onClick={()=>signOut(auth)}>Logout</Button>: <AuthButtons />}
         
        {/* <MenuWrapper /> */}
      </Flex>
    </>
    )
}
export default RightItem;