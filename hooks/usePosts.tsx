import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { postState } from '../state/atoms/PostAtom';

type usePostsProps = {
    
};

const usePosts = () => {
    const [postStateValue, setPostStateValue] = useRecoilState(postState);
    const onVote = async()=>{}
    const onSelectPost = ()=>{}
    const onDeletePost = async()=>{}
    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost
    }
}
export default usePosts;