import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Feed from ".././Components/Feed";
import Header from "../Components/Header";
import Placeholder from "../Components/Placeholder";
import ProfileBox from "../Components/ProfileBox";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { Context as TweetContext } from "../Contexts/TweetContext";
import { Context as UserContext } from "../Contexts/UserContext";
import useTweet from "../Hooks/useTweet";
import useUser from "../Hooks/useUser";
function Profile() {
  let { profile } = useParams();

  const { state: authState } = useContext(AuthContext);
  const { state: tweetState } = useContext(TweetContext);
  const { state: userState } = useContext(UserContext);
  const { getUserTweets, reset } = useTweet();
  const { getUserProfile } = useUser();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState();
  // const [tweetCount, setTweetCount] = useState();

  useEffect(() => {
    const request = async () => {
      reset();
      setTimeout(() => {
        setLoading(false);
        getUserProfile(profile);
        getUserTweets(profile);
      }, 1000);
    };
    request();
  }, [reload]);
  // if (loading) {
  //   return <Button>LOADING</Button>;
  // }
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
          {loading ? (
            <Placeholder />
          ) : (
            <Feed
              tweets={tweetState && tweetState.tweets}
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
