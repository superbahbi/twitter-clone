import React, { useState, useRef, useContext, useEffect } from "react";
import { Context as TweetContext } from "../Contexts/TweetContext";
import styled from "styled-components";
import Textarea from ".././Components/Textarea";
import Button from ".././Components/Button";
import Avatar from ".././Components/Avatar";
import Feed from ".././Components/Feed";
import MediaFrame from "./MediaFrame";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far);
const TweetBox = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
  border-color: #eee #ddd #bbb;
  border-style: solid;
  border-width: 1px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  padding: 0 16px 0 16px;
`;

const InputTweetBox = styled.div`
  flex: 1 1 auto !important;
  padding: 0.5em;
`;
const InputBox = styled.div`
  font-size: 20px;
  padding-top: 15px;
  :input {
    align-items: stretch;
    border: 0 solid black;
    box-sizing: border-box;
  }
  &:focus {
    outline: none;
    border: none;
  }
  :input::placeholder {
    font-weight: 400;
    position: relative;
    top: -0.3rem;
  }
`;
const InputBoxRow = styled.div`
  padding-top: 20px;
  display: flex;
`;
const InputBoxGroup = styled.label`
  display: flex;
  align-items: center;

  color: #71c9f8;
  font-size: 2em;
  padding: 0;
  border: none;
  width: 45px;
  height: 45px;
  cursor: pointer;
`;

const TweetDivider = styled.div`
  flex: 1 1 auto !important;
  border: 5px solid rgb(230, 236, 240);
`;
const AvatarBox = styled.div`
  padding-top: 15px;
`;
const TweetButton = styled.div`
  margin-left: auto !important;
`;
const ImgPreview = styled.img`
  width: 100%;
`;
const VideoPreview = styled.div`
  position: relative;
  width: 300px;
  .close {
    position: absolute;
    top: 0;
    right: 0;
    width: 25px;
    height: 25px;
    font-size: 0;
  }
  .close:before,
  .close:after {
    position: absolute;
    width: 5px;
    height: 20px;
    background-color: white;
    transform: rotate(45deg) translate(-50%, -50%);
    transform-origin: top left;
    transition: all 420ms;
    content: "";
  }
  .close:after {
    transform: rotate(-45deg) translate(-50%, -50%);
  }
  .close:hover:before,
  .close:hover:after {
    background-color: $close-color-hover;
  }
`;
const InputFile = styled.input`
  display: none;
  width: 100%;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;
function Tweet({ token, user, id, username, avatar }) {
  const { state, addTweet, clearAddTweet } = useContext(TweetContext);
  const tweetData = useRef("");
  const [reload, setReload] = useState();
  const [imgPreview, setImgPreview] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [videoLink, setVideoLink] = useState("");
  useEffect(() => {
    if (state.newTweet && state.newTweet.status === 200) {
      setImgPreview("");
      setImgFile("");
      setVideoPreview("");
      setVideoLink("");
      tweetData.current.value = "";
      setReload(true);
      clearAddTweet();
    }
  }, [state]);
  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imgFile);
    formData.append("tweet", tweetData.current.value);
    formData.append("type", "tweetImg");
    formData.append("link", videoLink);
    addTweet(formData);
  };
  function isUrl(s) {
    var regexp =
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(s);
  }
  function linkify(text) {
    return text
      .split(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi)
      .filter(Boolean)
      .filter((x) => {
        return x.indexOf(".") > 0;
      });
  }
  function youtube_parser(url) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }
  function handleChange(event) {
    setImgPreview(URL.createObjectURL(event.target.files[0]));
    setImgFile(event.target.files[0]);
  }
  const textareaHandleChange = (event) => {
    let id = youtube_parser(event.target.value);
    let link = linkify(event.target.value);
    setVideoPreview(id);
    setVideoLink(link);
  };
  return (
    <div>
      <TweetBox>
        <AvatarBox>
          <Avatar name={username} src={avatar} />
        </AvatarBox>
        <InputTweetBox>
          <form onSubmit={onFormSubmit}>
            <InputBox>
              <Textarea
                type="text"
                name="Tweet"
                // value={props.value}
                placeholder="What's Happening"
                autocomplete="off"
                projectRef={tweetData}
                onHandleChange={(event) => textareaHandleChange(event)}
              />
            </InputBox>

            {imgPreview && (
              <InputBoxRow>
                <MediaFrame onHandleMediaClose={() => setImgPreview("")}>
                  <ImgPreview src={imgPreview} />
                </MediaFrame>
              </InputBoxRow>
            )}

            {videoPreview && (
              <InputBoxRow>
                <MediaFrame onHandleMediaClose={() => setVideoPreview("")}>
                  <iframe
                    width={300}
                    src={`https://www.youtube.com/embed/${videoPreview}?autoplay=1&modestbranding=1&rel=0&cc_load_policy=1&iv_load_policy=3&fs=0&color=white&controls=0`}
                    frameBorder="0"
                  ></iframe>
                </MediaFrame>
              </InputBoxRow>
            )}

            <InputBoxRow>
              <InputBoxGroup>
                <FontAwesomeIcon icon="file" fixedWidth />
                <InputFile
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={(event) => handleChange(event)}
                />
              </InputBoxGroup>
              <InputBoxGroup>
                <FontAwesomeIcon icon="gift" fixedWidth />
                <InputFile
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={(event) => handleChange(event)}
                />
              </InputBoxGroup>
              <InputBoxGroup>
                <FontAwesomeIcon icon="poll" fixedWidth />
                <InputFile
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={(event) => handleChange(event)}
                />
              </InputBoxGroup>
              <InputBoxGroup>
                <FontAwesomeIcon icon="smile" fixedWidth />
                <InputFile
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={(event) => handleChange(event)}
                />
              </InputBoxGroup>
              <TweetButton>
                <Button primary name="button" type="submit" label="Tweet" />
              </TweetButton>
            </InputBoxRow>
          </form>
        </InputTweetBox>
      </TweetBox>
      <TweetDivider></TweetDivider>
      <Feed
        token={token}
        user={user}
        id={id}
        setReload={setReload}
        reload={reload}
        youtube_parser={youtube_parser}
      />
    </div>
  );
}
export default Tweet;
