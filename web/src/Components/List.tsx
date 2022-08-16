import React from "react";
import styled from "styled-components";
import { IListProps } from "../Helper/interface";
const ListItem = styled.li<IListProps>`
  display: flex;
  position: relative;
  height: 58.25px
  color: ${(props) => props.brand && props.theme.color.main};
  cursor: pointer;
    padding-bottom: ${(props) =>
      props.paddingBottom ? props.paddingBottom : "0px"};
`;
const ListContainer = styled.div<IListProps>`
  display: inline-flex;
  padding: 12px 12px;
  svg {
    width: ${(props) => (props.brand ? "30px" : "26.25px")};
    height: ${(props) => (props.brand ? "30px" : "26.25px")};
    fill: ${(props) =>
      props.brand ? props.theme.color.main : props.theme.color.text};
  }
  :hover {
    border-radius: 30px;
    background-color: ${(props) =>
      props.brand
        ? props.theme.color.hoverLightBackground
        : props.theme.color.icon};
  }
`;
const ListText = styled.p<IListProps>`
  @media only screen and (max-width: 1250px) {
    display: none;
  }

  color: ${(props) =>
    props.brand ? props.theme.color.main : props.theme.color.text};
  font-size: 20px;
  padding: 0px 12px;
  margin: auto;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;
const List: React.FC<IListProps> = ({
  id,
  brand,
  onHandleClick,
  paddingBottom,
  icon,
  name,
  active,
}) => {
  return (
    <ListItem
      id={id}
      brand={brand}
      onClick={onHandleClick}
      paddingBottom={paddingBottom}
    >
      <ListContainer brand={brand}>
        <i>{icon}</i>
        {name && <ListText active={active}>{name}</ListText>}
      </ListContainer>
    </ListItem>
  );
};
export default List;
