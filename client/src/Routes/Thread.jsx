import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../Contexts/AuthContext";
import Navbar from ".././Components/Navbar";
import Sidebar from ".././Components/Sidebar";
import styled from "styled-components";
import Header from "../Components/Header";
import Feed from ".././Components/Feed";
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
function Thread(props) {
  const threadID = props.match.params.threadID;
  const { auth } = useContext(authContext);
  const [thread, setThread] = useState({});
  const [reload, setReload] = useState();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let method = {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + auth.data.token
      }
    };
    // This gets called after every render, by default (the first one, and every one
    // after that)
    if (threadID) {
      let url = process.env.REACT_APP_API_URL + "/api/thread/" + threadID;
      fetch(url, method, { signal })
        .then(results => results.json())
        .then(data => setThread(data))
        .catch(error => {
          console.log(error);
        });
    }
    // If you want to implement componentWillUnmount, return a function from here,
    // and React will call it prior to unmounting.

    return function() {
      /**
       * Add cleanup code here
       */
      console.log("Thread data unmounting...");
      controller.abort();
    };
  }, [props]);
  console.log(thread);
  return (
    <Container>
      <NavContainer>
        <Navbar />
      </NavContainer>
      <ProfileContainer>
        <Header name="Thread" />
        <Feed
          auth={auth.data}
          reload={reload}
          setReload={setReload}
          location="thread"
          threadID={threadID}
        />
      </ProfileContainer>
      <SideBarContainer>
        <Sidebar />
      </SideBarContainer>
    </Container>
  );
}
export default Thread;
