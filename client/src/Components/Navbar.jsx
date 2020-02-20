import React from "react";
import List from "./List";
import styled from "styled-components";

const ListStyle = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  text-align: center;
  color: #657786;
  align-items: baseline;
  margin-right: 50px;
  :hover {
  }
`;
function Navbar() {
  return (
    <ListStyle>
      <List id="icon" icon="dog" color="#1da1f2" />
      <List id="home" name="Home" icon="home" />
      <List id="explorer" name="Explorer" icon="hashtag" />
      <List id="notification" name="Notification" icon="bell" />
      <List id="messages" name="Messages" icon="envelope" />
      <List id="bookmarks" name="Bookmarks" icon="bookmark" />
      <List id="lists" name="Lists" icon="list" />
      <List id="profile" name="Profile" icon="circle" />
      <List id="logput" name="Logout" icon="circle" />
    </ListStyle>
  );
}
export default Navbar;
