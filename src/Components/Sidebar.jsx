import React from "react";
import styled from "styled-components";
import IconButton from "./IconButton";
import { Search, Threedot } from "../Assets/Icon";
const SidebarContainer = styled.div`
  width: 350px;
  padding-top: 12px;
`;
const SideBarSearch = styled.div`
  display: grid;
  grid-template-columns: 42px 1fr;
  border: 1px solid #fff;
  border-radius: 30px;
  background-color: #eff3f4;
  width: 100%;
  margin-bottom: 12px;
  i {
    padding-left: 12px;
    align-self: center;
    svg {
      height: 20px;
      width: 20px;
      fill: #536571;
    }
  }
  input {
    border: none;
    outline: none;
    color: #536571;
    background-color: transparent;
    height: 42px;
    padding: 12px;
    max-width: 100%;
  }
`;
const SidebarSubContainer = styled.div`
  background-color: #f7f9f9;
  border-color: #f7f9f9;
  border-style: solid;
  border-width: 1px;
  border-radius: 16px;
  margin-bottom: 16px;
  .heading {
    font-size: 20px;
    font-weight: 600;
    color: #0f1419;
    padding: 12px 16px;
  }
  .item {
    display: grid;
    grid-template-columns: 1fr 68px;
    padding: 12px 16px;
    :hover {
      background-color: #eff1f1;
    }
    .story {
      margin-right: 12px;
      .title {
        font-size: 13px;
        color: #536571;
      }
      .text {
        font-size: 15px;
        font-weight: 600;
        color: #0f1419;
      }
    }
    .right {
      img {
        border-radius: 16px;
      }
      .threedot {
        display: flex;
        justify-content: right;
      }
    }
    :last-of-type {
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
    }
  }
  .sidebar-see-more {
    font-size: 15px;
    color: #1da1f2;
    padding: 16px;
  }
`;
function Sidebar() {
  return (
    <SidebarContainer>
      <form>
        <SideBarSearch>
          <i>
            <Search />
          </i>
          <input placeholder="Search Twitter" />
        </SideBarSearch>
      </form>
      <SidebarSubContainer>
        <div className="heading">What's Happening</div>
        <div className="item">
          <div className="story">
            <div className="title">News · LIVE</div>
            <div className="text">
              Inflation killed the $1 pizza slice. Is the 99c iced tea next?
            </div>
          </div>
          <div className="right">
            <img src="https://via.placeholder.com/68x68" alt="img" />
          </div>
        </div>
        <div className="item">
          <div className="story">
            <div className="title">News · Earlier today</div>
            <div className="text">
              'Mystery rocket' that crashed into the Moon baffles NASA
              scientists
            </div>
          </div>
          <div className="right">
            <img src="https://via.placeholder.com/68x68" alt="img" />
          </div>
        </div>
        <div className="item">
          <div className="story">
            <div className="title">Trending in United States</div>
            <div className="text">#trending</div>
          </div>
          <div className="right">
            <div className="threedot">
              <IconButton
                type="button"
                iconComponent={<Threedot />}
                color="#536471"
                hoverColor="#1D9BF0"
                hoverColorBackground="#e8f5fe"
              />
            </div>
          </div>
        </div>
        <div className="item sidebar-see-more">Show more</div>
      </SidebarSubContainer>
    </SidebarContainer>
  );
}
export default Sidebar;
