import React from "react";
import styled from "styled-components";
import Search from "../Components/Search";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import Avatar from "../Components/Avatar";
import { ISearchWithListProps, ISelectUserProps } from "../Helper/interface";
const SearchContainer = styled(Col)`
  padding: 0;
`;
const SearchListGroup = styled(ListGroup)``;
const SearchListGroupItem = styled(ListGroupItem)`
  border: none;
  border-radius: 0px;
  cursor: pointer;
  width: 100%;
  :hover {
    background-color: ${(props) => props.theme.color.background};
    border-radius: 0px;
    border-right: 3px solid ${(props) => props.theme.color.lightMain};
  }
  &.active {
    color: ${(props) => props.theme.color.text};
    background-color: ${(props) => props.theme.color.white};
    border-radius: 0px;
    border-right: 3px solid ${(props) => props.theme.color.lightMain};
  }
`;
const SearchListGroupText = styled.p`
  margin-top: auto;
`;

const SearchWithList: React.FC<ISearchWithListProps> = ({
  placeholder,
  filterUsers,
  onHandleChange,
  onHandleSearchClick,
}) => {
  return (
    <SearchContainer>
      <Search
        placeholder={placeholder}
        // value="search"
        onHandleChange={onHandleChange}
      />
      <SearchListGroup>
        {filterUsers &&
          filterUsers.map((user: ISelectUserProps) => {
            return (
              <SearchListGroupItem
                id={user._id}
                key={user._id}
                onClick={() => onHandleSearchClick(user)}
              >
                <Row>
                  <Col xs={3} className="p-0">
                    <Avatar name={user.name} src={user.avatar} nohref={true} />
                  </Col>

                  <SearchListGroupText>{user.name}</SearchListGroupText>
                </Row>
              </SearchListGroupItem>
            );
          })}
      </SearchListGroup>
    </SearchContainer>
  );
};

export default SearchWithList;
