import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../Contexts/AuthContext";
import { useMediaQuery } from "react-responsive";
import Col from "react-bootstrap/Col";
import Tweet from ".././Components/Tweet";
import Sidebar from "../Components/Sidebar";
import { fetchDB } from "../Helper/fetch";

function Home() {
  const { auth } = useContext(authContext);
  const [user, setUser] = useState();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const request = async () => {
      const response = await fetchDB(
        `/user/${auth.data.user.username}`,
        null,
        signal
      );
      setUser(response.data);
    };
    request();
    return function () {
      console.log("Home data unmounting...");
      controller.abort();
    };
  }, [auth.data.user.username]);
  return (
    <>
      <Col xs={12} md={8} lg={6}>
        <Tweet
          username={user && user.username}
          avatar={user && user.profile.avatar.filename}
          page="Home"
          auth={auth.data}
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
