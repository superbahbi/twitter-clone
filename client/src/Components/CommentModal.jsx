import React, { useRef } from "react";
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

function CommentModal(props) {
  const commentData = useRef("");
  function onFormSubmit(e) {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/api/comment";

    const request = async (id = 100) => {
      const postComment = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + props.auth.token
        },
        body: formurlencoded({
          name: props.auth && props.auth.user.profile.name,
          username: props.auth && props.auth.user.username,
          comment: commentData.current.value,
          tweetId: props.tweet && props.tweet._id,
          profileId: props.auth && props.auth.user._id,
          avatar: props.auth && props.auth.user.profile.avatar.filename
        })
      });
      await postComment.json();
      if (postComment.status === 200) {
        console.log("Added new comment");

        // setReload(true);
      }
    };
    request();
    e.target.reset();
  }
  return (
    <Modal
      id={props.index}
      show={props.show}
      onHide={props.onHide}
      animation={false}
      style={{ opacity: 50 }}
    >
      <form onSubmit={onFormSubmit}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <FeedBox>
            <Avatar
              name={props.tweet && props.tweet.username}
              src={props.tweet && props.tweet.user_data.profile.avatar.filename}
            />
            <TweetContainer>
              <FeedBox>
                <FeedName>{props.tweet && props.tweet.name}</FeedName>
                <FeedTag>@{props.tweet && props.tweet.name}</FeedTag>
                <FeedDate>
                  · {moment(props.tweet && props.tweet.timestamp).fromNow()}
                </FeedDate>
              </FeedBox>

              <FeedBox>
                <FeedContent>{props.tweet && props.tweet.content}</FeedContent>
              </FeedBox>
              <FeedBox>
                <FeedContent>
                  Replying to @{props.tweet && props.tweet.name}
                </FeedContent>
              </FeedBox>
            </TweetContainer>
          </FeedBox>
          <FeedBox>
            <Avatar
              name={props.auth && props.auth.user.username}
              src={props.auth && props.auth.user.profile.avatar.filename}
            />
            <TweetContainer>
              <FeedBox>
                <Textarea
                  type="text"
                  name="Tweet"
                  value={props.value}
                  placeholder="Tweet your reply"
                  autocomplete="off"
                  projectRef={commentData}
                />
              </FeedBox>
            </TweetContainer>
          </FeedBox>
        </Modal.Body>
        <Modal.Footer>
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
