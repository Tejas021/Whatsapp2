import { Head } from 'next/document'
import React from 'react'
import styled from "styled-components"
import {auth , provider } from "../firebaseConfig"
import { signInWithPopup ,GoogleAuthProvider} from 'firebase/auth'
const Login = () => {

const DoLogin=()=>{
    signInWithPopup(auth,provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        console.log(user)
      }).catch(alert)
}
  return (
  <Container>

<LoginContainer>
<Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/768px-WhatsApp.svg.png?20220228223904"></Logo>
<LoginButton onClick={DoLogin}><Logo1 src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png'></Logo1>  LOGIN WITH GOOGLE</LoginButton>
</LoginContainer>
  </Container>
  )
}

export default Login

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

const LoginContainer = styled.div`
display: flex;
margin-top:10%;
flex-direction:column;
justify-content: space-evenly;
height:450px;
align-items: center;
background:#202c33;
width: 350px;
border-radius: 10px;
box-shadow: 1px 1px 40px 20px green;
`;

const Logo =styled.img`
height:200px;
width:200px
`;

const Logo1 =styled.img`
height:15px;
width:15px;
margin-inline:8px
`;

const LoginButton = styled.button`
display: flex;
border-radius: 5px;
align-items: center;
justify-content:space-around;
border:none;
outline:none;
padding:10px;
background-color: 	#25D366 ;
color: white;
cursor: pointer;
font-weight:50px;

`;