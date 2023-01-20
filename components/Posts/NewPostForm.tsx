import React,{useState, useRef} from 'react';
import { useRouter } from "next/router";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import { Flex, Icon } from '@chakra-ui/react';
import TabItem from './TabItem';
import TextInputs from './TextInputs';
import ImageUpload from './ImageUpload';

type NewPostFormProps = {
    
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
const NewPostForm:React.FC<NewPostFormProps> = () => {
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    const [textInputs, setTextInputs] = useState({title: "",body: "" })
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<string>();
    const selectFileRef = useRef<HTMLInputElement>(null);
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
      const handleCreatePost = ()=>{}
    //   select image function
      const onSelectImage = ()=>{}

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
        </Flex>
    )
}
export default NewPostForm;