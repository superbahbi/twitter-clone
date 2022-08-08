import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import tweetApi from "../api/tweetApi";
import formurlencoded from "form-urlencoded";
import * as RootNavigation from "../navigationRef";
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
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};
const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  const user = await AsyncStorage.getItem("user");
  // await AsyncStorage.removeItem("token");
  if (token && user) {
    dispatch({
      type: "signin",
      payload: { token: token, user: JSON.parse(user) },
    });
    RootNavigation.navigate("Home");
  } else {
    RootNavigation.navigate("Signin");
  }
};
const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};
const signup =
  (dispatch) =>
  async ({ username, password, email, name }) => {
    try {
      const response = await tweetApi.post(
        "/api/signup",
        formurlencoded({
          username,
          password,
          email,
          name,
        })
      );
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch({
        type: "signin",
        payload: { token: response.data.token, user: response.data.user },
      });
      RootNavigation.navigate("Home");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
  };

const signin =
  (dispatch) =>
  async ({ username, password }) => {
    try {
      const response = await tweetApi.post(
        "/api/login",
        formurlencoded({
          username,
          password,
        })
      );
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch({
        type: "signin",
        payload: { token: response.data.token, user: response.data.user },
      });
      RootNavigation.navigate("Home");
    } catch (err) {
      console.log(err);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("pushtoken");
  dispatch({ type: signout });
  navigate("Landing");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, user: null, errorMessage: "" }
);
