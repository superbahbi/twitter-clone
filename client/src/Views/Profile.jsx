import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../Contexts/AuthContext";
import Navbar from ".././Components/Navbar";
import Feed from ".././Components/Feed";
import Sidebar from ".././Components/Sidebar";
import styled from "styled-components";
import Header from "../Components/Header";
import ProfileBox from "../Components/ProfileBox";
import { fetchDB } from "../Helper/fetch";
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

  const request = async signal => {
    const response = await fetchDB(`/user/${profile}`, null, signal);
    setUser(response.data);
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    request(signal);
    return function() {
      console.log("Profile data unmounting...");
      controller.abort();
    };
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
