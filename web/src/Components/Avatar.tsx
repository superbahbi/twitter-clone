import React from "react";
import styled from "styled-components";
import { IAvatarProps, IAvatarContainerProps } from "../Helper/interface";

// Styled Components
const AvatarContainer = styled.div<IAvatarContainerProps>`
  padding: ${(mini) => (mini ? "0px" : "0.5rem")};
`;
const Avatar: React.FC<IAvatarProps> = ({
  src,
  name,
  nohref,
  height,
  width,
  mini,
}) => {
  const img = (
    <img
      className="rounded-circle"
      src={src}
      height={height ? height : "49px"}
      width={width ? width : "49px"}
      alt={name}
      loading="lazy"
    />
  );
  return (
    <AvatarContainer mini={mini}>
      {nohref ? img : <a href={name}>{img}</a>}
    </AvatarContainer>
  );
};
export default Avatar;
