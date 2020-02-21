import React, { useState, useEffect } from "react";
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
  const [data, setData] = useState({});
  useEffect(() => {
    // This gets called after every render, by default (the first one, and every one
    // after that)
    const request = async (id = 100) => {
      // const response = await fetch('http://localhost:3001/api/user/bahbi')
      // setUser(await response.json());
      const response = await fetch("http://localhost:3001/api/home");
      setData(await response.json());
    };
    request();
    // If you want to implement componentWillUnmount, return a function from here,
    // and React will call it prior to unmounting.
    return () => console.log("unmounting...");
  }, []);
  const { foundUser, foundTweet } = data;
  // {foundTweet && foundTweet.map(tweet => tweet.username ) }
  // {foundUser && foundUser._id }
  return (
    <div>
      <div className="d-flex flex-row justify-content-center">
        <NavContainer>
          <Navbar />
        </NavContainer>
        <HomeContainer>
          <Tweet />
          <Feed tweet={foundTweet} user={foundUser} />
        </HomeContainer>
        <SideBarContainer>
          <Sidebar />
        </SideBarContainer>
      </div>
    </div>
  );
}
export default Home;
