import React from "react";
import styled from "styled-components";
import { IButtonProps } from "../Helper/interface";
const StyledButton = styled.button<IButtonProps>`
  color: ${(props) =>
    (props.textColor && props.textColor) || props.theme.color.white};

  width: ${(props) => props.width || ""};
  height: ${(props) => (props.large && "52px") || "38px"};
  line-height: ${(props) => (props.large && "52px") || "38px"};

  background-color: ${(props) =>
    (props.secondary && props.theme.color.white) ||
    (props.backgroundColor && props.backgroundColor) ||
    props.theme.color.main};

  font-size: ${(props) =>
    (props.large && props.theme.fontSize.large) || props.theme.fontSize.medium};
  font-weight: ${(props) =>
    (props.large && props.theme.fontWeight.regular) ||
    props.theme.fontWeight.regular};
  padding: ${(props) => (props.large && "0px 32px") || "0px 16px"};

  border: ${(props) =>
    (props.secondary && `1px solid ${props.theme.color.border}`) || "none"};
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
      (props.hoverBackgroundColor && props.hoverBackgroundColor) ||
      props.theme.color.hover};
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
