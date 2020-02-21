import React from "react";
import styled from "styled-components";

const InputBox = styled.div`
  font-size: 13px;
  color: #657786;
  background-color: #f5f8fa;
  border: 0 solid black;
  box-sizing: border-box;
  max-width: 100vh;
  margin-right: 15px;
  padding: 0 15px 0 15px;
  border-bottom: 2px solid #657786;
  display: inline-block;
  :hover {
    color: #71c9f8;
    border-color: #71c9f8;
  }
`;

const InputBoxLabel = styled.div`
  margin-bottom: 0;
`;

const InputBoxInput = styled.input.attrs(props => ({
  type: props.type,
  size: props.small ? 5 : undefined
}))`
  width: 45vh;
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
function Input(props) {
  return (
    <InputBox>
      <InputBoxLabel>
        {props.name}
        <InputBoxInput
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          autocomplete={props.autocomplete}
          value={props.value}
        ></InputBoxInput>
      </InputBoxLabel>
    </InputBox>
  );
}
export default Input;
