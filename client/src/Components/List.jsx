import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far);

const ListItem = styled.li`
  display: flex;
  font-size: 16px;
  font-weight: 400;
  padding: 0.5em;
  margin-bottom: 0.5em;
  cursor: pointer;
  :hover {
    border-radius: 30px;
    background-color: #e8f5fe;
    color: #1da1f2;
  }
`;
const ListText = styled.span`
  padding-left: 1em;
  padding-right: 1em;
  font-size: 20px;
  font-weight: bolder;
  color: black;
  :hover {
    color: #1da1f2;
  }
`;
const ListIcon = styled.span``;

function List(props) {
  return (
    <ListItem id={props.id} onClick={props.onHandleClick}>
      <FontAwesomeIcon icon={props.icon} size="2x" fixedWidth />
      {props.name && <ListText>{props.name}</ListText>}
    </ListItem>
  );
}
export default List;
