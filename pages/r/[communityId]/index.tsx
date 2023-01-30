import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect,useState } from 'react';
import { firestore } from '../../../firebase/clientApp';
import { Community, communityState } from '../../../state/atoms/CommunitiesAtom';
import safeJsonStringify from 'safe-json-stringify'
import NotFound from '../../../components/Community/NotFound';
import Header from '../../../components/Community/Header';
import PageContent from '../../../components/Layout/PageContent';
import CreatePostLink from '../../../components/Community/CreatePostLink';
import Posts from '../../../components/Posts/Posts';
import { useSetRecoilState } from 'recoil';
import About from '../../../components/Community/About';

type CommunityPageProps = {
    communityData:Community
};

const CommunityPage:React.FC<CommunityPageProps> = ({communityData}) => {
    const setCommunityStateValue = useSetRecoilState(communityState)
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        setCommunityStateValue((prev)=>({
            ...prev,
            currentCommunity:communityData
        }))
      },[])
    if (!communityData) {
        return <NotFound/>}
      
    //   console.log(communityData)
      
    return (
        <>
        <Header communityData={communityData}/>
        <PageContent>
            <>
             <CreatePostLink/>
             <Posts communityData={communityData}/>
            </>
            <><About communityData={communityData} loading={loading}/></>
        </PageContent>
        </>
    )
}


export async function getServerSideProps(context:GetServerSidePropsContext){
 try{
  const communityDocRef = doc(firestore,'communities',context.query.communityId as string)
  const communityDoc = await getDoc(communityDocRef)

  
  return{
    props:{
        communityData:communityDoc.exists()?JSON.parse(safeJsonStringify({
            id:communityDoc.id, ...communityDoc.data()
        })):''
    }
  }
 }catch(error){
    console.log('CommunityPagePropsError',error)
 }
}
export default CommunityPage;