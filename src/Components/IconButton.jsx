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
    width: 35px;
    height: 35px;
    svg {
      width: 20px;
      height: 20px;
      fill: #0f1419;
    }
    :hover {
      border-radius: 30px;
      background-color: #e7e7e8;
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
      size={props.size}
    >
      {props.iconRightComponent && (
        <div className="icon-right">{props.iconRightComponent}</div>
      )}
    </StyledIconButton>
  );
}
export default IconButton;
