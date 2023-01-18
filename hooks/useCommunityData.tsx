import { useRecoilState } from 'recoil';
import { Community, CommunitySnippet, communityState } from '../state/atoms/CommunitiesAtom';
import {useEffect, useState} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/clientApp';
import { collection, getDocs } from 'firebase/firestore';


const useCommunityData = () => {
    const [user] = useAuthState(auth)
    const [communityStateValue,setCommunityStateValue] = useRecoilState(communityState)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')
    const joinCommunity = (communityData:Community)=>{}
    const leaveCommunity = (communityId:string)=>{}
    const onJoinOrLeaveCommunity = (communityData:Community,isJoined:boolean)=>{
      if(isJoined){
        leaveCommunity(communityData.id)
       return;
      }
      joinCommunity(communityData)
    }
    const getMySnippets = async()=>{
        setLoading(true)
        try{
          const snippetDocs = await getDocs(
            collection(firestore,`users/${user?.uid}/communitySnippets`))
            const snippets = snippetDocs.docs.map((doc)=>({...doc.data()}))
            console.log('snippets',snippets)
            setCommunityStateValue((prev)=>({
                ...prev,
                mySnippets:snippets as CommunitySnippet[]
            }))
            setLoading(false)
        }catch(error){
         console.log('getMySnippetDataError',error)
        }
    }
    useEffect(()=>{
     if(!user) return;
     getMySnippets()
    },[user])
    return {
        onJoinOrLeaveCommunity,
        communityStateValue,
        loading
    }
}
export default useCommunityData;