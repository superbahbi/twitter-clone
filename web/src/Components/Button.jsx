import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: ${(props) => props.width || ""};
  height: ${(props) => (props.large && "52px") || "38px"};
  line-height: ${(props) => (props.large && "52px") || "34px"};

  color: ${(props) => (props.textColor && props.textColor) || "#fff"};
  background-color: ${(props) =>
    (props.secondary && "#fff") ||
    (props.backgroundColor && props.backgroundColor) ||
    "#1da1f2"};

  font-size: ${(props) => (props.large && "17px") || "15px"};
  font-weight: ${(props) => (props.large && "600") || "600"};
  padding: ${(props) => (props.large && "0px 32px") || "0px 16px"};

  border: none;
  border-radius: ${(props) =>
    (props.primary | props.secondary && "30px") ||
    (props.large && "9999px") ||
    "30px"};
  border: ${(props) =>
    (props.secondary && "1px solid rgb(207, 217, 222)") || "none"};

  opacity: ${(props) => (props.disabled && "0.5") || "1"};
  :focus {
    text-decoration: none;
    outline: none;
  }
  :hover {
    background-color: ${(props) =>
      (props.hoverBackgroundColor && props.hoverBackgroundColor) || "#1a91da"};
  }
`;
// :focus {
//    background-color: ${(props) =>
//     (props.secondary && "#e8f5fe") || "#1a91da"};
//   color: ${(props) => (props.secondary && "#1da1f2") || "#fff"};
//   border: ${(props) => (props.secondary && "1px solid #1da1f2") || "none"};
//   -webkit-box-shadow: none;
//   -moz-box-shadow: none;
//   box-shadow: none;
// }
function Button(props) {
  return (
    <StyledButton
      className={props.className}
      primary={props.primary}
      secondary={props.secondary}
      profile={props.profile}
      textColor={props.textColor}
      backgroundColor={props.backgroundColor}
      hoverBackgroundColor={props.hoverBackgroundColor}
      large={props.large}
      width={props.width}
      right={props.right}
      id={props.id}
      type={props.type}
      name={props.name}
      disabled={props.disabled}
      onClick={props.handleClick}
    >
      {props.label}
    </StyledButton>
  );
}
export default Button;