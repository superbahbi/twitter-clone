import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import NavMobile from "../Components/NavMobile";
const RootContainer = styled(Container)`
  margin-left: auto;
  margin-right: auto;
  max-width: 1295px;
`;
const MainRow = styled(Row)`
  margin-left: 0px;
  margin-right: 0px;
  margin: auto;
  justify-content: center !important;
  @media only screen and (max-width: 1005px) {
    max-width: 650px;
  }
`;
const NavbarContainer = styled(Col)`
  max-width: 275px;
  @media only screen and (max-width: 1250px) {
    max-width: 74px;
  }
  @media only screen and (max-width: 700px) {
    display: none;
  }
  padding-left: 12px;
  padding-right: 12px;
`;
const MainContainer = styled(Col)`
  max-width: 990px;
  padding: 0px;
`;
const SubMainRow = styled(Row)`
  margin-left: 0px;
  margin-right: 0px;
`;
const Layout = ({ children, username }) => {
  return (
    <RootContainer>
      <MainRow>
        <NavbarContainer>
          <Navbar username={username} />
        </NavbarContainer>
        <MainContainer>
          <SubMainRow>{children}</SubMainRow>
          <NavMobile />
        </MainContainer>
      </MainRow>
    </RootContainer>
  );
};

export default Layout;
