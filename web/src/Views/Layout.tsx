import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import NavMobile from "../Components/NavMobile";
import TweetFloat from "../Components/TweetFloat";
import { ILayoutProps } from "../Helper/interface";
const RootContainer = styled(Container)`
  max-width: 1295px;
  padding: 0px;
  margin-left: auto;
  margin-right: auto;

  @media only screen and (max-width: 700px) {
    padding: 0px;
    max-width: 600px;
  }
`;
const MainRow = styled(Row)`
  margin-left: 0px;
  margin-right: 0px;
  margin: auto;
  justify-content: center !important;
  @media only screen and (max-width: 1055px) {
    max-width: 674px;
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
  @media only screen and (max-width: 700px) {
    padding-top: 53px;
  }
  max-width: 990px;
  padding: 0px;
`;
const SubMainRow = styled(Row)`
  margin-left: 0px;
  margin-right: 0px;
`;
const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <RootContainer>
      <MainRow>
        <NavbarContainer>
          <Navbar />
        </NavbarContainer>
        <MainContainer>
          <SubMainRow>
            {children}
            <TweetFloat />
            <NavMobile />
          </SubMainRow>
        </MainContainer>
      </MainRow>
    </RootContainer>
  );
};

export default Layout;
