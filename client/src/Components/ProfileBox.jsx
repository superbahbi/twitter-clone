import React from "react";
import moment from "moment";
import styled from "styled-components";
import Button from ".././Components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far);

const TweetBox = styled.div`
  display: flex;
  flex-direction: row;
  border-color: #eee #ddd #bbb;
  border-style: solid;
  border-width: 1px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
`;
const ProfileContainer = styled.div`
  position: relative;
  border-style: solid;
  border-width: 1px;
  border-color: #eee #ddd #bbb;
  font-size: 15px;
  font-weight: lighter;
  line-height: 1.3125;
  flex: 1 1 auto;
`;
const ProfileCover = styled.img`
  background-position: 0 50%;
  background-size: 100% auto;
  border-bottom: 1px solid #e1e8ed;
  border-radius: 2px 2px 0 0;
  width: 600px;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  display: block !important;
  z-index: 0;
`;
const ProfileAvatar = styled.img`
  z-index: 1;
  margin-top: -80px;
  margin-left: 30px;
  color: #fff;
  height: 134px;
  width: 134px;
  border-radius: 50% !important;
`;
const ProfileUser = styled.div`
  margin: 5px 0 0;
  padding: 10px;
`;

const ProfileName = styled.div`
  font-size: 20px;
  font-weight: 900;
  line-height: 21px;
`;
const ProfileTag = styled.div`
  color: #657786;
  text-decoration: none;
`;
const ProfileBio = styled.div`
  padding: 5px 0 5px 0;
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 0 5px 0;
`;
const ProfileStat = styled.div`
  margin-right: 20px;
`;
const ProfileButton = styled.div`
  display: flex;
  flex-direction: row;
`;
function onHandleClick() {
  console.log("clicked");
}
function ProfileBox(props) {
  return props.user
    ? props.user.map((item, index) => (
        <div>
          <TweetBox key={index}>
            <div>
              <ProfileCover
                src={
                  process.env.REACT_APP_API_URL +
                  "/uploads/" +
                  item.profile.cover.filename
                }
              />
              <ProfileAvatar
                src={
                  process.env.REACT_APP_API_URL +
                  "/uploads/" +
                  item.profile.avatar.filename
                }
                alt=""
              />
              {props.auth ? (
                <Button
                  name="button"
                  type="submit"
                  btnStyle="login-btn"
                  position={true}
                  label="Edit Profile"
                />
              ) : null}
              <ProfileContainer>
                <ProfileUser>
                  <ProfileName>{item.profile.name}</ProfileName>
                  <ProfileTag>@{item.username}</ProfileTag>
                  <ProfileBio>{item.profile.bio}</ProfileBio>
                  <ProfileInfo>
                    <ProfileStat>
                      <FontAwesomeIcon icon="map-marker-alt" fixedWidth />
                      {item.profile.location}
                    </ProfileStat>
                    <ProfileStat>
                      <FontAwesomeIcon icon="link" fixedWidth />
                      {item.profile.website}
                    </ProfileStat>
                    <ProfileStat>
                      <FontAwesomeIcon icon="calendar-alt" fixedWidth />
                      {moment.unix(item.profile.regDate).format("MMMM YYYY")}
                    </ProfileStat>
                  </ProfileInfo>
                  <ProfileInfo>
                    <ProfileStat>
                      <strong>{item.following}</strong> Following
                    </ProfileStat>
                    <ProfileStat>
                      <strong>{item.followers}</strong> Followers
                    </ProfileStat>
                  </ProfileInfo>
                </ProfileUser>
                <ProfileButton>
                  <Button
                    id="tweets"
                    name="button"
                    type="submit"
                    btnStyle="profile-btn"
                    label="Tweets"
                    onClick={onHandleClick}
                  />
                  <Button
                    id="tweetsnreplies"
                    name="button"
                    type="submit"
                    btnStyle="profile-btn"
                    label="Tweets & replies"
                  />
                  <Button
                    id="media"
                    name="button"
                    type="submit"
                    btnStyle="profile-btn"
                    label="Media"
                  />
                  <Button
                    id="likes"
                    name="button"
                    type="submit"
                    btnStyle="profile-btn"
                    label="Likes"
                  />
                </ProfileButton>
              </ProfileContainer>
            </div>
          </TweetBox>
        </div>
      ))
    : null;
}
export default ProfileBox;
