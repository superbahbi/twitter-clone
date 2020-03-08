import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import styled from "styled-components";
import SignupForm from ".././Components/SignupForm";
const SplitPage = styled.div`
  display: flex;
  height: 100vh;
`;
const RightSide = styled.div`
  flex-grow: 2;
  min-width: 50%;
  background-color: #ffffff;
`;
const LeftSide = styled.div`
  flex-grow: 2;
  min-width: 50%;
  background-color: #71c9f8;
`;
const SubSignup = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
`;
const SignupContainer = styled.div`
  padding-top: 10em;
  width: 40vh;
`;
const BackgroundGradient = styled.div`
  height: 100vh;
  background-color: #71c9f8;
  background-size: cover;
`;
const Signup = ({ history }) => {
  return (
    <BackgroundGradient>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={9} lg={6} xl={6}>
            <Card className="shadow-lg o-hidden border-0 my-5">
              <Card.Body className="p-0">
                <Row>
                  <Col lg={12}>
                    <div className="p-5">
                      <div className="text-center">
                        <h4 className="text-dark mb-4">Create an Account!</h4>
                      </div>
                      <SignupForm></SignupForm>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </BackgroundGradient>
  );
};
export default Signup;
