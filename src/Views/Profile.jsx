import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context as AuthContext } from "../Contexts/AuthContext";
// import { Context as UserContext } from "../Contexts/UserContext";
import { useMediaQuery } from "react-responsive";
import Navbar from "../Components/Navbar";
import Feed from ".././Components/Feed";
import Header from "../Components/Header";
import ProfileBox from "../Components/ProfileBox";
import Sidebar from "../Components/Sidebar";
import Col from "react-bootstrap/Col";
function Profile() {
  // const profile = props.match.params.profile;
  let { profile } = useParams();
  const { state: authState } = useContext(AuthContext);
  // const { state: userState, getUser } = useContext(UserContext);
  const [reload, setReload] = useState();
  const [user, setUser] = useState({});
  const [tweetCount, setTweetCount] = useState();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });
  // useEffect(() => {
  //   getUser(profile);
  // }, [profile]);

  return (
    <>
      {isDesktopOrLaptop && (
        <Col lg={3}>
          <Navbar username={authState && authState.user.username} />
        </Col>
      )}
      <Col xs={12} md={8} lg={6}>
        {authState.user && (
          <>
            <Header
              name={authState.user && authState.user.profile.name}
              tweetCount={authState.user.tweets}
            />
            <ProfileBox
              user={authState.user}
              username={authState.user.username}
            />
            <Feed
              token={authState.token}
              user={authState.user}
              reload={reload}
              setReload={setReload}
              tweetCount={tweetCount}
              setTweetCount={setTweetCount}
              location="profile"
              profile={profile}
            />
          </>
        )}
      </Col>
      {isDesktopOrLaptop && (
        <Col lg={3}>
          <Sidebar />
        </Col>
      )}
    </>
  );
}
export default Profile;
