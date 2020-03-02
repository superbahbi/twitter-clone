import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import SignupForm from ".././Components/SignupForm";
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
const SubSignup = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
`;
const SignupContainer = styled.div`
  padding-top: 10em;
  width: 40vh;
`;
const Signup = ({ history }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)"
  });

  return (
    <React.Fragment>
      {isDesktopOrLaptop ? (
        <SplitPage>
          <LeftSide></LeftSide>
          <RightSide>
            <SubSignup>
              <SignupContainer>
                <SignupForm></SignupForm>
              </SignupContainer>
            </SubSignup>
          </RightSide>
        </SplitPage>
      ) : (
        <SubSignup>
          <SignupForm></SignupForm>
        </SubSignup>
      )}
    </React.Fragment>
  );
};
export default Signup;
