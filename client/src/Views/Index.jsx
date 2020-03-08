import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
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
  let history = useHistory();
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
                  <Button
                    name="button"
                    type="submit"
                    label="Sign up"
                    btnStyle="signup-btn"
                    handleClick={() => {
                      history.push("/signup");
                    }}
                  />
                  <Button
                    name="button"
                    type="submit"
                    label="Log in"
                    btnStyle="signup-btn"
                    handleClick={() => {
                      history.push("/login");
                    }}
                  />
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
{
  /* <SplitPage>
{isDesktopOrLaptop && <LeftSide></LeftSide>}
<RightSide>
  <SubLogin>
    <FontAwesomeIcon icon={faDog} size="4x" color="#1DA1F2" />
    <SubHeading>See what’s happening in the world right now</SubHeading>
    <SubText>Join not twitter today.</SubText>
    <Button
      name="button"
      type="submit"
      label="Sign up"
      btnStyle="signup-btn"
      handleClick={() => {
        history.push("/signup");
      }}
    />
    <Button
      name="button"
      type="submit"
      label="Log in"
      btnStyle="login-btn"
      handleClick={() => {
        history.push("/login");
      }}
    />
  </SubLogin>
</RightSide>
</SplitPage> */
}
