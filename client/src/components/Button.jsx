import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
const LoginButton = styled.button`
  color: #1da1f2;
  background-color: #fff;
  border-radius: 30px;
  border: 1px solid #1da1f2;
  text-align: center;
  font-size: 15px;
  font-weight: 600;

  padding: 0.375rem 0.75rem;
  margin: 0.25em;
  line-height: 1.5;
  :hover {
    background-color: #e8f5fe;
    color: #1da1f2;
  }
`;
const SignupButton = styled.button`
  color: #fff;
  background-color: #1da1f2;
  border-radius: 30px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  margin: 0.25em;
  line-height: 1.5;

  border: none;
  :focus {
    text-decoration: none;
    outline: none;
  }
  :hover {
    background-color: #1a91da;
  }
`;
function Button(props) {
  let history = useHistory();

  function handleClick() {
    history.push(props.to);
  }
  if (props.btnStyle === "login-btn") {
    return (
      <LoginButton type={props.type} name={props.name} onClick={handleClick}>
        {props.label}
      </LoginButton>
    );
  } else if (props.btnStyle === "signup-btn") {
    return (
      <SignupButton type={props.type} name={props.name} onClick={handleClick}>
        {props.label}
      </SignupButton>
    );
  } else {
    return null;
  }
}
export default Button;
