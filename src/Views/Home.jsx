import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { Context as TweetContext } from "../Contexts/TweetContext";
import styled from "styled-components";
import Header from "../Components/Header";
import Tweet from ".././Components/Tweet";
import Feed from ".././Components/Feed";
const TweetDivider = styled.div`
  flex: 1 1 auto !important;
  border: 5px solid rgb(230, 236, 240);
`;
function Home() {
  const { state } = useContext(AuthContext);
  const { token, user } = state;
  const {
    state: tweetState,
    getTweet,
    // deleteTweet,
    // editTweet,
    // likeTweet,
  } = useContext(TweetContext);
  const [reload, setReload] = useState();
  useEffect(() => {
    console.log("reload", reload);
    getTweet();
    setReload(false);
  }, [reload]); // add reload later
  return (
    <>
      <Header name="Home" />
      <Tweet
        page="Home"
        token={token}
        user={user}
        id={user._id}
        username={user.username}
        avatar={user.profile.avatar.filename}
        setReload={setReload}
        reload={reload}
      />
      <TweetDivider></TweetDivider>
      <Feed
        user={user}
        tweets={tweetState.tweets}
        // id={id}
        setReload={setReload}
        reload={reload}
      />
    </>
  );
}
export default Home;
