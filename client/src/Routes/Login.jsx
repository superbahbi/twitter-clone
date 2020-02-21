import React from "react";
import Input from ".././Components/Input";
import Button from ".././Components/Button";
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

const LoginContainer = styled.div`
  padding-top: 10em;
  width: 40vh;
`;

function Login() {
  return (
    <div>
      <SplitPage>
        <LeftSide></LeftSide>
        <RightSide>
          <SubLogin>
            <LoginContainer>
              <Input name="Username" type="text" />
              <Input name="Password" type="password" />
              <Button
                name="button"
                type="submit"
                label="Log in"
                btnStyle="login-btn"
              />
            </LoginContainer>
          </SubLogin>
        </RightSide>
      </SplitPage>
    </div>
  );
}
export default Login;
