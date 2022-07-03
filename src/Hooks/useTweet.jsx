import { useContext } from "react";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { Context as TweetContext } from "../Contexts/TweetContext";
const useTweet = (id) => {
  const { state: authState } = useContext(AuthContext);
  const { getTweets, likeTweet, deleteTweet, resetData } =
    useContext(TweetContext);
  const getAllTweets = async () => {
    return await getTweets();
  };
  const getUserTweets = async (id) => {
    return await getTweets(id);
  };
  const doLikeTweet = async (id) => {
    return await likeTweet(id, authState.user._id);
  };
  const doDeleteTweet = async (id) => {
    return await deleteTweet(id);
  };
  const reset = async () => {
    await resetData();
  };
  return {
    getAllTweets,
    getUserTweets,
    doLikeTweet,
    doDeleteTweet,
    reset,
  };
};
export default useTweet;
