import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Header from ".././Components/Header";
import Sidebar from ".././Components/Sidebar";
import Col from "react-bootstrap/Col";
function Bookmarks() {
  const controller = new AbortController();
  // const signal = controller.signal;
  // const { auth } = useContext(authContext);
  // const user = auth.data.user;
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  useEffect(() => {
    const request = async () => {
      // const response = await fetchDB(
      //     `/user/${auth.data.user.username}`,
      //     null,
      //     signal
      // );
      // setUser(response.data);
    };
    request();
    return function () {
      console.log("Bookmarks data unmounting...");
      controller.abort();
    };
  }, []);
  return (
    <>
      <Col xs={12} md={8} lg={6}>
        <Header name="Bookmarks" />
      </Col>
      {isDesktopOrLaptop && (
        <Col lg={3}>
          <Sidebar />
        </Col>
      )}
    </>
  );
}
export default Bookmarks;
