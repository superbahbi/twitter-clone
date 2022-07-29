import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import Feed from ".././Components/Feed";
import Tweet from ".././Components/Tweet";
import { Stars } from "../Assets/Icon";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { Context as AuthContext } from "../Contexts/AuthContext";
import api from "../Helper/api";
import { useTweets } from "../Hooks/useTweets";
const TweetDivider = styled.div`
  flex: 1 1 auto;
  margin: 4px 0px;
  border-bottom: 1px solid rgb(239, 243, 244);
`;
const SubMainContainer = styled(Col)`
  max-width: 600px;
  padding: 0px;
  border: 1px solid rgb(239, 243, 244);
`;
const SidebarContainer = styled(Col)`
  @media only screen and (max-width: 1005px) {
    display: none;
  }
  max-width: 350px;
  margin-left: 30px;
  padding-left: 0px;
  padding-right: 0px;
`;
const TweetBox = styled.div`
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
function Home() {
  const queryClient = useQueryClient();
  const { state: authState } = useContext(AuthContext);
  const { user } = authState;
  //{ status, data, error, isFetching }
  const { data } = useTweets();
  const addTweetMutation = useMutation(
    async (newPost) => {
      await api.post("/api/tweet", newPost);
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
  const commentTweetMutation = useMutation(
    async (newComment) => {
      console.log(newComment);
      await api.post("/api/comment", newComment);
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
      <SubMainContainer>
        <Header
          avatar={user.profile.avatar.filename}
          name="Home"
          iconRightComponent={<Stars />}
        />
        <TweetBox>
          <Tweet
            addTweetMutation={addTweetMutation}
            username={user.username}
            avatar={user.profile.avatar.filename}
            placeholder="What's happening?"
          />
        </TweetBox>
        <TweetDivider></TweetDivider>
        <Feed
          tweets={data && data.foundTweet}
          likeTweetMutation={likeTweetMutation}
          deleteTweetMutation={deleteTweetMutation}
          commentTweetMutation={commentTweetMutation}
        />
      </SubMainContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
    </>
  );
}
export default Home;
