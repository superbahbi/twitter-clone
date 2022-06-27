import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { Context as TweetContext } from "../Contexts/TweetContext";
import styled from "styled-components";
import Header from "../Components/Header";
import Tweet from ".././Components/Tweet";
import Feed from ".././Components/Feed";
import useTweet from "../Hooks/useTweet";

const TweetDivider = styled.div`
  flex: 1 1 auto !important;
  border: 5px solid rgb(230, 236, 240);
`;
function Home() {
  const { state: authState } = useContext(AuthContext);
  const { token, user } = authState;
  const { state: tweetState } = useContext(TweetContext);
  const [getTweets] = useTweet();
  const [reload, setReload] = useState("");
  useEffect(() => {
    getTweets();
  }, [reload]);
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
        tweets={tweetState && tweetState.tweets}
        // id={id}
        setReload={setReload}
        reload={reload}
      />
    </>
  );
}
export default Home;
