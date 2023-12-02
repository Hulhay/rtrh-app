import styled from 'styled-components';
import { palette } from '../../constants';

export const Wrapper = styled.div`
  padding: 10px;
  width: 100%;
`;

export const SearchWrapper = styled.div`
  height: 32px;
  width: 100%;
  border-radius: 5px;
  padding: 0px 17px;
  border: 1px solid ${palette.primary};
  display: flex;
  align-items: center;
  gap: 7px;
  background-color: ${palette.white};

  .search-icon {
    color: ${palette.primary};
    width: 20px;
    height: 20px;
    stroke-width: 2;
  }

  .clear-icon {
    color: ${palette.primary};
    width: 20px;
    height: 20px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  border: none;
  color: ${palette.text};
  font-size: 12px;
  font-weight: 400;

  &:focus {
    outline: none;
  }
`;
