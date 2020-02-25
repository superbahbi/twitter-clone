import React, { useContext } from "react";
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

  return (
    <Container>
      <NavContainer>
        <Navbar />
      </NavContainer>
      <HomeContainer>
        <Tweet
          username={auth.data.user.username}
          avatar={auth.data.user.profile.avatar.filename}
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
