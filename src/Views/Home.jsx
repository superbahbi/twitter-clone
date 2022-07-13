import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import Feed from ".././Components/Feed";
import Tweet from ".././Components/Tweet";
import { Stars } from "../Assets/Icon";
import Header from "../Components/Header";
import Placeholder from "../Components/Placeholder";
import { Context as AuthContext } from "../Contexts/AuthContext";
import useTweets from "../Hooks/useTweets";
import api from "../Helper/api";
const TweetDivider = styled.div`
  flex: 1 1 auto;
  margin: 4px 0px;
  border-bottom: 1px solid rgb(239, 243, 244);
`;

function Home() {
  const queryClient = useQueryClient();
  const { state: authState } = useContext(AuthContext);
  const { token, user } = authState;
  const { data, isFetching } = useTweets();
  const [reload, setReload] = useState("");
  const addTweetMutation = useMutation(
    async (newPost) => {
      const res = await api.post("/api/tweet", newPost);
      console.log(res);
    },
    {
      onError: (previousValue) =>
        queryClient.setQueryData(["tweets"], previousValue),
      onSettled: () => {
        queryClient.invalidateQueries(["tweets"]);
      },
    }
  );
  const likeTweetMutation = useMutation(
    async (id) => {
      await api.put("/api/like/" + id);
    },
    {
      onError: (previousValue) =>
        queryClient.setQueryData(["tweets"], previousValue),
      onSettled: () => {
        queryClient.invalidateQueries(["tweets"]);
      },
    }
  );
  const deleteTweetMutation = useMutation(
    async (id) => {
      await api.delete("/api/tweet/" + id);
    },
    {
      onError: (previousValue) =>
        queryClient.setQueryData(["tweets"], previousValue),
      onSettled: () => {
        queryClient.invalidateQueries(["tweets"]);
      },
    }
  );
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
        addTweetMutation={addTweetMutation}
        username={user.username}
        avatar={user.profile.avatar.filename}
        setReload={setReload}
        reload={reload}
      />
      <TweetDivider></TweetDivider>
      <Feed
        likeTweetMutation={likeTweetMutation}
        deleteTweetMutation={deleteTweetMutation}
        tweets={data && data.foundTweet}
      />
    </>
  );
}
export default Home;
