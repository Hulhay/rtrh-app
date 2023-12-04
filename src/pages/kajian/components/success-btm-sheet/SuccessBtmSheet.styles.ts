import styled from 'styled-components';
import { palette } from '../../../../constants';

export const Wrapper = styled.form`
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

export const Description = styled.p`
  font-weight: 600;
  font-size: 20px;
`;

export const CloseBtn = styled.button`
  margin-top: 50px;
  padding: 10px 15px;
  border-radius: 7px;
  border: none;
  background-color: ${palette.primary};
  color: ${palette.white};
  font-size: 16px;
`;
