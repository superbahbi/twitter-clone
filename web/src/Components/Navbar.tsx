import React, { useState, useContext, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Context as AuthContext } from "../Contexts/AuthContext";
import Button from "./Button";
import List from "./List";
import Avatar from "./Avatar";
import Col from "react-bootstrap/Col";
import Overlay from "react-bootstrap/Overlay";
import TweetModal from "./TweetModal";
import IconButton from "./IconButton";
import { Tweet } from "../Assets/Icon";
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
import { INavProfileProps } from "../Helper/interface";
const NavbarContainer = styled(Col)`
  padding: 0;
  @media only screen and (max-width: 1250px) {
    max-width: 50px;
  }
  height: 100vh;
`;
const Nav = styled.nav`
  position: fixed;
  width: 251px;
  @media only screen and (max-width: 1250px) {
    width: 50px;
  }
  padding: 0;
`;
const ListStyle = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
`;
const NavProfileContainer = styled.div`
  display: flex;
  cursor: pointer;
  position: fixed;
  bottom: 0;
  padding: 12px 0px;
`;
const NavProfile = styled.div<INavProfileProps>`
  display: flex;
  justify-content: center;
  padding: 12px 12px;
  width: 251px;
  @media only screen and (max-width: 1250px) {
    width: 50px;
    padding: 6px 0px;
  }
  :hover {
    border-radius: 30px;
    background-color: ${(props) => (props.brand ? "#e8f5fe" : "#E7E7E8")};
  }
  .avatar {
    width: 40px;
    height: 40px;
  }
  .profile {
    display: flex;
    width: 100%;
    justify-content: space-between;
    @media only screen and (max-width: 1250px) {
      display: none;
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
  }
`;
const TweetButton = styled.div`
  width: 225px;
  @media only screen and (max-width: 1250px) {
    display: none;
  }
`;
const TweetIconButton = styled.div`
  width: 50px;
  @media only screen and (min-width: 1251px) {
    display: none;
  }
  @media only screen and (max-width: 1250px) {
    display: block;
  }
`;
const TooltipContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  color: #0f1419;
  width: 300px;
  border-radius: 16px;
  -webkit-box-shadow: rgb(101 119 134 / 20%) 0px 0px 15px,
    rgb(101 119 134 / 15%) 0px 0px 3px 1px;
  box-shadow: rgb(101 119 134 / 20%) 0px 0px 15px,
    rgb(101 119 134 / 15%) 0px 0px 3px 1px;
  div {
    padding: 16px 0px;
    text-align: left;
    margin: auto;
    cursor: pointer;
  }
  .text {
    padding: 16px 16px;
    :hover {
      background-color: #f7f7f7;
    }
  }
`;
const Navbar: React.FC<{}> = ({}) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showTweetModal, setShowTweetModal] = useState(false);
  const target = useRef(null);
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
    navigate("/login");
  }
  function onHandleClick(id: string) {
    setIsActive(id);
    if (id === "profile") {
      id = state.user.username;
    }
    navigate(`/${id}`);
  }
  function onHandleTweetModal() {
    setShowTweetModal(!showTweetModal);
  }
  return (
    <NavbarContainer>
      <Nav>
        <ListStyle>
          <List
            brand={true}
            id="icon"
            icon={<Twitter />}
            onHandleClick={() => {
              navigate("/home");
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
            id="more"
            name="More"
            icon={<More />}
            onHandleClick={() => onHandleClick("settings")}
            paddingBottom="20px"
          />
          <TweetButton>
            <Button
              large
              width="225px"
              id="tweet"
              name="button"
              type="submit"
              label="Tweet"
              handleClick={() => {
                onHandleTweetModal();
              }}
            />
          </TweetButton>
          <TweetIconButton>
            <IconButton
              type="button"
              iconComponent={<Tweet />}
              color="#fff"
              backgroundColor="#1da1f2"
              hoverColorBackground="#1A8CD8"
              borderRadius="30px"
              size="24px"
              width="50px"
              height="50px"
              handleClick={() => {
                onHandleTweetModal();
              }}
            />
          </TweetIconButton>
          <TweetModal
            show={showTweetModal}
            onHide={onHandleTweetModal}
            onHandleTweetModal={onHandleTweetModal}
          />
        </ListStyle>
        <NavProfileContainer>
          <Overlay
            target={target.current}
            show={show}
            placement="top"
            rootClose={true}
          >
            {({ placement, arrowProps, show: _show, popper, ...props }) => (
              <TooltipContainer {...props}>
                <div>
                  <div className="text">
                    <span className="name">Add an existing account</span>
                  </div>
                  <div className="text">
                    <span className="name">Manage accounts</span>
                  </div>
                  <div className="text" onClick={handleLogout}>
                    Log out @{username}
                  </div>
                </div>
              </TooltipContainer>
            )}
          </Overlay>
          <NavProfile ref={target} onClick={() => setShow(!show)}>
            <div className="avatar">
              <Avatar mini src={filename} height="40px" width="40px" />
            </div>
            <div className="profile">
              <div className="text">
                <span className="name">{name}</span>
                <span className="username">@{username}</span>
              </div>

              <span className="threedot">
                <Threedot />
              </span>
            </div>
          </NavProfile>
        </NavProfileContainer>
      </Nav>
    </NavbarContainer>
  );
};

export default Navbar;
