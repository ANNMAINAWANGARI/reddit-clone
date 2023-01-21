import React from 'react';
import {
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

type PostItemProps = {
    post:Post;
    userIsCreator:boolean;
    userVoteValue?:number;
    onVote:()=>{};
    onDelete:()=>{};
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
                <Stack spacing={1} p="10px 10px"></Stack>
             </Flex>
        </Flex>
    )
}
export default PostItem;