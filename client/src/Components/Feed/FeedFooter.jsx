import React from "react";
import Button from ".././Button";

const iconList = ["comment", "retweet", "heart", "link"];
function FeedFooter() {
  return iconList.map(item => (
    <Button
      name="button"
      type="button"
      btnStyle="feed-tweet-icon"
      icon={item}
      size="2x"
    />
  ));
}
export default FeedFooter;
