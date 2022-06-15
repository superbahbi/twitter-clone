import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import IconButton from "../Components/IconButton";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
library.add(fas, far);
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;

  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  padding: 0 8px 0 8px;
  border: 1px solid rgb(239, 243, 244);
  :hover {
    background-color: #f5f8fa;
  }
`;
const HeaderName = styled.div`
  padding-left: ${(props) => !props.iconLeft && "10px"};
  font-size: 24px;
  font-weight: bold;
`;

const HeaderIconButton = styled(IconButton)`
  font-size: 15px;
  color: #1da1f2;
  padding: 0.5em;
  cursor: pointer;
`;
const ProfileTweetCount = styled.div`
  color: #657786;
  font-size: 14px;
  font-weight: lighter;
  padding-left: 10px;
`;
function Header(props) {
  let history = useHistory();
  return (
    <HeaderContainer>
      {props.iconLeft && (
        <Col md={1}>
          <HeaderIconButton
            icon="icon ion-ios-arrow-left"
            color="#1da1f2"
            size="30px"
            handleClick={() => {
              history.goBack();
            }}
          />
        </Col>
      )}

      <Col md={10}>
        <HeaderName>{props.name}</HeaderName>
        <ProfileTweetCount>
          {props.tweetCount && props.tweetCount + " Tweets"}
        </ProfileTweetCount>
      </Col>
      <Col md={1}>
        {props.iconRight && (
          <HeaderIconButton
            icon={props.iconRight}
            color="#1da1f2"
            size="30px"
            handleClick={props.onHandleIconRightButton}
          />
        )}
      </Col>
    </HeaderContainer>
    // <TweetBox>
    //   {/* <ProfileArrow
    //     onClick={() => {
    //       history.goBack();
    //     }}
    //   >
    //     <FontAwesomeIcon icon="arrow-left" fixedWidth />
    //   </ProfileArrow> */}

    //   <ProfileBox>
    //     <ProfileIconButton
    //       icon="icon ion-ios-arrow-left"
    //       color="#1da1f2"
    //       size="30px"
    //       handleClick={() => {
    //         history.goBack();
    //       }}
    //     />
    //     <ProfileName>{props.name}</ProfileName>
    // <ProfileTweetCount>
    //   {props.tweetCount && props.tweetCount + " Tweets"}
    // </ProfileTweetCount>
    //     <ProfileIconButton
    //       icon="icon ion-ios-email-outline"
    //       color="#1da1f2"
    //       size="30px"
    //       handleClick={() => {
    //         // onHandleModal();
    //       }}
    //     />
    //   </ProfileBox>
    // </TweetBox>
  );
}
export default Header;
