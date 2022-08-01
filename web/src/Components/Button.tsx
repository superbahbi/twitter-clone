import React from "react";
import styled from "styled-components";
import { IButtonProps } from "../Helper/interface";

const StyledButton = styled.button<IButtonProps>`
  width: ${(props) => props.width || ""};
  height: ${(props) => (props.large && "52px") || "38px"};
  line-height: ${(props) => (props.large && "52px") || "34px"};

  color: ${(props) => (props.textColor && props.textColor) || "#fff"};
  background-color: ${(props) =>
    (props.secondary && "#fff") ||
    (props.backgroundColor && props.backgroundColor) ||
    "#1da1f2"};

  font-size: ${(props) => (props.large && "17px") || "15px"};
  font-weight: ${(props) => (props.large && "600") || "600"};
  padding: ${(props) => (props.large && "0px 32px") || "0px 16px"};

  border: ${(props) =>
    (props.secondary && "1px solid rgb(207, 217, 222)") || "none"};
  border-radius: ${(props) =>
    (props.primary && "30px") ||
    (props.secondary && "30px") ||
    (props.large && "9999px") ||
    "30px"};
  opacity: ${(props) => (props.disabled && "0.5") || "1"};
  :focus {
    text-decoration: none;
    outline: none;
  }
  :hover {
    background-color: ${(props) =>
      (props.hoverBackgroundColor && props.hoverBackgroundColor) || "#1a91da"};
  }
`;

const Button: React.FC<IButtonProps> = ({
  className,
  primary,
  secondary,
  textColor,
  backgroundColor,
  hoverBackgroundColor,
  large,
  width,
  right,
  id,
  type,
  name,
  disabled,
  label,
  handleClick,
}) => {
  return (
    <StyledButton
      className={className}
      primary={primary}
      secondary={secondary}
      textColor={textColor}
      backgroundColor={backgroundColor}
      hoverBackgroundColor={hoverBackgroundColor}
      large={large}
      width={width}
      right={right}
      id={id}
      type={type}
      name={name}
      disabled={disabled}
      onClick={handleClick}
    >
      {label}
    </StyledButton>
  );
};
export default Button;
