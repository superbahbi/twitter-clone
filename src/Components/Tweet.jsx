import React, { useRef, useState } from "react";
import styled from "styled-components";
import Avatar from ".././Components/Avatar";
import Button from ".././Components/Button";
import Textarea from ".././Components/Textarea";
import {
  TweetEmoji,
  TweetGif,
  TweetLocation,
  TweetPoll,
  TweetSchedule,
  TweetUpload,
} from "../Assets/Icon";
import IconButton from "./IconButton";
import MediaFrame from "./MediaFrame";

const TweetBox = styled.div`
  @media (max-width: 700px) {
    display: none;
  }
  display: flex;
  flex-direction: row;
  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
  padding: 0 16px 0 16px;
`;

const InputTweetBox = styled.div`
  flex: 1 1 auto !important;
`;
const InputBox = styled.div`
  font-size: 20px;
  // :input {
  //   align-items: stretch;
  // }
  // &:focus {
  //   outline: none;
  //   border: none;
  // }
  // :input::placeholder {
  //   font-weight: 400;
  //   position: relative;
  //   top: -0.3rem;
  // }
`;
const InputBoxRow = styled.div`
  padding-top: 14px;
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
  padding-top: 4px;
  margin-right: 12px;
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
function Tweet({ username, avatar, addTweetMutation }) {
  const tweetData = useRef("");
  const [tweetText, setTweetText] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [disable, setDisable] = useState(true);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const textWrapper = document.getElementsByClassName("textarea");
    const formData = new FormData();
    formData.append("image", imgFile);
    formData.append("tweet", tweetText);
    formData.append("type", "tweetImg");
    formData.append("link", videoLink);
    addTweetMutation.mutate(formData);
    setImgPreview("");
    setImgFile("");
    setVideoPreview("");
    setVideoLink("");
    setTweetText("");
    textWrapper[0].textContent = "";
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
    setDisable(false);
  }
  const textareaHandleChange = (event) => {
    let currentText = event.currentTarget.textContent;
    setDisable(!currentText.length > 0);
    setTweetText(currentText);
    let id = youtube_parser(currentText);
    let link = linkify(currentText);
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
                placeholder="What's Happening"
                autocomplete="off"
                projectRef={tweetData}
                onHandleChange={(event) => textareaHandleChange(event)}
              />
            </InputBox>

            {imgPreview && (
              <InputBoxRow>
                <MediaFrame
                  onHandleMediaClose={() => {
                    setDisable(true);
                    setImgPreview("");
                  }}
                >
                  <ImgPreview src={imgPreview} />
                </MediaFrame>
              </InputBoxRow>
            )}

            {videoPreview && (
              <InputBoxRow>
                <MediaFrame
                  onHandleMediaClose={() => {
                    setDisable(true);
                    setVideoPreview("");
                  }}
                >
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
                <IconButton
                  type="button"
                  iconRightComponent={<TweetUpload />}
                  color="#1D9BF0"
                  hoverColor="#1D9BF0"
                  hoverColorBackground="#e8f5fe"
                >
                  <InputFile
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={(event) => handleChange(event)}
                  />
                </IconButton>
                <IconButton
                  type="button"
                  iconRightComponent={<TweetGif />}
                  color="#1D9BF0"
                  hoverColor="#1D9BF0"
                  hoverColorBackground="#e8f5fe"
                >
                  <InputFile
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={(event) => handleChange(event)}
                  />
                </IconButton>
                <IconButton
                  type="button"
                  iconRightComponent={<TweetPoll />}
                  color="#1D9BF0"
                  hoverColor="#1D9BF0"
                  hoverColorBackground="#e8f5fe"
                >
                  <InputFile
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={(event) => handleChange(event)}
                  />
                </IconButton>
                <IconButton
                  type="button"
                  iconRightComponent={<TweetEmoji />}
                  color="#1D9BF0"
                  hoverColor="#1D9BF0"
                  hoverColorBackground="#e8f5fe"
                >
                  <InputFile
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={(event) => handleChange(event)}
                  />
                </IconButton>
                <IconButton
                  type="button"
                  iconRightComponent={<TweetSchedule />}
                  color="#1D9BF0"
                  hoverColor="#1D9BF0"
                  hoverColorBackground="#e8f5fe"
                >
                  <InputFile
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={(event) => handleChange(event)}
                  />
                </IconButton>
                <IconButton
                  type="button"
                  iconRightComponent={<TweetLocation />}
                  color="#1D9BF0"
                  hoverColor="#1D9BF0"
                  hoverColorBackground="#e8f5fe"
                  disabled={true}
                >
                  <InputFile
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={(event) => handleChange(event)}
                  />
                </IconButton>
              </InputBoxGroup>

              <TweetButton>
                <Button
                  primary
                  name="button"
                  type="submit"
                  label="Tweet"
                  disabled={disable}
                />
              </TweetButton>
            </InputBoxRow>
          </form>
        </InputTweetBox>
      </TweetBox>
    </div>
  );
}
export default Tweet;
