// import React, { useState, useContext } from "react";

// import { authContext } from "../Contexts/AuthContext";
// import Navbar from ".././Components/Navbar";
// import Sidebar from ".././Components/Sidebar";
// import styled from "styled-components";
// import Header from "../Components/Header";
// import Feed from ".././Components/Feed";
// const Container = styled.div`
//   display: flex !important;
//   flex-direction: row !important;
//   justify-content: center !important;
// `;
// const NavContainer = styled.div`
//   width: 15% !important;
// `;
// const ProfileContainer = styled.div`
//   width: 50% !important;
//   padding: 0;
//   max-width: 600px;
// `;
// const SideBarContainer = styled.div`
//   width: 15% !important;
//   padding: 0;
// `;
// const Thread: React.FC<{}> = (props) => {
//   const threadID = props.match.params.threadID;
//   const { auth } = useContext(authContext);
//   const [reload, setReload] = useState(false);
//   return (
//     <Container>
//       <NavContainer>
//         <Navbar />
//       </NavContainer>
//       <ProfileContainer>
//         <Header name="Thread" />
//         <Feed
//           auth={auth.data}
//           reload={reload}
//           setReload={setReload}
//           location="thread"
//           threadID={threadID}
//         />
//       </ProfileContainer>
//       <SideBarContainer>
//         <Sidebar />
//       </SideBarContainer>
//     </Container>
//   );
// };
<></>;
// export default Thread;
import React from "react";
const Thread: React.FC<{}> = ({}) => {
  return <></>;
};
export default Thread;
