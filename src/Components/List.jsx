import React, { useState } from "react";
import styled from "styled-components";
const ListItem = styled.li`
  display: flex;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) => (props.brand ? "#1da1f2" : "#000")};
  padding: 0.2em 1em 0.2em 1em;
  cursor: pointer;
`;
const ListContainer = styled.div`
  display: inline-flex;
  padding-left: 1em;
  padding-right: 1em;
  :hover {
    border-radius: 30px;
    background-color: ${(props) => (props.brand ? "#e8f5fe" : "#E7E7E8")};
  }
`;
const ListText = styled.p`
  font-size: 20px;
  padding-left: 10px;
  margin: auto;
`;
const ListIcon = styled.i`
  font-size: 36px;
  text-align: center;
`;

function List(props) {
  return (
    <ListItem
      id={props.id}
      brand={props.brand}
      active={props.active}
      onClick={props.onHandleClick}
    >
      {props.icon && (
        <ListContainer brand={props.brand}>
          {props.icon && (
            <ListIcon
              className={`${props.icon}${!props.active ? "-outline" : ""}`}
            />
          )}
          {props.name && <ListText>{props.name}</ListText>}
        </ListContainer>
      )}
    </ListItem>
  );
}
export default List;
