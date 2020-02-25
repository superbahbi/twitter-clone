import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import Avatar from ".././Components/Avatar";
import Button from "../Components/Button";
import formurlencoded from "form-urlencoded";
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
  const [tweets, setTweets] = useState();
  useEffect(() => {
    // This gets called after every render, by default (the first one, and every one
    // after that)
    let url = process.env.REACT_APP_API_URL + "/api/tweet/";
    if (props.location === "profile") {
      url += props.profile;
    }
    console.log(url);
    const request = async (id = 100) => {
      const res2 = await fetch(url);
      setTweets(await res2.json());
    };
    request();
    props.setReload(false);

    // If you want to implement componentWillUnmount, return a function from here,
    // and React will call it prior to unmounting.
    return () => console.log("Feed data unmounting...");
  });
  function onHandleClick(tweetId) {
    const request = async (id = 100) => {
      let deleteTweet = await fetch(
        process.env.REACT_APP_API_URL + "/api/tweet",
        {
          method: "DELETE",
          headers: {
            Accept: "application/x-www-form-urlencoded",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + props.auth.token
          },
          body: formurlencoded({ id: tweetId })
        }
      );
      await deleteTweet.json();
      if (deleteTweet.status === 200 && tweetId) {
        console.log("Delete tweet ID : " + tweetId);
      }
    };
    request();
  }
  return tweets
    ? tweets.foundTweet.map((item, index) => (
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
              {item.tweet_data.img && (
                <FeedImage
                  src={
                    "http://localhost:3001/uploads/" +
                    item.tweet_data.img.filename
                  }
                />
              )}
            </FeedBox>
            <FeedBox>
              <TweetContainer>
                <Button
                  name="button"
                  type="button"
                  btnStyle="feed-tweet-icon"
                  icon="comment"
                  size="2x"
                />
                {/* <Button
                  name="button"
                  type="button"
                  btnStyle="feed-tweet-icon"
                  icon="retweet"
                  size="2x"
                /> */}
                <Button
                  name="button"
                  type="button"
                  btnStyle="feed-tweet-icon"
                  icon="heart"
                  size="2x"
                />
                {/* <Button
                  name="button"
                  type="button"
                  btnStyle="feed-tweet-icon"
                  icon="link"
                  size="2x"
                /> */}
                {props.auth.user.username === item.username ? (
                  <Button
                    id={item.tweet_data._id}
                    value="test"
                    name="button"
                    type="button"
                    btnStyle="feed-tweet-icon"
                    icon="trash"
                    size="2x"
                    handleClick={() => {
                      onHandleClick(item.tweet_data._id);
                      props.setReload(item.tweet_data._id);
                    }}
                  />
                ) : null}
              </TweetContainer>
            </FeedBox>
          </TweetContainer>
        </TweetBox>
      ))
    : null;
}
export default Feed;
// handleClick={() => {
//   props.setTweetId(item.tweet_data.id);
//   props.onHandleClick();
// }}
