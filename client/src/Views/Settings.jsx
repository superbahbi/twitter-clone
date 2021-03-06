import React, { useContext, useState, useRef, useEffect } from "react";
import { authContext } from "../Contexts/AuthContext";
import { useMediaQuery } from "react-responsive";
import Navbar from ".././Components/Navbar";
import Header from ".././Components/Header";
import Editable from ".././Components/Editable";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NavContainer = styled.div`
  width: 15% !important;
`;
const HomeContainer = styled.div`
  width: 50% !important;
  padding: 0;
  max-width: 600px;
`;
const SettingsBox = styled.div`
  display: flex;
  flex-direction: row;
  border-color: #eee #ddd #bbb;
  border-style: solid;
  border-width: 1px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
`;
const SettingsList = styled.ul`
  flex: 1 1 auto;
  border-width: 3px 0 0 0;
  border-style: solid;
  border-color: #eee #ddd #bbb;
  padding: 0;
`;
const List = styled.li`
  display: flex;
  flex-direction: row;
  :hover {
    background-color: #f5f6f7;
  }
`;
const SettingsItem = styled.div`
  padding: 1em;
  color: #333333;
  width: 1em;
  flex: 1 1 auto;
  text-align: left;

  ${"" /* :nth-last-child(1) {
    text-align: right !important;
  } */}
`;
const InputFile = styled.input``;
function Settings() {
  const { auth } = useContext(authContext);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [type, setType] = useState("");
  const inputRef = useRef();
  const user = auth.data.user;
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)"
  });
  useEffect(() => {
    if (imgFile) {
      const url = process.env.REACT_APP_API_URL + "/api/upload";
      const formData = new FormData();
      formData.append("image", imgFile);
      formData.append("type", type);
      formData.append("username", auth.data.user.username);
      const request = async (id = 100) => {
        const postUpload = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + auth.data.token
          },
          body: formData
        });
        await postUpload.json();
        if (postUpload.status === 200) {
          console.log(postUpload);
          console.log("Upload avatar/cover");
        }
      };
      request();
    }
  }, [imgFile, auth.data.token, auth.data.user.username, type]);
  return (
    <Container>
      <Row>
        {isDesktopOrLaptop && (
          <Col md={3}>
            <Navbar
              username={auth && auth.data.user.username}
              avatar={auth && auth.data.user.profile.avatar.filename}
            />
          </Col>
        )}
        <Col md={6}>
          <Header name="Settings" />
          <SettingsBox>
            <SettingsList>
              <List>
                <SettingsItem>Name</SettingsItem>
                <SettingsItem>
                  <Editable
                    username={user.username}
                    text={name}
                    db="profile"
                    name="name"
                    placeholder={user.profile.name}
                    type="input"
                    childRef={inputRef}
                    auth={auth.data}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      name="name"
                      placeholder={user.profile.name}
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Editable>
                </SettingsItem>
              </List>
              <List>
                <SettingsItem>Bio</SettingsItem>
                <SettingsItem>
                  <Editable
                    username={user.username}
                    text={bio}
                    db="profile"
                    name="bio"
                    placeholder={user.profile.bio}
                    type="input"
                    childRef={inputRef}
                    auth={auth.data}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      name="bio"
                      placeholder={user.profile.bio}
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                    />
                  </Editable>
                </SettingsItem>
              </List>
              <List>
                <SettingsItem>Location</SettingsItem>
                <SettingsItem>
                  <Editable
                    username={user.username}
                    text={location}
                    db="profile"
                    name="location"
                    placeholder={user.profile.location}
                    type="input"
                    childRef={inputRef}
                    auth={auth.data}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      name="location"
                      placeholder={user.profile.location}
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                    />
                  </Editable>
                </SettingsItem>
              </List>
              <List>
                <SettingsItem>Website</SettingsItem>
                <SettingsItem>
                  <Editable
                    username={user.username}
                    text={website}
                    db="profile"
                    name="website"
                    placeholder={user.profile.website}
                    type="input"
                    childRef={inputRef}
                    auth={auth.data}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      name="website"
                      placeholder={user.profile.website}
                      value={website}
                      onChange={e => setWebsite(e.target.value)}
                    />
                  </Editable>
                </SettingsItem>
              </List>
              <List>
                <SettingsItem>Profile</SettingsItem>
                <SettingsItem>
                  <input
                    type="file"
                    name="avatar"
                    onChange={event => {
                      setType("avatar");
                      setImgFile(event.target.files[0]);
                    }}
                  />
                </SettingsItem>
              </List>
              <List>
                <SettingsItem>Cover</SettingsItem>
                <SettingsItem>
                  <InputFile
                    type="file"
                    name="cover"
                    accept="image/*"
                    onChange={event => {
                      setType("cover");
                      setImgFile(event.target.files[0]);
                    }}
                  />
                </SettingsItem>
              </List>
            </SettingsList>
          </SettingsBox>
        </Col>
      </Row>
    </Container>
  );
}
export default Settings;
