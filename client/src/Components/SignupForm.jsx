import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from ".././Components/Button";
import styled from "styled-components";
import { fetchDB } from "../Helper/fetch";
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
const SelectBox = styled.select`
  font-size: 15px;
  color: #657786;
  background-color: #f5f8fa;
  border: 0 solid black;
  box-sizing: border-box;
  margin-left: 15px;
  padding: 15px;
`;
function SignupForm() {
  const history = useHistory();
  const [requestError, setRequestError] = useState();
  const { register, handleSubmit, errors, watch } = useForm(); // initialise the hook
  const onSubmit = async data => {
    const response = await fetchDB("/signup", "POST", data);
    console.log(response);
    if (response.status === 200) {
      history.push("/login");
    } else if (response.status === 400) {
      setRequestError(response.data);
    }
  };

  return (
    <React.Fragment>
      <HeadingText>Sign up</HeadingText>

      {requestError &&
        requestError.map((i, index) => (
          <InputBox key={index}>
            {i.code === 11000 ? "Email address already exist" : i.message}
          </InputBox>
        ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBox>
          <InputBoxLabel>
            Username
            <InputBoxInput
              name="username"
              type="text"
              ref={register({
                required: true
              })}
            />
            {errors.username && <ErrorBar></ErrorBar>}
          </InputBoxLabel>
        </InputBox>

        <InputBox>
          <InputBoxLabel>
            Password
            <InputBoxInput
              name="password"
              type="password"
              ref={register({
                required: true,
                validate: value => value === watch("confirmpassword")
              })}
            />
            {errors.password && <ErrorBar></ErrorBar>}
          </InputBoxLabel>
        </InputBox>

        <InputBox>
          <InputBoxLabel>
            Confirm Password
            <InputBoxInput
              name="confirmpassword"
              type="password"
              ref={register({
                required: true,
                validate: value => value === watch("password")
              })}
            />
            {errors.confirmpassword && <ErrorBar></ErrorBar>}
          </InputBoxLabel>
        </InputBox>

        <InputBox>
          <InputBoxLabel>
            Email
            <InputBoxInput
              name="email"
              type="text"
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && <ErrorBar></ErrorBar>}
          </InputBoxLabel>
        </InputBox>
        <InputBox>
          <InputBoxLabel>
            Gender
            <SelectBox
              name="gender"
              ref={register({
                required: true
              })}
            >
              <option value="" disabled defaultValue hidden>
                Select
              </option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </SelectBox>
          </InputBoxLabel>
        </InputBox>
        <InputBox>
          <InputBoxLabel>
            Phone
            <InputBoxInput
              name="phone"
              type="text"
              ref={register({
                required: true,
                minLength: 6,
                maxLength: 12
              })}
            />
            {errors.phone && <ErrorBar></ErrorBar>}
          </InputBoxLabel>
        </InputBox>

        <Button
          name="button"
          type="submit"
          label="Signup"
          btnStyle="signup-btn"
        />
      </form>
    </React.Fragment>
  );
}
export default SignupForm;
