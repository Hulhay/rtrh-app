import React from 'react';
import { SearchInput, SearchWrapper, Wrapper } from './SearchBar.styles';
import { HiOutlineSearch, HiX } from 'react-icons/hi';

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  return (
    <Wrapper>
      <SearchWrapper>
        <SearchInput
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
        />
        {!props.value ? (
          <HiOutlineSearch className="search-icon" />
        ) : (
          <HiX className="clear-icon" onClick={props.onClear} />
        )}
      </SearchWrapper>
    </Wrapper>
  );
};

export default SearchBar;
