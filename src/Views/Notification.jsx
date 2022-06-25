import React, { useContext } from "react";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { useMediaQuery } from "react-responsive";
import Navbar from "../Components/Navbar";
import Header from ".././Components/Header";
import Sidebar from ".././Components/Sidebar";
import Col from "react-bootstrap/Col";
function Notification() {
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
        <Header name="Notification" iconLeft iconRight="ion-ios-gear-outline" />
      </Col>
      {isDesktopOrLaptop && (
        <Col lg={3}>
          <Sidebar />
        </Col>
      )}
    </>
  );
}
export default Notification;
