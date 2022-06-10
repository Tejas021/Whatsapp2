import React,{useState,useRef} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from "styled-components"
import { auth, db } from '../firebaseConfig'
import {MdOutlineMoreVert,MdAttachFile,MdEmojiEmotions,MdSend,MdMic,MdSearch} from "react-icons/md"
import {IoMic} from "react-icons/io"
import {BsEmojiLaughing} from "react-icons/bs";
import { getRecipientEmail } from '../utils/getRecipientEmail'
import { collection, doc, setDoc,getDocs, addDoc,onSnapshot, query, where,orderBy,serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/dist/client/router'
import Message from './Message'
import { useEffect } from 'react'
import {format } from 'timeago.js'
const ChatScreen = ({messages,chats}) => {
    const scrollRef = useRef(null)
    const [user] = useAuthState(auth)
    const [Messages, setMessages] = useState(null);
    const [input, setInput] = useState("");
    const rec= getRecipientEmail(chats.users,user.email)
    const router = useRouter()
    const [recip, setRecip] = useState({});
    const  scrollToBottom=()=>{

      scrollRef.current.scrollIntoView({ behavior: 'smooth' ,block:"start"})
    }
    const getProp=async()=>{
      const q = query(collection(db,"user"),where("email","==",rec))

const a =await getDocs(q)




setRecip(a.docs[0].data())
    
    }
    

    useEffect(()=>{
      getProp()
      scrollToBottom()
     },[chats])

    useEffect(() => {
      const unsubscribe = onSnapshot(q3,(doc)=>{
        
         setMessages(doc)
         scrollToBottom()
         })
      return () => {
      unsubscribe()
      };
    }, [chats]);

    const ref = doc(db,"chats",router.query.id)
    const q3  = query(collection(ref,"messages"),orderBy("timestamp","asc"))
    
    

    const showMessages=()=>{

        
// return "hi"
         if(Messages){
             

            return Messages.docs?.map(mes=><Message key={mes.id} user={mes.data().user} message = {{...mes.data(),timestamp:mes.data().timestamp?.toDate().getTime()}}/>)}
        else{
            return JSON.parse(messages).map(mes=><Message key={mes.id} user={mes.user} message={mes}/>)

        }
    }

    const sendMessage=async(e)=>{
        e.preventDefault()
       
        const q1 =doc(db,"user",user.uid)

        await setDoc(doc(db, "user", user.uid), {
          
        lastSeen :serverTimestamp(),
        
      },{merge:true});

      const chatRef = doc(db,"chats",router.query.id)

      const messageRef = collection(chatRef,"messages")

      addDoc(messageRef,{
          user:user.email,
          message:input,
          timestamp:serverTimestamp()
      })
        setInput("")
        
    }
  return (
    <Container>
    <Header>
   
    <Avatar src={recip?.photoURL?recip.photoURL:"https://pbs.twimg.com/profile_images/1183307306995306496/P1K5Kt_5_400x400.jpg"}></Avatar>
    <HeaderInfo>
    <h3>{recip?.name?recip.name:"not registered yet"}</h3>
    <p>Last seen {format(recip?.lastSeen?.toDate().getTime(),"en_US")
    }
    </p>
    </HeaderInfo>
    <HeaderIcons>
    <Icon><MdSearch/></Icon>
    <Icon>  <MdOutlineMoreVert/></Icon>
    
  
  
    </HeaderIcons>
    </Header>
    <ChatBody>
    {showMessages()}
    <Scroller ref={scrollRef}/>
    </ChatBody>
   
    <MessageBox>
    <MessageIcon/>
    <MdAttachFile1/>
    <MessageInput placeholder="Type a message " onChange={e=>setInput(e.target.value)} value={input}/>
    <button type="submit" onClick ={e=>sendMessage(e)} hidden disabled={!input}>hi</button>
    <MessageSend/>
    </MessageBox>
    </Container>

  )
}

export default ChatScreen

const Scroller = styled.div`
`

const ChatBody =styled.div`

background-image:url("/images/back (1).png");
background-repeat: repeat;
// opacity: 0.06;

overflow:scroll;
flex:1;

::-webkit-scrollbar{
  display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

`;

const MessageBox = styled.form`
width:100%;
display:flex;
background:#202c33;
align-items:center


`;

const MessageIcon = styled(BsEmojiLaughing)`
margin:15px 5px 15px 15px;
color:#aebac1;
font-size:25px;
`;

const MdAttachFile1 = styled(MdAttachFile)`
margin:15px;
color:#aebac1;
font-size:25px;
`;

const MessageInput = styled.input`
flex:10;
padding:10px;
padding-inline:20px;
border-radius:5px;
outline:none;
border:none;
background:#2a3942;
color:white;
::placeholder {
  color: white;
  opacity: 1; 
}

`;

const MessageSend =styled(MdMic)`
flex:1;
font-size:30px;
align-items:center;
color:#aebac1;
background:#202c33;
`;

const Container = styled.div`
width:100%;
display:flex;
flex-direction:column;
`;
const Avatar =styled.img`
color:white;
cursor: pointer;
margin: 5px;
background:red;
margin-inline:35px;
height:40px;
border-radius:50%;

:hover{
    opacity: 80%;
}`;

const Header = styled.div`
background:white;
position: sticky;
z-index: 2;
top: 0;
display: flex;
min-height:65px;
width:100%;
border-bottom : black 0.5px solid;
align-items:center;
color:whitesmoke;
background:#202c33;
`;

const HeaderIcons=styled.div`

display:flex;
justify-content: space-evenly;
flex:1;
margin-right:10px;
cursor:pointer;
`;
const HeaderInfo = styled.div`
flex:10;
>p{
    font-size:12px;
    color:#aebac1;
}
`

const Icon = styled.div`
font-size:25px;
color:#aebac1;
:hover{
    color:green;

}


`;