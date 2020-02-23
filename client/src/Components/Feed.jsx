import React from "react";
import styled from "styled-components";
import moment from "moment";
import Avatar from ".././Components/Avatar";
import Button from "../Components/Button";

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

const FeedBox = styled.div`
  display: flex;
`;
const FeedName = styled.span`
  padding-right: 0.25em;
  font-size: 16px;
  font-weight: bold;
`;
const FeedTag = styled.span`
  padding-right: 0.25em;
  color: #657786;
  font-size: 14px;
`;
const FeedDate = styled.span`
  padding-right: 0.25em;
  color: #657786;
  font-size: 14px;
`;
const FeedContent = styled.span`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
`;
const FeedImage = styled.img`
  width: 100%;
  border: none;
  border-radius: 10px;
  padding-top: 5px;
`;
function Feed(props) {
  const iconList = ["comment", "retweet", "heart", "link"];

  return props.tweet
    ? props.tweet.map((item, index) => (
        <TweetBox key={index}>
          <Avatar
            name={item.tweet_data.name}
            src={
              "http://localhost:3001/uploads/" + item.profile.avatar.filename
            }
          />
          <TweetContainer>
            <FeedBox>
              <FeedName>{item.tweet_data.name}</FeedName>
              <FeedTag>{item.tweet_data.name}</FeedTag>
              <FeedDate>{moment(item.tweet_data.timestamp).fromNow()}</FeedDate>
            </FeedBox>
            <FeedBox>
              <FeedContent>{item.tweet_data.content}</FeedContent>
            </FeedBox>
            <FeedBox>
              <FeedImage
                src={
                  "http://localhost:3001/uploads/" +
                  item.tweet_data.img.filename
                }
              />
            </FeedBox>
            <FeedBox>
              <TweetContainer>
                {iconList.map((item, index) => (
                  <Button
                    key={index}
                    name="button"
                    type="button"
                    btnStyle="feed-tweet-icon"
                    icon={item}
                    size="2x"
                  />
                ))}
              </TweetContainer>
            </FeedBox>
          </TweetContainer>
        </TweetBox>
      ))
    : null;
}
export default Feed;
