import styled from 'styled-components';
import { palette } from '../../constants';

export const Wrapper = styled.div`
  min-height: 100vh;
`;

export const Items = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  gap: 7px;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${palette.primary};
  padding: 5px;

  .icon {
    width: 20px;
    height: 20px;
  }

  .arrow {
    opacity: 0.5;
  }
`;

export const LabeledIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
