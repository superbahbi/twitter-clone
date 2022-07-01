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

  display: flex;
  flex-direction: row;
  padding: 0 16px;
  height: 53px;
  .left-icon {
    align-self: center;
    padding-right 16px;
  }
  .right-icon {
    align-self: center;
    margin-left: auto;
  }
  .avatar{
    display: none;
  }
  @media only screen and (max-width: 700px) and (-webkit-min-device-pixel-ratio: 3) {
    display: flex;
    position: fixed;
    height: 53px;
    margin: 0;
    background-color: rgba(255, 255, 255,0.99);
    width: 100%;
    z-index: 1;
    .avatar{
      display: block;
      align-self: center;
      padding-right 16px;
    }
  }
`;
const HeaderName = styled.div`
  font-size: 20px;
  font-weight: 600;
  align-self: center;
`;

const HeaderIconButton = styled(IconButton)`
  font-size: 15px;
  color: #1da1f2;
  padding: 0.5em;
  cursor: pointer;

  max-width: 45px;
`;
const ProfileTweetCount = styled.div`
  color: #657786;
  font-size: 14px;
  font-weight: lighter;
  padding-left: 10px;
`;
function Header({
  avatar,
  iconLeft,
  iconRight,
  name,
  tweetCount,
  iconRightComponent,
  onHandleIconRightButton,
}) {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      {iconLeft && (
        <div className="left-icon">
          <HeaderIconButton
            icon="icon ion-ios-arrow-left"
            color="#1da1f2"
            hoverColor="#1da1f2"
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
      {tweetCount && (
        <ProfileTweetCount>{tweetCount + " Tweets"}</ProfileTweetCount>
      )}

      {(iconRight || iconRightComponent) && (
        <div className="right-icon">
          <HeaderIconButton
            icon={iconRight}
            hoverColor="#000"
            iconRightComponent={iconRightComponent}
            handleClick={onHandleIconRightButton}
          />
        </div>
      )}
    </HeaderContainer>
  );
}
export default Header;
