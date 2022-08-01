import createDataContext from "./createDataContext";
import api from "../Helper/api";
import { IReducerActionProps, IUserContextProps } from "../Helper/interface";
import { UserTypes } from "../Helper/enum";

const userReducer = (state: IUserContextProps, action: IReducerActionProps) => {
  switch (action.type) {
    case UserTypes.Error:
      return { ...state, errorMessage: action.payload };
    case UserTypes.FetchMany:
      return {
        ...state,
        errorMessage: "",
        allUser: action.payload,
      };
    case UserTypes.FetchOne:
      return {
        ...state,
        errorMessage: "",
        getUser: action.payload,
      };
    case UserTypes.Messages:
      return { ...state, errorMessage: "", messages: action.payload };
    default:
      return state;
  }
};
const getAllUser = (dispatch: React.Dispatch<any>) => async () => {
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
const getUserMessage =
  (dispatch: React.Dispatch<any>) => async (id: string) => {
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
const getUser = (dispatch: React.Dispatch<any>) => async (id: string) => {
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
