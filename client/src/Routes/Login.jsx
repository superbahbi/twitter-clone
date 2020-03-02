import React from "react";
import { useMediaQuery } from "react-responsive";
import LoginForm from ".././Components/LoginForm";
import styled from "styled-components";
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
const SubLogin = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
`;

function Login() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)"
  });

  return (
    <div>
      <SplitPage>
        {isDesktopOrLaptop && <LeftSide></LeftSide>}
        <RightSide>
          <SubLogin>
            <LoginForm></LoginForm>
          </SubLogin>
        </RightSide>
      </SplitPage>
    </div>
  );
}
export default Login;
