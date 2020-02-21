import React from "react";
import styled from "styled-components";

const Text = styled.span`
  padding-right: 0.25em;
  color: #657786;
  font-size: 14px;
`;
function FeedTag(props) {
  return <Text>{props.text}</Text>;
}
export default FeedTag;
