import React from "react";
import styled from "styled-components";
const IconContainer = styled.div`
  padding: 0.5em;
`;
function Avatar({ src, name, nohref }) {
  return (
    <IconContainer>
      {nohref ?
        <img
          className="rounded-circle"
          src={src}
          height="49"
          width="49"
          alt={name}
        />
        :
        <a href={name}>
          <img
            className="rounded-circle"
            src={src}
            height="49"
            width="49"
            alt={name}
          />
        </a>
      }

    </IconContainer>
  );
}
export default Avatar;
