import React from "react";
import List from "./List";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
const Nav = styled.div`
  position: fixed;
`;
const ListStyle = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-left: 0;
  list-style: none;
  text-align: center;
  align-items: baseline;
  margin-right: 50px;
  :hover {
  }
`;
function Navbar(props) {
  let history = useHistory();
  function handleLogout(event) {
    event.preventDefault();
    // Remove the token from localStorage
    localStorage.removeItem("authData");
    history.push("/");
  }

  return (
    <Nav>
      <ListStyle>
        <List
          id="icon"
          icon="dog"
          color="#1da1f2"
          onHandleClick={() => {
            history.push("/home");
          }}
        />
        <List
          id="home"
          name="Home"
          icon="home"
          onHandleClick={() => {
            history.push("/home");
          }}
        />
        <List
          id="explorer"
          name="Explorer"
          icon="hashtag"
          onHandleClick={() => {
            history.push("/explorer");
          }}
        />
        <List
          id="notification"
          name="Notification"
          icon="bell"
          onHandleClick={() => {
            history.push("/notification");
          }}
        />
        <List
          id="messages"
          name="Messages"
          icon="envelope"
          onHandleClick={() => {
            history.push("/messages");
          }}
        />
        <List
          id="bookmarks"
          name="Bookmarks"
          icon="bookmark"
          onHandleClick={() => {
            history.push("/bookmarks");
          }}
        />
        <List
          id="settings"
          name="Settings"
          icon="sliders-h"
          onHandleClick={() => {
            history.push("/settings");
          }}
        />
        <List
          id="profile"
          name="Profile"
          icon="circle"
          onHandleClick={() => {
            history.push(props.username);
          }}
        />
        <List
          id="logout"
          name="Logout"
          icon="circle"
          onHandleClick={handleLogout}
        />
      </ListStyle>
    </Nav>
  );
}
export default Navbar;
