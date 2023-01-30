import React,{useState, useRef} from 'react';
import { useRouter } from "next/router";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import { Alert, AlertIcon, Flex, Icon, Text } from '@chakra-ui/react';
import TabItem from './TabItem';
import TextInputs from './TextInputs';
import ImageUpload from './ImageUpload';
import { User } from 'firebase/auth';
import { Post } from '../../state/atoms/PostAtom';
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
  } from "firebase/firestore";
import { firestore, storage } from '../../firebase/clientApp';
import { getDownloadURL, ref, uploadString } from "firebase/storage";

type NewPostFormProps = {
    user:User;
};

const formTabs = [
    {
      title: "Post",
      icon: IoDocumentText,
    },
    {
      title: "Images & Video",
      icon: IoImageOutline,
    },
    {
      title: "Link",
      icon: BsLink45Deg,
    },
    {
      title: "Poll",
      icon: BiPoll,
    },
    {
      title: "Talk",
      icon: BsMic,
    },
  ]

  export type TabItemType = {
    title: string;
    icon: typeof Icon.arguments;
  };
const NewPostForm:React.FC<NewPostFormProps> = ({user}) => {
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    const [textInputs, setTextInputs] = useState({title: "",body: "" })
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(false)
    const [selectedFile, setSelectedFile] = useState<string>();
    const selectFileRef = useRef<HTMLInputElement>(null);
    const router  = useRouter()
    // change text function
    const onTextChange = ({
        target: { name, value },
      }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTextInputs((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    //   create post function
      const handleCreatePost = async ()=>{
        setLoading(true);
        const { title, body } = textInputs;
        const {communityId} = router.query
        const newPost:Post = {
           communityId:communityId as string,
           creatorId:user.uid,
           creatorDisplayName: user.email!.split("@")[0],
           title,
           body,
           numberOfComments: 0,
           voteStatus: 0,
           createdAt: serverTimestamp() as Timestamp,
        //    editedAt: serverTimestamp()
        }
        setLoading(true)
        try{
         const postDocRef = await addDoc(collection(firestore,'posts'),newPost)
         if (selectedFile) {
            const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
            await uploadString(imageRef, selectedFile, "data_url");
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(postDocRef, {
              imageURL: downloadURL,
            });
            console.log("HERE IS DOWNLOAD URL", downloadURL);
          }
          router.back()
        }catch(error:any){
            console.log('handleCreatePostError',error.message)
            setError(true)
        }
        setLoading(false)
        
      }
    //   select image function
      const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const reader = new FileReader();
        if (event.target.files?.[0]) {
         reader.readAsDataURL(event.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
              setSelectedFile(readerEvent.target?.result as string);
            }
          };
      }
    return (
        <Flex direction="column" bg="white" borderRadius={4} mt={2}>
         <Flex width='100%'>
         {formTabs.map((item, index) => (
          <TabItem
            key={index}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
         </Flex>
         <Flex p={4}>
         {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            onChange={onTextChange}
            handleCreatePost={handleCreatePost}
            loading={loading}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
            selectFileRef={selectFileRef}
            onSelectImage={onSelectImage}
          />
        )}
         </Flex>
         {error && 
          <Alert status='error'>
            <AlertIcon/>
            <Text mr={2}>Error Creating Post</Text>
          </Alert>
         }
        </Flex>
    )
}
export default NewPostForm;