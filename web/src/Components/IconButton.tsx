import React from "react";
import styled from "styled-components";
import { IIconButtonProps } from "../Helper/interface";
const StyledIconButton = styled.button<IIconButtonProps>`
  padding: 0;
  border: none;
  background: none;
  color: ${(props) => props.color};

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0;
    width: ${(props) => (props.width ? props.width : "36px")};
    height: ${(props) => (props.height ? props.height : "36px")};
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    border-radius: ${(props) =>
      props.borderRadius ? props.borderRadius : "0px"};
    background-color: ${(props) =>
      props.backgroundColor ? props.backgroundColor : ""};
    svg {
      width: ${(props) => (props.size ? props.size : "20px")};
      height: ${(props) => (props.size ? props.size : "20px")};
      fill: ${(props) => (props.color ? props.color : props.theme.color.text)};
    }
    :hover {
      svg {
        fill: ${(props) =>
          props.hoverColor ? props.hoverColor : props.theme.color.icon};
      }
      border-radius: 30px;
      background-color: ${(props) =>
        props.hoverColorBackground
          ? props.hoverColorBackground
          : props.theme.color.icon};
    }
  }
`;

const IconButton: React.FC<IIconButtonProps> = ({
  id,
  style,
  className,
  type,
  name,
  handleClick,
  borderRadius,
  color,
  backgroundColor,
  hoverColor,
  hoverColorBackground,
  size,
  disabled,
  width,
  height,
  iconComponent,
  icon,
  children,
}) => {
  return (
    <StyledIconButton
      id={id}
      style={style}
      className={className}
      type={type}
      name={name}
      onClick={handleClick}
      borderRadius={borderRadius}
      color={color}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      hoverColorBackground={hoverColorBackground}
      size={size}
      disabled={disabled}
      width={width}
      height={height}
      icon={icon}
    >
      {iconComponent && (
        <label className="icon">
          {iconComponent}
          {children}
        </label>
      )}
    </StyledIconButton>
  );
};
export default IconButton;
