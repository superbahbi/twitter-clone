import React from "react";
import styled from "styled-components";

import Button from ".././Components/Button";
import {
  TweetEmoji,
  TweetGif,
  TweetLocation,
  TweetPoll,
  TweetSchedule,
  TweetUpload,
} from "../Assets/Icon";
import IconButton from "./IconButton";
const TweetButton = styled.div`
  margin-left: auto !important;
`;
const InputFile = styled.input`
  display: none;
  width: 100%;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
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
const InputBoxRow = styled.div`
  padding-top: 14px;
  display: flex;
  //   width: 500px;
`;

const TweetInput = ({ disable, handleChange }) => {
  return (
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
          {/* <InputFile
              type="file"
              name="img"
              accept="image/*"
              onChange={(event) => handleChange(event)}
            /> */}
        </IconButton>
        <IconButton
          type="button"
          iconRightComponent={<TweetPoll />}
          color="#1D9BF0"
          hoverColor="#1D9BF0"
          hoverColorBackground="#e8f5fe"
        >
          {/* <InputFile
              type="file"
              name="img"
              accept="image/*"
              onChange={(event) => handleChange(event)}
            /> */}
        </IconButton>
        <IconButton
          type="button"
          iconRightComponent={<TweetEmoji />}
          color="#1D9BF0"
          hoverColor="#1D9BF0"
          hoverColorBackground="#e8f5fe"
        >
          {/* <InputFile
              type="file"
              name="img"
              accept="image/*"
              onChange={(event) => handleChange(event)}
            /> */}
        </IconButton>
        <IconButton
          type="button"
          iconRightComponent={<TweetSchedule />}
          color="#1D9BF0"
          hoverColor="#1D9BF0"
          hoverColorBackground="#e8f5fe"
        >
          {/* <InputFile
              type="file"
              name="img"
              accept="image/*"
              onChange={(event) => handleChange(event)}
            /> */}
        </IconButton>
        <IconButton
          type="button"
          iconRightComponent={<TweetLocation />}
          color="#1D9BF0"
          hoverColor="#1D9BF0"
          hoverColorBackground="#e8f5fe"
          disabled={true}
        >
          {/* <InputFile
              type="file"
              name="img"
              accept="image/*"
              onChange={(event) => handleChange(event)}
            /> */}
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
  );
};

export default TweetInput;
