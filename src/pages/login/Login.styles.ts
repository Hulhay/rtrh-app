import styled from 'styled-components';
import { palette } from '../../constants';

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  background-color: ${palette.primary};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Input = styled.input`
  padding: 10px 15px;
  border-radius: 5px;
  border: none;

  &:focus {
    outline: none;
  }
`;

export const LoginBtn = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-weight: 600;
  background-color: ${palette.hightlight};
  color: ${palette.white};
  font-size: 16px;

  &.loading {
    opacity: 0.5;
  }
`;

export const VersionApp = styled.div`
  color: ${palette.white};
  position: fixed;
  bottom: 20px;
`;
