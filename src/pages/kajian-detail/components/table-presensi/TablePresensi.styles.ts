import styled from 'styled-components';
import { palette } from '../../../../constants';

export const Wrapper = styled.div`
  width: 100%;
  padding: 0px 10px;
  font-size: 14px;
`;

export const Header = styled.div`
  font-weight: 600;
`;

export const Body = styled.div``;

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid ${palette.primary};
`;

export const IDCell = styled.div`
  min-width: 50px;
`;

export const NameCell = styled.div`
  flex-grow: 1;
`;

export const JamaahName = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 270px;
  color: ${palette.text};
`;
