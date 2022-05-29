import React from "react";
import styled from "styled-components";
const SearchContainer = styled.div`
    display: flex;
    padding:20px
`;
const SearchInput = styled.input`
    width: 100%;
    border-radius: 9999px;
    border-color: rgb(239, 243, 244);
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    padding: 10px;
    :hover {
        border-color: #71c9f8;
        color: none;
      }
    :focus {
        outline: none !important;
        border-color: #719ECE;
    }
`;

function Search(props) {
    return (
        <SearchContainer>
            <SearchInput placeholder={props.placeholder} />
        </SearchContainer>
    );
}
export default Search;
