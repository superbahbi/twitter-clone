import createDataContext from "./createDataContext";
import api from "../Helper/api";

const tweetReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "fetch_tweets":
      return { errorMessage: "", tweets: action.payload };
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

export const { Provider, Context } = createDataContext(
  tweetReducer,
  { getTweet },
  { tweets: null, errorMessage: "" }
);
