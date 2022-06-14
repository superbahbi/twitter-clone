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
          icon="icon ion-ios-paw-outline"
          color="#1da1f2"
          onHandleClick={() => {
            history.push("/home");
          }}
        />
        <List
          id="home"
          name="Home"
          icon="icon ion-ios-home-outline"
          onHandleClick={() => {
            history.push("/home");
          }}
        />
        <List
          id="explorer"
          name="Explorer"
          icon="icon ion-ios-location-outline"
          onHandleClick={() => {
            history.push("/explorer");
          }}
        />
        <List
          id="notification"
          name="Notification"
          icon="icon ion-ios-bell-outline"
          onHandleClick={() => {
            history.push("/notification");
          }}
        />
        <List
          id="messages"
          name="Messages"
          icon="icon ion-ios-paperplane-outline"
          onHandleClick={() => {
            history.push("/messages");
          }}
        />
        <List
          id="bookmarks"
          name="Bookmarks"
          icon="icon ion-ios-bookmarks-outline"
          onHandleClick={() => {
            history.push("/bookmarks");
          }}
        />
        <List
          id="settings"
          name="Settings"
          icon="icon ion-ios-gear-outline"
          onHandleClick={() => {
            history.push("/settings");
          }}
        />
        <List
          id="profile"
          name="Profile"
          icon="icon ion-ios-people-outline"
          onHandleClick={() => {
            history.push(props.username);
          }}
        />
        <List
          id="logout"
          name="Logout"
          icon="icon ion-ios-loop"
          onHandleClick={handleLogout}
        />
      </ListStyle>
    </Nav>
  );
}
export default Navbar;
