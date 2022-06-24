import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authContext } from "../Contexts/AuthContext";
import { Context as AuthReducerContext } from "../Contexts/AuthReducerContext";
import { fetchDB } from "../Helper/fetch";
import formurlencoded from "form-urlencoded";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from ".././Components/Button";
const ErrorBar = styled.div`
  border-bottom: 2px solid;
  border-color: red;
`;
const BackgroundGradient = styled.div`
  height: 100vh;
  background-color: #71c9f8;
  background-image: linear-gradient(180deg, #71c9f8 10%, #1da1f2);
  background-size: cover;
`;
const LoginDarkIllustration = styled.div`
  text-align: center;
  padding: 15px 0 20px;
  font-size: 100px;
  color: #1da1f2;
`;
const StyledForm = styled(Form)`
  background-color: #1e2833;
  padding: 40px;
  border-radius: 4px;
  color: #fff;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
`;
const StyledFormControl = styled(Form.Control)`
  background: none;
  border: none;
  border-bottom: 1px solid #434a52;
  border-radius: 0;
  box-shadow: none;
  outline: none;
  color: inherit;
  :focus {
    background: none;
    border: none;
    border-bottom: 1px solid #434a52;
    border-radius: 0;
    box-shadow: none;
    outline: none;
    color: inherit;
  }
`;
const StyleCheckbox = styled(Form.Check)`
  color: #6c757d;
`;
const Text = styled.a`
  color: #1da1f2;
  font-size: 100%;
  font-weight: 400;
`;
function Login() {
  const history = useHistory();
  const { setAuthData } = useContext(authContext);
  const { state, signin, clearErrorMessage } = useContext(AuthReducerContext);
  const [requestError, setRequestError] = useState();

  const { register, handleSubmit, errors } = useForm();
  return (
    <BackgroundGradient>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={9} lg={6} xl={6}>
            <Card className="shadow-lg o-hidden border-0 my-5">
              <Card.Body className="p-0">
                <Row>
                  <Col lg={12}>
                    <StyledForm onSubmit={handleSubmit((data) => signin(data))}>
                      <LoginDarkIllustration>
                        <i className="icon ion-ios-locked-outline"></i>
                      </LoginDarkIllustration>
                      {state.errorMessage ? (
                        <Alert variant="danger">{state.errorMessage}</Alert>
                      ) : null}
                      <Form.Group>
                        <StyledFormControl
                          type="text"
                          id="inputUsername"
                          placeholder="Enter Username..."
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
                          placeholder="Enter Password ..."
                          name="password"
                          ref={register({
                            required: true,
                          })}
                        />
                        {errors.password && <ErrorBar></ErrorBar>}
                      </Form.Group>
                      <Form.Group>
                        <StyleCheckbox type="checkbox" label="Remember Me" />
                      </Form.Group>
                      <Button primary label="Login" type="submit" />
                      <hr />
                      <div className="text-center">
                        <Text href="forgot">Forgot Password?</Text>
                      </div>
                      <div className="text-center">
                        Don't have an account?
                        <Text href="signup"> Sign up</Text>
                      </div>
                    </StyledForm>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </BackgroundGradient>
  );
}
export default Login;
