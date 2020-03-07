import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../Contexts/AuthContext";
import Navbar from ".././Components/Navbar";
import Feed from ".././Components/Feed";
import Sidebar from ".././Components/Sidebar";
import styled from "styled-components";
import Header from "../Components/Header";
import ProfileBox from "../Components/ProfileBox";
const Container = styled.div`
  display: flex !important;
  flex-direction: row !important;
  justify-content: center !important;
`;
const NavContainer = styled.div`
  width: 15% !important;
`;
const ProfileContainer = styled.div`
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
  const { auth } = useContext(authContext);
  const [reload, setReload] = useState();
  const [user, setUser] = useState({});
  const [tweetCount, setTweetCount] = useState();
  useEffect(() => {
    // This gets called after every render, by default (the first one, and every one
    // after that)
    let url = process.env.REACT_APP_API_URL + "/api/user/" + profile;

    const request = async (id = 100) => {
      const res2 = await fetch(url);
      setUser(await res2.json());
    };
    request();

    // If you want to implement componentWillUnmount, return a function from here,
    // and React will call it prior to unmounting.
    return () => console.log("Feed data unmounting...");
  }, [profile]);
  return (
    user && (
      <Container>
        <NavContainer>
          <Navbar />
        </NavContainer>
        <ProfileContainer>
          <Header
            name={user.profile && user.profile.name}
            tweetCount={tweetCount}
          />
          <ProfileBox user={user} />
          <Feed
            auth={auth.data}
            reload={reload}
            setReload={setReload}
            tweetCount={tweetCount}
            setTweetCount={setTweetCount}
            location="profile"
            profile={profile}
          />
        </ProfileContainer>
        <SideBarContainer>
          <Sidebar />
        </SideBarContainer>
      </Container>
    )
  );
}
export default Profile;
