import React, { useState, useContext } from "react";
import { Context as TweetContext } from "../Contexts/TweetContext";
import { Context as AuthContext } from "../Contexts/AuthContext";
import styled, { keyframes } from "styled-components";
import moment from "moment";
import Avatar from ".././Components/Avatar";
import IconButton from "../Components/IconButton";
import CommentModal from "../Components/CommentModal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { youtubeParser } from "../Helper/youtubeParser";

import {
  Threedot,
  Comment,
  Retweet,
  Like,
  Share,
  Trash,
  Verified,
} from "../Assets/Icon";
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
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
    width: 100%;
    border-radius: 16px;
  }
`;
const ButtonRow = styled.div`
  display: flex;
  width: 425px;
  justify-content: space-between;
`;
const heartBurst = keyframes`
from { background-position:left;}
to { background-position:right;}
`;
const ButtonContainer = styled.div`
  position: relative;
  right: 10px;
  .heart {
    cursor: pointer;
    height: 50px;
    width: 50px;
    background-image: url("https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png");
    background-position: left;
    background-repeat: no-repeat;
    background-size: 2900%;
  }
  .is_animation {
    animation: ${heartBurst} 0.8s steps(28) 1;
  }
`;

const TooltipContainer = styled.div`
  .custom-tooltip {
    position: absolute;
    bottom: -10px;
    right: 0px;
    background-color: white;
    border-radius: 4px;
    color: #0f1419;
    height: 52px;
    width: 300px;
    box-sizing: border-box;
    -webkit-box-shadow: rgb(101 119 134 / 20%) 0px 0px 15px,
      rgb(101 119 134 / 15%) 0px 0px 3px 1px;
    box-shadow: rgb(101 119 134 / 20%) 0px 0px 15px,
      rgb(101 119 134 / 15%) 0px 0px 3px 1px;
    .tooltip-item {
      display: inline-flex;
      padding: 16px 16px;

      margin: auto;
      cursor: pointer;
      color: red;

      svg {
        height: 18.75px;
        width: 18.75px;
        fill: red;
        margin-right: 12px;
      }
      .tooltip-text {
        display: flex;
        align-items: center;
        text-align: left;
        font-size: 15px;
        line-height: 15px;
      }
    }
    :hover {
      background-color: #f7f7f7;
    }
  }
`;
function renderTooltip(id, setReload, reload, showTooltip, setShowTooltip) {
  const { deleteTweet } = useContext(TweetContext);
  return (
    <TooltipContainer id="button-tooltip">
      <div
        className="custom-tooltip"
        onClick={async () => {
          await deleteTweet(id);
          setShowTooltip({
            ...showTooltip,
            status: false,
            id: null,
          });
          setReload(!reload);
        }}
      >
        <div className="tooltip-item">
          <Trash />
          <div className="tooltip-text">Delete</div>
        </div>
      </div>
    </TooltipContainer>
  );
}
function Feed({ tweets, setReload, reload }) {
  const { deleteTweet, likeTweet } = useContext(TweetContext);
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
                  <FeedDate>· {moment(item.timestamp).fromNow()}</FeedDate>
                </div>
                <OverlayTrigger
                  placement="bottom-end"
                  trigger="click"
                  animation="fade"
                  show={showTooltip.id === index ? showTooltip.status : false}
                  overlay={renderTooltip(
                    item._id,
                    setReload,
                    reload,
                    showTooltip,
                    setShowTooltip
                  )}
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
                        handleClick={() => {
                          onHandleComment(index);
                        }}
                      />
                    </ButtonContainer>

                    <ButtonContainer>
                      <IconButton
                        type="button"
                        iconRightComponent={
                          <Like
                            // className="heart"
                            // onClick={(event) => {
                            //   event.currentTarget.classList.toggle(
                            //     "is_animation"
                            //   );
                            // }}
                            liked={userlike(item.likes) ? true : false}
                          />
                        }
                        color={userlike(item.likes) ? "#F91880" : "#536471"}
                        size="18.75px"
                        hoverColor="#F91880"
                        hoverColorBackground="#F7E0EB"
                        handleClick={async (event) => {
                          event.preventDefault();
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
