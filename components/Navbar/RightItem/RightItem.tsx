import { Flex, Button } from '@chakra-ui/react';
import React from 'react';
import AuthButtons from '../AuthButtons/AuthButtons';
import MenuWrapper from '../MenuWrapper/MenuWrapper';
import AuthModal from '../../Modals/AuthModal/AuthModal';
import { signOut, User } from 'firebase/auth';
import {auth} from '../../../firebase/clientApp';
import Icons from './Icons';
import UserMenu from './UserMenu';

type RightItemProps = {
    user ?:User | null;
};

const RightItem:React.FC<RightItemProps> = ({user}) => {
    
    return (
        <>
      <AuthModal />
      <Flex justifyContent="space-between" alignItems="center">
        {user ? <Icons/>: <AuthButtons />}
        
        <UserMenu user={user}/>
      </Flex>
    </>
    )
}
export default RightItem;