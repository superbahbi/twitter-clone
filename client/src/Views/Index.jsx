import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Button from ".././Components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons";
const SplitPage = styled.div`
  display: flex;
  height: 100vh;
`;
const RightSide = styled.div`
  flex-grow: 2;
  min-width: 50%;
  background-color: #ffffff;
`;
const LeftSide = styled.div`
  flex-grow: 2;
  min-width: 50%;
  background-color: #71c9f8;
`;
const SubHeading = styled.p`
  font-size: 2em;
  font-weight: bold;
  text-align: left;
  color: black;
`;
const SubText = styled.p`
  font-size: 1.2em;
  font-weight: lighter;
  text-align: left;
  color: black;
`;
const SubLogin = styled.div`
  flex-direction: column;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 15em;
`;

function Index() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)"
  });
  let history = useHistory();
  return (
    <SplitPage>
      {isDesktopOrLaptop && <LeftSide></LeftSide>}
      <RightSide>
        <SubLogin>
          <FontAwesomeIcon icon={faDog} size="4x" color="#1DA1F2" />
          <SubHeading>See what’s happening in the world right now</SubHeading>
          <SubText>Join not twitter today.</SubText>
          <Button
            name="button"
            type="submit"
            label="Sign up"
            btnStyle="signup-btn"
            handleClick={() => {
              history.push("/signup");
            }}
          />
          <Button
            name="button"
            type="submit"
            label="Log in"
            btnStyle="login-btn"
            handleClick={() => {
              history.push("/login");
            }}
          />
        </SubLogin>
      </RightSide>
    </SplitPage>
  );
}
export default Index;
