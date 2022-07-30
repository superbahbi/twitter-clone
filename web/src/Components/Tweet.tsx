import { UseMutationResult } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import Avatar from ".././Components/Avatar";
import Textarea from ".././Components/Textarea";
import { INewTweet } from "../Helper/interface";
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
interface ITweetProps {
  username?: string;
  avatar?: string;
  addTweetMutation?: UseMutationResult<string, Error, INewTweet, unknown>;
  placeholder?: string;
  // commentTweetMutation
  height?: string;
}
const Tweet: React.FC<ITweetProps> = ({
  username,
  avatar,
  addTweetMutation,
  placeholder,
  // commentTweetMutation,
  height,
}) => {
  const [tweetText, setTweetText] = useState("");
  const [imgPreview, setImgPreview] = useState<string | undefined>();
  const [imgFile, setImgFile] = useState<Object>({});
  const [videoPreview, setVideoPreview] = useState<string | boolean>("");
  const [videoLink, setVideoLink] = useState<string>("");
  const [disable, setDisable] = useState(true);
  const [linkMetadata, setLinkMetadata] = useState({});
  const onFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const textWrapper = document.getElementsByClassName("textarea");

    //@ts-ignore
    addTweetMutation.mutate({ imgFile, videoLink, tweetText });
    setImgPreview(undefined);
    setImgFile("");
    setVideoPreview("");
    setVideoLink("");
    setTweetText("");
    textWrapper[0].textContent = "";
  };
  function linkify(text: string) {
    return text
      .split(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi)
      .filter(Boolean)
      .filter((x) => {
        return x.indexOf(".") > 0;
      });
  }
  function youtube_parser(url: string) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  }
  function handleChange(event: React.ChangeEvent) {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;
    const file = target.files[0];
    console.log(URL.createObjectURL(file));
    setImgPreview(URL.createObjectURL(file));
    setImgFile(file);
    setDisable(false);
  }
  const textareaHandleChange = async (
    //@ts-ignore
    event: React.FormEvent<HTMLInputElement>
  ) => {
    let currentText = event.currentTarget.textContent;
    if (!currentText) return;
    let length: number = currentText.length;
    setDisable(!(length > 0));
    setTweetText(currentText);
    let id: string | boolean = youtube_parser(currentText);
    let link: string[] = linkify(currentText);
    if (link.length > 0) {
      setVideoPreview(id);
      setVideoLink(link[0]);
      setLinkMetadata(await youtubeMetadata(link));
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
                placeholder={placeholder}
                onHandleChange={(event: React.FormEvent<HTMLInputElement>) =>
                  textareaHandleChange(event)
                }
                height={height}
              />
            </InputBox>

            {imgPreview && (
              <InputBoxRow>
                <MediaFrame
                  onHandleMediaClose={() => {
                    setDisable(true);
                    setImgPreview(undefined);
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
};
export default Tweet;
