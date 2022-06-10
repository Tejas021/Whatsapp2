import React from 'react'
import {BsFillChatLeftTextFill} from "react-icons/bs";
import {FaUserAlt} from "react-icons/fa";
import styled from "styled-components"
import {BiDotsVertical,BiSearch} from "react-icons/bi";
import {TbCircleDashed} from "react-icons/tb"

import {auth,db ,provider} from '../firebaseConfig'
import { addDoc, doc ,collection,getDocs,query,where, onSnapshot} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useAuthState ,useCollection,useCollectionData} from 'react-firebase-hooks/auth';
import { useEffect,useState } from 'react';
import Chat from './Chat';
import * as EmailValidator from 'email-validator'
const Sidebar = () => {

  const [user] = useAuthState(auth)
  const [chats, setChats] = useState([]);
 
  useEffect(()=>{
    const q = query(collection(db, "chats"), where("users", "array-contains", user.email));
    const unsub = onSnapshot(q,(querySnapshot)=>{
      setChats(querySnapshot)
    })
    },[user])
  

    const startChat=async ()=>{
        let input =prompt("Enter the email ")
        if(EmailValidator.validate(input)){
          if(!chatExists(input)){
            await addDoc(collection(db,"chats"),{
              users:[user.email,input]
            })
          }
        }else{
          alert("Invalid email")
        }
    }


    const chatExists = (recipientEmail)=>{
      return !!chats?.docs.find(chat=>
        chat.data().users.find(
          user=>user===recipientEmail
        )?.length>0
      )
    }

  return (
    <Container>
    
    <Header>
    

    <UserAvatar onClick={()=>signOut(auth)} src={user.photoURL}></UserAvatar>
      <IconContainer>
      <TbCircleDashed/>
      <BsFillChatLeftTextFill/>
      <BiDotsVertical/>
    
      
      </IconContainer>

    </Header>

    <Search>
    <SearchIcon/>
      <SearchInput placeholder='Search for Chats'/>
    </Search>
    <StartButton onClick={startChat}>Start New Chat</StartButton>

    {
      chats?.docs?.map(chat=>
        <Chat key={chat.id} id={chat.id} user={chat.data().users} />
        )
    }
    </Container>
  )
}

export default Sidebar

const Container=styled.div`

width:28%;
border-right:1px solid black;
overflow: scroll;
 ::-webkit-scrollbar{
display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;

@media (max-width: 399px) {
 width:100%
}

`

const StartButton =  styled.button`
    width:100%;
    padding:15px;
    border:0;
    outline:0;
    font-size:20px;
    margin-top:10px;
    background:#202c33;
    color:white;
    cursor:pointer;
    box-shadow: 2px 2px 2px 2px black;
`

const Search=styled.div`
    display: flex;
    padding: 10px;
    align-items :center;
    margin-top:10px`; 

const SearchIcon = styled(BiSearch)`
font-size: 20px;
color:white;

`

const SearchInput= styled.input`
flex: 1;
color: white;
outline: none;
padding: 10px;
border:none;
border-radius:5px;
background:#202c33;
font-size: 15px;
    
`

const Header =styled.div`
    display:flex;
    justify-content:space-between;
    padding:20px ;
    align-items:center;
    position: sticky; 
    top: 0; 
    
    border-bottom : black 0.5px solid;
    height:25px;
    background:#202c33;

`

const UserAvatar= styled.img`
color:white;
cursor: pointer;
margin: 0;
background:red;
margin-right:15px;
height:40px;
border-radius:50%;

:hover{
    opacity: 80%;
}
`;
const IconContainer = styled.div`
    color: #aebac1;
    display: flex;
    width: 40%;
    font-size:20px;
    justify-content: space-evenly
    ;
`