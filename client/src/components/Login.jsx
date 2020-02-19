import React from 'react';
import Input from './Input';
import Button from './Button';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDog } from '@fortawesome/free-solid-svg-icons'
const SplitPage = styled.div`
    display: flex;
    height: 100vh;
`;
const RightSide = styled.div`
    flex-grow: 2;
    min-width: 50%;
    background-color: #FFFFFF
`;
const LeftSide = styled.div`
    flex-grow: 2;
    min-width: 50%;
    background-color: #71C9F8
`;
const LoginInput =  styled.div`
    flex-direction: row;
    padding: .5em;
    
`;
const SubHeading = styled.p`
  font-size: 2em;
  font-weight: bold;
  text-align: left;
  color: black;
`;
const SubText = styled.p`
  font-size: 1.2em;
  font-weight: lighter;
  text-align: left;
  color: black;
`;
const LoginCenter = styled.div`
    flex-direction: column;
    max-width: 40%;
    display: flex;
    justify-content: center;    
    width: 75%!important;
    align-self: center;
`;
const SubLogin = styled.div`
    flex-direction: column;
    height: 100vh; 
    display: flex; 
    justify-content: center;
    padding: 15em;
`;

function Login(){
    return (
        <SplitPage >
            <LeftSide></LeftSide>
            <RightSide>
                <LoginInput>
                    <Input name="Username" />
                    <Input name="Password" />
                    <Button name="button" type="submit" label="Log in" btnStyle="login-btn"/>
                </LoginInput>
                <SubLogin>
                    <FontAwesomeIcon icon={faDog} size="4x" color="#1DA1F2" />
                    <SubHeading>See what’s happening in the world right now</SubHeading>
                    <SubText>Join not twitter today.</SubText>
                    <Button name="button" type="submit" label="Sign up" btnStyle="signup-btn"/>
                    <Button name="button" type="submit" label="Log in" btnStyle="login-btn"/>
                </SubLogin>
            </RightSide>
        </SplitPage>
      );
}
export default Login;