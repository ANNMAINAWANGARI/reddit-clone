import React , { useRef, useState } from 'react';
import {
    Box,
    Button,
    Divider,
    Flex,
    Icon,
    Skeleton,
    SkeletonCircle,
    Stack,
    Text,
    Image,
    Spinner,
  } from "@chakra-ui/react";
  import { HiOutlineDotsHorizontal } from "react-icons/hi";
  import { RiCakeLine } from "react-icons/ri";
  import Link from "next/link";
  import { useRouter } from "next/router";
  import moment from "moment";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FaReddit } from "react-icons/fa";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { Community } from '../../state/atoms/CommunitiesAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/clientApp';

type AboutProps = {
    communityData: Community;
    loading:boolean
};

const About:React.FC<AboutProps> = ({communityData,loading}) => {
    const [user] = useAuthState(auth)
    const router = useRouter()
    
    return (
    <Box  position="sticky" top="14px">
        <Flex
         justify="space-between"
         align="center"
         p={3}
         color="white"
         bg="blue.400"
         borderRadius="4px 4px 0px 0px">
          <Text fontSize="10pt" fontWeight={700}>
           About Community
          </Text>
          <Icon as={HiOutlineDotsHorizontal} cursor="pointer" />
        </Flex>
        <Flex direction="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
            {loading?
            (
                <Stack mt={2}>
                <SkeletonCircle size="10" />
                <Skeleton height="10px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </Stack>
            ):
            (
            <>
              {user?.uid === communityData?.creatorId && (
              <Box
                bg="gray.100"
                width="100%"
                p={2}
                borderRadius={4}
                border="1px solid"
                borderColor="gray.300"
                cursor="pointer"
              >
                <Text fontSize="9pt" fontWeight={700} color="blue.500">
                  Add description
                </Text>
              </Box>
            )}
             <Stack spacing={2}>
                <Flex width="100%" p={2} fontWeight={600} fontSize="10pt">
                <Flex direction="column" flexGrow={1}>
                  <Text>
                    {communityData?.numberOfMembers?.toLocaleString()}
                  </Text>
                  <Text>Members</Text>
                </Flex>
                <Flex direction="column" flexGrow={1}>
                  <Text>1</Text>
                  <Text>Online</Text>
                </Flex>
                </Flex>
                <Divider/>
                <Flex
                align="center"
                width="100%"
                p={1}
                fontWeight={500}
                fontSize="10pt"
              >
                <Icon as={RiCakeLine} mr={2} fontSize={18} />
                {communityData?.createdAt && (
                  <Text>
                    Created{" "}
                    {moment(
                      new Date(communityData.createdAt.seconds * 1000)
                    ).format("MMM DD, YYYY")}
                  </Text>
                )}
              </Flex>
              <Link href={`/r/${router.query.community}/submit`}>
              <Button mt={3} height="30px">
                    Create Post
                  </Button>
              </Link>
             </Stack>
            </>)}
        </Flex>

    </Box>)
}
export default About;