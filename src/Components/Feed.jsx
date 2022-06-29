import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context as TweetContext } from "../Contexts/TweetContext";
import { Context as AuthContext } from "../Contexts/AuthContext";
import styled from "styled-components";
import moment from "moment";
import Avatar from ".././Components/Avatar";
import IconButton from "../Components/IconButton";
import CommentModal from "../Components/CommentModal";

import { youtubeParser } from "../Helper/youtubeParser";

import { Comment, Retweet, Like, Share } from "../Assets/Icon";
// import MediaFrame from "./MediaFrame";
const TweetContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  line-height: 16px;
  padding-top: ;
  padding: 16px 16px 0px 16px;
  :hover {
    background-color: #f5f8fa;
  }
`;
const AvatarContainer = styled.div`
  margin-right: 12px;
`;
const TweetContent = styled.div`
  width: 100%;
`;

const FeedBox = styled.div`
  display: flex;
`;
const FeedUserText = styled.div`
  height: 20px;
  align-items: center;
`;
const FeedName = styled.span`
  padding-right: 0.25em;
  color: #0f1419;
  font-size: 15px;
  line-height: 15px;
  font-weight: 600;
`;
const FeedTag = styled.span`
  padding-right: 0.25em;
  color: #536471;
  font-size: 15px;
  line-height: 15px;
`;
const FeedDate = styled.span`
  color: #536471;
  font-size: 15px;
  line-height: 15px;
`;
const FeedContent = styled.span`
  color: #0f1419;
  font-size: 15px;
  line-height: 20px;
  font-weight: 300;
  overflow-wrap: break-word;
`;
const FeedImage = styled.img`
  width: 100%;
  border: none;
  border-radius: 10px;
  padding-top: 5px;
`;
const ButtonRow = styled.div`
  display: flex;
  width: 425px;
  justify-content: space-between;
`;
const ButtonContainer = styled.div`
  position: relative;
  right: 10px;
`;
function Feed({ user, id, tweets, setReload, reload }) {
  const navigate = useNavigate();
  const { deleteTweet, likeTweet } = useContext(TweetContext);
  const { state: authState } = useContext(AuthContext);
  const [show, setShow] = useState({
    status: false,
    id: "",
  });

  function onHandleComment(id) {
    setShow({
      ...show,
      status: true,
      id: id,
    });
  }
  function onHandleCommentClose() {
    setShow({
      ...show,
      status: false,
      id: null,
    });
  }
  function userlike(likes) {
    let status = false;
    Object.keys(likes).map((key, index) => {
      if (likes[key]._id === authState.user._id) {
        status = true;
      }
      return null;
    });
    // setReload(true);
    return status;
  }

  // if (props.setTweetCount) {
  //   props.setTweetCount(tweets && Object.keys(tweets.foundTweet).length);
  // }

  return tweets
    ? tweets.foundTweet.map((item, index) => (
        <React.Fragment key={index}>
          <TweetContainer>
            <AvatarContainer>
              <Avatar
                name={item.username}
                src={item.user_data.profile.avatar.filename}
              />
            </AvatarContainer>
            <TweetContent>
              <FeedUserText
                onClick={(event) => {
                  event.preventDefault();
                  navigate(`/${item.username}/status/${item._id}`, {
                    replace: true,
                  });
                }}
              >
                <FeedName>{item.name}</FeedName>
                <FeedTag>@{item.username}</FeedTag>
                <FeedDate>· {moment(item.timestamp).fromNow()}</FeedDate>
              </FeedUserText>
              {youtubeParser(item.content) ? (
                <FeedBox>
                  <FeedContent>
                    <iframe
                      title="linkPostFeed"
                      src={`https://www.youtube.com/embed/${youtubeParser(
                        item.content
                      )}?modestbranding=1&rel=0&cc_load_policy=1&iv_load_policy=3&fs=0&color=white&controls=1`}
                      frameBorder="0"
                    ></iframe>{" "}
                  </FeedContent>
                </FeedBox>
              ) : (
                <FeedBox>
                  <FeedContent>{item.content}</FeedContent>
                </FeedBox>
              )}

              {item.img ? (
                <FeedBox>
                  <FeedImage src={item.img.filename} />
                </FeedBox>
              ) : null}

              <FeedBox>
                <TweetContent>
                  <ButtonRow>
                    <ButtonContainer>
                      <IconButton
                        type="button"
                        iconRightComponent={<Comment />}
                        color="#536471"
                        size="18.75px"
                        hoverColor="#1D9BF0"
                        hoverColorBackground="#e8f5fe"
                        handleClick={() => {
                          onHandleComment(index);
                        }}
                      />
                      <CommentModal
                        show={show.status}
                        onHide={onHandleCommentClose}
                        tweet={tweets.foundTweet[show.id]}
                        auth={authState}
                        setShow={setShow}
                      />
                    </ButtonContainer>
                    <ButtonContainer>
                      <IconButton
                        type="button"
                        iconRightComponent={<Retweet />}
                        color="#536471"
                        size="18.75px"
                        hoverColor="#00BA7C"
                        hoverColorBackground="#DEF1EB"
                        // handleClick={() => {
                        //   onHandleComment(index);
                        // }}
                      />
                      {/* <IconButton
                        name="button"
                        type="button"
                        style={{ color: userlike(item.likes) ? "red" : null }}
                        icon={
                          userlike(item.likes)
                            ? "icon ion-ios-heart"
                            : "icon ion-ios-heart-outline"
                        }
                        handleClick={async () => {
                          await likeTweet(item._id);
                          setReload(!reload);
                        }}
                      /> */}
                    </ButtonContainer>
                    <ButtonContainer>
                      <IconButton
                        type="button"
                        iconRightComponent={
                          <Like liked={userlike(item.likes) ? true : false} />
                        }
                        color={userlike(item.likes) ? "#F91880" : "#536471"}
                        size="18.75px"
                        hoverColor="#F91880"
                        hoverColorBackground="#F7E0EB"
                        handleClick={async () => {
                          await likeTweet(item._id);
                          setReload(!reload);
                        }}
                      />
                    </ButtonContainer>
                    <ButtonContainer>
                      <IconButton
                        type="button"
                        iconRightComponent={<Share />}
                        color="#536471"
                        size="18.75px"
                        hoverColor="#1D9BF0"
                        hoverColorBackground="#e8f5fe"
                        handleClick={async () => {
                          await deleteTweet(item._id);
                          setReload(!reload);
                        }}
                      />
                    </ButtonContainer>
                    {/* <ButtonContainer>
                      {user.username === item.user_data.username ? (
                        <IconButton
                          id={item._id}
                          value="test"
                          name="button"
                          type="button"
                          icon="icon ion-ios-trash-outline"
                          handleClick={async () => {
                            await deleteTweet(item._id);
                            setReload(!reload);
                          }}
                        />
                      ) : null}
                    </ButtonContainer> */}
                  </ButtonRow>
                </TweetContent>
              </FeedBox>
            </TweetContent>
          </TweetContainer>

          {/* {item
            ? item.comment
                .sort(function (a, b) {
                  console.log("A" + a.timestamp);
                  console.log("B" + b.timestamp);
                  return b.timestamp - a.timestamp;
                })
                .map((comment, commentIndex) => (
                  <React.Fragment key={commentIndex}>
                    <TweetBox>
                      <Avatar name={comment.username} src={comment.avatar} />
                      <TweetContainer>
                        <FeedBox>
                          <FeedName>{comment.name}</FeedName>
                          <FeedTag>@{comment.username}</FeedTag>
                          <FeedDate>
                            · {moment(comment.timestamp).fromNow()}
                          </FeedDate>
                        </FeedBox>
                        <FeedBox>
                          <FeedContent>{comment.content}</FeedContent>
                        </FeedBox>
                      </TweetContainer>
                    </TweetBox>
                  </React.Fragment>
                ))
            : null} */}
        </React.Fragment>
      ))
    : null;
}
export default Feed;
