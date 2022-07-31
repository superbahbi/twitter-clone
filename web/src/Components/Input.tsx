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
interface IInputProps {
  name: string;
  onHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
  autocomplete: string;
  value: string;
}
const Input: React.FC<IInputProps> = ({
  name,
  onHandleChange,
  type,
  placeholder,
  autocomplete,
  value,
}) => {
  return (
    <InputBox>
      <InputBoxLabel>
        {name}
        <InputBoxInput
          onChange={onHandleChange}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autocomplete}
          value={value}
        />
      </InputBoxLabel>
    </InputBox>
  );
};
export default Input;
