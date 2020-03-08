import React, { useContext, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { authContext } from "../Contexts/AuthContext";
import Navbar from ".././Components/Navbar";
import Tweet from ".././Components/Tweet";
import Sidebar from ".././Components/Sidebar";
import styled from "styled-components";
import { fetchDB } from "../Helper/fetch";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function Home() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)"
  });
  // const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const { auth } = useContext(authContext);
  const [user, setUser] = useState();
  const request = async signal => {
    const response = await fetchDB(
      `/user/${auth.data.user.username}`,
      null,
      signal
    );
    setUser(response.data);
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    request(signal);
    return function() {
      console.log("Home data unmounting...");
      controller.abort();
    };
  }, [auth.data.user.username]);
  return (
    <Container>
      <Row>
        {isDesktopOrLaptop && (
          <Col md={3}>
            <Navbar
              username={user && user.username}
              avatar={user && user.profile.avatar.filename}
            />
          </Col>
        )}
        <Col md={6}>
          <Tweet
            username={user && user.username}
            avatar={user && user.profile.avatar.filename}
            page="Home"
            auth={auth.data}
          />
        </Col>
        <Col md={3}>
          <Sidebar />
        </Col>
      </Row>
    </Container>
  );
}
export default Home;
