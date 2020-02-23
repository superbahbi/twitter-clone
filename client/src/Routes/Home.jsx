import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../Contexts/AuthContext";
import Navbar from ".././Components/Navbar";
import Tweet from ".././Components/Tweet";
import Feed from ".././Components/Feed";
import Sidebar from ".././Components/Sidebar";
import styled from "styled-components";

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
  const [tweet, setTweet] = useState([]);

  useEffect(() => {
    // This gets called after every render, by default (the first one, and every one
    // after that)
    const request = async (id = 100) => {
      const res2 = await fetch("http://localhost:3001/api/tweet");
      setTweet(await res2.json());
    };
    request();
    // If you want to implement componentWillUnmount, return a function from here,
    // and React will call it prior to unmounting.
    return () => console.log("unmounting...");
  }, []);
  return (
    <div>
      <div className="d-flex flex-row justify-content-center">
        <NavContainer>
          <Navbar />
        </NavContainer>
        <HomeContainer>
          <Tweet
            username={auth.data.user.username}
            avatar={auth.data.user.profile.avatar.filename}
            page="Home"
          />
          <Feed tweet={tweet.foundTweet} />
        </HomeContainer>
        <SideBarContainer>
          <Sidebar />
        </SideBarContainer>
      </div>
    </div>
  );
}
export default Home;
