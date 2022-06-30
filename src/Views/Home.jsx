import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { Context as TweetContext } from "../Contexts/TweetContext";
import styled from "styled-components";
import Header from "../Components/Header";
import Tweet from ".././Components/Tweet";
import Feed from ".././Components/Feed";
import useTweet from "../Hooks/useTweet";
import { Stars } from "../Assets/Icon";
const TweetDivider = styled.div`
  flex: 1 1 auto !important;
  margin: 4px 0px;
  border-bottom: 1px solid rgb(239, 243, 244);
`;
function Home() {
  const { state: authState } = useContext(AuthContext);
  const { token, user } = authState;
  const { state: tweetState } = useContext(TweetContext);
  const { getAllTweets, reset } = useTweet();
  const [reload, setReload] = useState("");
  useEffect(() => {
    reset();
    getAllTweets();
  }, [reload]);
  return (
    <>
      <Header name="Home" iconRightComponent={<Stars />} />
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
        tweets={tweetState && tweetState.tweets}
        setReload={setReload}
        reload={reload}
      />
    </>
  );
}
export default Home;
