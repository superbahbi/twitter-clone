import React from "react";
import styled from "styled-components";
import { Close } from "../Assets/Icon";
import { IMediaFrameProps } from "../Helper/interface";
import IconButton from "./IconButton";
const Frame = styled.div`
  position: relative;
  width: 100%;
  img {
    border-radius: 16px;
  }
  iframe {
    border-radius: 16px;
    width: 100%;
    height: 300px;
  }
  .close {
    position: absolute;
    top: 0;
    left: 0;
    width: 25px;
    height: 25px;
    font-size: 0;
  }

  .close:hover:before,
  .close:hover:after {
    background-color: $close-color-hover;
  }
`;
const MediaFrame: React.FC<IMediaFrameProps> = ({
  children,
  onHandleMediaClose,
}) => {
  return (
    <Frame>
      <IconButton
        className="close"
        type="button"
        iconComponent={<Close />}
        color="#fff"
        hoverColor="#fff"
        hoverColorBackground="#black"
        handleClick={onHandleMediaClose}
      />
      {children}
    </Frame>
  );
};

export default MediaFrame;
