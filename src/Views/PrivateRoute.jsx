import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Navigate } from "react-router-dom";
import { Context as AuthContext } from "../Contexts/AuthContext";
function PrivateRoute({ children }) {
  const { state, tryLocalSignin } = useContext(AuthContext);
  useEffect(() => {
    tryLocalSignin();
  }, []);
  return state.token ? (
    <Container>
      <Row>{children}</Row>
    </Container>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
