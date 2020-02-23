import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far);
const TweetBox = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  line-height: 16px;
  border-color: #eee #ddd #bbb;
  border-style: solid;
  border-width: 1px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  padding: 0 16px 0 16px;
  :hover {
    background-color: #f5f8fa;
  }
`;
const ProfileBox = styled.div`
  display: flex !important;
  flex-direction: column !important;
  padding-left: 20px;
  padding: 0.5em;
`;
const ProfileArrow = styled.div`
  font-size: 15px;
  color: #1da1f2;
  padding: 0.5em;
`;
const ProfileName = styled.div`
  margin-bottom: 5px;
  font-size: 24px;
  font-weight: bold;
`;
const ProfileTweetCount = styled.div`
  color: #657786;
  font-size: 14px;
  font-weight: lighter;
`;
function FeedHeader(props) {
  return props.page === "Home" ? (
    <TweetBox>
      <h3>{props.page}</h3>
    </TweetBox>
  ) : (
    <TweetBox>
      <ProfileArrow>
        <a href="" onclick="window.history.back()">
          <FontAwesomeIcon icon="arrow-left" fixedWidth />
        </a>
      </ProfileArrow>
      <ProfileBox>
        <ProfileName>{props.data.profile.name}</ProfileName>
        <ProfileTweetCount>{props.data.tweets} Tweets</ProfileTweetCount>
      </ProfileBox>
    </TweetBox>
  );
}
export default FeedHeader;
