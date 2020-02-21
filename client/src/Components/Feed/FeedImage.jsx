import React from "react";
import styled from "styled-components";

const Image = styled.div`
  width: 100%;
  border: none;
  border-radius: 10px;
  padding-top: 5px;
`;

function FeedImage(props) {
  return (
    <Image>
      <div>
        <img src={props.src} alt="" />
      </div>
    </Image>
  );
}
export default FeedImage;
