import React from "react";
import styled from "styled-components";
import Header from ".././Components/Header";
const TweetDivider = styled.div`
  flex: 1 1 auto;
  margin: 4px 0px;
  border-bottom: 1px solid rgb(239, 243, 244);
`;
function Notification() {
  return (
    <>
      <Header name="Notification" />
      <TweetDivider></TweetDivider>
    </>
  );
}
export default Notification;
