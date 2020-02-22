import React from "react";
import styled from "styled-components";
import Textarea from ".././Components/Textarea";
import Button from ".././Components/Button";
import ProfileIcon from ".././Components/ProfileIcon";

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
const InputBoxGroup = styled.div`
  max-width: 45px;
  max-height: 45px;
`;

const TweetDivider = styled.div`
  flex: 1 1 auto !important;
  border: 5px solid rgb(230, 236, 240);
`;

function Tweet(props) {
  return props.user ? (
    <div>
      <TweetBox>
        <h3>Home</h3>
      </TweetBox>
      <TweetBox>
        <ProfileIcon
          name={props.user.username}
          src={
            props.user.profile &&
            "http://localhost:3001/uploads/" +
              props.user.profile.avatar.filename
          }
        ></ProfileIcon>
        <InputTweetBox>
          <InputBox>
            <Textarea
              type="text"
              placeholder="What's Happening"
              autocomplete="off"
            />
          </InputBox>
          {/* <div class="input-tweet-box input-tweet-img">
            <img id="img-preview" class="" />
          </div> */}
          <InputBoxRow>
            <InputBoxGroup>
              <Button
                name="button"
                type="button"
                btnStyle="input-tweet-icon"
                icon="file"
              />
              {/* <input
                type="file"
                id="upload-preview"
                name="img"
                accept="image/*"
              /> */}
            </InputBoxGroup>
            <InputBoxGroup>
              <Button
                name="button"
                type="button"
                btnStyle="input-tweet-icon"
                icon="gift"
              />
            </InputBoxGroup>
            <InputBoxGroup>
              <Button
                name="button"
                type="button"
                btnStyle="input-tweet-icon"
                icon="poll"
              />
            </InputBoxGroup>
            <InputBoxGroup>
              <Button
                name="button"
                type="button"
                btnStyle="input-tweet-icon"
                icon="smile"
              />
            </InputBoxGroup>
            <Button
              name="button"
              type="submit"
              btnStyle="signup-btn"
              position={true}
              label="Tweet"
            />
          </InputBoxRow>
        </InputTweetBox>
      </TweetBox>
      <TweetDivider></TweetDivider>
    </div>
  ) : null;
}
export default Tweet;
