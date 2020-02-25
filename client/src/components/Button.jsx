import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far);

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

const InputTweetIcon = styled.button`
  color: #71c9f8;
  font-size: 2em;
  padding: 0;
  border: none;
  background: none;
  padding: 0 5px 0 5px;
  width: 45px;
  height: 45px;
  cursor: pointer;
`;

const TweetTweetIcon = styled.button`
  color: #657786;
  padding: 0;
  border: none;
  background: none;
  flex: 1 1 auto !important;
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
  ${"" /* margin-left: ${props.position ? "auto!important" : "null"}; */}
`;
const ProfileButton = styled.button`
  font-weight: bold;
  color: #657786;
  background-color: #fff;
  border-style: none;
  border-radius: 0;
  padding: 0.5em;
  flex: 1 1 auto !important;
  border-bottom: 2px solid;
  :hover {
    background-color: #e8f5fe;
    color: #1da1f2;
  }
  :focus {
    background-color: #e8f5fe;
    color: #1da1f2;
    border-bottom: 2px solid #1da1f2;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
`;
function Button(props) {
  let history = useHistory();

  if (props.btnStyle === "login-btn") {
    return (
      <LoginButton
        id={props.id}
        type={props.type}
        name={props.name}
        onClick={props.handleClick}
      >
        {props.label}
      </LoginButton>
    );
  } else if (props.btnStyle === "signup-btn") {
    return (
      <SignupButton
        id={props.id}
        type={props.type}
        name={props.name}
        onClick={props.handleClick}
      >
        {props.label}
      </SignupButton>
    );
  } else if (props.btnStyle === "input-tweet-icon") {
    return (
      <InputTweetIcon
        id={props.id}
        type={props.type}
        name={props.name}
        onClick={props.handleClick}
      >
        <FontAwesomeIcon icon={props.icon} fixedWidth />
      </InputTweetIcon>
    );
  } else if (props.btnStyle === "feed-tweet-icon") {
    return (
      <TweetTweetIcon
        id={props.id}
        type={props.type}
        name={props.name}
        onClick={props.handleClick}
      >
        <FontAwesomeIcon icon={props.icon} size={props.size} fixedWidth />
      </TweetTweetIcon>
    );
  } else if (props.btnStyle === "profile-btn") {
    return (
      <ProfileButton
        id={props.id}
        type={props.type}
        name={props.name}
        onClick={props.handleClick}
      >
        {props.label}
      </ProfileButton>
    );
  } else {
    return null;
  }
}
export default Button;
