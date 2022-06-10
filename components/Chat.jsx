import {useState,useEffect} from 'react'
import  styles from "./Chat.module.css"
import styled from "styled-components"
import {FaUserAlt} from "react-icons/fa"
import {auth, db} from "../firebaseConfig"
import {getRecipientEmail} from "../utils/getRecipientEmail"
import { getDocs,query,collection,doc,where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
const Chat = ({id ,user}) => {

const [prof, setProf] = useState({});
const [user1] = useAuthState(auth)
const router = useRouter()
const getter=async()=>{
  const q = query(collection(db,"user"),where("email","==",getRecipientEmail(user,user1.email)))
  
const querySnapshot = await getDocs(q);
const f =querySnapshot?.docs.map((doc) => {

 
  return doc.data()
});

  setProf(f[0])

  
}

useEffect(()=>{
getter()
},[])

const gotoChat=()=>{
router.push(`/chat/${id}`)
}

  return (
    <Container onClick={gotoChat}>
    {prof? <> <UserAvatar src={prof.photoURL}></UserAvatar>
   
    <Text>    {prof.name}</Text></>:<> <UserAvatar src="https://pbs.twimg.com/profile_images/1183307306995306496/P1K5Kt_5_400x400.jpg"></UserAvatar>
   
    <Text>    USER NOT REGISTERED YET ({getRecipientEmail(user,user1.email)}) </Text></>}


    </Container>
  )
}

export default Chat


const Container = styled.div`
padding: 15px;
display:flex;
align-items:center;
word-break: break-word;

:hover{
  background:#202c33;
  cursor:pointer
}

`
const Text = styled.p`
color: whitesmoke;
font-size: 30;
`

const UserAvatar= styled.img`
color:#8696a0;
cursor: pointer;
margin: 5px;
background:red;
margin-right:15px;
height:40px;
border-radius:50%;

:hover{
    opacity: 80%;
}
`;