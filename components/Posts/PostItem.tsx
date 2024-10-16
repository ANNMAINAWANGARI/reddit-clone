import React,{useState} from 'react';
import {
  Alert,
    AlertIcon,
    Flex,
    Icon,
    Image,
    Skeleton,
    Spinner,
    Stack,
    Text,
  } from "@chakra-ui/react";
  import { NextRouter } from "next/router";
  import { AiOutlineDelete } from "react-icons/ai";
  import { BsChat, BsDot } from "react-icons/bs";
  import { FaReddit } from "react-icons/fa";
  import {
    IoArrowDownCircleOutline,
    IoArrowDownCircleSharp,
    IoArrowRedoOutline,
    IoArrowUpCircleOutline,
    IoArrowUpCircleSharp,
    IoBookmarkOutline,
  } from "react-icons/io5";
import { Post } from '../../state/atoms/PostAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/clientApp';
import moment from 'moment'
import { setDefaultResultOrder } from 'dns';

type PostItemProps = {
    post:Post;
    userIsCreator:boolean;
    userVoteValue?:number;
    onVote:()=>{};
    onDelete:(post:Post)=>Promise<boolean>;
    onSelectPost:()=>void;
};

const PostItem:React.FC<PostItemProps> = (
    {
        post,
        userIsCreator,
        userVoteValue,
        onDelete,
        onSelectPost,
        onVote
}) => {
    // console.log(post,'post')
    const [loadingImage, setLoadingImage] = useState(true);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [error,setError] = useState('')
    const handleDelete = async()=>{
      try{
        setLoadingDelete(true)
        const success = await onDelete(post)
        if (!success) throw new Error("Failed to delete post");
      }catch(error:any){
        console.log('handleDeleteError',error.message)
        setError(error.message)
        
      }
      setLoadingDelete(false)
    }
    
    return (
        <Flex       
        border="1px solid"
        bg="white"
        borderColor= "gray.300"
        borderRadius =  {4}
        cursor="pointer"
        _hover={{ borderColor: "gray.500" }}
        onClick={onSelectPost}>
            <Flex 
             direction="column"
             align="center"
             bg= "gray.100"
             p={2}
             width="40px"
             borderRadius= "3px 0px 0px 3px">
                <Icon as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
                 color={userVoteValue === 1 ? "brand.100" : "gray.400"}
                 fontSize={22}
                 cursor="pointer"
                 onClick={onVote}
                />
                <Text fontSize="9pt" fontWeight={600}>{post.voteStatus}</Text>
                <Icon as={userVoteValue === -1  ? IoArrowDownCircleSharp  : IoArrowDownCircleOutline}
                 color={userVoteValue === -1 ? "#4379FF" : "gray.400"}
                 fontSize={22}
                 cursor="pointer"
                 onClick={onVote}
        />
             </Flex>
             <Flex direction="column" width="100%">
             {error && 
              <Alert status='error'>
               <AlertIcon/>
               <Text mr={2}>Error Deleting Post</Text>
              </Alert>
             }
                
                <Stack spacing={1} p="10px 10px">
                    <Stack direction='row' spacing={0.6} align="center" fontSize="9pt">
                     <Text color="gray.500">
                      Posted by u/{post.creatorDisplayName}{''}{moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
                     </Text>
                    </Stack>
                    <Text fontSize="12pt" fontWeight={600}>{post.title}</Text>
                    {post.body && <Text fontSize="10pt">{post.body}</Text>}
                    {post.imageURL && (
                     <Flex justify="center" align="center" p={2}>
                       {loadingImage && (
                        <Skeleton height="200px" width="100%" borderRadius={4} />
                       )}
                       <Image
                // width="80%"
                // maxWidth="500px"
                        maxHeight="460px"
                        src={post.imageURL}
                        display={loadingImage ? "none" : "unset"}
                        onLoad={() => setLoadingImage(false)}
                        alt="Post Image"
                       />
                    </Flex>
          )}
                </Stack>
                <Flex ml={1} mb={0.5} color="gray.500" fontWeight={600}>
                    <Flex  
                    align="center"
                    p="8px 10px"
                    borderRadius={4}
                    _hover={{ bg: "gray.200" }}
                   cursor="pointer">
                    <Icon as={BsChat} mr={2} />
                    <Text fontSize="9pt">{post.numberOfComments}</Text>
                   </Flex>
                   <Flex  
                   align="center"
                   p="8px 10px"
                   borderRadius={4}
                  _hover={{ bg: "gray.200" }}
                  cursor="pointer">
                    <Icon as={IoArrowRedoOutline} mr={2} />
                    <Text fontSize="9pt">Share</Text>
                  </Flex>
                  <Flex
                  align="center"
                  p="8px 10px"
                  borderRadius={4}
                  _hover={{ bg: "gray.200" }}
                  cursor="pointer">
                    <Icon as={IoBookmarkOutline} mr={2} />
                    <Text fontSize="9pt">Save</Text>
                  </Flex>
                  {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize="9pt">Delete</Text>
                </>
              )}
            </Flex>
          )}
                </Flex>
             </Flex>
        </Flex>
    )
}
export default PostItem;