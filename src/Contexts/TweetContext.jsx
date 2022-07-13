import createDataContext from "./createDataContext";
import api from "../Helper/api";

const tweetReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "fetch_tweets":
      return { ...state, errorMessage: "", tweets: action.payload };
    case "add_tweet":
      return {
        ...state,
        errorMessage: "",
        tweets: action.payload,
      };

    case "like_tweet":
      state.tweets.map((tweet) => {
        if (tweet._id === action.payload.response._id) {
          let lineIndex = -1;
          tweet.likes.map((like, index) => {
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
    case "delete_tweet":
      state.tweets.map((tweet, index) => {
        if (tweet._id === action.payload) {
          state.tweets.splice(index, 1);
        }
        return null;
      });
      return { ...state, errorMessage: "" };
    case "reload":
      return { ...state, errorMessage: "", reload: action.payload };
    case "reset":
      return { ...state, errorMessage: "", tweets: action.payload };
    default:
      return state;
  }
};
const getTweets = (dispatch) => async (id) => {
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
const addTweet = (dispatch) => async (data) => {
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
const clearAddTweet = (dispatch) => async () => {
  dispatch({ type: "update_feed", payload: null });
};
const deleteTweet = (dispatch) => async (id) => {
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
const editTweet = (dispatch) => async (id, data) => {};
const likeTweet = (dispatch) => async (id, userId) => {
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
const addComment = (dispatch) => async (data) => {
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
const resetData = (dispatch) => () => {
  dispatch({ type: "reset", payload: "" });
};
export const { Provider, Context } = createDataContext(
  tweetReducer,
  {
    getTweets,
    addTweet,
    clearAddTweet,
    deleteTweet,
    editTweet,
    likeTweet,
    addComment,
    resetData,
  },
  { tweets: null, errorMessage: "", newTweet: null, reload: null }
);
