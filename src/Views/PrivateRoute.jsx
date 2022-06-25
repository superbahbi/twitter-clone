import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Navbar from ".././Components/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navigate, Route } from "react-router-dom";
import { Context as AuthContext } from "../Contexts/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
function PrivateRoute({ children }) {
  const { state, tryLocalSignin } = useContext(AuthContext);
  useEffect(() => {
    tryLocalSignin();
  }, []);
  return state.token ? (
    <Container>
      <Row>{children}</Row>
    </Container>
  ) : (
    <Navigate to="/login" />
  );
}
// function PrivateRoute({ children }) {

//   return (
//     <Route
//       {...rest}
//       render={(routeProps) => {
//         return state.token ? (
//           <Container>
//             <Row>
//               {isDesktopOrLaptop && (
//                 <Col lg={3}>
//                   <Navbar username={auth.data && auth.data.user.username} />
//                 </Col>
//               )}
//               {children}
//             </Row>
//           </Container>
//         ) : (
//           <Navigate to="/login" />
//         );
//       }}
//     />
//   );
// }

// import { useMediaQuery } from "react-responsive";
// const Spinner = styled.div`
//   position: absolute;
//   height: 100px;
//   width: 100px;
//   top: 50%;
//   left: 50%;
//   margin-left: -50px;
//   margin-top: -50px;
//   background-size: 100%;
// `;

// const PrivateRoute = ({ children, ...rest }) => {
//   const { auth } = useContext(authContext);
//   const { loading } = auth;

//   const isDesktopOrLaptop = useMediaQuery({
//     query: "(min-device-width: 1224px)",
//   });
//   if (loading) {
//     return (
//       <Route
//         {...rest}
//         render={() => {
//           return (
//             <Spinner>
//               <ClipLoader size={150} color={"#1DA1F2"} loading={loading} />
//             </Spinner>
//           );
//         }}
//       />
//     );
//   }
//   // if loading is set to true (when our function useEffect(() => {}, []) is not executed), we are rendering a loading component;

// };

export default PrivateRoute;
