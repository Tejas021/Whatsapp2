import React from 'react'
import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import moment from "moment"
const Message = ({user,message}) => {

  const [currentUser] = useAuthState(auth)


  const TypeOfUser = (currentUser.email===user)?Sender :Reciever
  return (
    <Container> <TypeOfUser>{message.message}
    <TimeStamp>{message.timestamp?moment(message.timestamp).format("LT"):"..."}</TimeStamp>
   </TypeOfUser>
  
   </Container>
  
  )
}

export default Message

const Container =styled.div`

`

const MessageBubble = styled.div`

width:fit-content;
padding:5px 10px;
padding-right:60px;
border-radius:8px;
margin:5px;
color:#e9edef;
max-width: 400px;
position:relative;

`

const Sender=styled(MessageBubble)`background-color:#005c4b;margin-left:auto;margin-right:100px;

@media(max-width:670px){
  margin-right:10px
}
`

const Reciever= styled(MessageBubble)`background-color:#202c33;margin-left:100px;
@media(max-width:670px){
  margin-left:10px
}

`

const TimeStamp =styled.p`
font-size:10px;
position :absolute;
right:0;
bottom:0 ;
margin-right:6px;
margin-bottom:2px;
/* background:red; */

`
  
