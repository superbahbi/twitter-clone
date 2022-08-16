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
  border: 1px solid ${(props) => props.theme.color.border};
  background-color: white;
  :hover {
    background-color: ${(props) => props.theme.color.hoverBackground}
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
  color: ${(props) => props.theme.color.lightText};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
interface ICardProps {
  thumbnail_url?: string;
  provider_name?: string;
  title?: string;
}
const Card: React.FC<ICardProps> = ({
  thumbnail_url,
  provider_name,
  title,
}) => {
  return (
    <CardContainer>
      <CardImage alt="thumbnail" src={thumbnail_url} />
      <CardContent>
        <div>{provider_name}</div>
        <div>{title}</div>
      </CardContent>
    </CardContainer>
  );
};
export default Card;
