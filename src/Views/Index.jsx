import React, { useContext, useEffect } from "react";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from ".././Components/Button";
import { Twitter } from "../Assets/Icon";
import { LandingImage } from "../Assets/Image";
import { Context as AuthContext } from "../Contexts/AuthContext";
const LandingContainer = styled.div`
  margin: 0;
  padding: 0;
`;
const LandingCol = styled.div`
  @media only screen and (min-width: 1200px) {
    .left {
      background-image: url(${LandingImage});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      width: 50%;
      position: absolute;
      left: 0px;
      height: 100%;
    }
    .logo {
      position: absolute;
      left: 40%;
      top: 30%;
      z-index: 1;
      svg {
        fill: white;
        width: 360px;
      }
    }
  }
  .right {
    @media only screen and (max-width: 1199px) {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    width: 50%;
    position: absolute;
    right: 0px;
    height: 100%;
    .landing-text {
      display: flex;
      flex-direction: column;
      padding: 32px;
      .small-logo {
        padding-top: 24px;
        padding-bottom: 12px;
        svg {
          fill: #1da1f2;
          width: 42px;
        }
      }
      .heading {
        font-size: 64px;
        font-weight: 900;
        color: #0f1419;
        line-height: 84px;
        margin-bottom: 48px;
        margin-top: 48px;
      }
      .join-now {
        font-size: 31px;
        font-weight: 900;
        color: #0f1419;
        margin-bottom: 32px;
      }
      .disclaimer {
        font-size: 11px;
        font-weight: 300;
        color: #536471;
        margin-top: 8px;
        margin-bottom: 20px;
      }
      .account {
        font-size: 17px;
        font-weight: 600;
        color: #0f1419;
        margin-top: 40px;
        margin-bottom: 20px;
      }
      .btn-group {
        display: flex;
        flex-direction: column;
        max-width: 266px;
      }
    }
  }
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
    <LandingContainer>
      <Row>
        <LandingCol src={LandingImage}>
          <div className="left">
            {/* <div className="logo">
            <Twitter />
          </div> */}
          </div>
          <div className="right">
            <div className="landing-text">
              <div className="small-logo">
                <Twitter />
              </div>
              <span className="heading">Happening Now</span>
              <span className="join-now">Join Twitter today.</span>
              <div className="btn-group">
                <Button
                  primary
                  label="Sign up with your email"
                  handleClick={() => navigate("/signup")}
                />

                <span className="disclaimer">
                  By signing up, you agree to the Terms of Service and Privacy
                  Policy, including Cookie Use.
                </span>
                <span className="account">Already have an account?</span>
                <Button
                  secondary
                  textColor="#1da1f2"
                  label="Sign in"
                  handleClick={() => navigate("/login")}
                />
              </div>
            </div>
          </div>
        </LandingCol>
      </Row>
    </LandingContainer>
  );
}
export default Index;
