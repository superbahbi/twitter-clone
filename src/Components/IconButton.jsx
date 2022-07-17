import React from "react";
import styled from "styled-components";
const StyledIconButton = styled.button`
  color: #657786;
  padding: 0;
  border: none;
  background: none;
  // flex: 1 1 auto !important;
  color: ${(props) => props.color};

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => (props.width ? props.width : "36px")};
    height: ${(props) => (props.height ? props.height : "36px")};
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    border-radius: ${(props) =>
      props.borderRadius ? props.borderRadius : "0px"};
    background-color: ${(props) =>
      props.backgroundColor ? props.backgroundColor : ""};
    svg {
      width: ${(props) => (props.size ? props.size : "20px")};
      height: ${(props) => (props.size ? props.size : "20px")};
      fill: ${(props) => (props.color ? props.color : "#000")};
    }
    :hover {
      svg {
        fill: ${(props) => (props.hoverColor ? props.hoverColor : "#e7e7e8")};
      }
      border-radius: 30px;
      background-color: ${(props) =>
        props.hoverColorBackground ? props.hoverColorBackground : "#e7e7e8"};
    }
  }
`;
function IconButton(props) {
  return (
    <StyledIconButton
      id={props.id}
      style={props.style}
      className={props.className}
      type={props.type}
      name={props.name}
      onClick={props.handleClick}
      borderRadius={props.borderRadius}
      color={props.color}
      backgroundColor={props.backgroundColor}
      hoverColor={props.hoverColor}
      hoverColorBackground={props.hoverColorBackground}
      size={props.size}
      disabled={props.disabled}
      width={props.width}
      height={props.height}
    >
      {props.iconComponent && (
        <label className="icon">
          {props.iconComponent}
          {props.children}
        </label>
      )}
    </StyledIconButton>
  );
}
export default IconButton;
