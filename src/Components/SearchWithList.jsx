import React from "react";
import styled from "styled-components";
import Search from "../Components/Search";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import Avatar from "../Components/Avatar";
const SearchContainer = styled.div`
  width: 100%;
`;
const SearchListGroup = styled(ListGroup)``;
const SearchListGroupItem = styled(ListGroupItem)`
  border: none;
  border-radius: 0px;
  cursor: pointer;
  width: 100%;
  :hover {
    background-color: #eff3f4;
    border-radius: 0px;
    border-right: 3px solid #71c9f8;
  }
  &.active {
    color: #212529;
    background-color: #fff;
    border-radius: 0px;
    border-right: 3px solid #71c9f8;
  }
`;
const SearchListGroupText = styled.p`
  margin-top: auto;
`;
function SearchWithList({
  placeholder,
  filterUsers,
  selectUser,
  onHandleChange,
  onHandleSearchClick,
}) {
  console.log(selectUser);
  return (
    <SearchContainer>
      <Search
        placeholder={placeholder}
        value="search"
        onHandleChange={onHandleChange}
      />
      <SearchListGroup>
        {filterUsers.map((user, key) => {
          return (
            <SearchListGroupItem
              id={user._id}
              key={user._id}
              // active={selectUser._id === user._id ? true : false}
              onClick={() => onHandleSearchClick(user)}
            >
              <Row>
                <Col xs={3} className="p-0">
                  <Avatar
                    name={user.name ? user.name : user.profile.name}
                    src={
                      user.avatar ? user.avatar : user.profile.avatar.filename
                    }
                    nohref={true}
                  />
                </Col>

                <SearchListGroupText>
                  {user.name ? user.name : user.profile.name}
                </SearchListGroupText>
              </Row>
            </SearchListGroupItem>
          );
        })}
      </SearchListGroup>
    </SearchContainer>
  );
}

export default SearchWithList;
