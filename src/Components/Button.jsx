import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: ${(props) => props.width || ""};
  height: ${(props) => (props.large && "52px") || "34px"};
  line-height: ${(props) => (props.large && "52px") || "34px"};

  color: ${(props) => (props.secondary && "#657786") || "#fff"};
  background-color: ${(props) => (props.secondary && "#fff") || "#1da1f2"};

  /// Float right if right is true
  ${(props) => {
    return props.right && `position: absolute; right: 20px; top: 245px`;
  }};
  font-size: ${(props) => (props.large && "17px") || "15px"};
  font-weight: ${(props) => (props.large && "600") || "600"};
  padding: ${(props) => (props.large && "0px 32px") || "0px 16px"};
  // margin: ${(props) => (props.secondary && "0rem") || "0.25em;"};

  border: none;
  border-radius: ${(props) =>
    (props.primary && "30px") || (props.large && "9999px") || "0px"};
  border-bottom: ${(props) => (props.secondary && "2px solid") || "none"};

  opacity: ${(props) => (props.disabled && "0.5") || "1"};
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
      disabled={props.disabled}
      onClick={props.handleClick}
    >
      {props.label}
    </StyledButton>
  );
}
export default Button;
