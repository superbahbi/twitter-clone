import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Col } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Tweet from "../Components/Tweet";
import Header from "../Components/Header";
import { Context as AuthContext } from "../Contexts/AuthContext";
import api from "../Helper/api";
import { BackArrow } from "../Assets/Icon";
const SubMainContainer = styled(Col)`
  max-width: 600px;
  padding: 0px;
`;
const Compose = () => {
  const navigate = useNavigate();
  const { state: authState } = useContext(AuthContext);
  const { user } = authState;
  const queryClient = useQueryClient();
  const addTweetMutation = useMutation(
    async (newPost) => {
      await api.post("/api/tweet", newPost);
    },
    {
      onError: (previousValue) =>
        queryClient.setQueryData(["tweets"], previousValue),
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
