import createDataContext from "./createDataContext";
import api from "../Helper/api";
import {
  ILikesProps,
  IReducerActionProps,
  ITweetContextProps,
  ITweetDataProps,
} from "../Helper/interface";
import { TweetTypes } from "../Helper/enum";

const tweetReducer = (
  state: ITweetContextProps,
  action: IReducerActionProps
) => {
  switch (action.type) {
    case TweetTypes.Error:
      return { ...state, errorMessage: action.payload };
    case TweetTypes.Fetch:
      return { ...state, errorMessage: "", tweets: action.payload };
    case TweetTypes.Add:
      return {
        ...state,
        errorMessage: "",
        tweets: action.payload,
      };

    case TweetTypes.Like:
      state.tweets.map((tweet: ITweetDataProps) => {
        if (tweet._id === action.payload.response._id) {
          let lineIndex = -1;
          tweet.likes.map((like: ILikesProps, index: number) => {
            if (like._id === action.payload.userId) {
              lineIndex = index;
            }
            return null;
          });
          if (lineIndex === -1) {
            tweet.likes.push({ _id: action.payload.userId });
          } else {
            tweet.likes.splice(lineIndex);
          }
        }
        return null;
      });
      return { ...state, errorMessage: "" };
    case TweetTypes.Delete:
      state.tweets.map((tweet: ITweetDataProps, index: number) => {
        if (tweet._id === action.payload) {
          state.tweets.splice(index, 1);
        }
        return null;
      });
      return { ...state, errorMessage: "" };
    case TweetTypes.Reload:
      return { ...state, errorMessage: "", reload: action.payload };
    case TweetTypes.Reset:
      return { ...state, errorMessage: "", tweets: action.payload };
    default:
      return state;
  }
};
const getTweets = (dispatch: React.Dispatch<any>) => async (id: string) => {
  try {
    let url = id ? "/api/tweet/" + id : "/api/tweet";
    const response = await api.get(url);
    dispatch({ type: "fetch_tweets", payload: response.data.foundTweet });
  } catch (error) {
    dispatch({
      type: "add_error",
      payload:
        "Cannot fetch tweets. Please check your internet connection and try again.",
    });
  }
};
const addTweet =
  (dispatch: React.Dispatch<any>) => async (data: ITweetDataProps) => {
    try {
      const response = await api.post("/api/tweet", data);
      dispatch({ type: "add_tweet", payload: response.data.foundTweet });
    } catch (error) {
      dispatch({
        type: "add_error",
        payload:
          "Cannot post tweet. Please check your internet connection and try again.",
      });
    }
  };
const clearAddTweet = (dispatch: React.Dispatch<any>) => async () => {
  dispatch({ type: "update_feed", payload: null });
};
const deleteTweet = (dispatch: React.Dispatch<any>) => async (id: string) => {
  try {
    await api.delete("/api/tweet/" + id);
    dispatch({ type: "delete_tweet", payload: id });
  } catch (error) {
    dispatch({
      type: "add_error",
      payload:
        "Cannot delete tweet. Please check your internet connection and try again.",
    });
  }
};
// const editTweet = (dispatch: any) => async (id, data) => {};
const likeTweet =
  (dispatch: React.Dispatch<any>) => async (id: any, userId: string) => {
    try {
      const response = await api.put("/api/like/" + id);
      dispatch({
        type: "like_tweet",
        payload: { response: response.data, userId: userId },
      });
    } catch (error) {
      dispatch({
        type: "add_error",
        payload:
          "Cannot like tweet. Please check your internet connection and try again.",
      });
    }
  };
const addComment =
  (dispatch: React.Dispatch<any>) => async (data: ITweetDataProps) => {
    try {
      const response = await api.post("/api/comment", data);
      dispatch({ type: "add_tweet", payload: response });
    } catch (error) {
      dispatch({
        type: "add_error",
        payload:
          "Cannot post comment. Please check your internet connection and try again.",
      });
    }
  };
const resetData = (dispatch: React.Dispatch<any>) => () => {
  dispatch({ type: "reset", payload: "" });
};
export const { Provider, Context } = createDataContext(
  tweetReducer,
  {
    getTweets,
    addTweet,
    clearAddTweet,
    deleteTweet,
    // editTweet,
    likeTweet,
    addComment,
    resetData,
  },
  { tweets: null, errorMessage: "", newTweet: null, reload: null }
);
