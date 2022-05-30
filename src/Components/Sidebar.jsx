import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
const SearchBar = styled.div`
  padding-top: 4px;
  input.form-control[type="text"]:focus:not([readonly]) {
    border-bottom: 1px solid #f48fb1;
    box-shadow: 0 1px 0 0 #f48fb1;
  }
  input.form-control[type="text"] {
    border-bottom: 1px solid #f48fb1;
    box-shadow: 0 1px 0 0 #f48fb1;
  }
  input.form-control {
    border: 0;
    border-radius: 0;
    outline: 0;
    background-clip: border-box;
    background-color: #f5f8fa;
  }
`;
const SideBarItem = styled.div`
  margin-bottom: 20px;
  width: 230px;
`;
const SideBarHeading = styled.div`
  font-size: 19px;
  font-weight: 800;
  color: rgb(20, 23, 26);
  padding-bottom: 5px;
`;
const SideBarContainer = styled.div`
  padding: 5px 16px 5px 16px;
  border-color: #eee #ddd #bbb;
  border-style: solid;
  border-width: 1px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  background-color: #f5f8fa;
  :first-child {
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
  }
  :last-child {
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  }
`;
const SideBarTrending = styled.div`
  color: #83929f;
  font-size: 13px;
  font-weight: 400;
`;
const SideBarTitle = styled.div`
  color: #434a52;
  font-size: 15px;
  font-weight: bold;
`;
const SideBarTweet = styled.div`
  color: #83929f;
  font-size: 15px;
  font-weight: 400;
`;
const SideBarIcon = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`;
const SideBarName = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #14171a;
`;
const SideBarTag = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: rgb(101, 119, 134);
`;
const Footer = styled.div`
  font-size: 13px;
  color: rgb(101, 119, 134);
  font-weight: 400;

  a {
    padding-right: 5px;
    color: rgb(101, 119, 134);
  }
`;
function Sidebar() {
  return (
    <Container>
      <Row>
        <SideBarItem>
          <form action="/search" role="search">
            <SearchBar>
              <input
                className="form-control"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
            </SearchBar>
          </form>
        </SideBarItem>
      </Row>
      <Row>
        <SideBarItem>
          <SideBarContainer>
            <SideBarHeading>Trends for you</SideBarHeading>
          </SideBarContainer>
          <SideBarContainer>
            <SideBarTrending>Trending in United States</SideBarTrending>
            <SideBarTitle>#timechange</SideBarTitle>
            <SideBarTweet>1,201 Tweets</SideBarTweet>
          </SideBarContainer>
          <SideBarContainer>
            <SideBarTrending>Trending in United States</SideBarTrending>
            <SideBarTitle>#timechange</SideBarTitle>
            <SideBarTweet>1,201 Tweets</SideBarTweet>
          </SideBarContainer>
          <SideBarContainer>
            <SideBarTrending>Trending in United States</SideBarTrending>
            <SideBarTitle>#timechange</SideBarTitle>
            <SideBarTweet>1,201 Tweets</SideBarTweet>
          </SideBarContainer>
          <SideBarContainer>Show more</SideBarContainer>
        </SideBarItem>
        <SideBarItem>
          <SideBarContainer>
            <SideBarHeading>Who to follow</SideBarHeading>
          </SideBarContainer>
          <SideBarContainer>
            <Row>
              <SideBarIcon>
                <img
                  src="https://via.placeholder.com/49"
                  className="rounded-circle"
                  alt=""
                />
              </SideBarIcon>
              <div>
                <SideBarName>John Doe</SideBarName>
                <SideBarTag>@johndoe</SideBarTag>
              </div>
            </Row>
          </SideBarContainer>
          <SideBarContainer>Show more</SideBarContainer>
        </SideBarItem>
        <SideBarItem>
          <Footer>
            <a href="/">Terms</a>
            <a href="/">Privacy Policy</a>
            <a href="/">Cookies</a>
          </Footer>
          <Footer>
            <p>©{new Date().getFullYear()} Twitter Clone, Inc.</p>
          </Footer>
        </SideBarItem>
      </Row>
    </Container>
  );
}
export default Sidebar;
