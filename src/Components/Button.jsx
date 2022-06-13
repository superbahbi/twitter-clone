import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: ${(props) => props.width || "100%"};
  color: ${(props) => (props.secondary && "#657786") || "#fff"};
  background-color: ${(props) => (props.secondary && "#fff") || "#1da1f2"};
  text-align: center;
  /// Float right if right is true
  ${(props) => {
    return props.right && `position: absolute; right: 20px; top: 235px`;
  }};
  font-size: ${(props) => (props.large && "24px") || "16px"};
  border-radius: ${(props) =>
    (props.primary && "30px") || (props.large && "9999px") || "0px"};
  padding: ${(props) => (props.large && "1rem 2rem") || ".5rem"};
  margin: ${(props) => (props.secondary && "0rem") || "0.25em;"};
  line-height: 1.5;
  border: none;
  border-bottom: ${(props) => (props.secondary && "2px solid") || "none"};
  :focus {
    text-decoration: none;
    outline: none;
  }
  :hover {
    background-color: ${(props) => (props.secondary && "#e8f5fe") || "#1a91da"};
  }
  :focus {
    background-color: ${(props) => (props.secondary && "#e8f5fe") || "#1a91da"};
    color: ${(props) => (props.secondary && "#1da1f2") || "#fff"};
    border-bottom: ${(props) =>
      (props.secondary && "2px solid #1da1f2") || "none"};
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
`;

function Button(props) {
  console.log(props);
  return (
    <StyledButton
      primary={props.primary}
      secondary={props.secondary}
      profile={props.profile}
      large={props.large}
      width={props.width}
      right={props.right}
      id={props.id}
      type={props.type}
      name={props.name}
      onClick={props.handleClick}
    >
      {props.label}
    </StyledButton>
  );
}
export default Button;
