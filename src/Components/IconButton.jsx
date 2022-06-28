import React from "react";
import styled from "styled-components";
const StyledIconButton = styled.button`
  color: #657786;
  padding: 0;
  border: none;
  background: none;
  // flex: 1 1 auto !important;
  color: ${(props) => props.color};

  .icon-right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    svg {
      width: 20px;
      height: 20px;
      fill: ${(props) => (props.color ? props.color : "#000")};
    }
    :hover {
      border-radius: 30px;
      background-color: ${(props) =>
        props.hoverColor ? props.hoverColor : "#e7e7e8"};
    }
  }
`;
function IconButton(props) {
  return (
    <StyledIconButton
      id={props.id}
      style={props.style}
      type={props.type}
      name={props.name}
      onClick={props.handleClick}
      className={props.icon}
      color={props.color}
      hoverColor={props.hoverColor}
      size={props.size}
      disabled={props.disabled}
    >
      {props.iconRightComponent && (
        <label className="icon-right">
          {props.iconRightComponent}
          {props.children}
        </label>
      )}
    </StyledIconButton>
  );
}
export default IconButton;
