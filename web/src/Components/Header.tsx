import React, { useState, useContext, useRef } from "react";
import styled, { ThemeContext } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Context as AuthContext } from "../Contexts/AuthContext";
import IconButton from "../Components/IconButton";
import Avatar from "../Components/Avatar";
import Overlay from "react-bootstrap/Overlay";
import { IHeaderProps } from "../Helper/interface";
const HeaderContainer = styled.div`
  position: relative;
  top: -1px;
  display: flex;
  flex-direction: row;
  height: 53px;
  .left-icon {
    padding-right 16px;
  }
  .right-icon {
    margin-left: auto;
  }
  .avatar{
    display: none;
  }
  @media only screen and (max-width: 700px)  {
    position: fixed;
    height: 53px;
    margin: 0;
    background-color: ${(props) => props.theme.color.white};
    opacity: 0.99;
    width: 100%;
    z-index: 1;
    .avatar{
      display: block;
      align-self: center;
      padding-left 16px;
    }
  }
`;
const HeaderName = styled.div`
  font-size: 20px;
  font-weight: 900;
  align-self: center;
  padding: 0 16px;
`;

const HeaderIconButton = styled(IconButton)`
  font-size: 15px;
  color: ${(props) => props.theme.color.main};
  padding: 0.5em;
  cursor: pointer;
  max-width: 45px;
`;
const TooltipContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  color: ${(props) => props.theme.color.text};
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
      background-color: ${(props) => props.theme.color.hoverBackground};
    }
  }
`;

const Header: React.FC<IHeaderProps> = ({
  avatar,
  iconLeft,
  iconRight,
  name,
  // tweetCount,
  iconLeftComponent,
  iconRightComponent,
  onHandleIconRightButton,
}) => {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const { state, logout } = useContext(AuthContext);
  const { username } = state.user;
  function handleLogout() {
    logout();
    navigate("/login");
  }
  return (
    <HeaderContainer>
      {(iconLeft || iconLeftComponent) && (
        <div className="left-icon">
          <HeaderIconButton
            icon={iconLeft}
            hoverColor={theme.color.text}
            iconComponent={iconLeftComponent}
            handleClick={() => {
              navigate(-1);
            }}
          />
        </div>
      )}
      <Overlay
        target={target.current}
        show={show}
        placement="bottom"
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
      {avatar && (
        <div className="avatar" ref={target} onClick={() => setShow(!show)}>
          <Avatar src={avatar} height="32px" width="32px" />
        </div>
      )}
      <HeaderName>{name}</HeaderName>

      {(iconRight || iconRightComponent) && (
        <div className="right-icon">
          <HeaderIconButton
            icon={iconRight}
            hoverColor={theme.color.text}
            iconComponent={iconRightComponent}
            handleClick={onHandleIconRightButton}
          />
        </div>
      )}
    </HeaderContainer>
  );
};
export default Header;
