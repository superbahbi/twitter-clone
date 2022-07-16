import React from "react";
import styled from "styled-components";
const ListItem = styled.li`
  display: flex;
  position: relative;
  height: 58.25px
  color: ${(props) => props.brand && "#1da1f2"};
  cursor: pointer;
    padding-bottom: ${(props) =>
      props.paddingBottom ? props.paddingBottom : "0px"};
`;
const ListContainer = styled.div`
  display: inline-flex;
  padding: 12px 12px;
  svg {
    width: ${(props) => (props.brand ? "30px" : "26.25px")};
    height: ${(props) => (props.brand ? "30px" : "26.25px")};
    fill: ${(props) => (props.brand ? "#1da1f2" : "#0f1419")};
  }
  :hover {
    border-radius: 30px;
    background-color: ${(props) => (props.brand ? "#e8f5fe" : "#E7E7E8")};
  }
`;
const ListText = styled.p`
  @media only screen and (max-width: 1250px) {
    display: none;
  }

  color: ${(props) => (props.brand ? "#1da1f2" : "#0f1419")};
  font-size: 20px;
  padding: 0px 12px;
  margin: auto;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;
function List(props) {
  return (
    <ListItem
      id={props.id}
      brand={props.brand}
      onClick={props.onHandleClick}
      paddingBottom={props.paddingBottom}
    >
      <ListContainer brand={props.brand}>
        <i>{props.icon}</i>
        {props.name && <ListText active={props.active}>{props.name}</ListText>}
      </ListContainer>
    </ListItem>
  );
}
export default List;
