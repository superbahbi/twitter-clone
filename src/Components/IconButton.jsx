import React from "react";
import styled from "styled-components";

const StyledIconButton = styled.button`
  color: #657786;
  padding: 0;
  border: none;
  background: none;
  flex: 1 1 auto !important;
  font-size: 25px;
`;

const TweetIcon = styled.i``;
function IconButton(props) {
  console.log(props);
  return (
    <StyledIconButton
      id={props.id}
      style={props.style}
      type={props.type}
      name={props.name}
      onClick={props.handleClick}
      className={props.icon}
    />
  );
}
export default IconButton;
