import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { Context as TweetContext } from "../Contexts/TweetContext";
import useTweet from "../Hooks/useTweet";
import Feed from ".././Components/Feed";
import Header from "../Components/Header";
import ProfileBox from "../Components/ProfileBox";
import Placeholder from "../Components/Placeholder";
function Profile() {
  let { profile } = useParams();
  const { getUserTweets, reset } = useTweet();
  const { state: authState } = useContext(AuthContext);
  const { state: tweetState } = useContext(TweetContext);

  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState();
  // const [tweetCount, setTweetCount] = useState();

  useEffect(() => {
    const request = async () => {
      reset();
      setTimeout(() => {
        setLoading(false);
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
            name={authState.user && authState.user.profile.name}
            tweetCount={authState.user.tweets}
          />
          <ProfileBox
            user={authState.user}
            username={authState.user.username}
          />
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
