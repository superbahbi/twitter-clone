import React, { useState } from "react";
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
  const [isActive, setIsActive] = useState("home");
  let history = useHistory();
  const navList = [
    { id: "home", name: "Home", icon: "ion-ios-home" },
    { id: "explorer", name: "Explorer", icon: "ion-ios-location" },
    { id: "notification", name: "Notification", icon: "ion-ios-bell" },
    { id: "messages", name: "Messages", icon: "ion-ios-email" },
    { id: "bookmarks", name: "Bookmarks", icon: "ion-ios-bookmarks" },
    { id: "settings", name: "Settings", icon: "ion-ios-gear" },
    { id: props.username, name: "Profile", icon: "ion-ios-people" },
  ];
  function handleLogout(event) {
    event.preventDefault();
    // Remove the token from localStorage
    localStorage.removeItem("authData");
    history.push("/");
  }
  function onHandleClick(id) {
    setIsActive(id);
    history.push(`/${id}`);
  }
  return (
    <Nav>
      <ListStyle>
        <List
          brand={true}
          id="icon"
          icon="icon ion-ios-paw"
          color="#1da1f2"
          onHandleClick={() => {
            history.push("/home");
          }}
        />

        {navList.map((item, index) => {
          return (
            <List
              active={isActive === item.id ? true : false}
              key={index}
              id={item.id}
              name={item.name}
              icon={item.icon}
              onHandleClick={() => onHandleClick(item.id)}
            />
          );
        })}
        <List
          id="logout"
          name="Logout"
          icon="icon ion-ios-refresh"
          onHandleClick={handleLogout}
        />
      </ListStyle>
    </Nav>
  );
}
export default Navbar;
