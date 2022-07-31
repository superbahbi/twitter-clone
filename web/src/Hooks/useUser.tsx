import { useContext } from "react";
import { Context as UserContext } from "../Contexts/UserContext";
const useUser = () => {
  const { getUser, resetData } = useContext(UserContext);

  const getUserProfile = async (id: string | undefined) => {
    if (id) {
      return await getUser(id);
    } else return null;
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
