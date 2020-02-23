import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far);

const ListItem = styled.li`
  font-size: 16px;
  font-weight: 400;
  padding: 0.5em;
  align-items: baseline;
  cursor: pointer;
  :hover {
    border-radius: 30px;
    background-color: #e8f5fe;
    color: #1da1f2;
  }
`;
const ListText = styled.span`
  padding: 0.5em;
  align-self: center !important;
`;
const ListIcon = styled.span`
  padding-right: 0.5em;
`;

function List(props) {
  return (
    <ListItem id={props.id} onClick={props.onHandleClick}>
      <ListIcon>
        <FontAwesomeIcon
          icon={props.icon}
          size="2x"
          color={props.color}
          fixedWidth
        />
      </ListIcon>
      <ListText>{props.name}</ListText>
    </ListItem>
  );
}
export default List;
