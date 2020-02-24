import React from "react";
import styled from "styled-components";

const TextAreaBox = styled.div`
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

const TextAreaInput = styled.textarea`
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
function Textarea(props) {
  return (
    <TextAreaBox>
      <TextAreaInput
        ref={props.projectRef}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        autocomplete={props.autocomplete}
        value={props.value}
        wrap="soft"
        onChange={props.onHandleChange}
      ></TextAreaInput>
    </TextAreaBox>
  );
}
export default Textarea;
