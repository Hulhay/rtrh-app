import React from 'react';
import { BottomSheet } from '../../../../components';
import { CloseBtn, Description, Wrapper } from './SuccessBtmSheet.styles';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { lang } from '../../../../constants';

interface SuccessBtmSheetProps {
  isSuccessBtmSheet: boolean;
  onClose: () => void;
}

const SuccessBtmSheet: React.FC<SuccessBtmSheetProps> = (props) => {
  return (
    <BottomSheet active={props.isSuccessBtmSheet} onClose={props.onClose}>
      <Wrapper className={props.isSuccessBtmSheet ? 'active' : ''}>
        <IoIosCheckmarkCircle className="icon" />
        <Description>{lang('kajian.success')}</Description>
        <CloseBtn onClick={props.onClose}>{lang('button.close')}</CloseBtn>
      </Wrapper>
    </BottomSheet>
  );
};

export default SuccessBtmSheet;
