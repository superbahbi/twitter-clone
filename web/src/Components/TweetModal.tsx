import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import Tweet from "./Tweet";
import { Context as AuthContext } from "../Contexts/AuthContext";
import api from "../Helper/api";
import Modal from "react-bootstrap/Modal";
import IconButton from "./IconButton";
import { Close } from "../Assets/Icon";
import { IContext, INewTweet, ITweetModalProps } from "../Helper/interface";
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
const TweetModal: React.FC<ITweetModalProps> = ({
  show,
  onHide,
  onHandleTweetModal,
}) => {
  const theme = useContext(ThemeContext);
  const { state: authState } = useContext(AuthContext);
  const { user } = authState;
  const queryClient = useQueryClient();
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
          color={theme.color.text}
          hoverColor={theme.color.text}
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
