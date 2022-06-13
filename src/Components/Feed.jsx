import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import Avatar from ".././Components/Avatar";
import IconButton from "../Components/IconButton";
import formurlencoded from "form-urlencoded";
import CommentModal from ".././Components/CommentModal";

const TweetBox = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  line-height: 16px;
  border-color: #eee #ddd #bbb;
  border-style: solid;
  border-width: 1px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
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
function Feed(props) {
  let history = useHistory();
  const [tweets, setTweets] = useState();
  const reload = props.reload;
  const [show, setShow] = useState({
    status: false,
    id: "",
  });
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    // This gets called after every render, by default (the first one, and every one
    // after that)
    let url = process.env.REACT_APP_API_URL;

    switch (props.location) {
      case "home":
        url += "/api/tweet/";
        break;
      case "profile":
        url += "/api/tweet/" + props.profile;
        break;
      case "thread":
        url += "/api/thread/" + props.threadID;
        break;
      default:
        url += "/api/tweet/";
        break;
    }

    fetch(url, { signal })
      .then((results) => results.json())
      .then((data) => setTweets(data))
      .catch((error) => {
        console.log(error);
      });
    props.setReload(false);

    // If you want to implement componentWillUnmount, return a function from here,
    // and React will call it prior to unmounting.

    return function () {
      /**
       * Add cleanup code here
       */
      // console.log("Feed data unmounting...");
      controller.abort();
    };
  }, [props, reload]);
  function onHandleDeleteClick(tweetId) {
    const request = async (id = 100) => {
      let deleteTweet = await fetch(
        process.env.REACT_APP_API_URL + "/api/tweet",
        {
          method: "DELETE",
          headers: {
            Accept: "application/x-www-form-urlencoded",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + props.auth.token,
          },
          body: formurlencoded({ id: tweetId }),
        }
      );
      await deleteTweet.json();
      if (deleteTweet.status === 200 && tweetId) {
        console.log("Delete tweet ID : " + tweetId);
      }
    };
    request();
  }
  function onHandleLikeClick(tweetId) {
    const request = async (id = 100) => {
      let likeTweet = await fetch(
        process.env.REACT_APP_API_URL + "/api/like/" + tweetId,
        {
          method: "PUT",
          headers: {
            Accept: "application/x-www-form-urlencoded",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + props.auth.token,
          },
          body: formurlencoded({ profile_id: props.auth.user._id }),
        }
      );
      await likeTweet.json();
      // if (likeTweet.status === 200 && tweetId) {
      //   console.log("Liked tweet ID : " + tweetId);
      // }
    };
    request();
  }
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
      if (likes[key]._id === props.auth.user._id) {
        status = true;
      }
      return null;
    });
    return status;
  }
  if (props.setTweetCount) {
    props.setTweetCount(tweets && Object.keys(tweets.foundTweet).length);
  }
  return tweets
    ? tweets.foundTweet.map((item, index) => (
        <React.Fragment key={index}>
          <TweetBox

          // onClick={e => history.push("/status/" + item._id)}
          >
            <Avatar
              name={item.username}
              src={item.user_data.profile.avatar.filename}
            />
            <TweetContainer>
              <FeedBox
                onClick={() => {
                  history.push("/status/" + item._id);
                }}
              >
                <FeedName>{item.name}</FeedName>
                <FeedTag>@{item.username}</FeedTag>
                <FeedDate>· {moment(item.timestamp).fromNow()}</FeedDate>
              </FeedBox>
              <FeedBox>
                <FeedContent>{item.content}</FeedContent>
              </FeedBox>
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
                        btnStyle="feed-tweet-icon"
                        icon="icon ion-ios-chatbubble-outline"
                        variant="primary"
                        handleClick={() => {
                          onHandleComment(index);
                        }}
                      />
                      <CommentModal
                        show={show.status}
                        onHide={onHandleCommentClose}
                        tweet={tweets.foundTweet[show.id]}
                        auth={props.auth}
                        setShow={setShow}
                      />
                    </ButtonContainer>
                    <ButtonContainer>
                      <IconButton
                        name="button"
                        type="button"
                        btnStyle="feed-tweet-icon"
                        style={{ color: userlike(item.likes) && "red" }}
                        icon={
                          userlike(item.likes)
                            ? "icon ion-ios-heart"
                            : "icon ion-ios-heart-outline"
                        }
                        handleClick={() => {
                          onHandleLikeClick(item._id);
                          props.setReload(item._id);
                        }}
                      />
                    </ButtonContainer>
                    <ButtonContainer>
                      {props.auth.user.username === item.user_data.username ? (
                        <IconButton
                          id={item._id}
                          value="test"
                          name="button"
                          type="button"
                          btnStyle="feed-tweet-icon"
                          icon="icon ion-ios-trash-outline"
                          size="2x"
                          handleClick={() => {
                            onHandleDeleteClick(item._id);
                            props.setReload(item._id);
                          }}
                        />
                      ) : null}
                    </ButtonContainer>
                  </ButtonRow>
                </TweetContainer>
              </FeedBox>
            </TweetContainer>
          </TweetBox>

          {props.threadID
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
            : null}
        </React.Fragment>
      ))
    : null;
}
export default Feed;
