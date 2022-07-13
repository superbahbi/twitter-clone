import React, { useContext, useState } from "react";
import { Context as AuthContext } from "../Contexts/AuthContext";
// import useTweet from "../Hooks/useTweet";
import moment from "moment-twitter";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import styled from "styled-components";
import { youtubeParser } from "../Helper/youtubeParser";
import Avatar from "./Avatar";
import CommentModal from "./CommentModal";
import IconButton from "./IconButton";
import Tooltip from "./Tooltip";

import {
  Comment,
  Like,
  Retweet,
  Share,
  Threedot,
  Trash,
  Verified,
  Unfollow,
  NotInterested,
  Follow,
  AddRemove,
  Mute,
  Block,
  Embed,
  Report,
  Pin,
  Analytics,
} from "../Assets/Icon";

// import MediaFrame from "./MediaFrame";
const TweetContainer = styled.div`
  @media only screen and (max-width: 700px) and (-webkit-min-device-pixel-ratio: 3) {
    padding-top: 53px;
  }
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  white-space: nowrap;
  .threedot {
    align-self: center;
    margin-left: auto;
    svg {
      width: 20px;
      height: 20px;
      fill: #0f1419;
    }
  }
  .tooltip-inner {
    background-color: red;
    color: red;
  }
  .tooltip.show {
    opacity: 1 !important;
  }
`;
const FeedName = styled.span`
  padding-right: 0.25em;
  color: #0f1419;
  font-size: 15px;
  line-height: 15px;
  font-weight: 600;
  text-overflow: ellipsis;
  svg {
    height: 16.41px;
    width: 16.41px;
    fill: #1da1f2;
  }
`;
const FeedTag = styled.span`
  padding-right: 0.25em;
  color: #536471;
  font-size: 15px;
  line-height: 15px;
  text-overflow: ellipsis; ;
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
const FeedImage = styled.div`
  margin-top: 16px;

  img {
    max-width: 100%;
    border-radius: 16px;
  }
`;
const ButtonRow = styled.div`
  display: flex;
  width: 85%;
  justify-content: space-between;
`;
const ButtonContainer = styled.div`
  position: relative;
  right: 10px;
`;

const TooltipContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  color: #0f1419;
  width: 300px;

  -webkit-box-shadow: rgb(101 119 134 / 20%) 0px 0px 15px,
    rgb(101 119 134 / 15%) 0px 0px 3px 1px;
  box-shadow: rgb(101 119 134 / 20%) 0px 0px 15px,
    rgb(101 119 134 / 15%) 0px 0px 3px 1px;

  div {
    text-align: left;
    margin: auto;
    cursor: pointer;
    svg {
      height: 18.75px;
      width: 18.75px;
      fill: #0f1419;
      margin-right: 12px;
    }
  }
  .text {
    font-weight: 300;
    padding: 16px 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
    color: #0f1419;
    :hover {
      border-radius: 5px;
      background-color: #f7f7f7;
    }
  }
  .delete {
    color: red;
    svg {
      fill: red;
    }
  }
`;
function Feed({ tweets, likeTweetMutation, deleteTweetMutation }) {
  const { state: authState } = useContext(AuthContext);
  const [showTooltip, setShowTooltip] = useState({
    status: false,
    id: "",
  });
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
  function onHandleTooltip(id) {
    setShowTooltip({
      ...showTooltip,
      status: !showTooltip.status,
      id: id,
    });
  }
  function onHandleCommentClose() {
    console.log("onHandleCommentClose");
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
    return status;
  }

  return tweets
    ? tweets.map((item, index) => (
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
              // onClick={(event) => {
              //   event.preventDefault();
              //   navigate(`/${item.username}/status/${item._id}`, {
              //     replace: true,
              //   });
              // }}
              >
                <div>
                  <FeedName>
                    {item.name} <Verified />
                  </FeedName>

                  <FeedTag>@{item.username}</FeedTag>
                  <FeedDate>· {moment(item.timestamp).twitter()}</FeedDate>
                </div>
                <OverlayTrigger
                  placement="bottom-end"
                  trigger="click"
                  animation="fade"
                  show={showTooltip.id === index ? showTooltip.status : false}
                  overlay={
                    <TooltipContainer>
                      <div>
                        {authState.user.username === item.username ? (
                          <>
                            <div
                              className="text delete"
                              onClick={() => {
                                deleteTweetMutation.mutate(item._id);
                                setShowTooltip({
                                  ...showTooltip,
                                  status: false,
                                  id: null,
                                });
                              }}
                            >
                              <Trash />
                              <span>Delete</span>
                            </div>
                            <div className="text">
                              <Pin />
                              <span className="name">Pin to your profile</span>
                            </div>
                            <div className="text">
                              <AddRemove />
                              <span className="name">
                                Add/remove @{item.username} from Lists
                              </span>
                            </div>
                            <div className="text">
                              <Comment />
                              <span className="name">Change who can reply</span>
                            </div>
                            <div className="text">
                              <Embed />
                              <span className="name">Embed Tweet</span>
                            </div>
                            <div className="text">
                              <Analytics />
                              <span className="name">View Tweet Analytics</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text">
                              <Unfollow />
                              <span className="name">
                                Unfollow {item.username}
                              </span>
                            </div>
                            <div className="text">
                              <NotInterested />
                              <span className="name">
                                Not interested in this tweet
                              </span>
                            </div>
                            <div className="text">
                              <Follow />
                              <span className="name">
                                Follow @{item.username}
                              </span>
                            </div>
                            <div className="text">
                              <AddRemove />
                              <span className="name">
                                Add/remove @{item.username} from Lists
                              </span>
                            </div>
                            <div className="text">
                              <Mute />
                              <span className="name">
                                Mute @{item.username}
                              </span>
                            </div>
                            <div className="text">
                              <Block />
                              <span className="name">
                                Block @{item.username}
                              </span>
                            </div>
                            <div className="text">
                              <Embed />
                              <span className="name">Embed Tweet</span>
                            </div>
                            <div className="text">
                              <Report />
                              <span className="name">Report Tweet</span>
                            </div>
                          </>
                        )}
                      </div>
                    </TooltipContainer>
                  }
                >
                  <span className="threedot">
                    <IconButton
                      type="button"
                      iconRightComponent={<Threedot />}
                      color="#536471"
                      hoverColor="#1D9BF0"
                      hoverColorBackground="#e8f5fe"
                      handleClick={() => onHandleTooltip(index)}
                    />
                  </span>
                </OverlayTrigger>
                ,
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
                  <FeedImage>
                    <img src={item.img.filename} alt="feed" />
                  </FeedImage>
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
                        onHandleCommentClose={onHandleCommentClose}
                        tweet={tweets[show.id]}
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
                        handleClick={() => {
                          likeTweetMutation.mutate(item._id);
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
                      />
                    </ButtonContainer>
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
