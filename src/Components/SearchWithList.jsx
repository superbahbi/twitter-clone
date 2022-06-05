import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import Search from '../Components/Search';
import {
    Row,
    Col,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';
import Avatar from '../Components/Avatar';
const SearchContainer = styled.div`
    width: 100%;
`;
const SearchListGroup = styled(ListGroup)`

`;
const SearchListGroupItem = styled(ListGroupItem)`
    border: 1px solid rgb(239, 243, 244) !important;
    border-radius: 0px;
    cursor: pointer;
    width: 100%;
`;
function SearchWithList({ placeholder, filterUsers, onHandleChange, onHandleSearchClick }) {
    return (<>
        <SearchContainer >
            <Search placeholder={placeholder} value="search" onHandleChange={onHandleChange} />
            <SearchListGroup>
                {filterUsers.map((user, key) => {
                    return <SearchListGroupItem id={user._id} key={user._id}
                        onClick={() => onHandleSearchClick(user)}>
                        <Row>
                            <Col xs={4} className="p-0">
                                <Avatar name={user.name ? user.name : user.profile.name} src={user.avatar ? user.avatar : user.profile.avatar.filename} nohref={true} />
                            </Col>
                            <Col>
                                {user.name ? user.name : user.profile.name}
                            </Col>
                        </Row>
                    </SearchListGroupItem>
                })}
            </SearchListGroup>
        </SearchContainer>
    </>);
}

export default SearchWithList;