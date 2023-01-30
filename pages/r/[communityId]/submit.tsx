import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useRecoilValue } from 'recoil';
import PageContent from '../../../components/Layout/PageContent';
import NewPostForm from '../../../components/Posts/NewPostForm';
import { auth } from '../../../firebase/clientApp';
import { communityState } from '../../../state/atoms/CommunitiesAtom';

type submitProps = {
    
};

const SubmitPostPage:React.FC<submitProps> = () => {
    const [user] = useAuthState(auth)
    const communityStateValue = useRecoilValue(communityState)
    console.log('communityStateValue',communityStateValue)
    return(
        <PageContent>
            <>
             <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
               <Text fontWeight={600}>Create a post</Text>
             </Box>
            {user && <NewPostForm user={user}/>}
             </>
            <></>
        </PageContent>
    )
}
export default SubmitPostPage;