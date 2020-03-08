import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { fetchDB } from "../Helper/fetch";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import formurlencoded from "form-urlencoded";
const ErrorBar = styled.div`
  border-bottom: 2px solid;
  border-color: red;
`;
function SignupForm() {
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      {requestError &&
        requestError.map((i, index) => (
          <Alert variant="danger" key={index}>
            {i.code === 11000 ? "Email address already exist" : i.message}
          </Alert>
        ))}
      <Form.Group>
        <Form.Control
          type="text"
          id="inputUsername"
          placeholder="Enter username..."
          name="username"
          ref={register({
            required: true
          })}
        />
        {errors.username && <ErrorBar></ErrorBar>}
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="password"
          id="inputPassword"
          placeholder="Enter password ..."
          name="password"
          ref={register({
            required: true,
            validate: value => value === watch("confirmpassword")
          })}
        />
        {errors.password && <ErrorBar></ErrorBar>}
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="password"
          id="inputConfirmPassword"
          placeholder="Repeat Password ..."
          name="confirmpassword"
          ref={register({
            required: true,
            validate: value => value === watch("password")
          })}
        />
        {errors.confirmpassword && <ErrorBar></ErrorBar>}
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="email"
          id="inputEmail"
          placeholder="Enter email address..."
          name="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <ErrorBar></ErrorBar>}
      </Form.Group>
      <Form.Group>
        <Form.Control
          as="select"
          name="gender"
          ref={register({
            required: true
          })}
        >
          <option value="" defaultValue hidden>
            Select
          </option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </Form.Control>
        {errors.gender && <ErrorBar></ErrorBar>}
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="tel"
          id="inputPhone"
          placeholder="Enter phone number..."
          name="phone"
          ref={register({
            required: true,
            minLength: 6,
            maxLength: 12
          })}
        />
        {errors.phone && <ErrorBar></ErrorBar>}
      </Form.Group>

      <Button variant="primary" type="submit" block>
        Signup
      </Button>
      <hr />
    </Form>
  );
}
export default SignupForm;
