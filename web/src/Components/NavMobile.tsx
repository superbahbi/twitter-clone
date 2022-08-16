import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import List from "../Components/List";
import { Home, Search, Notification, Messages } from "../Assets/Icon";
const NavMobileContainer = styled.div`
  display: none;
  @media only screen and (max-width: 700px) {
    display: block;
    position: fixed;
    bottom: 0;
    height: 53px;
    background-color: ${(props) => props.theme.color.white};
    width: 100%;
    z-index: 1;
  }
`;
const ListStyle = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0;
  margin: 0;
`;
const NavMobile: React.FC<{}> = ({}) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("home");
  function onHandleClick(id: string) {
    setIsActive(id);
    navigate(`/${id}`);
  }
  return (
    <NavMobileContainer>
      <ListStyle>
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
          icon={<Search active={isActive === "explorer" ? true : false} />}
          // onHandleClick={() => onHandleClick("explorer")}
        />
        <List
          active={isActive === "notification" ? true : false}
          id="notification"
          name="Notification"
          icon={
            <Notification active={isActive === "notification" ? true : false} />
          }
          // onHandleClick={() => onHandleClick("notification")}
        />
        <List
          active={isActive === "messages" ? true : false}
          id="messages"
          name="Messages"
          icon={<Messages active={isActive === "messages" ? true : false} />}
          // onHandleClick={() => onHandleClick("messages")}
        />
      </ListStyle>
    </NavMobileContainer>
  );
};

export default NavMobile;
