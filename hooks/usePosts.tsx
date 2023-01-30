import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Post, postState } from '../state/atoms/PostAtom';
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from '../firebase/clientApp';
import { deleteDoc, doc } from 'firebase/firestore';

type usePostsProps = {
    
};

const usePosts = () => {
    const [postStateValue, setPostStateValue] = useRecoilState(postState);
    const onVote = async()=>{}
    const onSelectPost = ()=>{}
    const onDeletePost = async(post:Post):Promise<boolean>=>{
        try{
            // if post has an image url, delete it from storage
            if (post.imageURL) {
             const imageRef = ref(storage, `posts/${post.id}/image`);
             await deleteObject(imageRef);
            }
            // delete post from posts collection
            const postDocRef = doc(firestore,"posts",post.id!);
            await deleteDoc(postDocRef);

            //update recoil post state
            setPostStateValue((prev)=>({
                ...prev,
                posts:prev.posts.filter((item) => item.id !== post.id),
            }))
            return true;
        }catch(error:any){
            console.log("THERE WAS AN ERROR", error);
            return false;
        }
    }
    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost
    }
}
export default usePosts;