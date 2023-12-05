import React from 'react';
import { BottomSheet } from '..';
import { CloseBtn, Title, Wrapper } from './MsgBtmSheet.styles';
import {
  AiFillCloseCircle,
  AiFillInfoCircle,
  AiFillQuestionCircle,
  AiFillWarning,
} from 'react-icons/ai';

interface MsgBtmSheetProps {
  isMsgBtmSheet: boolean;
  onClose: () => void;
  type: 'warning' | 'error' | 'question' | 'info';
  title: string;
  subtitle?: string;
}

const MsgBtmSheet: React.FC<MsgBtmSheetProps> = (props) => {
  return (
    <BottomSheet active={props.isMsgBtmSheet} onClose={props.onClose}>
      <Wrapper className={props.isMsgBtmSheet ? 'active' : ''}>
        {props.type === 'question' ? (
          <AiFillQuestionCircle className="icon" />
        ) : props.type === 'error' ? (
          <AiFillCloseCircle className="icon" />
        ) : props.type === 'info' ? (
          <AiFillInfoCircle className="icon" />
        ) : (
          <AiFillWarning className="icon" />
        )}
        <Title>{props.title}</Title>
        {props.subtitle && <p>{props.subtitle}</p>}
        <CloseBtn onClick={props.onClose}>Tutup</CloseBtn>
      </Wrapper>
    </BottomSheet>
  );
};

export default MsgBtmSheet;
