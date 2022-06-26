import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Context as AuthContext } from "../Contexts/AuthContext";
import Button from "../Components/Button";
import List from "../Components/List";
import Avatar from "./Avatar";
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
  Threedot,
} from "../Assets/Icon";
const NavbarContainer = styled(Col)`
  padding: 0px 12px;
  height: 100vh;
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
const NavProfileContainer = styled.div`
  display: flex;
  height: 58.25px
  color:"#000"
  cursor: pointer;
  position: fixed;
  bottom: 0;
  padding: 12px 0px;
`;
const NavProfile = styled.div`
  display: flex;
  padding: 12px 12px;
  width: 251px;
  :hover {
    border-radius: 30px;
    background-color: ${(props) => (props.brand ? "#e8f5fe" : "#E7E7E8")};
  }
  .text {
    display: grid;
    vertical-align: middle;
    padding: 0px 12px;
  }
  .name {
    font-size: 15px;
    font-weight: 600;
    color: #0f1419;
    height: 15px;
  }
  .username {
    font-size: 15px;
    font-weight: 300;
    color: #436471;
    height: 15px;
  }
  .threedot {
    align-self: center;
    margin-left: auto;
    svg {
      width: 20px;
      height: 20px;
      fill: #0f1419;
    }
  }
`;
function Navbar() {
  const nagivate = useNavigate();
  const { state, logout } = useContext(AuthContext);
  const {
    username,
    profile: { name },
    profile: {
      avatar: { filename },
    },
  } = state.user;
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
            active={isActive === "home" ? true : false}
            id="home"
            name="Home"
            icon={<Home active={isActive === "home" ? true : false} />}
            onHandleClick={() => onHandleClick("home")}
          />
          <List
            active={isActive === "explorer" ? true : false}
            id="explorer"
            name="Explorer"
            icon={<Explorer active={isActive === "explorer" ? true : false} />}
            onHandleClick={() => onHandleClick("explorer")}
          />
          <List
            active={isActive === "notification" ? true : false}
            id="notification"
            name="Notification"
            icon={
              <Notification
                active={isActive === "notification" ? true : false}
              />
            }
            onHandleClick={() => onHandleClick("notification")}
          />
          <List
            active={isActive === "messages" ? true : false}
            id="messages"
            name="Messages"
            icon={<Messages active={isActive === "messages" ? true : false} />}
            onHandleClick={() => onHandleClick("messages")}
          />
          <List
            active={isActive === "bookmarks" ? true : false}
            id="bookmarks"
            name="Bookmarks"
            icon={
              <Bookmarks active={isActive === "bookmarks" ? true : false} />
            }
            onHandleClick={() => onHandleClick("bookmarks")}
          />
          <List
            active={isActive === "lists" ? true : false}
            id="lists"
            name="Lists"
            icon={<Lists active={isActive === "lists" ? true : false} />}
            onHandleClick={() => onHandleClick("lists")}
          />
          <List
            active={isActive === "profile" ? true : false}
            id="profile"
            name="Profile"
            icon={<Profile active={isActive === "profile" ? true : false} />}
            onHandleClick={() => onHandleClick("profile")}
          />
          <List
            // active={isActive === "Settings" ? true : false}
            id="more"
            name="More"
            icon={<More />}
            onHandleClick={() => onHandleClick("Settings")}
            paddingBottom="5px"
          />

          {/* <List
            id="logout"
            name="Logout"
            icon="icon ion-ios-refresh"
            onHandleClick={handleLogout}
          /> */}
          <Button
            large
            id="tweet"
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
      <NavProfileContainer>
        <NavProfile>
          <div>
            <Avatar mini src={filename} height="40px" width="40px" />
          </div>

          <div className="text">
            <span className="name">{name}</span>
            <span className="username">@{username}</span>
          </div>

          <span className="threedot">
            <Threedot />
          </span>
        </NavProfile>
      </NavProfileContainer>
    </NavbarContainer>
  );
}

export default Navbar;
