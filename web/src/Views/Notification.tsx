import React from "react";
import styled from "styled-components";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Col from "react-bootstrap/Col";
import { Stars } from "../Assets/Icon";
const SubMainContainer = styled(Col)`
  max-width: 600px;
  padding: 0px;
  border: 1px solid ${(props) => props.theme.color.border};
`;
const SidebarContainer = styled(Col)`
  @media only screen and (max-width: 1005px) {
    display: none;
  }
  max-width: 350px;
  margin-left: 30px;
  padding-left: 0px;
  padding-right: 0px;
`;
const Stack = styled.div`
  diplay: flex;
  width: 100%;
  margin: auto;
  padding: 0 32px;
  height: 100vh;
`;

const Notification: React.FC<{}> = ({}) => {
  return (
    <>
      <SubMainContainer>
        <Header name="Notification" iconRightComponent={<Stars />} />
        <Stack />
      </SubMainContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
    </>
  );
};
export default Notification;
