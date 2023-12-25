import styled from 'styled-components';
import { palette } from '../../constants';

export const Wrapper = styled.div`
  background-color: ${palette.primary};
  color: ${palette.white};
  width: 100%;
  padding-left: 10px;
  display: flex;
  align-items: center;
  gap: 10px;

  .icon {
    width: 25px;
    height: 25px;
  }

  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    font-size: 12px;
    color: ${palette.white};
  }
`;
