import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { firestore } from '../../../firebase/clientApp';
import { Community } from '../../../state/atoms/CommunitiesAtom';
import safeJsonStringify from 'safe-json-stringify'

type CommunityPageProps = {
    communityData:Community
};

const CommunityPage:React.FC<CommunityPageProps> = ({communityData}) => {
    if (!communityData) {
        return (
         <div>not found</div>
        )
      }
    return <div>Community Page {communityData?.id}</div>
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