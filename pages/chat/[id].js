import React,{useState,useEffect} from 'react'
import Sidebar from '../../components/Sidebar'
import styled from "styled-components"
import Head from 'next/head'
import { auth, db } from '../../firebaseConfig'
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { getRecipientEmail } from '../../utils/getRecipientEmail'
import { useAuthState } from 'react-firebase-hooks/auth'
import ChatScreen from '../../components/ChatScreen'
const Chat = ({chats,messages}) => {
    const [user] = useAuthState(auth)
    const [isDesktop, setDesktop] = useState(window.innerWidth > 650);

    const updateMedia = () => {
      setDesktop(window.innerWidth > 650);
    };
  
    useEffect(() => {
      window.addEventListener("resize", updateMedia);
      return () => window.removeEventListener("resize", updateMedia);
    });
  return (
    <Container>
    <Head>
    <title>{getRecipientEmail(chats.users,user.email)}</title>
    </Head>
    {
      isDesktop?  <SideBar1/>:""
    }
    
      <ChatContainer>
    <ChatScreen messages={messages} chats={chats}/>
      </ChatContainer>
     
    </Container>
  )
}

export default Chat

export const getServerSideProps=async(context)=>{

    const ref  = doc(db,"chats",context.query.id)

    const q  = query(collection(ref,"messages"),orderBy("timestamp","asc"))

    const MessageRes =await getDocs(q)
    const messages = MessageRes?.docs?.map(doc=>(
        {id:doc.id,...doc.data()}
    )).map(message=>(
        {
            ...message,timestamp:message.timestamp.toDate().getTime()
        }
    ))
     
    const ChatRes = await getDoc(ref)

    const chats = {id:ChatRes.id,...ChatRes.data()}

    return {
        props:{
            messages:JSON.stringify(messages),
            chats:chats
        }
    }

}


const SideBar1 = styled(Sidebar)`
display:false;
`

const Container = styled.div`
display:flex;
overflow: scroll;
 ::-webkit-scrollbar{
display: none;
}
height: 100vh;
-ms-overflow-style: none;
scrollbar-width: none;
@media (max-width:670px) {
  height:100vh ;
  
}

`

const ChatContainer = styled.div`
display:flex;

flex:1;
height:100vh;
overflow: scroll;
 ::-webkit-scrollbar{
display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;

@media (max-width:670px) {
  height:90vh ;
  
}

`