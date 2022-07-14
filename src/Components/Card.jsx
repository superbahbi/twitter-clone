import React from "react";
import styled from "styled-components";

// Styled Components
const CardContainer = styled.div`
  display: grid;
  grid-template-areas: "image" "content";
  grid-template-columns: 129px 1fr;
  justify-items: stretch
  align-items: stretch
  height: 129px;
  width: 100%;
  border-radius: 16px;
  border: 1px solid #CFD9DE;
  background-color: white;
  :hover {
    background-color: #F7F9F9
  }

`;
const CardImage = styled.img`
  grid-area: image;
  height: 129px;
  width: 129px;
  border-radius: 0px !important;
  border-bottom-left-radius: 16px !important;
  border-top-left-radius: 16px !important;
`;
const CardContent = styled.div`
  padding: 12px;
  font-size: 15px;
  font-weight: 300;
  color: #536471;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function Card({ data }) {
  return (
    <CardContainer>
      <CardImage alt="thumbnail" src={data.thumbnail_url} />

      <CardContent>
        <div>{data.provider_name}</div>
        <div>{data.title}</div>
      </CardContent>
    </CardContainer>
  );
}
export default Card;
