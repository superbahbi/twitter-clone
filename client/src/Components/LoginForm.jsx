import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authContext } from "../Contexts/AuthContext";

import styled from "styled-components";
import formurlencoded from "form-urlencoded";
import { fetchDB } from "../Helper/fetch";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
const LoginContainer = styled.div`
  padding-top: 10em;
  width: 40vh;
`;
const HeadingText = styled.h1``;
const InputBox = styled.div`
  font-size: 15px;
  color: #657786;
  background-color: #f5f8fa;
  border: 0 solid black;
  box-sizing: border-box;
  margin-right: 15px;
  padding: 15px;
  border-bottom: 2px solid;
  border-color: #657786;
  width: 250px;
  max-width: 250px;
  :hover {
    color: #71c9f8;
    border-color: #71c9f8;
  }
`;
const InputBoxLabel = styled.div`
  margin-bottom: 0;
`;
const ErrorBar = styled.div`
  border-bottom: 2px solid;
  border-color: red;
`;
const InputBoxInput = styled.input`
  align-items: stretch;
  border: 0 solid black;
  box-sizing: border-box;
  background-color: #f5f8fa;
  color: black;
  display: block;
  font-size: 20px;
  :focus {
    outline: none;
    outline: none;
  }
`;
function LoginForm() {
  const history = useHistory();
  const { setAuthData } = useContext(authContext);
  const [requestError, setRequestError] = useState();

  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const onSubmit = async data => {
    const method = {
      method: "POST",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formurlencoded(data)
    };
    const response = await fetchDB("/login", method);
    console.log(response);
    if (response.status === 200) {
      setAuthData(response.data);
      history.push("/home");
    } else if (response.status === 400) {
      setRequestError(response.data);
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {requestError &&
        requestError.map((i, index) => (
          <Alert variant="danger">
            The username and password you entered did not match our records.
            Please double-check and try again.
          </Alert>
        ))}
      <Form.Group controlId="formUsername">
        <Form.Control
          type="text"
          id="inputUsername"
          placeholder="Enter Username..."
          name="username"
          ref={register({
            required: true
          })}
        />
      </Form.Group>
      <Form.Group controlId="fromPassword">
        <Form.Control
          type="password"
          id="inputPassword"
          placeholder="Enter Password ..."
          name="password"
          ref={register({
            required: true
          })}
        />
      </Form.Group>
      <Form.Group controlId="formCheckbox">
        <Form.Check type="checkbox" label="Remember Me" />
      </Form.Group>
      <Button variant="primary" type="submit" block>
        Login
      </Button>
      <hr />
    </Form>
  );
}
export default LoginForm;
