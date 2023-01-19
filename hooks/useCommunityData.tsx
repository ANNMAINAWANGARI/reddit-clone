import { useRecoilState, useSetRecoilState } from 'recoil';
import { Community, CommunitySnippet, communityState } from '../state/atoms/CommunitiesAtom';
import {useEffect, useState} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/clientApp';
import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore';
import { authModalState } from '../state/atoms/AuthModalAtom';


const useCommunityData = () => {
    const [user] = useAuthState(auth)
    const [communityStateValue,setCommunityStateValue] = useRecoilState(communityState)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')
    const setAuthModal = useSetRecoilState(authModalState)
    const joinCommunity = async(communityData:Community)=>{
      try{
        const batch = writeBatch(firestore)
        const newSnippet:CommunitySnippet = {
          communityId:communityData.id,
          imageURL:communityData.imageURL || ""
        }
        batch.set(doc(firestore,`users/${user?.uid}/ communitySnippets`,communityData.id),newSnippet)
        batch.update(doc(firestore,'communities',communityData.id),{
          numberOfMembers:increment(1)
        })
        await batch.commit()
        setCommunityStateValue(prev=>({
          ...prev,
          mySnippets:[...prev.mySnippets,newSnippet]
        }))
        setLoading(false)
      }catch(error:any){
        setError(error.message)
      }
    }
    const leaveCommunity = async (communityId:string)=>{
      try{
        const batch = writeBatch(firestore)
        batch.delete(doc(firestore,`users/${user?.uid}/communitySnippets`,communityId))
        batch.update(doc(firestore,'communities',communityId),{
          numberOfMembers:increment(-1)
          
        })
        await batch.commit()
        setCommunityStateValue((prev)=>({
          ...prev,
          mySnippets:prev.mySnippets.filter((item)=>item.communityId !==communityId)
        }))
        setLoading(false)
        }catch(error:any){
          setError(error.message)
        console.log('leaveCommunityError',error.message)
      }
    }
    const onJoinOrLeaveCommunity = (communityData:Community,isJoined:boolean)=>{
      if(!user){
        setAuthModal({open:true,view:'login'})
        return;
      }
      setLoading(true)
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
        }catch(error:any){
          setError(error)
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