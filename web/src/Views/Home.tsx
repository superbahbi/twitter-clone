import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import Feed from ".././Components/Feed";
import Tweet from ".././Components/Tweet";
import { Stars } from "../Assets/Icon";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { Context as AuthContext } from "../Contexts/AuthContext";
import api from "../Helper/api";
import { IContext, INewTweet } from "../Helper/interface";
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

const Home: React.FC<{}> = ({}) => {
  const queryClient = useQueryClient();
  const { state: authState } = useContext(AuthContext);
  const { user } = authState;
  //{ status, data, error, isFetching }
  const { data } = useTweets();

  const addTweetMutation: UseMutationResult<string, Error, INewTweet> =
    useMutation<string, Error, INewTweet, IContext | undefined>(
      async ({ imgFile, videoLink, tweetText }): Promise<string> => {
        const formData = new FormData();
        formData.append("image", imgFile as string);
        formData.append("type", "tweetImg");
        formData.append("link", videoLink);
        formData.append("tweet", tweetText);
        const res = await api.post("/api/tweet", formData);
        if (res.status === 200) {
          return "success tweet";
        } else {
          return "error: tweet failed";
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
};
export default Home;
