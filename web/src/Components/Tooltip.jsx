import React from "react";
import styled from "styled-components";
const TooltipContainer = styled.div`
  position: absolute;
  bottom: -10px;
  right: 0px;
  background-color: white;
  border-radius: 4px;
  color: #0f1419;
  height: 52px;
  width: 300px;
  box-sizing: border-box;
  -webkit-box-shadow: rgb(101 119 134 / 20%) 0px 0px 15px,
    rgb(101 119 134 / 15%) 0px 0px 3px 1px;
  box-shadow: rgb(101 119 134 / 20%) 0px 0px 15px,
    rgb(101 119 134 / 15%) 0px 0px 3px 1px;
  .tooltip-item {
    display: inline-flex;
    padding: 16px 16px;

    margin: auto;
    cursor: pointer;
    color: red;

    svg {
      height: 18.75px;
      width: 18.75px;
      fill: red;
      margin-right: 12px;
    }
    .tooltip-text {
      display: flex;
      align-items: center;
      text-align: left;
      font-size: 15px;
      line-height: 15px;
    }
  }
  :hover {
    background-color: #f7f7f7;
  }
`;
const Tooltip = (props) => {
  return (
    <>
      <TooltipContainer id="button-tooltip" {...props}>
        <div className="custom-tooltip">
          <div className="tooltip-item">
            {/* <Trash /> */}
            <div className="tooltip-text">Delete</div>
          </div>
        </div>
      </TooltipContainer>
    </>
  );
};

export default Tooltip;
