import React from 'react';
import { BottomSheet } from '../../../../components';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import {
  CloseBtn,
  Description,
  JamaahWrapper,
  MsgWrapper,
} from './SuccessBtmSheet.styles';
import { PresensiType, lang } from '../../../../constants';

interface SuccessBtmSheetProps {
  isSuccessBtmSheet: boolean;
  onClose: () => void;
  presensi: PresensiType;
}

const SuccessBtmSheet: React.FC<SuccessBtmSheetProps> = (props) => {
  return (
    <BottomSheet active={props.isSuccessBtmSheet} onClose={props.onClose}>
      <MsgWrapper className={props.isSuccessBtmSheet ? 'active' : ''}>
        <IoIosCheckmarkCircle className="icon" />
        <Description>{lang('scan.welcome')}</Description>
        <JamaahWrapper>
          <p>{props.presensi.name}</p>
          <p>{props.presensi.phoneNumber}</p>
          <p>{props.presensi.time}</p>
        </JamaahWrapper>
        <CloseBtn onClick={props.onClose}>{lang('button.close')}</CloseBtn>
      </MsgWrapper>
    </BottomSheet>
  );
};

export default SuccessBtmSheet;
