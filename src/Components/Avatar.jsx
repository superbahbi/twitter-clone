import React from "react";
import styled from "styled-components";

// Styled Components
const AvatarContainer = styled.div`
  padding: 0.5em;
`;

function Avatar({ src, name, nohref }) {
  const img = (
    <img
      className="rounded-circle"
      src={src}
      height="49"
      width="49"
      alt={name}
    />
  );
  return (
    <AvatarContainer>{nohref ? img : <a href={name}>{img}</a>}</AvatarContainer>
  );
}
export default Avatar;
