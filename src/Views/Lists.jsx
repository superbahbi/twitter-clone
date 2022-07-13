import React from "react";
import Header from ".././Components/Header";
import styled from "styled-components";
const Stack = styled.div`
  diplay: flex;
  width: 100%;
  margin: auto;
  padding: 0 32px;
  height: 100vh;
`;
function Lists() {
  return (
    <>
      <Header name="Lists" iconLeft iconRight="ion-ios-gear-outline" />
      <Stack />
    </>
  );
}
export default Lists;
