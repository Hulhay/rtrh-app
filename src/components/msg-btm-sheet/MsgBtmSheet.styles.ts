import styled from 'styled-components';
import { palette } from '../../constants';

export const Wrapper = styled.div`
  z-index: 1;
  width: 100%;
  padding: 47px 17px 35px;
  background-color: ${palette.white};
  border-radius: 20px 20px 0px 0px;
  position: fixed;
  bottom: 0;
  left: 0;
  transition: transform 150ms ease-in-out;
  transform: translateY(100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &.active {
    transform: translateY(0);
  }

  .icon {
    width: 100px;
    height: 100px;
    color: ${palette.primary};
  }
`;

export const Title = styled.p`
  font-weight: 600;
  font-size: 20px;
`;

export const Action = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

export const ActionBtn = styled.button`
  width: 100%;
  margin-top: 50px;
  padding: 10px 15px;
  border-radius: 7px;
  border: 1px solid ${palette.primary};
  background-color: ${palette.white};
  color: ${palette.primary};
  font-size: 16px;

  &.primary {
    background-color: ${palette.primary};
    color: ${palette.white};
  }
`;
