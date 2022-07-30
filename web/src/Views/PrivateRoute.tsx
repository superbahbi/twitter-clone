import React, { useContext, useEffect } from "react";
import { useJwt } from "react-jwt";
import { Navigate, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { IPrivateRouteProps } from "../Helper/interface";
import Layout from "./Layout";
const Spinner = styled.div`
  position: absolute;
  height: 100px;
  width: 100px;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
  background-size: 100%;
`;

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ children }) => {
  // function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { state, tryLocalSignin, logout } = useContext(AuthContext);
  const { decodedToken, isExpired } = useJwt(state.token);

  useEffect(() => {
    (async () => {
      await tryLocalSignin();
    })();

    if (isExpired && decodedToken) {
      logout();
      navigate("/login");
    }
    return () => {
      console.log("This will be logged on unmount");
    };
  }, [isExpired, decodedToken]);
  if (state.loading) {
    return (
      <Spinner>
        <ClipLoader size={150} color={"#1DA1F2"} loading={state.loading} />
      </Spinner>
    );
  }
  return state.token && state.user ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
