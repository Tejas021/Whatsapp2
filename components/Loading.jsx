import React from 'react'
import ReactLoading from 'react-loading';
import styled from "styled-components"
const Loading = () => {
  return (
    <Container>

    <LoginContainer>
    <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/768px-WhatsApp.svg.png?20220228223904"></Logo>
    <ReactLoading type="bars"  color={"#25D366 "} height={'20%'} width={'20%'} />
    </LoginContainer>
      </Container>
      )

}

export default Loading

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
box-shadow: 1px 1px 40px 20px #25D366 ;
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
font-weight:50px
`;