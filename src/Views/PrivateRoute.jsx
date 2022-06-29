import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { useMediaQuery } from "react-responsive";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
const Container = styled.div`
  width: 1200px;
  display: grid;
  grid-template-areas: "navbar main sidebar";
  grid-template-columns: 251px 600px 350fr;
  gap: 20px;
  margin: 0 auto;
`;
const NavbarContainer = styled.div`
  grid-area: navbar;
`;
const MainContainer = styled.div`
  grid-area: main;
  border-color: rgb(239, 243, 244);
  border-style: solid;
  border-width: 1px;
`;
const SidebarContainer = styled.div`
  grid-area: sidebar;
`;
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
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
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
      {isDesktopOrLaptop && (
        <NavbarContainer>
          <Navbar username={state.user.username} />
        </NavbarContainer>
      )}
      <MainContainer>{children}</MainContainer>
      {isDesktopOrLaptop && (
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
      )}
    </Container>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
