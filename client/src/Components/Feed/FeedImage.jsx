import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: 100%;
  border: none;
  border-radius: 10px;
  padding-top: 5px;
`;

function FeedImage(props) {
  return <Image src={props.src} alt="" />;
}
export default FeedImage;
