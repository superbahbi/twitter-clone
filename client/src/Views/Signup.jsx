import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchDB } from "../Helper/fetch";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from ".././Components/Button";
import formurlencoded from "form-urlencoded";
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
function Signup() {
  const history = useHistory();
  const [requestError, setRequestError] = useState();
  const { register, handleSubmit, errors, watch } = useForm(); // initialise the hook
  const onSubmit = async data => {
    const method = {
      method: "POST",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formurlencoded(data)
    };
    const response = await fetchDB("/signup", method);
    console.log(response);
    if (response.status === 200) {
      history.push("/login");
    } else if (response.status === 400) {
      setRequestError(response.data);
    }
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
                      {requestError &&
                        requestError.map((i, index) => (
                          <Alert variant="danger" key={index}>
                            {i.code === 11000
                              ? "Email address already exist"
                              : i.message}
                          </Alert>
                        ))}
                      <Form.Group>
                        <StyledFormControl
                          type="text"
                          id="inputUsername"
                          placeholder="Enter username"
                          name="username"
                          ref={register({
                            required: true
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
                          ref={register({
                            required: true,
                            validate: value =>
                              value === watch("confirmpassword")
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
                          ref={register({
                            required: true,
                            validate: value => value === watch("password")
                          })}
                        />
                        {errors.confirmpassword && <ErrorBar></ErrorBar>}
                      </Form.Group>
                      <Form.Group>
                        <StyledFormControl
                          type="email"
                          id="inputEmail"
                          placeholder="Enter email address"
                          name="email"
                          ref={register({
                            required: true,
                            pattern: /^\S+@\S+$/i
                          })}
                        />
                        {errors.email && <ErrorBar></ErrorBar>}
                      </Form.Group>
                      <Form.Group>
                        <StyledFormControl
                          as="select"
                          name="gender"
                          ref={register({
                            required: true
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
                      <Form.Group>
                        <StyledFormControl
                          type="number"
                          id="inputPhone"
                          placeholder="Enter phone number"
                          name="phone"
                          ref={register({
                            required: true,
                            minLength: 6,
                            maxLength: 12
                          })}
                        />
                        {errors.phone && <ErrorBar></ErrorBar>}
                      </Form.Group>

                      <Button
                        btnStyle="signup-btn"
                        label="Signup"
                        type="submit"
                      >
                        Signup
                      </Button>
                      <hr />
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
