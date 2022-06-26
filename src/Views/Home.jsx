import React, { useContext } from "react";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { useMediaQuery } from "react-responsive";
import Col from "react-bootstrap/Col";
import Tweet from ".././Components/Tweet";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

function Home() {
  const { state } = useContext(AuthContext);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return (
    <>
      <Col xs={12} md={8} lg={6}>
        <Header name="Home" />
        <Tweet
          token={state.token}
          user={state.user}
          id={state.user._id}
          username={state.user.username}
          avatar={state.user.profile.avatar.filename}
          page="Home"
        />
      </Col>
      {isDesktopOrLaptop && (
        <Col lg={3}>
          <Sidebar />
        </Col>
      )}
    </>
  );
}
export default Home;
