import createDataContext from "./createDataContext";
import api from "../Helper/api";

const userReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "fetch_users":
      return {
        ...state,
        errorMessage: "",
        allUser: action.payload,
      };
    case "fetch_user":
      return {
        ...state,
        errorMessage: "",
        getUser: action.payload,
      };
    case "fetch_messages":
      return { ...state, errorMessage: "", messages: action.payload };
    default:
      return state;
  }
};
const getAllUser = (dispatch) => async () => {
  try {
    const response = await api.get("/api/getAllUser");
    dispatch({ type: "fetch_users", payload: response.data });
  } catch (error) {
    dispatch({
      type: "add_error",
      payload:
        "Cannot fetch users. Please check your internet connection and try again.",
    });
  }
};
const getUserMessage = (dispatch) => async (id) => {
  try {
    const response = await api.get("/api/getMessages/" + id);
    dispatch({ type: "fetch_messages", payload: response.data });
  } catch (error) {
    dispatch({
      type: "add_error",
      payload:
        "Cannot fetch messages. Please check your internet connection and try again.",
    });
  }
};
const getUser = (dispatch) => async (id) => {
  try {
    const response = await api.get("/api/user/" + id);
    dispatch({ type: "fetch_user", payload: response.data });
  } catch (error) {
    dispatch({
      type: "add_error",
      payload:
        "Cannot fetch user. Please check your internet connection and try again.",
    });
  }
};
export const { Provider, Context } = createDataContext(
  userReducer,
  { getAllUser, getUserMessage, getUser },
  { allUser: null, messages: null, getUser: null, errorMessage: "" }
);
