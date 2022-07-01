import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { Context as TweetContext } from "../Contexts/TweetContext";
import styled from "styled-components";
import useTweet from "../Hooks/useTweet";
import Feed from ".././Components/Feed";
import Header from "../Components/Header";
import ProfileBox from "../Components/ProfileBox";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonContainer = styled.div`
  display: flex;
  margin-top: 16px;
  width: 550px;
  margin-top: 16px;
  .avatar {
    margin-left: 16px;
    margin-right: 12px;
    width: 50px;
    height: 50px;
  }
  .name-group {
    display: inline-flex;
    .name {
      width: 70px;
      margin-right: 4px;
    }
  }
  .content-group {
    width: 425px;
  }
  .button-group {
    display: flex;
    width: 425px;
    justify-content: space-between;
  }
`;
function Profile() {
  let { profile } = useParams();
  const { getUserTweets, reset } = useTweet();
  const { state: authState } = useContext(AuthContext);
  const { state: tweetState } = useContext(TweetContext);

  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState();
  const [tweetCount, setTweetCount] = useState();

  useEffect(() => {
    console.log(loading);

    const request = async () => {
      reset();
      setTimeout(() => {
        setLoading(false);
        getUserTweets(profile);
      }, 2000);
    };
    request();

    console.log(loading);
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
            <>
              <SkeletonTheme style={{ display: "inline-flex" }}>
                <SkeletonContainer>
                  <Skeleton className="avatar" circle={true} />
                  <div>
                    <div className="name-group">
                      <Skeleton className="name" />
                      <Skeleton className="name" />
                      <Skeleton className="name" />
                    </div>
                    <div className="content-group">
                      <Skeleton count={2} />
                    </div>

                    <div className="button-group">
                      <Skeleton style={{ width: "20px" }} />
                      <Skeleton style={{ width: "20px" }} />
                      <Skeleton style={{ width: "20px" }} />
                      <Skeleton style={{ width: "20px" }} />
                    </div>
                  </div>
                </SkeletonContainer>
                <SkeletonContainer>
                  <Skeleton className="avatar" circle={true} />
                  <div>
                    <div className="name-group">
                      <Skeleton className="name" />
                      <Skeleton className="name" />
                      <Skeleton className="name" />
                    </div>
                    <div className="content-group">
                      <Skeleton count={2} />
                    </div>

                    <div className="button-group">
                      <Skeleton style={{ width: "20px" }} />
                      <Skeleton style={{ width: "20px" }} />
                      <Skeleton style={{ width: "20px" }} />
                      <Skeleton style={{ width: "20px" }} />
                    </div>
                  </div>
                </SkeletonContainer>
                <SkeletonContainer>
                  <Skeleton className="avatar" circle={true} />
                  <div>
                    <div className="name-group">
                      <Skeleton className="name" />
                      <Skeleton className="name" />
                      <Skeleton className="name" />
                    </div>
                    <div className="content-group">
                      <Skeleton count={2} />
                    </div>

                    <div className="button-group">
                      <Skeleton style={{ width: "20px" }} />
                      <Skeleton style={{ width: "20px" }} />
                      <Skeleton style={{ width: "20px" }} />
                      <Skeleton style={{ width: "20px" }} />
                    </div>
                  </div>
                </SkeletonContainer>
                <SkeletonContainer>
                  <Skeleton className="avatar" circle={true} />
                  <div>
                    <div className="name-group">
                      <Skeleton className="name" />
                      <Skeleton className="name" />
                      <Skeleton className="name" />
                    </div>
                    <div className="content-group">
                      <Skeleton count={2} />
                    </div>

                    <div className="button-group">
                      <Skeleton style={{ width: "20px" }} />
                      <Skeleton style={{ width: "20px" }} />
                      <Skeleton style={{ width: "20px" }} />
                      <Skeleton style={{ width: "20px" }} />
                    </div>
                  </div>
                </SkeletonContainer>
              </SkeletonTheme>
            </>
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
