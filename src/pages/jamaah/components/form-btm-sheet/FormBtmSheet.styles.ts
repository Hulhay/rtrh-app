import styled from 'styled-components';
import { palette } from '../../../../constants';

export const FormWrapper = styled.form`
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
  align-items: start;
  justify-content: center;
  gap: 10px;

  &.active {
    transform: translateY(0);
  }
`;

export const FormTitle = styled.label`
  font-weight: 600;
  font-size: 18px;
`;

export const FormBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 5px;
`;

export const FieldWrapper = styled.div`
  width: 100%;
  position: relative;

  .note {
    font-size: 10px;
  }
`;

export const FieldLabel = styled.label`
  font-size: 14px;
`;

export const Field = styled.input`
  width: 100%;
  border: 1px solid ${palette.primary};
  border-radius: 7px;
  color: ${palette.text};
  font-size: 14px;
  font-weight: 400;
  padding: 10px;

  &:focus {
    outline: none;
  }

  &.invalid {
    border: 2px solid red;
  }
`;

export const SaveBtn = styled.button`
  margin-top: 50px;
  align-self: end;
  padding: 10px 15px;
  border-radius: 7px;
  border: none;
  background-color: ${palette.primary};
  color: ${palette.white};
  font-size: 16px;

  &.disabled {
    background-color: ${palette.secondary};
  }
`;
