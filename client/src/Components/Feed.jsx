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
  const reload = props.reload;
  const imgUrl = process.env.REACT_APP_API_URL + "/uploads/";
  useEffect(() => {
    // This gets called after every render, by default (the first one, and every one
    // after that)
    let url = process.env.REACT_APP_API_URL + "/api/tweet/";
    if (props.location === "profile") {
      url += props.profile;
    }
    const request = async (id = 100) => {
      const res2 = await fetch(url);
      setTweets(await res2.json());
    };
    request();
    props.setReload(false);

    // If you want to implement componentWillUnmount, return a function from here,
    // and React will call it prior to unmounting.
    return () => console.log("Feed data unmounting...");
  }, [reload, props]);
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
  if (props.setTweetCount) {
    props.setTweetCount(tweets && Object.keys(tweets.foundTweet).length);
  }

  return tweets
    ? tweets.foundTweet.map((item, index) => (
        <TweetBox key={index}>
          <Avatar
            name={item.username}
            src={item.user_data.profile.avatar.filename}
          />
          <TweetContainer>
            <FeedBox>
              <FeedName>{item.name}</FeedName>
              <FeedTag>{item.name}</FeedTag>
              <FeedDate>{moment(item.timestamp).fromNow()}</FeedDate>
            </FeedBox>
            <FeedBox>
              <FeedContent>{item.content}</FeedContent>
            </FeedBox>
            {item.img ? (
              <FeedBox>
                <FeedImage src={item.img.filename} />
              </FeedBox>
            ) : null}
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
                {props.auth.user.username === item.user_data.username ? (
                  <Button
                    id={item._id}
                    value="test"
                    name="button"
                    type="button"
                    btnStyle="feed-tweet-icon"
                    icon="trash"
                    size="2x"
                    handleClick={() => {
                      onHandleClick(item._id);
                      props.setReload(item._id);
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
