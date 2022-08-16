import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import Figure from "react-bootstrap/Figure";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import styled, { ThemeContext } from "styled-components";
import {
  AddRemove,
  Analytics,
  Block,
  Comment,
  Embed,
  Follow,
  Like,
  Mute,
  NotInterested,
  Pin,
  Report,
  Retweet,
  Share,
  Threedot,
  Trash,
  // Unfollow,
  Verified,
} from "../Assets/Icon";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { IFeedProps, ILikesProps } from "../Helper/interface";
import { youtubeParser } from "../Helper/youtubeParser";
import Avatar from "./Avatar";
import CommentModal from "./CommentModal";
import IconButton from "./IconButton";
var relativeTime = require("dayjs/plugin/relativeTime");
const TweetContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  line-height: 16px;
  padding: 16px 16px 0 16px;
  :hover {
    background-color: ${(props) => props.theme.color.hoverBackground};
  }
  :last-of-type {
    margin-bottom: 50px;
  }
`;
const AvatarContainer = styled.div`
  margin-right: 12px;
`;
const TweetContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
      fill: ${(props) => props.theme.color.text};
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
  color: ${(props) => props.theme.color.text};
  font-size: 15px;
  line-height: 15px;
  font-weight: 600;
  text-overflow: ellipsis;
  svg {
    height: 16.41px;
    width: 16.41px;
    fill: ${(props) => props.theme.color.main};
  }
`;
const FeedTag = styled.span`
  padding-right: 0.25em;
  color: ${(props) => props.theme.color.lightText};
  font-size: 15px;
  line-height: 15px;
  text-overflow: ellipsis; ;
`;
const FeedDate = styled.span`
  color: ${(props) => props.theme.color.lightText};
  font-size: 15px;
  line-height: 15px;
`;
const FeedContent = styled.span`
  color: ${(props) => props.theme.color.text};
  font-size: 15px;
  line-height: 20px;
  font-weight: 300;
  overflow-wrap: break-word;
`;
const FeedBox = styled.div`
  flex: 0 0 auto;
  width: 100%;
`;
const FeedMedia = styled.div`
  display: flex;
  margin-top: 16px;
  img {
    border-radius: 16px;
  }
  iframe {
    width: 100%;
    height: 300px;
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
  color: ${(props) => props.theme.color.text};
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
      fill: ${(props) => props.theme.color.text};
      margin-right: 12px;
    }
  }
  .text {
    font-weight: 300;
    padding: 16px 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
    color: ${(props) => props.theme.color.text};
    :hover {
      border-radius: 5px;
      background-color: ${(props) => props.theme.color.hoverBackground};
    }
  }
  .delete {
    color: red;
    svg {
      fill: red;
    }
  }
`;
declare module "dayjs" {
  interface Dayjs {
    fromNow(): string;
  }
}
const Feed: React.FC<IFeedProps> = ({
  tweets,
  likeTweetMutation,
  deleteTweetMutation,
  commentTweetMutation,
}) => {
  dayjs.extend(relativeTime);
  const theme = useContext(ThemeContext);
  const { state: authState } = useContext(AuthContext);
  const [showTooltip, setShowTooltip] = useState({
    status: false,
    id: "",
  });
  const [show, setShow] = useState({
    status: false,
    id: "",
  });
  function onHandleComment(id: number) {
    setShow({
      ...show,
      status: true,
      id: id.toString(),
    });
  }
  function onHandleTooltip(id: number) {
    setShowTooltip({
      ...showTooltip,
      status: !showTooltip.status,
      id: id.toString(),
    });
  }
  function onHandleCommentClose() {
    setShow({
      ...show,
      status: false,
      id: "",
    });
  }

  function userlike(likes: ILikesProps[]) {
    let status = false;
    Object.keys(likes).map((index) => {
      if (likes[parseInt(index)]._id === authState.user._id) {
        status = true;
      }
      return null;
    });
    return status;
  }

  return (
    <>
      {tweets &&
        tweets.map((item, index) => (
          <TweetContainer key={index}>
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
                  <FeedDate>· {dayjs(item.timestamp).fromNow()}</FeedDate>
                </div>
                <OverlayTrigger
                  placement="bottom-end"
                  trigger="click"
                  show={
                    showTooltip.id === index.toString()
                      ? showTooltip.status
                      : false
                  }
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
                                  id: "",
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
                            {/* <div className="text">
                            <Unfollow />
                            <span className="name">
                              Unfollow {item.username}
                            </span>
                          </div> */}
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
                      iconComponent={<Threedot />}
                      color={theme.color.lightText}
                      hoverColor={theme.color.main}
                      hoverColorBackground={theme.color.hoverLightBackground}
                      handleClick={() => onHandleTooltip(index)}
                    />
                  </span>
                </OverlayTrigger>
              </FeedUserText>
              <FeedBox>
                {item.content ? (
                  <FeedContent>{item.content}</FeedContent>
                ) : null}
                {item.link ? (
                  <FeedMedia>
                    <iframe
                      title="linkPostFeed"
                      src={`https://www.youtube.com/embed/${youtubeParser(
                        item.link
                      )}?modestbranding=1&rel=0&cc_load_policy=1&iv_load_policy=3&fs=0&color=white`}
                      frameBorder="0"
                      loading="lazy"
                    ></iframe>
                  </FeedMedia>
                ) : null}

                {item.img ? (
                  <FeedMedia>
                    <Figure>
                      <Figure.Image
                        alt="content image"
                        src={item.img.filename}
                        loading="lazy"
                      />
                    </Figure>
                  </FeedMedia>
                ) : // <FeedMedia>
                //   <img src={item.img.filename} alt="feed" />
                // </FeedMedia>
                null}
              </FeedBox>
              <FeedBox>
                <TweetContent>
                  <ButtonRow>
                    <ButtonContainer>
                      <IconButton
                        type="button"
                        iconComponent={<Comment />}
                        color={theme.color.lightText}
                        size="18.75px"
                        hoverColor={theme.color.main}
                        hoverColorBackground={theme.color.hoverLightBackground}
                        handleClick={() => {
                          onHandleComment(index);
                        }}
                      />
                      <CommentModal
                        auth={authState}
                        tweet={tweets[parseInt(show.id)]}
                        show={show.status}
                        onHide={onHandleCommentClose}
                        onHandleCommentClose={onHandleCommentClose}
                        commentTweetMutation={commentTweetMutation}
                      />
                    </ButtonContainer>

                    <ButtonContainer>
                      <IconButton
                        type="button"
                        iconComponent={<Retweet />}
                        color={theme.color.lightText}
                        size="18.75px"
                        hoverColor={theme.color.retweetHover}
                        hoverColorBackground={
                          theme.color.retweetHoverBackground
                        }
                        // handleClick={() => {
                        //   onHandleComment(index);
                        // }}
                      />
                    </ButtonContainer>

                    <ButtonContainer>
                      <IconButton
                        type="button"
                        iconComponent={
                          <Like
                            liked={userlike(item.likes) ? true : false}
                            hidden="false"
                          />
                        }
                        color={
                          userlike(item.likes)
                            ? theme.color.likeHover
                            : theme.color.lightText
                        }
                        size="18.75px"
                        hoverColor={theme.color.likeHover}
                        hoverColorBackground={theme.color.likeHoverBackground}
                        handleClick={() => {
                          likeTweetMutation.mutate(item._id);
                        }}
                      />
                    </ButtonContainer>
                    <ButtonContainer>
                      <IconButton
                        type="button"
                        iconComponent={<Share />}
                        color={theme.color.lightText}
                        size="18.75px"
                        hoverColor={theme.color.main}
                        hoverColorBackground={theme.color.hoverLightBackground}
                      />
                    </ButtonContainer>
                  </ButtonRow>
                </TweetContent>
              </FeedBox>
            </TweetContent>
          </TweetContainer>
        ))}
    </>
  );
};
export default Feed;
// {/* {item
//   ? item.comment
//       .sort(function (a, b) {
//         console.log("A" + a.timestamp);
//         console.log("B" + b.timestamp);
//         return b.timestamp - a.timestamp;
//       })
//       .map((comment, commentIndex) => (
//         <React.Fragment key={commentIndex}>
//           <TweetBox>
//             <Avatar name={comment.username} src={comment.avatar} />
//             <TweetContainer>
//               <FeedBox>
//                 <FeedName>{comment.name}</FeedName>
//                 <FeedTag>@{comment.username}</FeedTag>
//                 <FeedDate>
//                   · {moment(comment.timestamp).fromNow()}
//                 </FeedDate>
//               </FeedBox>
//               <FeedBox>
//                 <FeedContent>{comment.content}</FeedContent>
//               </FeedBox>
//             </TweetContainer>
//           </TweetBox>
//         </React.Fragment>
//       ))
//   : null} */}
