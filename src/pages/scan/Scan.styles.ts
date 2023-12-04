import styled from 'styled-components';
import { palette } from '../../constants';

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  .back {
    position: fixed;
    top: 15px;
    left: 15px;
    width: 30px;
    height: 30px;
    color: ${palette.primary};
    z-index: 99;
  }
`;

export const ScannerWrapper = styled.div`
  maxwidth: 480px;
  aspect-ratio: 3 / 4;
  background-color: ${palette.secondary};
`;

export const SelectWrapper = styled.div`
  width: 100%;
  padding: 0px 10px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid ${palette.primary};
  border-radius: 7px;
`;

export const Option = styled.option`
  font-size: 10;
`;
