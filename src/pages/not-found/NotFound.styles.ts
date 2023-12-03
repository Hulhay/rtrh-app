import styled from 'styled-components';
import { palette } from '../../constants';

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 0px 10px;

  a {
    background-color: ${palette.primary};
    border: none;
    padding: 5px 15px;
    border-radius: 10px;
    cursor: default;
  }
`;

export const Title = styled.div`
  text-align: center;
  color: ${palette.text};
  font-size: 22px;
  line-height: 1.2em;
`;

export const BackToHomeBtn = styled.button`
  padding: 5px;
  border: none;
  background: none;
  font-size: 16px;
  font-weight: 600;
  color: ${palette.white};
`;
