import styled from 'styled-components';
import { palette } from '../../constants';

export const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 5px;
  background-color: ${palette.white};
  box-shadow: 0px -1px 20px 0px rgba(0, 0, 0, 0.2);
  transition: transform 150ms ease-in-out;

  &.hidden {
    transform: translateY(100%);
  }

  .icon {
    width: 20px;
    height: 20px;
    color: ${palette.primary};
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    font-size: 12px;
    color: ${palette.primary};
  }
`;
