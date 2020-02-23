import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../Contexts/AuthContext";
import Navbar from ".././Components/Navbar";
import Feed from ".././Components/Feed";
import Sidebar from ".././Components/Sidebar";
import styled from "styled-components";
import FeedHeader from "../Components/Feed/FeedHeader";
import ProfileBox from "../Components/ProfileBox";
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
function Profile() {
  const { auth, setAuthData } = useContext(authContext);
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
          <FeedHeader
            page="Profile"
            name={auth.data.user.profile.name}
            tweetCount={auth.data.user.tweets}
          />
          <ProfileBox user={auth.data.user} />
          <Feed tweet={tweet} />
        </HomeContainer>
        <SideBarContainer>
          <Sidebar />
        </SideBarContainer>
      </div>
    </div>
  );
}
export default Profile;
