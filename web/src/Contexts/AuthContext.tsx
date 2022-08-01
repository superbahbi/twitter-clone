import createDataContext from "./createDataContext";
import api from "../Helper/api";
import formurlencoded from "form-urlencoded";
import {
  IAuthContextProps,
  IFormLoginProps,
  IFormSignupProps,
  IReducerActionProps,
  IUserProps,
} from "../Helper/interface";
import { AuthTypes } from "../Helper/enum";

const authReducer = (state: IAuthContextProps, action: IReducerActionProps) => {
  switch (action.type) {
    case AuthTypes.Error:
      return { ...state, errorMessage: action.payload };
    case AuthTypes.Signin:
      return {
        loading: false,
        errorMessage: "",
        token: action.payload.token,
        user: action.payload.user,
      };
    case AuthTypes.ClearError:
      return { ...state, errorMessage: "" };
    case AuthTypes.Signout:
      return { loading: false, token: null, user: null, errorMessage: "" };
    default:
      return state;
  }
};
const tryLocalSignin =
  (dispatch: React.Dispatch<any>) => async (): Promise<void> => {
    const token: string = await JSON.parse(
      localStorage.getItem("token") as string
    );
    const user: IUserProps = (await JSON.parse(
      localStorage.getItem("user") as string
    )) as IUserProps;
    //TODO:
    // Check if token is expired
    if (token && user) {
      dispatch({
        type: "signin",
        payload: { token: token, user: user },
      });
    } else {
      dispatch({ type: "signout" });
    }
  };
const signin =
  (dispatch: React.Dispatch<any>) => async (data: IFormLoginProps) => {
    try {
      // TO DO
      // Check if token is expired
      const response = await api.post("/api/login", formurlencoded(data));
      if (response.data.token && response.data.user) {
        await localStorage.setItem(
          "token",
          JSON.stringify(response.data.token)
        );
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
const signup =
  (dispatch: React.Dispatch<any>) => async (data: IFormSignupProps) => {
    try {
      // TO DO
      // Check if token is expired
      const response = await api.post("/api/signup", formurlencoded(data));
      if (response.data.token && response.data.user) {
        await localStorage.setItem(
          "token",
          JSON.stringify(response.data.token)
        );
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
const logout = (dispatch: React.Dispatch<any>) => async () => {
  await localStorage.removeItem("token");
  await localStorage.removeItem("user");
  dispatch({ type: "signout" });
};
const clearErrorMessage = (dispatch: React.Dispatch<any>) => () => {
  dispatch({ type: "clear_error_message" });
};
export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signup, logout, tryLocalSignin, clearErrorMessage },
  { loading: true, token: null, user: null, errorMessage: "" }
);
