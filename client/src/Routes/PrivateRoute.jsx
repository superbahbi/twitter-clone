import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { authContext } from "../Contexts/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(authContext);
  const { loading } = auth;

  if (loading) {
    return (
      <Route
        {...rest}
        render={() => {
          return (
            <div className="sweet-loading">
              <ClipLoader
                size={150}
                //size={"150px"} this also works
                color={"#123abc"}
                loading={loading}
              />
            </div>
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
