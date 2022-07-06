import { useContext } from "react";
import { Context as UserContext } from "../Contexts/UserContext";
const useUser = (id) => {
  const { getUser, resetData } = useContext(UserContext);

  const getUserProfile = async (id) => {
    return await getUser(id);
  };

  const reset = async () => {
    await resetData();
  };
  return {
    getUserProfile,
    reset,
  };
};
export default useUser;
