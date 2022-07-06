import React from "react";
import styled from "styled-components";
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
const Placeholder = () => {
  return (
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
  );
};

export default Placeholder;
