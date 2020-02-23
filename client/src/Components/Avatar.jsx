import React from "react";
import styled from "styled-components";
const IconContainer = styled.div`
  padding: 0.5em;
`;
function Avatar(props) {
  return (
    <IconContainer>
      <a href={props.name}>
        <img
          className="rounded-circle"
          src={props.src}
          height="49"
          width="49"
        />
      </a>
    </IconContainer>
  );
}
export default Avatar;
