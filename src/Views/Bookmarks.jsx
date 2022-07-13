import React from "react";
import Header from ".././Components/Header";
import styled from "styled-components";
import { BookmarksImage } from "../Assets/Image";
const Stack = styled.div`
  diplay: flex;
  width: 400px;
  margin: auto;
  padding: 0 32px;
  height: 100vh;
`;
const Image = styled.img`
  width: 336px;
  margin-top: 16px;
  margin-bottom: 32px;
`;
const Title = styled.div`
  font-size: 31px;
  font-weight: 900;
  color: #0f1419;
`;
const SubTitle = styled.div`
  font-size: 15px;
  font-weight: 300;
  color: #536471;
`;
function Bookmarks() {
  return (
    <>
      <Header name="Bookmarks" iconRight="ion-ios-gear-outline" />
      <Stack>
        <Image src={BookmarksImage} alt="book in a cage" />
        <Title>Save Tweets for later</Title>
        <SubTitle>
          Don’t let the good ones fly away! Bookmark Tweets to easily find them
          again in the future.
        </SubTitle>
      </Stack>
    </>
  );
}
export default Bookmarks;
