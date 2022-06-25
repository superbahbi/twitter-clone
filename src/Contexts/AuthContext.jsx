import createDataContext from "./createDataContext";
import api from "../Helper/api";
import formurlencoded from "form-urlencoded";
import { useNavigate } from "react-router-dom";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return {
        errorMessage: "",
        token: action.payload.token,
        user: action.payload.user,
      };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, user: null, errorMessage: "" };
    default:
      return state;
  }
};
const tryLocalSignin = (dispatch) => async () => {
  const token = await JSON.parse(localStorage.getItem("token"));
  const user = await JSON.parse(localStorage.getItem("user"));
  if (token && user) {
    dispatch({
      type: "signin",
      payload: { token: token, user: user },
    });
  }
};
const signin = (dispatch) => async (data) => {
  try {
    // TO DO
    // Check if token is expired
    const response = await api.post("/api/login", formurlencoded(data));
    if (response.data.token && response.data.user) {
      await localStorage.setItem("token", JSON.stringify(response.data.token));
      await localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    dispatch({
      type: "signin",
      payload: { token: response.data.token, user: response.data.user },
    });
  } catch (error) {
    dispatch({
      type: "add_error",
      payload:
        "The email and password don't belong to the same account. Check the inputs and try again.",
    });
  }
};
const signup = (dispatch) => async (data) => {
  console.log(data);
  try {
    // TO DO
    // Check if token is expired
    const response = await api.post("/api/signup", formurlencoded(data));
    if (response.data.token && response.data.user) {
      await localStorage.setItem("token", JSON.stringify(response.data.token));
      await localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    dispatch({
      type: "signin",
      payload: { token: response.data.token, user: response.data.user },
    });
  } catch (error) {
    dispatch({
      type: "add_error",
      payload:
        "The email and password don't belong to the same account. Check the inputs and try again.",
    });
  }
};
const logout = (dispatch) => async () => {
  await localStorage.removeItem("token");
  await localStorage.removeItem("user");
  dispatch({ type: "signout" });
};
const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};
export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signup, logout, tryLocalSignin, clearErrorMessage },
  { token: null, user: null, errorMessage: "" }
);
