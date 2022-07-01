import { useContext } from "react";
import { Context as TweetContext } from "../Contexts/TweetContext";
const useTweet = (id) => {
  const { getTweets, resetData } = useContext(TweetContext);
  const getAllTweets = async () => {
    return await getTweets();
  };
  const getUserTweets = async (id) => {
    return await getTweets(id);
  };
  const reset = async () => {
    await resetData();
  };
  return {
    getAllTweets,
    getUserTweets,
    reset,
  };
};
export default useTweet;
