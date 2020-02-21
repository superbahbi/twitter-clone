import React from "react";
import styled from "styled-components";

const Text = styled.span`
  padding-right: 0.25em;
  font-size: 16px;
  font-weight: bold;
`;

function FeedName(props) {
  return <Text>{props.text}</Text>;
}
export default FeedName;
