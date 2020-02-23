import React from "react";
import styled from "styled-components";

const InputBox = styled.div`
  font-size: 15px;
  color: #657786;
  background-color: #f5f8fa;
  border: 0 solid black;
  box-sizing: border-box;
  margin-right: 15px;
  padding: 15px;
  border-bottom: 2px solid #657786;
  :hover {
    color: #71c9f8;
    border-color: #71c9f8;
  }
`;

const InputBoxLabel = styled.div`
  margin-bottom: 0;
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
  width: 100%;
  max-width: 100%;
`;
function Input(props) {
  return (
    <InputBox>
      <InputBoxLabel>
        {props.name}
        <InputBoxInput
          onChange={props.onHandleChange}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          autocomplete={props.autocomplete}
          value={props.value}
        />
      </InputBoxLabel>
    </InputBox>
  );
}
export default Input;
