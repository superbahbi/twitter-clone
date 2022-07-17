import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TweetModal from "./TweetModal";
import IconButton from "./IconButton";
import { Tweet } from "../Assets/Icon";
const TweetFloatContainer = styled.div`
  display: none;
  @media only screen and (max-width: 700px) {
    display: block;
    position: fixed;
    bottom: 50px;
    right: 0;
    margin: 16px;
  }
`;
const TweetIconButton = styled.div`
  width: 50px;
  @media only screen and (min-width: 1251px) {
    display: none;
  }
  @media only screen and (max-width: 1250px) {
    display: block;
  }
`;
const TweetFloat = () => {
  const navigate = useNavigate();
  return (
    <>
      <TweetFloatContainer>
        <TweetIconButton>
          <IconButton
            type="button"
            iconComponent={<Tweet />}
            color="#fff"
            backgroundColor="#1da1f2"
            hoverColorBackground="#1A8CD8"
            borderRadius="30px"
            size="24px"
            width="50px"
            height="50px"
            handleClick={() => {
              navigate("/compose");
            }}
          />
        </TweetIconButton>
      </TweetFloatContainer>
    </>
  );
};

export default TweetFloat;
