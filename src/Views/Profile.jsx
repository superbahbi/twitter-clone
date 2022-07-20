import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Feed from ".././Components/Feed";
import Header from "../Components/Header";
import Placeholder from "../Components/Placeholder";
import ProfileBox from "../Components/ProfileBox";
import Sidebar from "../Components/Sidebar";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { Context as UserContext } from "../Contexts/UserContext";
import api from "../Helper/api";
import useTweet from "../Hooks/useTweet";
import useUser from "../Hooks/useUser";
const SubMainContainer = styled(Col)`
  max-width: 600px;
  padding: 0px;
  border: 1px solid rgb(239, 243, 244);
`;
const SidebarContainer = styled(Col)`
  @media only screen and (max-width: 1055px) {
    display: none;
  }
  max-width: 350px;
  margin-left: 30px;
  padding-left: 0px;
  padding-right: 0px;
`;
function Profile() {
  let { profile } = useParams();
  const queryClient = useQueryClient();
  const { state: authState } = useContext(AuthContext);
  const { state: userState } = useContext(UserContext);
  const { getUserProfile } = useUser();
  const { data } = useTweet(profile);
  const [reload, setReload] = useState();

  useEffect(() => {
    const request = async () => {
      getUserProfile(profile);
    };
    request();
  }, [reload]);
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
        {authState.user && (
          <>
            <Header
              name={userState.getUser && userState.getUser.profile.name}
              tweetCount={authState.user.tweets}
            />
            {userState.getUser && (
              <ProfileBox
                authUsername={authState.user.username}
                user={userState.getUser}
              />
            )}

            <Feed
              tweets={data && data.foundTweet}
              likeTweetMutation={likeTweetMutation}
              deleteTweetMutation={deleteTweetMutation}
              commentTweetMutation={commentTweetMutation}
            />
          </>
        )}
      </SubMainContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
    </>
  );
}
export default Profile;
