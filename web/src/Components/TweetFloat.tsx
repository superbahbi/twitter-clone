import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import { Tweet } from "../Assets/Icon";
import IconButton from "./IconButton";
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
const TweetFloat: React.FC<{}> = ({}) => {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <>
      <TweetFloatContainer>
        <TweetIconButton>
          <IconButton
            type="button"
            iconComponent={<Tweet />}
            color={theme.color.white}
            backgroundColor={theme.color.main}
            hoverColorBackground={theme.color.main}
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
