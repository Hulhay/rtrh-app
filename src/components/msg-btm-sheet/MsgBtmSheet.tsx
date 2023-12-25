import React from 'react';
import { BottomSheet } from '..';
import { Action, ActionBtn, Title, Wrapper } from './MsgBtmSheet.styles';
import {
  AiFillCloseCircle,
  AiFillInfoCircle,
  AiFillQuestionCircle,
  AiFillWarning,
} from 'react-icons/ai';
import { lang } from '../../constants';

interface MsgBtmSheetProps {
  isMsgBtmSheet: boolean;
  onClose: () => void;
  onCloseLabel?: string;
  onConfirm?: () => void;
  onConfirmLabel?: string;
  primary?: 'confirm' | 'close';
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
        {props.onConfirm ? (
          <Action>
            <ActionBtn
              onClick={props.onClose}
              className={props.primary !== 'confirm' ? 'primary' : ''}
            >
              {props.onCloseLabel || lang('button.close')}
            </ActionBtn>
            <ActionBtn
              onClick={props.onConfirm}
              className={props.primary === 'confirm' ? 'primary' : ''}
            >
              {props.onConfirmLabel || lang('button.yes')}
            </ActionBtn>
          </Action>
        ) : (
          <ActionBtn onClick={props.onClose}>
            {props.onCloseLabel || lang('button.close')}
          </ActionBtn>
        )}
      </Wrapper>
    </BottomSheet>
  );
};

export default MsgBtmSheet;
