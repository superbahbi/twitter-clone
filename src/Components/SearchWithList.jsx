import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import Search from '../Components/Search';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
const SearchListGroup = styled(ListGroup)`
    :active {
        all: unset;
    }
`;
const SearchListGroupItem = styled(ListGroupItem)`
    border: 1px solid rgb(239, 243, 244) !important;
    border-radius: 0px;
    cursor: pointer;
`;
function SearchWithList({ placeholder, data }) {
    const [search, setSearch] = useState("");
    const [filterUsers, setFilterUsers] = useState([]);
    let temp = [];
    useEffect(() => {
        console.log({ data })
        console.log(search)
        data.map(user => {
            if (String(user.profile.name).toLowerCase().includes(search.toLowerCase())) {
                temp.push(user);
            }
        })
        setFilterUsers(temp);
    }, [search]);
    return (<>

        <div>
            <Search placeholder={placeholder} value="search" onChange={e => setSearch(e.target.value)} />
            <SearchListGroup>
                {filterUsers.map((user, key) => {
                    return <SearchListGroupItem id={user._id} key={user._id}
                        onClick={() => { console.log(user._id) }}>
                        {user.profile.name}
                    </SearchListGroupItem>
                })}
            </SearchListGroup>
        </div>
    </>);
}

export default SearchWithList;