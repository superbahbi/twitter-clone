import createDataContext from "./createDataContext";
import axios from "axios";
import api from "../Helper/api";

import formurlencoded from "form-urlencoded";
const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};
const signin = (dispatch) => async (data) => {
  try {
    const response = await api.post("/api/login", formurlencoded(data));
    console.log(response.data);
    await localStorage.getItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
    //   navigate("Tweet");
  } catch (err) {
    console.log(err);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};
const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};
export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, clearErrorMessage },
  { token: null, errorMessage: "" }
);
