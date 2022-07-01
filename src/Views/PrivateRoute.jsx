import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Context as AuthContext } from "../Contexts/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import NavMobile from "../Components/NavMobile";
import Sidebar from "../Components/Sidebar";

const Container = styled.div`
  width: 1200px;
  display: grid;
  grid-template-areas: "navbar main sidebar";
  grid-template-columns: 251px 600px 350px;
  @media only screen and (max-width: 1265px) and (min-width: 1081px) {
    grid-template-columns: 50px 600px 350px;
    width: 1000px;
  }
  @media only screen and (max-width: 1080px) and (min-width: 701px) {
    grid-template-columns: 50px 600px;
    width: 650px;
  }
  // @media (max-width: 700px) {

  // }
  @media only screen and (max-width: 700px) and (-webkit-min-device-pixel-ratio: 3) {
    grid-template-columns: 1fr;
    width: 100%;
    gap: 0px;
  }
  gap: 20px;
  margin: 0 auto;
`;
const NavbarContainer = styled.div`
  grid-area: navbar;
  @media (max-width: 700px) {
    display: none;
  }
`;
const MainContainer = styled.div`
  grid-area: main;
  border-color: rgb(239, 243, 244);
  border-style: solid;
  border-width: 1px;
`;
const SidebarContainer = styled.div`
  grid-area: sidebar;
  @media (max-width: 1080px) {
    display: none;
  }
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
      <NavbarContainer>
        <Navbar username={state.user.username} />
      </NavbarContainer>

      <MainContainer>
        {children}
        <NavMobile />
      </MainContainer>

      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
    </Container>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
