import React, { useState, useEffect, useContext, useRef } from "react";
import { authContext } from "../Contexts/AuthContext";
import Navbar from ".././Components/Navbar";
import Tweet from ".././Components/Tweet";
import Feed from ".././Components/Feed";
import Sidebar from ".././Components/Sidebar";
import styled from "styled-components";
import formurlencoded from "form-urlencoded";
const Container = styled.div`
  display: flex !important;
  flex-direction: row !important;
  justify-content: center !important;
`;
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
  const [reload, setReload] = useState(false);
  const [tweet, setTweet] = useState([]);
  const projectNameRef = useRef("");
  useEffect(() => {
    // This gets called after every render, by default (the first one, and every one
    // after that)
    const request = async (id = 100) => {
      const res2 = await fetch(process.env.REACT_APP_API_URL + "/api/tweet");
      setTweet(await res2.json());
    };
    request();
    setReload(false);
    // If you want to implement componentWillUnmount, return a function from here,
    // and React will call it prior to unmounting.
    return () => console.log("unmounting...");
  }, [reload]);

  function onFormSubmit(e) {
    e.preventDefault();

    const request = async (id = 100) => {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/api/tweet",
        {
          method: "POST",
          headers: {
            Accept: "application/x-www-form-urlencoded",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + auth.data.token
          },
          body: formurlencoded({ Tweet: projectNameRef.current.value })
        }
      );
      await response.json();
      if (response.status === 200) {
        setReload(true);
      }
    };
    request();
    e.target.reset();
  }
  return (
    <Container>
      <NavContainer>
        <Navbar />
      </NavContainer>
      <HomeContainer>
        <Tweet
          username={auth.data.user.username}
          avatar={auth.data.user.profile.avatar.filename}
          page="Home"
          onHandleSubmit={onFormSubmit}
          prRef={projectNameRef}
        />
        <Feed tweet={tweet.foundTweet} />
      </HomeContainer>
      <SideBarContainer>
        <Sidebar />
      </SideBarContainer>
    </Container>
  );
}
export default Home;
// const { name, value } = event.target;
// setTweet(prevValue => {
//   return {
//     ...prevValue,
//     [name]: value
//   };
// });
