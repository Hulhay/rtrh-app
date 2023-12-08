import styled from 'styled-components';
import { palette } from '../../constants';

export const Wrapper = styled.div`
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
  width: 100%;
  height: 65vh;
  background-color: #e5e5f7;
  background-image: repeating-linear-gradient(
      45deg,
      #b1c4d2 25%,
      transparent 25%,
      transparent 75%,
      #b1c4d2 75%,
      #b1c4d2
    ),
    repeating-linear-gradient(
      45deg,
      #b1c4d2 25%,
      #e5e5f7 25%,
      #e5e5f7 75%,
      #b1c4d2 75%,
      #b1c4d2
    );
  background-position:
    0 0,
    18px 18px;
  background-size: 36px 36px;
`;

export const SelectWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
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
