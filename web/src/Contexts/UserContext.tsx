import createDataContext from "./createDataContext";
import api from "../Helper/api";
import { IReducerActionProps } from "../Helper/interface";

const userReducer = (state: any, action: IReducerActionProps) => {
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
const getAllUser = (dispatch: any) => async () => {
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
const getUserMessage = (dispatch: any) => async (id: string) => {
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
const getUser = (dispatch: any) => async (id: string) => {
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
