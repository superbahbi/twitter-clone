import React from "react";
import styled from "styled-components";

const StyledIconButton = styled.button`
  color: #657786;
  padding: 0;
  border: none;
  background: none;
  flex: 1 1 auto !important;
  font-size: ${(props) => props.size || "25px"};
  color: ${(props) => props.color};
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
    />
  );
}
export default IconButton;
