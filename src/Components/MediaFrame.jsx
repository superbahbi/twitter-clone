import React from "react";
import styled from "styled-components";
const Frame = styled.div`
  position: relative;
  width: 300px;
  .close {
    position: absolute;
    top: 0;
    right: 0;
    width: 25px;
    height: 25px;
    font-size: 0;
  }
  .close:before,
  .close:after {
    position: absolute;
    width: 5px;
    height: 20px;
    background-color: white;
    transform: rotate(45deg) translate(-50%, -50%);
    transform-origin: top left;
    transition: all 420ms;
    content: "";
  }
  .close:after {
    transform: rotate(-45deg) translate(-50%, -50%);
  }
  .close:hover:before,
  .close:hover:after {
    background-color: $close-color-hover;
  }
`;
const MediaFrame = ({ children, onHandleMediaClose }) => {
  return (
    <Frame>
      <button
        className="close"
        tabIndex="0"
        role="button"
        onClick={onHandleMediaClose}
      >
        close
      </button>
      {children}
    </Frame>
  );
};

export default MediaFrame;
