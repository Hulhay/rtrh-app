import styled from 'styled-components';
import { palette } from '../../../../constants';

export const Wrapper = styled.div`
  position: fixed;
  bottom: 70px;
  right: 20px;
  width: 56px;
  height: 56px;
  background-color: ${palette.primary};
  border-radius: 999px;
  transition: transform 150ms ease-in-out;
  border: none;

  &.shift {
    transform: translateY(100%);
  }

  .icon {
    width: 100%;
    height: 100%;
    color: ${palette.white};
  }
`;
