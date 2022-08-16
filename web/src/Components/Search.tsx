import React from "react";
import styled from "styled-components";
import { ISearchProps } from "../Helper/interface";
const SearchContainer = styled.div`
  display: flex;
`;
const SearchInput = styled.input`
  width: 100%;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.color.border};
  padding: 10px;
  margin: 0px;

  :hover {
    border-color: ${(props) => props.theme.color.lightMain};
    color: none;
  }
`;
const Search: React.FC<ISearchProps> = ({ placeholder, onHandleChange }) => {
  return (
    <SearchContainer>
      <SearchInput placeholder={placeholder} onChange={onHandleChange} />
    </SearchContainer>
  );
};
export default Search;
