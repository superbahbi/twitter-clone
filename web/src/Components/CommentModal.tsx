import React, { useState, useContext } from "react";
import { Context as TweetContext } from "../Contexts/TweetContext";
import Modal from "react-bootstrap/Modal";
import Avatar from "./Avatar";
import Textarea from ".././Components/Textarea";
import styled, { ThemeContext } from "styled-components";
import moment from "moment";
import formurlencoded from "form-urlencoded";
import IconButton from "./IconButton";
import TweetInput from "./TweetInput";
import { Close } from "../Assets/Icon";
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
    padding: 16px 16px 0 16px;
  }
  .modal-footer {
    border-top: 0 none;
  }
`;
const TweetContainer = styled.div`
  flex: 1 1 auto !important;
`;
const AvatarContainer = styled.div`
  padding-right: 12px;
`;
const FeedBox = styled.div`
  display: flex;
  width: 100%;
`;
const FeedName = styled.span`
  padding-right: 0.25em;
  font-size: 16px;
  font-weight: bold;
`;
const FeedTag = styled.span`
  padding-right: 0.25em;
  color: ${(props) => props.theme.color.lightText};
  font-size: 16px;
`;
const FeedDate = styled.span`
  padding-right: 0.25em;
  color: ${(props) => props.theme.color.lightText};
  font-size: 16px;
`;
const FeedContent = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  width: 100%;
`;
const FeedImg = styled.div`
  margin-top: 16px;

  img {
    max-width: 100%;
    border-radius: 16px;
  }
`;
const CommentTextarea = styled.div`
  padding-left: 64px;
`;
interface ICommentModalProps {
  auth: any;
  tweet: any;
  show: boolean;
  onHide: () => void;
  onHandleCommentClose: () => void;
  commentTweetMutation: any;
}
const CommentModal: React.FC<ICommentModalProps> = ({
  auth,
  tweet,
  show,
  onHide,
  onHandleCommentClose,
  // commentTweetMutation,
}) => {
  const theme = useContext(ThemeContext);
  const { addComment } = useContext(TweetContext);
  const [commentText, setCommentText] = React.useState<string | null>("");
  const [disable, setDisable] = useState(true);
  function onFormSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    addComment(
      formurlencoded({
        name: auth.user.profile.name,
        username: auth.user.username,
        comment: commentText,
        tweetId: tweet._id,
        profileId: auth.user._id,
        avatar: auth.user.profile.avatar.filename,
      })
    );
    onHandleCommentClose();
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let currentText = event.currentTarget.textContent;
    setCommentText(currentText);
    if (currentText !== null && currentText.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }
  return (
    <ModalContainer show={show} onHide={onHide} animation={false}>
      <form onSubmit={onFormSubmit}>
        <Modal.Header>
          <IconButton
            type="button"
            iconComponent={<Close />}
            color={theme.color.text}
            hoverColor={theme.color.text}
            handleClick={onHandleCommentClose}
          />
        </Modal.Header>
        <Modal.Body>
          <FeedBox>
            <AvatarContainer>
              <Avatar
                name={tweet && tweet.username}
                src={tweet && tweet.user_data.profile.avatar.filename}
              />
            </AvatarContainer>
            <TweetContainer>
              <FeedBox>
                <FeedName>{tweet && tweet.name}</FeedName>
                <FeedTag>@{tweet && tweet.name}</FeedTag>
                <FeedDate>
                  · {moment(tweet && tweet.timestamp).fromNow()}
                </FeedDate>
              </FeedBox>

              <FeedBox>
                {tweet && tweet.content ? (
                  <FeedContent>{tweet && tweet.content}</FeedContent>
                ) : null}
                {tweet && tweet.img ? (
                  <FeedImg>
                    <img
                      src={tweet && tweet.img.filename}
                      alt="feed"
                      loading="lazy"
                    />
                  </FeedImg>
                ) : null}
              </FeedBox>
              <FeedBox>
                <FeedContent>Replying to @{tweet && tweet.name}</FeedContent>
              </FeedBox>
            </TweetContainer>
          </FeedBox>
          <FeedBox>
            <TweetContainer>
              <CommentTextarea>
                <Textarea
                  placeholder="Tweet your reply"
                  onHandleChange={(
                    event: React.ChangeEvent<HTMLInputElement>
                  ) => handleChange(event)}
                />
                <TweetInput handleChange={handleChange} disable={disable} />
              </CommentTextarea>
            </TweetContainer>
          </FeedBox>
        </Modal.Body>
      </form>
    </ModalContainer>
  );
};
export default CommentModal;
