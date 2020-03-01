import React, { useState, useRef } from "react";
import styled from "styled-components";
import Textarea from ".././Components/Textarea";
import Button from ".././Components/Button";
import Avatar from ".././Components/Avatar";
import Header from ".././Components/Header";
import Feed from ".././Components/Feed";
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
const InputFile = styled.input`
  display: none;
  width: 100%;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;
function Tweet(props) {
  const tweetData = useRef("");
  const [reload, setReload] = useState();
  const [imgPreview, setImgPreview] = useState("");
  const [imgFile, setImgFile] = useState("");
  const imgUrl = process.env.REACT_APP_API_URL + "/uploads/";
  function onFormSubmit(e) {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/api/tweet";
    const formData = new FormData();
    formData.append("image", imgFile);
    formData.append("tweet", tweetData.current.value);
    formData.append("type", "tweetImg");
    const request = async (id = 100) => {
      const postTweet = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + props.auth.token
        },
        body: formData
      });
      await postTweet.json();
      if (postTweet.status === 200) {
        console.log("Added new tweet");
        setImgPreview("");
        setReload(true);
      }
    };
    request();
    e.target.reset();
  }
  function handleChange(event) {
    console.log("changed");
    setImgPreview(URL.createObjectURL(event.target.files[0]));
    setImgFile(event.target.files[0]);
  }
  return (
    <div>
      <Header page={props.page} />
      <TweetBox>
        <AvatarBox>
          <Avatar name={props.username} src={props.avatar} />
        </AvatarBox>
        <InputTweetBox>
          <form onSubmit={onFormSubmit}>
            <InputBox>
              <Textarea
                type="text"
                name="Tweet"
                value={props.value}
                placeholder="What's Happening"
                autocomplete="off"
                projectRef={tweetData}
              />
            </InputBox>
            <InputBoxRow>
              <ImgPreview src={imgPreview} />
            </InputBoxRow>
            <InputBoxRow>
              <InputBoxGroup>
                <FontAwesomeIcon icon="file" fixedWidth />
                <InputFile
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={event => handleChange(event)}
                />
              </InputBoxGroup>
              <InputBoxGroup>
                <FontAwesomeIcon icon="gift" fixedWidth />
                <InputFile
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={event => handleChange(event)}
                />
              </InputBoxGroup>
              <InputBoxGroup>
                <FontAwesomeIcon icon="poll" fixedWidth />
                <InputFile
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={event => handleChange(event)}
                />
              </InputBoxGroup>
              <InputBoxGroup>
                <FontAwesomeIcon icon="smile" fixedWidth />
                <InputFile
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={event => handleChange(event)}
                />
              </InputBoxGroup>
              <TweetButton>
                <Button
                  name="button"
                  type="submit"
                  btnStyle="signup-btn"
                  label="Tweet"
                />
              </TweetButton>
            </InputBoxRow>
          </form>
        </InputTweetBox>
      </TweetBox>
      <TweetDivider></TweetDivider>
      <Feed auth={props.auth} setReload={setReload} reload={reload} />
    </div>
  );
}
export default Tweet;
