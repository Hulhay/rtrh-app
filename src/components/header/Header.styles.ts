import styled from 'styled-components';
import { palette } from '../../../../constants';

export const Wrapper = styled.div`
  background-color: ${palette.primary};
  color: ${palette.white};
  width: 100%;
  padding-left: 10px;

  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
  }
`;
