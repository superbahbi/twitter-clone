import React from "react";
import { useMediaQuery } from "react-responsive";
import Header from ".././Components/Header";
import Sidebar from ".././Components/Sidebar";
import Col from "react-bootstrap/Col";
function Explorer() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return (
    <>
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
