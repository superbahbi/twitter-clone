import React, { useContext, useEffect } from "react";
import Col from "react-bootstrap/Col";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Feed from ".././Components/Feed";
import Header from "../Components/Header";
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
const Profile: React.FC<{}> = ({}) => {
  let { profile } = useParams();
  const queryClient = useQueryClient();
  const { state: authState } = useContext(AuthContext);
  const { state: userState } = useContext(UserContext);
  const { getUserProfile } = useUser();
  const { data } = useTweet(profile);

  useEffect(() => {
    const request = async () => {
      getUserProfile(profile);
    };
    request();
  }, []);
  const likeTweetMutation: UseMutationResult<string, Error, string> =
    useMutation<string, Error, string, undefined | undefined>(
      async (id): Promise<string> => {
        const res = await api.put("/api/like/" + id);
        if (res.status === 200) {
          return "success like";
        } else {
          return "error: like failed";
        }
      },
      {
        onError: (previousValue) => {
          queryClient.setQueryData(["tweets"], previousValue);
        },
        // no matter if error or success run me
        onSettled: () => {
          queryClient.invalidateQueries(["tweets"]);
        },
      }
    );
  const deleteTweetMutation: UseMutationResult<string, Error, string> =
    useMutation<string, Error, string, undefined | undefined>(
      async (id): Promise<string> => {
        const res = await api.delete("/api/tweet/" + id);
        if (res.status === 200) {
          return "success delete";
        } else {
          return "error: delete failed";
        }
      },
      {
        onError: (previousValue) => {
          queryClient.setQueryData(["tweets"], previousValue);
        },
        // no matter if error or success run me
        onSettled: () => {
          queryClient.invalidateQueries(["tweets"]);
        },
      }
    );
  const commentTweetMutation: UseMutationResult<string, Error, string> =
    useMutation<string, Error, string, undefined | undefined>(
      async (newComment): Promise<string> => {
        const res = await api.post("/api/comment", newComment);
        if (res.status === 200) {
          return "success comment";
        } else {
          return "error: comment failed";
        }
      },
      {
        onError: (previousValue) => {
          queryClient.setQueryData(["tweets"], previousValue);
        },
        // no matter if error or success run me
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
};
export default Profile;
