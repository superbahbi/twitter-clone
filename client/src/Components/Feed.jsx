import React from "react";
import styled from "styled-components";
import moment from "moment";
import Avatar from ".././Components/Avatar";
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

function Feed(props) {
  return props.tweet.foundTweet
    ? props.tweet.foundTweet.map((item, index) => (
        <TweetBox key={index}>
          <Avatar
            name={item.tweet_data.name}
            src={
              "http://localhost:3001/uploads/" + item.profile.avatar.filename
            }
          />
          <TweetContainer>
            <TweetBody>
              <FeedName text={item.tweet_data.name} />
              <FeedTag text={item.tweet_data.name} />
              <FeedDate text={moment(item.tweet_data.timestamp).fromNow()} />
            </TweetBody>
            <TweetBody>
              <FeedContent text={item.tweet_data.content} />
            </TweetBody>
            <TweetBody>
              <FeedImage
                src={
                  "http://localhost:3001/uploads/" +
                  item.tweet_data.img.filename
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
