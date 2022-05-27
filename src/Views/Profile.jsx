import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../Contexts/AuthContext";
import { useMediaQuery } from "react-responsive";
import Navbar from ".././Components/Navbar";
import Feed from ".././Components/Feed";
import Sidebar from ".././Components/Sidebar";
import Header from "../Components/Header";
import ProfileBox from "../Components/ProfileBox";
import { fetchDB } from "../Helper/fetch";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function Profile(props) {
  const profile = props.match.params.profile;
  const { auth } = useContext(authContext);
  const [reload, setReload] = useState();
  const [user, setUser] = useState({});
  const [tweetCount, setTweetCount] = useState();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)"
  });
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const request = async () => {
      const response = await fetchDB(`/user/${profile}`, null, signal);
      setUser(response.data);
    };
    request();
    return function() {
      console.log("Profile data unmounting...");
      controller.abort();
    };
  }, [profile]);

  return (
    user && (
      <Container>
        <Row>
          {isDesktopOrLaptop && (
            <Col md={3}>
              <Navbar
                username={user && user.username}
                avatar={user.profile && user.profile.avatar.filename}
              />
            </Col>
          )}
          <Col md={6}>
            <Header
              name={user.profile && user.profile.name}
              tweetCount={tweetCount}
            />
            <ProfileBox user={user} username={auth.data.user.username} />
            <Feed
              auth={auth.data}
              reload={reload}
              setReload={setReload}
              tweetCount={tweetCount}
              setTweetCount={setTweetCount}
              location="profile"
              profile={profile}
            />
          </Col>
          {isDesktopOrLaptop && (
            <Col md={3}>
              <Sidebar />
            </Col>
          )}
        </Row>
      </Container>
    )
  );
}
export default Profile;
