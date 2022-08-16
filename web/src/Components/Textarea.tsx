import React from "react";
import styled from "styled-components";

const TextAreaBox = styled.div`
  padding: 12px 0px;
  .textarea {
    display: inline-block;
    font-size: 20px;
    font-weight: 300;
    line-height: 28px;
    overflow: hidden;
    resize: none;
    border: none;
    outline: none;
    padding: 2px 0px;
  }
  .textarea[contenteditable]:empty::before {
    color: ${(props) => props.theme.color.lightText};
    content: attr(data-ph);
    white-space: pre-wrap;
  }
`;
interface ITextAreaProps {
  placeholder?: string;
  onHandleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  height?: string;
}
const Textarea: React.FC<ITextAreaProps> = ({
  placeholder,
  onHandleChange,
}) => {
  return (
    <TextAreaBox>
      <div
        data-ph={placeholder}
        className="textarea"
        role="textbox"
        onInput={onHandleChange}
        contentEditable="true"
      ></div>
    </TextAreaBox>
  );
};
export default Textarea;
