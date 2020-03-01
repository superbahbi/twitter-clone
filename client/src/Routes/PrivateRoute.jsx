import React, { useContext } from "react";
import styled from "styled-components";
import { Route, Redirect } from "react-router-dom";
import { authContext } from "../Contexts/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
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

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(authContext);
  const { loading } = auth;

  if (loading) {
    return (
      <Route
        {...rest}
        render={() => {
          return (
            <Spinner>
              <ClipLoader
                size={150}
                //size={"150px"} this also works
                color={"#1DA1F2"}
                loading={loading}
              />
            </Spinner>
          );
        }}
      />
    );
  }
  // if loading is set to true (when our function useEffect(() => {}, []) is not executed), we are rendering a loading component;

  return (
    <Route
      {...rest}
      render={routeProps => {
        return auth.data ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateRoute;
