import React, { useState, useRef, useContext, useEffect } from "react";
import { Context as TweetContext } from "../Contexts/TweetContext";
import styled from "styled-components";
import Textarea from ".././Components/Textarea";
import Button from ".././Components/Button";
import Avatar from ".././Components/Avatar";

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

const AvatarBox = styled.div`
  padding-top: 15px;
`;
const TweetButton = styled.div`
  margin-left: auto !important;
`;
const ImgPreview = styled.img`
  width: 100%;
`;
const InputFile = styled.input`
  display: none;
  width: 100%;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;
function Tweet({ token, user, id, username, avatar, setReload, reload }) {
  const { state, addTweet, clearAddTweet } = useContext(TweetContext);
  const tweetData = useRef("");
  // const [reload, setReload] = useState();
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
      // setReload(true);
      clearAddTweet();
    }
  }, [state]);
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imgFile);
    formData.append("tweet", tweetData.current.value);
    formData.append("type", "tweetImg");
    formData.append("link", videoLink);
    await addTweet(formData);
    setReload(!reload);
  };
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
    return match && match[7].length === 11 ? match[7] : false;
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
                    title="linkPost"
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
    </div>
  );
}
export default Tweet;
