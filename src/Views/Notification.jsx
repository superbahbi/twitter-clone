import React from "react";
import styled from "styled-components";
import Header from ".././Components/Header";
const Stack = styled.div`
  diplay: flex;
  width: 100%;
  margin: auto;
  padding: 0 32px;
  height: 100vh;
`;
function Notification() {
  return (
    <>
      <Header name="Notification" />
      <Stack />
    </>
  );
}
export default Notification;
