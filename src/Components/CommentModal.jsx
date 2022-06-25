import React, { useRef, useContext } from "react";
import { Context as TweetContext } from "../Contexts/TweetContext";
import Modal from "react-bootstrap/Modal";
import Avatar from "../Components/Avatar";
import Button from "../Components/Button";
import Textarea from ".././Components/Textarea";
import styled from "styled-components";
import moment from "moment";
import formurlencoded from "form-urlencoded";
const TweetContainer = styled.div`
  padding: 0.5em;
  flex: 1 1 auto !important;
`;
const FeedBox = styled.div`
  display: flex;
`;
const FeedName = styled.span`
  padding-right: 0.25em;
  font-size: 16px;
  font-weight: bold;
`;
const FeedTag = styled.span`
  padding-right: 0.25em;
  color: #657786;
  font-size: 16px;
`;
const FeedDate = styled.span`
  padding-right: 0.25em;
  color: #657786;
  font-size: 16px;
`;
const FeedContent = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
`;
const CommentTextarea = styled(Textarea)`
  width: 100%;
`;

function CommentModal({ auth, tweet, show, setShow, onHide }) {
  const { state, addComment } = useContext(TweetContext);
  const commentData = useRef("");

  function onFormSubmit(e) {
    e.preventDefault();
    addComment(
      formurlencoded({
        name: auth.user.profile.name,
        username: auth.user.username,
        comment: commentData.current.value,
        tweetId: tweet._id,
        profileId: auth.user._id,
        avatar: auth.user.profile.avatar.filename,
      })
    );
    e.target.reset();
  }
  return (
    <Modal
      // id={index}
      show={show}
      onHide={onHide}
      animation={false}
      style={{ opacity: 50 }}
    >
      <form onSubmit={onFormSubmit}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <FeedBox>
            <Avatar
              name={tweet && tweet.username}
              src={tweet && tweet.user_data.profile.avatar.filename}
            />
            <TweetContainer>
              <FeedBox>
                <FeedName>{tweet && tweet.name}</FeedName>
                <FeedTag>@{tweet && tweet.name}</FeedTag>
                <FeedDate>
                  · {moment(tweet && tweet.timestamp).fromNow()}
                </FeedDate>
              </FeedBox>

              <FeedBox>
                <FeedContent>{tweet && tweet.content}</FeedContent>
              </FeedBox>
              <FeedBox>
                <FeedContent>Replying to @{tweet && tweet.name}</FeedContent>
              </FeedBox>
            </TweetContainer>
          </FeedBox>
          <FeedBox>
            <Avatar
              name={auth && auth.user.username}
              src={auth && auth.user.profile.avatar.filename}
            />
            <TweetContainer>
              <FeedBox>
                <CommentTextarea
                  type="text"
                  name="Tweet"
                  // value={props.value}
                  placeholder="Tweet your reply"
                  autocomplete="off"
                  projectRef={commentData}
                />
              </FeedBox>
            </TweetContainer>
          </FeedBox>
        </Modal.Body>
        <Modal.Footer closeButton>
          <Button
            name="button"
            type="submit"
            btnStyle="signup-btn"
            label="Reply"
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
}
export default CommentModal;
