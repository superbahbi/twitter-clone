import { useContext } from "react";
import { Context as UserContext } from "../Contexts/UserContext";
export default () => {
  const { getUserMessage } = useContext(UserContext);

  const useGetMessages = async (_id) => {
    await getUserMessage(_id);
  };
  return [useGetMessages];
};
