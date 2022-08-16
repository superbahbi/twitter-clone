import React, { useContext, useState, useRef, useEffect } from "react";
import { Context as AuthContext } from "../Contexts/AuthContext";
import Header from "../Components/Header";
import Editable from "../Components/Editable";
import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
import Col from "react-bootstrap/Col";
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
const SettingsBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;
const SettingsList = styled.ul`
  flex: 1 1 auto;
  border-top: 1px solid ${(props) => props.theme.color.border};
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

  ${
    "" /* :nth-last-child(1) {
    text-align: right !important;
  } */
  }
`;
const InputFile = styled.input``;
const Settings: React.FC<{}> = ({}) => {
  const { state: authState } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [imgFile, setImgFile] = useState<Object>();
  const [type, setType] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const user = authState.user;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (imgFile) {
      const url = process.env.REACT_APP_API_URL + "/api/upload";
      const formData = new FormData();
      formData.append("image", imgFile as string);
      formData.append("type", type);
      formData.append("username", authState.user.username);
      const request = async () => {
        const postUpload = await fetch(url, {
          signal,
          method: "POST",
          headers: {
            Authorization: "Bearer " + authState.token,
          },
          body: formData,
        });
        await postUpload.json();
        if (postUpload.status === 200) {
          console.log("Upload avatar/cover");
        }
      };
      request();
    }
    return function () {
      console.log("Settings data unmounting...");
      controller.abort();
    };
  }, [imgFile]);
  return (
    <>
      <SubMainContainer>
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
                  token={authState.token}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    name="name"
                    placeholder={user.profile.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                  token={authState.token}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    name="bio"
                    placeholder={user.profile.bio}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
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
                  token={authState.token}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    name="location"
                    placeholder={user.profile.location}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
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
                  token={authState.token}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    name="website"
                    placeholder={user.profile.website}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
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
                  onChange={(event) => {
                    setType("avatar");
                    const target = event.target as HTMLInputElement;
                    if (!target.files) return;
                    const file = target.files[0];
                    setImgFile(file);
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
                  onChange={(event) => {
                    setType("cover");
                    const target = event.target as HTMLInputElement;
                    if (!target.files) return;
                    const file = target.files[0];
                    setImgFile(file);
                  }}
                />
              </SettingsItem>
            </List>
          </SettingsList>
        </SettingsBox>
      </SubMainContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
    </>
  );
};
export default Settings;
