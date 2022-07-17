import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import IconButton from "../Components/IconButton";
import Avatar from "../Components/Avatar";
library.add(fas, far);
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
    background-color: rgba(255, 255, 255,0.99);
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
  color: #1da1f2;
  padding: 0.5em;
  cursor: pointer;
  max-width: 45px;
`;
function Header({
  avatar,
  iconLeft,
  iconRight,
  name,
  tweetCount,
  iconLeftComponent,
  iconRightComponent,
  onHandleIconRightButton,
}) {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      {(iconLeft || iconLeftComponent) && (
        <div className="left-icon">
          <HeaderIconButton
            icon={iconLeft}
            hoverColor="#000"
            iconComponent={iconLeftComponent}
            handleClick={() => {
              navigate(-1);
            }}
          />
        </div>
      )}
      {avatar && (
        <div className="avatar">
          <Avatar src={avatar} height="32px" width="32px" />
        </div>
      )}
      <HeaderName>{name}</HeaderName>

      {(iconRight || iconRightComponent) && (
        <div className="right-icon">
          <HeaderIconButton
            icon={iconRight}
            hoverColor="#000"
            iconComponent={iconRightComponent}
            handleClick={onHandleIconRightButton}
          />
        </div>
      )}
    </HeaderContainer>
  );
}
export default Header;
