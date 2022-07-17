import React from "react";
import Header from ".././Components/Header";
import styled from "styled-components";
import Figure from "react-bootstrap/Figure";
import { BookmarksImage } from "../Assets/Image";
import Sidebar from "../Components/Sidebar";
import Col from "react-bootstrap/Col";
const SubMainContainer = styled(Col)`
  max-width: 600px;
  padding: 0px;
`;
const SidebarContainer = styled(Col)`
  @media only screen and (max-width: 1005px) {
    display: none;
  }
  max-width: 350px;
  margin-left: 30px;
  padding-left: 0px;
  padding-right: 0px;
`;
const Stack = styled.div`
  diplay: flex;
  max-width: 400px;
  margin: 32px auto;
  padding: 0 32px;
  height: 100vh;
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
      <SubMainContainer>
        <Header name="Bookmarks" iconRight="ion-ios-gear-outline" />
        <Stack>
          <Figure>
            <Figure.Image src={BookmarksImage} alt="book in a cage" />
          </Figure>
          <Title>Save Tweets for later</Title>
          <SubTitle>
            Don’t let the good ones fly away! Bookmark Tweets to easily find
            them again in the future.
          </SubTitle>
        </Stack>
      </SubMainContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
    </>
  );
}
export default Bookmarks;
