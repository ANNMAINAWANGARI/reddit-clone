import { Timestamp } from "firebase/firestore"
import { atom } from "recoil";

export type Post = {
id?:string;
communityId:string;
creatorId:string;
creatorDisplayName:string;
title:string;
body?:string;
numberOfComments:number;
voteStatus:number;
imageURL?:string;
communityImageURL?:string;
createdAt:Timestamp;
}

interface PostState {
    selectedPost:Post | null;
    posts:Post[];
}

export const defaultPostState: PostState = {
    selectedPost: null,
    posts: [],
    
  };

  export const postState = atom({
    key: "postState",
    default: defaultPostState,
  });