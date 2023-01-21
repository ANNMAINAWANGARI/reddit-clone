import { Stack } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React,{useEffect, useState} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { isTemplateExpression } from 'typescript';
import { auth, firestore } from '../../firebase/clientApp';
import usePosts from '../../hooks/usePosts';
import { Community } from '../../state/atoms/CommunitiesAtom';
import { Post } from '../../state/atoms/PostAtom';
import PostItem from './PostItem';

type PostsProps = {
    communityData: Community;
    userId?:string
};

const Posts:React.FC<PostsProps> = ({communityData}) => {
    const {postStateValue,setPostStateValue,onDeletePost,onSelectPost,onVote}= usePosts()
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [user] = useAuthState(auth)
    const getPosts = async()=>{
        setLoading(true)
        try{
            const postsQuery = query(
                collection(firestore, "posts"),
                where("communityId", "==", communityData?.id!),
                orderBy("createdAt", "desc")
              )
              const postDocs = await getDocs(postsQuery);
              const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
              setPostStateValue((prev)=>({
                ...prev,
                posts:posts as Post[]
              }))
              console.log('posst',posts)
        }catch(error:any){
            console.log('getPostsError',error.message)
            setError(true)
        }
        setLoading(false)
    }

    useEffect(()=>{
        getPosts()
    },[])
    
    return (
        <>
        {loading?(<></>)
        :(
        <Stack>
         {postStateValue.posts.map((post: Post, index)=>(
            <PostItem key={post.id} post={post} onDelete={onDeletePost} onSelectPost={onSelectPost} onVote={onVote} userIsCreator={user?.uid === post.creatorId}/>
         ))}
        </Stack>)}
        </>
    )
}
export default Posts;