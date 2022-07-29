import React, { useRef, useState } from "react";
import styled from "styled-components";
import Avatar from ".././Components/Avatar";
import Textarea from ".././Components/Textarea";
import { youtubeMetadata } from "../Helper/youtubeMetadata";
import Card from "./Card";
import MediaFrame from "./MediaFrame";
import TweetInput from "./TweetInput";
const TweetBox = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
  width: 95%;
`;
const InputTweetBox = styled.div`
  flex: 1 1 auto !important;
`;
const InputBox = styled.div`
  font-size: 20px;
`;
const InputBoxRow = styled.div`
  padding-top: 14px;
  display: flex;
  max-width: 500px;
`;
const AvatarBox = styled.div`
  padding-top: 4px;
  padding-right: 12px;
  padding-left: 16px;
`;
const ImgPreview = styled.img`
  max-width: 100%;
`;
function Tweet({
  username,
  avatar,
  addTweetMutation,
  placeholder,
  commentTweetMutation,
  height,
}) {
  const tweetData = useRef("");
  const [tweetText, setTweetText] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [disable, setDisable] = useState(true);
  const [linkMetadata, setLinkMetadata] = useState({});
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const textWrapper = document.getElementsByClassName("textarea");
    const formData = new FormData();
    formData.append("image", imgFile);
    formData.append("type", "tweetImg");
    formData.append("link", videoLink);
    formData.append("tweet", tweetText);
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
  const textareaHandleChange = async (event) => {
    let currentText = event.currentTarget.textContent;
    setDisable(!currentText.length > 0);
    setTweetText(currentText);
    let id = youtube_parser(currentText);
    let link = linkify(currentText);
    if (link.length > 0) {
      setVideoPreview(id);
      setVideoLink(link);
      setLinkMetadata(await youtubeMetadata(link));
      console.log(await youtubeMetadata(link));
    }
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
                placeholder={placeholder}
                autocomplete="off"
                projectRef={tweetData}
                onHandleChange={(event) => textareaHandleChange(event)}
                height={height}
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
                  <ImgPreview src={imgPreview} loading="lazy" />
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
                  <Card data={linkMetadata} />
                </MediaFrame>
              </InputBoxRow>
            )}

            <TweetInput handleChange={handleChange} disable={disable} />
          </form>
        </InputTweetBox>
      </TweetBox>
    </div>
  );
}
export default Tweet;
