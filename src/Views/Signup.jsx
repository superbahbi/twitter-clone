import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { useForm } from "react-hook-form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { Loading } from "../Assets/Icon";
// import Alert from "react-bootstrap/Alert";
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
  color: #6c757d;
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
    color: #6c757d;
  }
  option {
    color: #6c757d;
    background: #1e2833;
  }
`;
const TextLink = styled(Link)`
  color: #1da1f2;
  font-size: 100%;
  font-weight: 400;
`;
function Signup() {
  const navigate = useNavigate();
  const { state, signup, tryLocalSignin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, watch } = useForm(); // initialise the hook
  useEffect(() => {
    tryLocalSignin();
  }, []);
  if (state.token) {
    navigate("/login");
  }

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setLoading(true);
    signup(data);
  };
  return (
    <BackgroundGradient>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={9} lg={6} xl={6}>
            <Card className="shadow-lg o-hidden border-0 my-5">
              <Card.Body className="p-0">
                <Row>
                  <Col lg={12}>
                    <StyledForm onSubmit={handleSubmit(onSubmit)}>
                      <LoginDarkIllustration>
                        <i className="icon ion-ios-paper-outline"></i>
                      </LoginDarkIllustration>
                      {/* {requestError &&
                        requestError.map((i, index) => (
                          <Alert variant="danger" key={index}>
                            {i.code === 11000
                              ? "Email address already exist"
                              : i.message}
                          </Alert>
                        ))} */}
                      <Form.Group>
                        <StyledFormControl
                          type="text"
                          id="inputUsername"
                          placeholder="Enter username"
                          name="username"
                          autoComplete="username"
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
                          placeholder="Enter password"
                          name="password"
                          autoComplete="new-password"
                          ref={register({
                            required: true,
                            validate: (value) =>
                              value === watch("confirmpassword"),
                          })}
                        />
                        {errors.password && <ErrorBar></ErrorBar>}
                      </Form.Group>
                      <Form.Group>
                        <StyledFormControl
                          type="password"
                          id="inputConfirmPassword"
                          placeholder="Repeat Password"
                          name="confirmpassword"
                          autoComplete="new-password"
                          ref={register({
                            required: true,
                            validate: (value) => value === watch("password"),
                          })}
                        />
                        {errors.confirmpassword && <ErrorBar></ErrorBar>}
                      </Form.Group>
                      <Form.Group>
                        <StyledFormControl
                          type="text"
                          id="inputName"
                          placeholder="Enter name"
                          name="name"
                          autoComplete="name"
                          ref={register({
                            required: true,
                          })}
                        />
                        {errors.name && <ErrorBar></ErrorBar>}
                      </Form.Group>
                      <Form.Group>
                        <StyledFormControl
                          type="email"
                          id="inputEmail"
                          placeholder="Enter email address"
                          name="email"
                          ref={register({
                            required: true,
                            pattern: /^\S+@\S+$/i,
                          })}
                        />
                        {errors.email && <ErrorBar></ErrorBar>}
                      </Form.Group>
                      <Form.Group>
                        <StyledFormControl
                          as="select"
                          name="gender"
                          ref={register({
                            required: true,
                          })}
                        >
                          <option value="" hidden>
                            &#160;&#160;Select
                          </option>
                          <option value="M">&#160;&#160;Male</option>
                          <option value="F">&#160;&#160;Female</option>
                        </StyledFormControl>
                        {errors.gender && <ErrorBar></ErrorBar>}
                      </Form.Group>

                      <Button
                        primary
                        label={loading ? <Loading /> : "Login"}
                        type="submit"
                      />
                      <hr />

                      <div className="text-center">
                        Have an account already?
                        <TextLink to="/login"> Log in</TextLink>
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
export default Signup;
