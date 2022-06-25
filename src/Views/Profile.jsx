import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../Contexts/AuthContext";
import { useMediaQuery } from "react-responsive";
import Feed from ".././Components/Feed";
import Header from "../Components/Header";
import ProfileBox from "../Components/ProfileBox";
import Sidebar from "../Components/Sidebar";
import { fetchDB } from "../Helper/fetch";
import Col from "react-bootstrap/Col";
function Profile(props) {
  const profile = props.match.params.profile;
  // const { state } = useContext(authContext);
  const [reload, setReload] = useState();
  const [user, setUser] = useState({});
  const [tweetCount, setTweetCount] = useState();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });
  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;
  //   const request = async () => {
  //     const response = await fetchDB(`/user/${profile}`, null, signal);
  //     setUser(response.data);
  //   };
  //   request();
  //   return function () {
  //     console.log("Profile data unmounting...");
  //     controller.abort();
  //   };
  // }, [profile]);

  return (
    <>
      <Col xs={12} md={8} lg={6}>
        {user && (
          <>
            <Header
              name={user.profile && user.profile.name}
              tweetCount={tweetCount}
            />
            <ProfileBox user={user} username={"auth.data.user.username"} />
            <Feed
              auth={"auth.data"}
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
