import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import Link from "next/link";

type NotFoundProps = {
    
};

const NotFound:React.FC<NotFoundProps> = () => {
    
    return (
        <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        Sorry, that community does not exist or has been banned
        <Link href="/">
          <Button mt={4}>GO HOME</Button>
        </Link>
      </Flex>
    )
}
export default NotFound;