import styled from 'styled-components';
import { palette } from '../../constants';

export const Wrapper = styled.div`
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 10px;
  gap: 15px;

  .back {
    width: 30px;
    height: 30px;
    position: fixed;
    top: 15px;
    left: 15px;
    color: ${palette.secondary};
  }
`;

export const Header = styled.h1`
  font-size: 18px;
`;

export const QRWrapper = styled.div`
  padding: 5px 5px 0px;
  border-width: 1px;
  border-style: solid;
`;

export const JamaahDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  letter-spacing: 1px;
  margin-top: 50px;
`;

export const DownloadButton = styled.button`
  background-color: ${palette.primary};
  color: ${palette.white};
  font-size: 14px;
  padding: 10px 15px;
  border: none;
  border-radius: 7px;
  width: 100%;
`;
