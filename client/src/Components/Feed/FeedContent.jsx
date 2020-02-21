import React from "react";
import styled from "styled-components";

const Text = styled.span`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
`;
function FeedContent(props) {
  return <Text>{props.text}</Text>;
}
export default FeedContent;
