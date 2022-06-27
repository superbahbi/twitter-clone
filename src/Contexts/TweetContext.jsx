import createDataContext from "./createDataContext";
import api from "../Helper/api";

const tweetReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "fetch_tweets":
      return { ...state, errorMessage: "", tweets: action.payload };
    case "add_tweet":
      return { ...state, errorMessage: "", newTweet: action.payload };
    case "reload":
      return { ...state, errorMessage: "", reload: true };
    default:
      return state;
  }
};
const getTweet = (dispatch) => async () => {
  try {
    const response = await api.get("/api/tweet");
    dispatch({ type: "fetch_tweets", payload: response.data });
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
    dispatch({ type: "add_tweet", payload: response });
  } catch (error) {
    dispatch({
      type: "add_error",
      payload:
        "Cannot post tweet. Please check your internet connection and try again.",
    });
  }
};
const clearAddTweet = (dispatch) => async () => {
  dispatch({ type: "add_tweet", payload: null });
};
const deleteTweet = (dispatch) => async (id) => {
  try {
    const response = await api.delete("/api/tweet/" + id);
    dispatch({ type: "add_tweet", payload: response });
  } catch (error) {
    dispatch({
      type: "add_error",
      payload:
        "Cannot delete tweet. Please check your internet connection and try again.",
    });
  }
};
const editTweet = (dispatch) => async (id, data) => {};
const likeTweet = (dispatch) => async (id) => {
  try {
    const response = await api.put("/api/like/" + id);
    console.log(response);
    dispatch({ type: "add_tweet", payload: response });
  } catch (error) {
    dispatch({
      type: "add_error",
      payload:
        "Cannot delete tweet. Please check your internet connection and try again.",
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
export const { Provider, Context } = createDataContext(
  tweetReducer,
  {
    getTweet,
    addTweet,
    clearAddTweet,
    deleteTweet,
    editTweet,
    likeTweet,
    addComment,
  },
  { tweets: null, errorMessage: "", newTweet: null, reload: null }
);
