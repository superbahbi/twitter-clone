import { useContext } from "react";
import { Context as TweetContext } from "../Contexts/TweetContext";
export default () => {
  const { getTweet } = useContext(TweetContext);

  const useGetTweets = async () => {
    console.log("getTweet");
    await getTweet();
  };
  return [useGetTweets];
};
