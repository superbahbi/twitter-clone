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
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 15em;
`;

function Login() {
  return (
    <div>
      <SplitPage>
        <LeftSide></LeftSide>
        <RightSide>
          <SubLogin>
            <Input name="Username" />
            <Input name="Password" />
            <Button
              name="button"
              type="submit"
              label="Log in"
              btnStyle="login-btn"
            />
          </SubLogin>
        </RightSide>
      </SplitPage>
    </div>
  );
}
export default Login;
