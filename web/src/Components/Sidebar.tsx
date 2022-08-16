import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import IconButton from "./IconButton";
import { Search, Threedot } from "../Assets/Icon";
const SidebarContainer = styled.div`
  width: 350px;
  padding-top: 12px;
`;
const SideBarSearch = styled.div`
  display: grid;
  grid-template-columns: 42px 1fr;
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: 30px;
  background-color: ${(props) => props.theme.color.border};
  width: 100%;
  margin-bottom: 12px;
  i {
    padding-left: 12px;
    align-self: center;
    svg {
      height: 20px;
      width: 20px;
      fill: ${(props) => props.theme.color.lightText};
    }
  }
  input {
    border: none;
    outline: none;
    color: ${(props) => props.theme.color.lightText};
    background-color: transparent;
    height: 42px;
    padding: 12px;
    max-width: 100%;
  }
`;
const SidebarSubContainer = styled.div`
  background-color: ${(props) => props.theme.color.hoverBackground};
  border-color: ${(props) => props.theme.color.hoverBackground};
  border-style: solid;
  border-width: 1px;
  border-radius: 16px;
  margin-bottom: 16px;
  .heading {
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.color.text};
    padding: 12px 16px;
  }
  .item {
    display: grid;
    grid-template-columns: 1fr 68px;
    padding: 12px 16px;
    :hover {
      background-color: ${(props) => props.theme.color.hoverBackground};
    }
    .story {
      margin-right: 12px;
      .title {
        font-size: 13px;
        color: ${(props) => props.theme.color.lightText};
      }
      .text {
        font-size: 15px;
        font-weight: 600;
        color: ${(props) => props.theme.color.text};
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
    color: ${(props) => props.theme.color.main};
    padding: 16px;
  }
`;
const Sidebar: React.FC<{}> = ({}) => {
  const theme = useContext(ThemeContext);
  return (
    <SidebarContainer>
      <form>
        <SideBarSearch>
          <i>
            <Search active={false} />
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
            <img
              src="https://via.placeholder.com/68x68"
              alt="img"
              loading="lazy"
            />
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
            <img
              src="https://via.placeholder.com/68x68"
              alt="img"
              loading="lazy"
            />
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
                color={theme.color.lightText}
                hoverColor={theme.color.main}
                hoverColorBackground={theme.color.hoverLightBackground}
              />
            </div>
          </div>
        </div>
        <div className="item sidebar-see-more">Show more</div>
      </SidebarSubContainer>
    </SidebarContainer>
  );
};
export default Sidebar;
