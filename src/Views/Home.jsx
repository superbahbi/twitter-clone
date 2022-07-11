import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import Feed from ".././Components/Feed";
import Tweet from ".././Components/Tweet";
import { Stars } from "../Assets/Icon";
import Header from "../Components/Header";
import Placeholder from "../Components/Placeholder";
import { Context as AuthContext } from "../Contexts/AuthContext";
import useTweets from "../Hooks/useTweets";
const TweetDivider = styled.div`
  flex: 1 1 auto;
  margin: 4px 0px;
  border-bottom: 1px solid rgb(239, 243, 244);
`;

function Home() {
  const { state: authState } = useContext(AuthContext);
  const { token, user } = authState;
  const { status, data, error, isFetching } = useTweets();
  const [reload, setReload] = useState("");

  return (
    <>
      <Header
        avatar={user.profile.avatar.filename}
        name="Home"
        iconRightComponent={<Stars />}
      />
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
      {isFetching ? (
        <Placeholder />
      ) : (
        <Feed
          tweets={data && data.foundTweet}
          setReload={setReload}
          reload={reload}
        />
      )}
    </>
  );
}
export default Home;
