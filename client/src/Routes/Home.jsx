import React, { useState, useEffect } from "react";
import Navbar from ".././Components/Navbar";
import Feed from ".././Components/Feed";
import Sidebar from ".././Components/Sidebar";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction:
  height: 100vh;
`;
function Home() {
  const [data, setData] = useState({});
  useEffect(() => {
    // This gets called after every render, by default (the first one, and every one
    // after that)
    const request = async (id = 100) => {
      // const response = await fetch('http://localhost:3001/api/user/bahbi')
      // setUser(await response.json());
      const raesponse = await fetch("http://localhost:3001/api/home");
      setData(await raesponse.json());
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
        <div className="w-10 p-0">
          <Navbar />
        </div>
        <div className="w-50 p-0">
          <Feed />
        </div>
        <div className="w-10 p-0">asd</div>
        <Sidebar />
      </div>
    </div>
  );
}
export default Home;
