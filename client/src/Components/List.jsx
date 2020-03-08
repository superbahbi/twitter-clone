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
  padding: 0.5em 1em 0.5em 1em;
  margin-bottom: 0.5em;
  cursor: pointer;
  :hover {
    border-radius: 30px;
    background-color: #e8f5fe;
    color: #1da1f2;
  }
  :hover i {
    color: #1da1f2;
  }
  :hover span {
    color: #1da1f2;
  }
`;
const ListText = styled.span`
  padding-left: 1em;
  padding-right: 1em;
  font-size: 20px;
  font-weight: bolder;
  color: #434a52;
`;
const ListIcon = styled.i`
  margin-let: 10px;
  display: flex;
  font-size: 35px;
  width: 35px;
  color: #434a52;
`;

function List(props) {
  return (
    <ListItem id={props.id} onClick={props.onHandleClick}>
      {props.avatar ? (
        <img
          className="rounded-circle"
          height="35"
          width="35"
          src={props.avatar}
          alt=""
        />
      ) : (
        props.icon && <ListIcon className={props.icon}></ListIcon>
      )}

      {props.name && <ListText>{props.name}</ListText>}
    </ListItem>
  );
}
export default List;
