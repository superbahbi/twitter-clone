import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Navigate, Route } from "react-router-dom";
import { Context as AuthContext } from "../Contexts/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
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
function PrivateRoute({ children }) {
  const { state, tryLocalSignin } = useContext(AuthContext);
  useEffect(() => {
    tryLocalSignin();
  }, []);
  if (state.loading) {
    return (
      <Spinner>
        <ClipLoader size={150} color={"#1DA1F2"} loading={state.loading} />
      </Spinner>
    );
  }

  return state.token && state.user ? (
    <Container>
      <Row>{children}</Row>
    </Container>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
