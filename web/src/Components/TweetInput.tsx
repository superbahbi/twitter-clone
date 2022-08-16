import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

import Button from ".././Components/Button";
import {
  TweetEmoji,
  TweetGif,
  TweetLocation,
  TweetPoll,
  TweetSchedule,
  TweetUpload,
} from "../Assets/Icon";
import { ITweetInputProps } from "../Helper/interface";
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

  color: ${(props) => props.theme.color.lightMain};
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

const TweetInput: React.FC<ITweetInputProps> = ({ disable, handleChange }) => {
  const theme = useContext(ThemeContext);
  return (
    <InputBoxRow>
      <InputBoxGroup>
        <IconButton
          type="button"
          iconComponent={<TweetUpload />}
          color={theme.color.main}
          hoverColor={theme.color.main}
          hoverColorBackground={theme.color.hoverLightBackground}
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
          iconComponent={<TweetGif />}
          color={theme.color.main}
          hoverColor={theme.color.main}
          hoverColorBackground={theme.color.hoverLightBackground}
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
          iconComponent={<TweetPoll />}
          color={theme.color.main}
          hoverColor={theme.color.main}
          hoverColorBackground={theme.color.hoverLightBackground}
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
          iconComponent={<TweetEmoji />}
          color={theme.color.main}
          hoverColor={theme.color.main}
          hoverColorBackground={theme.color.hoverLightBackground}
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
          iconComponent={<TweetSchedule />}
          color={theme.color.main}
          hoverColor={theme.color.main}
          hoverColorBackground={theme.color.hoverLightBackground}
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
          iconComponent={<TweetLocation />}
          color={theme.color.main}
          hoverColor={theme.color.main}
          hoverColorBackground={theme.color.hoverLightBackground}
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
