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
