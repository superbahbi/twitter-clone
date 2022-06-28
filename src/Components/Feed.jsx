import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context as TweetContext } from "../Contexts/TweetContext";
import { Context as AuthContext } from "../Contexts/AuthContext";
import styled from "styled-components";
import moment from "moment";
import Avatar from ".././Components/Avatar";
import IconButton from "../Components/IconButton";
import CommentModal from "../Components/CommentModal";
// import MediaFrame from "./MediaFrame";
const TweetBox = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  line-height: 16px;

  padding: 0 16px 0 16px;
  :hover {
    background-color: #f5f8fa;
  }
`;

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
  font-size: 14px;
`;
const FeedDate = styled.span`
  padding-right: 0.25em;
  color: #657786;
  font-size: 14px;
`;
const FeedContent = styled.span`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
`;
const FeedImage = styled.img`
  width: 100%;
  border: none;
  border-radius: 10px;
  padding-top: 5px;
`;
const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const ButtonContainer = styled.div`
  padding-right: 30px;
  align-items: left;
  justify-content: left;
`;
function Feed({ user, id, tweets, setReload, reload }) {
  const navigate = useNavigate();
  const { deleteTweet, likeTweet } = useContext(TweetContext);
  const { state: authState } = useContext(AuthContext);
  const [show, setShow] = useState({
    status: false,
    id: "",
  });

  // function onHandleComment(id) {
  //   setShow({
  //     ...show,
  //     status: true,
  //     id: id,
  //   });
  // }
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
  function youtube_parser(url) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  }
  // if (props.setTweetCount) {
  //   props.setTweetCount(tweets && Object.keys(tweets.foundTweet).length);
  // }

  return tweets
    ? tweets.foundTweet.map((item, index) => (
        <React.Fragment key={index}>
          <TweetBox>
            <Avatar
              name={item.username}
              src={item.user_data.profile.avatar.filename}
            />
            <TweetContainer>
              <FeedBox
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
              </FeedBox>
              {youtube_parser(item.content) ? (
                <FeedBox>
                  <FeedContent>
                    <iframe
                      title="linkPostFeed"
                      src={`https://www.youtube.com/embed/${youtube_parser(
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
                <TweetContainer>
                  <ButtonRow>
                    <ButtonContainer>
                      <IconButton
                        id={index}
                        dataTarget={index}
                        name="button"
                        type="button"
                        icon="icon ion-ios-chatbubble-outline"
                        variant="primary"
                        // handleClick={() => {
                        //   onHandleComment(index);
                        // }}
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
                      />
                    </ButtonContainer>
                    <ButtonContainer>
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
                    </ButtonContainer>
                  </ButtonRow>
                </TweetContainer>
              </FeedBox>
            </TweetContainer>
          </TweetBox>

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
