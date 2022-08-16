import React from "react";
import styled from "styled-components";
import { IInputProps } from "../Helper/interface";

const InputBox = styled.div`
  font-size: 15px;
  color: ${(props) => props.theme.color.lightText};
  background-color: ${(props) => props.theme.color.background};
  border: 0 solid black;
  box-sizing: border-box;
  margin-right: 15px;
  padding: 15px;
  border-bottom: 2px solid ${(props) => props.theme.color.border};
  width: 250px;
  max-width: 250px;
  :hover {
    color: ${(props) => props.theme.color.main};
    border-color: ${(props) => props.theme.color.main};
  }
`;

const InputBoxLabel = styled.div`
  margin-bottom: 0;
`;

const InputBoxInput = styled.input`
  align-items: stretch;
  border: 0 solid black;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.color.background};
  color: black;
  display: block;
  font-size: 20px;
  :focus {
    outline: none;
    outline: none;
  }
`;

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
