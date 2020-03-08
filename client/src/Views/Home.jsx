import React, { useContext, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { authContext } from "../Contexts/AuthContext";
import Navbar from ".././Components/Navbar";
import Tweet from ".././Components/Tweet";
import Sidebar from ".././Components/Sidebar";
import styled from "styled-components";
import { fetchDB } from "../Helper/fetch";
const Container = styled.div`
  display: flex !important;
  flex-direction: row !important;
  justify-content: center !important;
`;
const NavContainer = styled.div`
  width: 15% !important;
`;
const HomeContainer = styled.div`
  width: 50% !important;
  padding: 0;
  max-width: 600px;
`;
const SideBarContainer = styled.div`
  width: 15% !important;
  padding: 0;
`;
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
      {isDesktopOrLaptop && (
        <NavContainer>
          <Navbar
            username={user && user.username}
            avatar={user && user.profile.avatar.filename}
          />
        </NavContainer>
      )}
      <HomeContainer>
        <Tweet
          username={user && user.username}
          avatar={user && user.profile.avatar.filename}
          page="Home"
          auth={auth.data}
        />
      </HomeContainer>
      <SideBarContainer>
        <Sidebar />
      </SideBarContainer>
    </Container>
  );
}
export default Home;
