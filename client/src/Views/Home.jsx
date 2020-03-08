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
  const request = async () => {
    const response = await fetchDB(`/user/${auth.data.user.username}`, "GET");
    setUser(response.data);
  };
  useEffect(() => {
    // This gets called after every render, by default (the first one, and every one
    // after that)
    request();
    // If you want to implement componentWillUnmount, return a function from here,
    // and React will call it prior to unmounting.
    return () => console.log("Feed data unmounting...");
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
