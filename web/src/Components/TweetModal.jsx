import React, { useContext } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Tweet from "./Tweet";
import { Context as AuthContext } from "../Contexts/AuthContext";
import api from "../Helper/api";
import Modal from "react-bootstrap/Modal";
import IconButton from "./IconButton";
import { Close } from "../Assets/Icon";
const TweetContainer = styled.div`
  flex: 1 1 auto !important;
`;
const FeedBox = styled.div`
  display: flex;
  width: 100%;
`;
const ModalContainer = styled(Modal)`
  width: 100%;
  .modal-content {
    width: 600px;
    border-radius: 16px;
  }
  .modal-header {
    padding: 0 4px;
    height: 53px;
    align-items: center;
    border-bottom: 0 none;
  }
  .modal-body {
    border: 0;
    padding: 0px;
  }
  .modal-footer {
    border-top: 0 none;
  }
`;
const TweetModal = ({ show, onHide, onHandleTweetModal }) => {
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
        onHandleTweetModal();
      },
    }
  );
  return (
    <ModalContainer show={show} onHide={onHide} animation={false}>
      <Modal.Header>
        <IconButton
          type="button"
          iconComponent={<Close />}
          color="#0f1419"
          hoverColor="#0f1419"
          handleClick={onHandleTweetModal}
        />
      </Modal.Header>
      <Modal.Body>
        <FeedBox>
          <TweetContainer>
            <Tweet
              addTweetMutation={addTweetMutation}
              username={user.username}
              avatar={user.profile.avatar.filename}
              placeholder="What's happening?"
            />
          </TweetContainer>
        </FeedBox>
      </Modal.Body>
    </ModalContainer>
  );
};

export default TweetModal;
