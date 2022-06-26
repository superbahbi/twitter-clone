import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Context as AuthContext } from "../Contexts/AuthContext";
import Button from "../Components/Button";
import Col from "react-bootstrap/Col";
import {
  Twitter,
  Home,
  Explorer,
  Notification,
  Messages,
  Bookmarks,
  Lists,
  Profile,
  More,
} from "../Assets/Icon";
const NavbarContainer = styled(Col)`
  padding: 0px 12px;
`;
const Nav = styled.nav`
  position: fixed;
  width: 251px;
  padding: 0;
`;
const ListStyle = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0;
  margin: 0
  :hover {
  }
`;
const ListItem = styled.li`
  display: flex;
  height: 58.25px

  color: ${(props) => (props.brand ? "#1da1f2" : "#000")};

  cursor: pointer;

`;
const ListContainer = styled.div`
  display: inline-flex;
  padding: 12px 12px;
  svg {
    width: ${(props) => (props.brand ? "30px" : "26.25px")};
    height: ${(props) => (props.brand ? "30px" : "26.25px")};
    fill: ${(props) => (props.brand ? "#1da1f2" : "#000")};
  }
  :hover {
    border-radius: 30px;
    background-color: ${(props) => (props.brand ? "#e8f5fe" : "#E7E7E8")};
  }
`;
const ListText = styled.p`
  font-size: 20px;
  padding: 0px 12px;
  margin: auto;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;

function Navbar() {
  const nagivate = useNavigate();
  const { state, logout } = useContext(AuthContext);
  const [isActive, setIsActive] = useState("home");

  function handleLogout() {
    logout();
    nagivate("/login");
  }
  function onHandleClick(id) {
    setIsActive(id);
    nagivate(`/${id}`);
  }
  return (
    <NavbarContainer lg={3}>
      <Nav>
        <ListStyle>
          <List
            brand={true}
            id="icon"
            icon={<Twitter />}
            color="#1da1f2"
            onHandleClick={() => {
              nagivate("/home");
            }}
          />

          <List
            active={isActive === "Home" ? true : false}
            id="Home"
            name="Home"
            icon={<Home active={isActive === "Home" ? true : false} />}
            onHandleClick={() => onHandleClick("Home")}
          />
          <List
            active={isActive === "Explorer" ? true : false}
            id="Explorer"
            name="Explorer"
            icon={<Explorer active={isActive === "Explorer" ? true : false} />}
            onHandleClick={() => onHandleClick("Explorer")}
          />
          <List
            active={isActive === "Notification" ? true : false}
            id="Notification"
            name="Notification"
            icon={
              <Notification
                active={isActive === "Notification" ? true : false}
              />
            }
            onHandleClick={() => onHandleClick("Notification")}
          />
          <List
            active={isActive === "Messages" ? true : false}
            id="Messages"
            name="Messages"
            icon={<Messages active={isActive === "Messages" ? true : false} />}
            onHandleClick={() => onHandleClick("Messages")}
          />
          <List
            active={isActive === "Bookmarks" ? true : false}
            id="Bookmarks"
            name="Bookmarks"
            icon={
              <Bookmarks active={isActive === "Bookmarks" ? true : false} />
            }
            onHandleClick={() => onHandleClick("Bookmarks")}
          />
          <List
            active={isActive === "Lists" ? true : false}
            id="Lists"
            name="Lists"
            icon={<Lists active={isActive === "Lists" ? true : false} />}
            onHandleClick={() => onHandleClick("Lists")}
          />
          <List
            active={isActive === "Profile" ? true : false}
            id="Profile"
            name="Profile"
            icon={<Profile active={isActive === "Profile" ? true : false} />}
            onHandleClick={() => onHandleClick("Profile")}
          />
          <List
            // active={isActive === "Settings" ? true : false}
            id="More"
            name="More"
            icon={<More />}
            onHandleClick={() => onHandleClick("Settings")}
          />

          {/* <List
            id="logout"
            name="Logout"
            icon="icon ion-ios-refresh"
            onHandleClick={handleLogout}
          /> */}
          <Button
            large
            id="tweets"
            name="button"
            type="submit"
            label="Tweet"
            footer={false}
            handleClick={() => {
              // onHandleModal();
            }}
          />
        </ListStyle>
      </Nav>
    </NavbarContainer>
  );
}
function List(props) {
  return (
    <ListItem id={props.id} brand={props.brand} onClick={props.onHandleClick}>
      <ListContainer brand={props.brand}>
        <i>{props.icon}</i>
        {props.name && <ListText active={props.active}>{props.name}</ListText>}
      </ListContainer>
    </ListItem>
  );
}
export default Navbar;
