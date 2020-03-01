import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../Contexts/AuthContext";
import Navbar from ".././Components/Navbar";
import Tweet from ".././Components/Tweet";
import Sidebar from ".././Components/Sidebar";
import styled from "styled-components";
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
  const { auth } = useContext(authContext);
  const [user, setUser] = useState();
  useEffect(() => {
    // This gets called after every render, by default (the first one, and every one
    // after that)
    let url =
      process.env.REACT_APP_API_URL + "/api/user/" + auth.data.user.username;

    const request = async (id = 100) => {
      const res2 = await fetch(url);
      setUser(await res2.json());
    };
    request();

    // If you want to implement componentWillUnmount, return a function from here,
    // and React will call it prior to unmounting.
    return () => console.log("Feed data unmounting...");
  }, [auth.data.user.username]);
  return (
    <Container>
      <NavContainer>
        <Navbar username={user && user.username} />
      </NavContainer>
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
