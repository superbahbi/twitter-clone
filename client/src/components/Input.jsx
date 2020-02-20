import React from "react";
import styled from "styled-components";

const InputBox = styled.div`
  font-size: 13px;
  color: #657786;
  background-color: #f5f8fa;
  border: 0 solid black;
  box-sizing: border-box;
  max-width: initial;
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

const InputBoxinput = styled.input.attrs(props => ({
  type: "text",
  size: props.small ? 5 : undefined
}))`
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
        <InputBoxinput name={props.name}></InputBoxinput>
      </InputBoxLabel>
    </InputBox>
  );
}
export default Input;
