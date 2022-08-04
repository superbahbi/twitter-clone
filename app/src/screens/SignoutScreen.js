import React, { useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";

const SignoutScreen = () => {
  const { signout } = useContext(AuthContext);
  signout();
  return <></>;
};
export default SignoutScreen;
