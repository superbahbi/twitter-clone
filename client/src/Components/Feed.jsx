import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import ProfileIcon from ".././Components/ProfileIcon";
import FeedName from ".././Components/Feed/FeedName";
import FeedTag from ".././Components/Feed/FeedTag";
import FeedDate from ".././Components/Feed/FeedDate";
import FeedContent from ".././Components/Feed/FeedContent";
import FeedImage from ".././Components/Feed/FeedImage";
import FeedFooter from "./Feed/FeedFooter";

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

const TweetContainer = styled.div`
  padding: 0.5em;
  flex: 1 1 auto !important;
`;

const TweetBody = styled.div`
  display: flex;
`;
const feedData = ["test1", "test2"];
function Feed(props) {
  return props.tweet
    ? props.tweet.map(item => (
        <TweetBox>
          <ProfileIcon
            name={item.name}
            src={"data:" + item.img.contentType + ";base64," + item.img.data}
          ></ProfileIcon>
          <TweetContainer>
            <TweetBody>
              <FeedName text={item.name} />
              <FeedTag text={item.name} />
              <FeedDate text={moment(item.timestamp).fromNow()} />
            </TweetBody>
            <TweetBody>
              <FeedContent text={item.content} />
            </TweetBody>
            <TweetBody>
              <FeedImage
                src={
                  "data:" +
                  item.tweet_data.profile.avatar.contentType +
                  ";base64," +
                  item.tweet_data.profile.avatar.data
                }
              />
            </TweetBody>

            <TweetBody>
              <TweetContainer>
                <FeedFooter />
              </TweetContainer>
            </TweetBody>
          </TweetContainer>
        </TweetBox>
      ))
    : null;
}
export default Feed;
