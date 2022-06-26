import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../Contexts/AuthContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from ".././Components/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
const BackgroundGradient = styled.div`
  height: 100vh;
  background-color: #71c9f8;
  background-image: linear-gradient(180deg, #71c9f8 10%, #1da1f2);
  background-size: cover;
`;
const StyleCard = styled(Card)`
  background: none;
  border: none;
  .button {
    padding: 4px 0px;
  }
`;
const SubHeading = styled.p`
  font-size: 2em;
  font-weight: bold;
  text-align: left;
  color: #434a52;
`;
const SubText = styled.p`
  font-size: 1.2em;
  font-weight: lighter;
  text-align: left;
  color: #434a52;
`;
const LoginDarkIllustration = styled.div`
  text-align: center;
  padding: 15px 0 20px;
  font-size: 100px;
  color: #1da1f2;
`;
function Index() {
  const navigate = useNavigate();
  const { state, tryLocalSignin } = useContext(AuthContext);
  useEffect(() => {
    tryLocalSignin();
    if (state.token) {
      navigate("/home");
    }
  }, [state]);

  return (
    <BackgroundGradient>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={9} lg={6} xl={6}>
            <StyleCard className=" my-5">
              <Row>
                <Col lg={12}>
                  <LoginDarkIllustration>
                    <i className="icon ion-ios-paw-outline"></i>
                  </LoginDarkIllustration>
                  <SubHeading>
                    See what’s happening in the world right now
                  </SubHeading>
                  <SubText>Join not twitter today.</SubText>
                  <div className="button">
                    <Button
                      primary
                      name="button"
                      type="submit"
                      label="Sign up"
                      handleClick={() => navigate("/signup")}
                    />
                  </div>
                  <div className="button">
                    <Button
                      primary
                      name="button"
                      type="submit"
                      label="Log in"
                      handleClick={() => navigate("/login")}
                    />
                  </div>
                </Col>
              </Row>
            </StyleCard>
          </Col>
        </Row>
      </Container>
    </BackgroundGradient>
  );
}
export default Index;
