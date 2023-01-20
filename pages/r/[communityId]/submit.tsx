import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import PageContent from '../../../components/Layout/PageContent';
import NewPostForm from '../../../components/Posts/NewPostForm';

type submitProps = {
    
};

const submit:React.FC<submitProps> = () => {
    
    return(
        <PageContent>
            <>
             <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
               <Text fontWeight={600}>Create a post</Text>
             </Box>
             <NewPostForm/>
             </>
            <></>
        </PageContent>
    )
}
export default submit;