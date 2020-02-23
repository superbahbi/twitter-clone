import React from "react";
import Button from ".././Button";

const iconList = ["comment", "retweet", "heart", "link"];
function FeedFooter() {
  return iconList.map((item, index) => (
    <Button
      key={index}
      name="button"
      type="button"
      btnStyle="feed-tweet-icon"
      icon={item}
      size="2x"
    />
  ));
}
export default FeedFooter;
