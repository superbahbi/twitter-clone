import React from "react";
import styled from "styled-components";

const TextAreaBox = styled.div`
  padding: 12px 0px;

  .textarea {
    display: block;
    font-size: 20px;
    font-weight: 300;
    line-height: 28px;

    width: 100%;
    overflow: hidden;
    resize: both;
    border: none;
    outline: none;
    resize: none;
    padding: 2px 0px;
  }
  .textarea[contenteditable]:empty::before {
    color: #436471;
    content: "What's happening?";
  }
`;

function Textarea(props) {
  return (
    <TextAreaBox>
      <div
        className="textarea"
        role="textbox"
        // ref={props.projectRef}
        // name={props.name}
        // type={props.type}
        placeholder={props.placeholder}
        // autoComplete={props.autocomplete}
        // value={props.value}
        onInput={props.onHandleChange}
        contentEditable="true"
      ></div>
    </TextAreaBox>
  );
}
export default Textarea;
