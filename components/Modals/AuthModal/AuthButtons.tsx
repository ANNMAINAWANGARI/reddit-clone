import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

type AuthButtonsProps = {
    
};

const AuthButtons:React.FC<AuthButtonsProps> = () => {
    
    return (
        <Flex direction="column" mb={4} width="100%">
        <Button
          variant="oauth"
          mb={2}
          onClick={() => {}}
          
        >
          <Image src="/images/google-logo.png" height="20px" mr={4} />
          Continue with Google
        </Button>
        <Button
          variant="oauth"
          mb={2}
          onClick={() => {}}
          
        >
          <Image src="/images/twitter-logo.png" height="20px" mr={4} />
          Continue with Twitter
        </Button>
        
        
      </Flex>
      )}
    

export default AuthButtons;