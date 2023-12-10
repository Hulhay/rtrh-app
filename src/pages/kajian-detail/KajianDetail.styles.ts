import styled from 'styled-components';
import { palette } from '../../constants';

export const Wrapper = styled.div`
  min-height: 100vh;
  padding-bottom: 200px;
`;

export const KajianInfo = styled.div`
  padding: 10px 0px;
  margin: 0px 10px;
  border-bottom: 1px solid ${palette.primary};

  .title {
    font-size: 18px;
    font-weight: 600;
  }

  .total {
    text-align: right;
  }

  p {
    font-size: 14px;
  }
`;

export const FieldWrapper = styled.div`
  width: 100%;
  margin-top: 5px;

  .note {
    font-size: 10px;
  }
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
`;
