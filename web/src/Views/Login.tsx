import React, { useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Twitter } from "../Assets/Icon";
import Button from "../Components/Button";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { IFormLoginProps } from "../Helper/interface";
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
        fill: ${(props) => props.theme.main};
        width: 30px;
      }
    }
    .heading {
      font-size: 31px;
      font-weight: 600;
      color: ${(props) => props.theme.color.text};
    }
  }
`;
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  max-width: 250px;
  .signup {
    margin: 24px 0px;
  }
  .error {
    color: ${(props) => props.theme.color.error};
  }
`;
const StyledFormControl = styled(Form.Control)`
  border-color: ${(props) =>
    props.error ? props.theme.color.error : props.theme.color.border};
  border-style: solid;
  border-width: 1px;
  border-radius: 0;
  box-shadow: none;
  outline: none;
  color: inherit;
  background: ${(props) => props.theme.color.white};
  margin-bottom: 16px;
  text-transform: lowercase;
  :focus {
    border: 1px solid ${(props) => props.theme.color.main};
    border-radius: 0;
    box-shadow: none;
    outline: none;
    color: inherit;
  }
`;

const defaultValues: IFormLoginProps = {
  username: "demo",
  password: "demo",
};
const Login: React.FC<{}> = ({}) => {
  const navigate = useNavigate();
  const { state, signin, tryLocalSignin } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLoginProps>();
  useEffect(() => {
    tryLocalSignin();
  }, []);
  if (state.token) {
    navigate("/home");
  }
  const onSubmit = (data: IFormLoginProps) => {
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
              {...register("username", { required: true })}
              error={errors.username}
              type="text"
              id="inputUsername"
              autoComplete="off"
              placeholder="Email, or username"
              name="username"
            />
          </Form.Group>
          <Form.Group>
            <StyledFormControl
              {...register("password", { required: true })}
              error={errors.password}
              type="password"
              id="inputPassword"
              placeholder="Password"
              name="password"
            />
          </Form.Group>
          <div></div>
          <Button primary label="Login" type="submit" />

          <div className="signup">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </StyledForm>
        <StyledForm
          onSubmit={(event: React.FormEvent<HTMLInputElement>) => {
            event.preventDefault();
            signin(defaultValues);
          }}
        >
          <Button
            width="100%"
            primary
            label="Login as demo user"
            type="submit"
          />
        </StyledForm>
      </div>
    </LoginContainer>
  );
};
export default Login;
