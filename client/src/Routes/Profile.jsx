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
function Profile(props) {
  const profile = props.match.params.profile;
  const { auth, setAuthData } = useContext(authContext);
  const [tweetData, setTweetData] = useState({});
  const [userData, setUserData] = useState({});
  useEffect(() => {
    // This gets called after every render, by default (the first one, and every one
    // after that)
    const request = async (id = 100) => {
      const res1 = await fetch("http://localhost:3001/api/user/" + profile);
      setUserData(await res1.json());
      const res2 = await fetch("http://localhost:3001/api/tweet/" + profile);
      setTweetData(await res2.json());
    };
    request();
    // If you want to implement componentWillUnmount, return a function from here,
    // and React will call it prior to unmounting.
    return () => console.log("unmounting...");
  }, []);
  console.log(userData.foundUser);
  return (
    <div>
      <div className="d-flex flex-row justify-content-center">
        <NavContainer>
          <Navbar />
        </NavContainer>
        <HomeContainer>
          {userData.foundUser
            ? userData.foundUser.map(item => (
                <FeedHeader
                  page="Profile"
                  name={item.profile.name}
                  tweetCount={item.tweets}
                />
              ))
            : null}
          <FeedHeader
            page="Profile"
            // name={userData.foundUser.profile.name}
            // tweetCount={userData.tweets}
          />
          <ProfileBox user={userData.foundUser} />
          <Feed tweet={tweetData.foundTweet} auth={auth} />
        </HomeContainer>
        <SideBarContainer>
          <Sidebar />
        </SideBarContainer>
      </div>
    </div>
  );
}
export default Profile;
