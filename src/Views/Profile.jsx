import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Feed from ".././Components/Feed";
import Header from "../Components/Header";
import Placeholder from "../Components/Placeholder";
import ProfileBox from "../Components/ProfileBox";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { Context as UserContext } from "../Contexts/UserContext";
import useTweet from "../Hooks/useTweet";
import useUser from "../Hooks/useUser";
function Profile() {
  let { profile } = useParams();
  const { state: authState } = useContext(AuthContext);
  const { state: userState } = useContext(UserContext);
  const { getUserProfile } = useUser();
  const { data, isFetching } = useTweet(profile);
  const [reload, setReload] = useState();

  useEffect(() => {
    const request = async () => {
      getUserProfile(profile);
    };
    request();
  }, [reload]);
  return (
    <>
      {authState.user && (
        <>
          <Header
            name={userState.getUser && userState.getUser.profile.name}
            tweetCount={authState.user.tweets}
          />
          {userState.getUser && (
            <ProfileBox
              user={userState.getUser}
              username={userState.getUser && userState.getUser.username}
            />
          )}
          {isFetching ? (
            <Placeholder />
          ) : (
            <Feed
              tweets={data && data.foundTweet}
              setReload={setReload}
              reload={reload}
            />
          )}
        </>
      )}
    </>
  );
}
export default Profile;
