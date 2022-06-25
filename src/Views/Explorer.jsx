import React, { useContext } from "react";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { useMediaQuery } from "react-responsive";
import Header from ".././Components/Header";
import Navbar from "../Components/Navbar";
import Sidebar from ".././Components/Sidebar";
import Col from "react-bootstrap/Col";
function Explorer() {
  const { state } = useContext(AuthContext);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return (
    <>
      {isDesktopOrLaptop && (
        <Col lg={3}>
          <Navbar username={state.data && state.user.username} />
        </Col>
      )}
      <Col xs={12} md={8} lg={6}>
        <Header name="Explorer" iconLeft iconRight="ion-ios-gear-outline" />
      </Col>
      {isDesktopOrLaptop && (
        <Col lg={3}>
          <Sidebar />
        </Col>
      )}
    </>
  );
}
export default Explorer;
