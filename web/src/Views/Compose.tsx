import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Col } from "react-bootstrap";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import Tweet from "../Components/Tweet";
import Header from "../Components/Header";
import { Context as AuthContext } from "../Contexts/AuthContext";
import api from "../Helper/api";
import { BackArrow } from "../Assets/Icon";
import { IContext, INewTweet } from "../Helper/interface";
const SubMainContainer = styled(Col)`
  max-width: 600px;
  padding: 0px;
`;
const Compose: React.FC<{}> = ({}) => {
  const navigate = useNavigate();
  const { state: authState } = useContext(AuthContext);
  const { user } = authState;
  const queryClient = useQueryClient();
  const addTweetMutation: UseMutationResult<string, Error, INewTweet> =
    useMutation<string, Error, INewTweet, IContext | undefined>(
      async ({ imgFile, videoLink, tweetText }): Promise<string> => {
        console.log("tweetText", tweetText);
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
          navigate("/home");
        },
      }
    );
  return (
    <>
      <SubMainContainer>
        <Header iconLeftComponent={<BackArrow />} />
        <Tweet
          addTweetMutation={addTweetMutation}
          username={user.username}
          avatar={user.profile.avatar.filename}
          placeholder="What's happening?"
        />
      </SubMainContainer>
    </>
  );
};

export default Compose;
