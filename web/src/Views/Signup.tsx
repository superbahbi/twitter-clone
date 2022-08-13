import React, { useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Twitter } from "../Assets/Icon";
import Button from "../Components/Button";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { IFormSignupProps } from "../Helper/interface";
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
    margin-top: 24px;
  }
  .error {
    color: ${(props) => props.theme.error};
  }
`;
const StyledFormControl = styled(Form.Control)`
  border: ${(props) =>
    props.error
      ? `1px solid ${props.theme.error}`
      : `1px solid ${props.theme.border}`};
  border-radius: 0;
  box-shadow: none;
  outline: none;
  color: inherit;
  background: ${(props) => props.theme.white};
  margin-bottom: 16px;
  text-transform: lowercase;
  :focus {
    border: none;
    border: 1px solid ${(props) => props.theme.main};
    border-radius: 0;
    box-shadow: none;
    outline: none;
    color: inherit;
  }
`;
const Signup: React.FC<{}> = ({}) => {
  const navigate = useNavigate();
  const { state, signup, tryLocalSignin } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormSignupProps>();
  useEffect(() => {
    tryLocalSignin();
  }, []);
  if (state.token) {
    navigate("/home");
  }

  const onSubmit = (data: IFormSignupProps) => {
    signup(data);
  };
  return (
    <LoginContainer>
      <div className="login-group">
        <div className="logo">
          <Twitter />
        </div>

        <div className="heading">Join Twitter today</div>
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
              placeholder="Enter username"
              name="username"
              autoComplete="username"
            />
          </Form.Group>

          <Form.Group>
            <StyledFormControl
              {...register("password", {
                required: true,
                validate: (value) => value === watch("confirmpassword"),
              })}
              error={errors.password}
              type="password"
              id="inputPassword"
              placeholder="Enter password"
              name="password"
              autoComplete="new-password"
            />
          </Form.Group>
          <Form.Group>
            <StyledFormControl
              {...register("confirmpassword", {
                required: true,
                validate: (value) => value === watch("password"),
              })}
              error={errors.confirmpassword}
              type="password"
              id="inputConfirmPassword"
              placeholder="Repeat Password"
              name="confirmpassword"
              autoComplete="new-password"
            />
          </Form.Group>
          <Form.Group>
            <StyledFormControl
              // TODO: character limit
              {...register("name", {
                required: true,
              })}
              error={errors.name}
              type="text"
              id="inputName"
              placeholder="Enter name"
              name="name"
              autoComplete="name"
            />
          </Form.Group>
          <Form.Group>
            <StyledFormControl
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
              error={errors.email}
              type="email"
              id="inputEmail"
              placeholder="Enter email address"
              name="email"
            />
          </Form.Group>
          <Form.Group>
            <StyledFormControl
              {...register("confirmpassword", {
                required: true,
              })}
              // error={errors.gender}
              as="select"
              name="gender"
            >
              <option value="" hidden>
                &#160;&#160;Select
              </option>
              <option value="M">&#160;&#160;Male</option>
              <option value="F">&#160;&#160;Female</option>
            </StyledFormControl>
          </Form.Group>

          <Button primary label={"Sign up"} type="submit" />

          <div className="signup">
            Have an account already? <Link to="/login">Log in</Link>
          </div>
        </StyledForm>
      </div>
    </LoginContainer>
  );
};
export default Signup;
