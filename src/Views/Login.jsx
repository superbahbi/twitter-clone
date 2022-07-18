import React, { useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Twitter } from "../Assets/Icon";
import Button from "../Components/Button";
import { Context as AuthContext } from "../Contexts/AuthContext";
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  align-items: center;
  margin: 0 auto;
  .login-group {
    display: flex;
    flex-direction: column;
    max-width: 500px;

    .logo {
      display: flex;
      justify-content: center;
      svg {
        fill: #1da1f2;
        width: 30px;
      }
    }
    .heading {
      font-size: 31px;
      font-weight: 600;
      color: #0f1419;
    }
  }
`;
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  max-width: 250px;
  .signup {
    margin-top: 24px;
  }
  .error {
    color: #ff0000;
  }
`;
const StyledFormControl = styled(Form.Control)`
  border: none;
  border: 1px solid rgb(239, 243, 244);
  border-radius: 0;
  box-shadow: none;
  outline: none;
  color: inherit;
  background: #fff;
  margin-bottom: 16px;
  :focus {
    border: none;
    border: 1px solid #1da1f2;
    border-radius: 0;
    box-shadow: none;
    outline: none;
    color: inherit;
  }
`;
const ErrorBar = styled.div`
  border-bottom: 2px solid;
  border-color: red;
`;
function Login() {
  const navigate = useNavigate();
  const { state, signin, tryLocalSignin } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm();
  useEffect(() => {
    tryLocalSignin();
  }, []);
  if (state.token) {
    navigate("/home");
  }
  const onSubmit = (data, event) => {
    event.preventDefault();
    signin(data);
  };
  return (
    <LoginContainer>
      <div className="login-group">
        <div className="logo">
          <Twitter />
        </div>

        <div className="heading">Sign in to Twitter</div>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <div className="error">
            {state.errorMessage && state.errorMessage}
          </div>
          <Form.Group>
            <StyledFormControl
              type="text"
              id="inputUsername"
              autoComplete="off"
              placeholder="Email, or username"
              name="username"
              ref={register({
                required: true,
              })}
            />
            {errors.username && <ErrorBar></ErrorBar>}
          </Form.Group>
          <Form.Group>
            <StyledFormControl
              type="password"
              id="inputPassword"
              placeholder="Password"
              name="password"
              ref={register({
                required: true,
              })}
            />
            {errors.password && <ErrorBar></ErrorBar>}
          </Form.Group>
          <Button primary label={"Login"} type="submit" />
          <div className="signup">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </StyledForm>
      </div>
    </LoginContainer>
  );
}
export default Login;
