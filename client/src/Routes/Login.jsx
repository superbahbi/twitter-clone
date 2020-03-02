import React, { useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { authContext } from "../Contexts/AuthContext";
import Input from ".././Components/Input";
import Button from ".././Components/Button";
import styled from "styled-components";
import formurlencoded from "form-urlencoded";
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
const Login = ({ history }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)"
  });
  const { setAuthData } = useContext(authContext);
  const [setErrors] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  async function onFormSubmit(event) {
    event.preventDefault();
    const res = await fetch(process.env.REACT_APP_API_URL + "/api/login", {
      method: "POST",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formurlencoded(credentials)
    });
    res
      .json()
      .then(res => setAuthData(res))
      .catch(err => setErrors(err));
    history.push("/home");
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }
  return (
    <div>
      <SplitPage>
        {isDesktopOrLaptop && <LeftSide></LeftSide>}
        <RightSide>
          <SubLogin>
            <LoginContainer>
              <form onSubmit={onFormSubmit}>
                <Input
                  name="username"
                  type="text"
                  autocomplete="on"
                  onHandleChange={handleChange}
                />
                <Input
                  name="password"
                  type="password"
                  autocomplete="on"
                  onHandleChange={handleChange}
                />
                <Button
                  name="button"
                  type="submit"
                  label="Log in"
                  btnStyle="login-btn"
                />
              </form>
            </LoginContainer>
          </SubLogin>
        </RightSide>
      </SplitPage>
    </div>
  );
};
export default Login;
