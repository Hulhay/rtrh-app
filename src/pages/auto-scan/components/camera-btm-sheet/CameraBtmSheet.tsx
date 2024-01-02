import React, { useState } from 'react';
import { BottomSheet } from '../../../../components';
import { AiFillInfoCircle } from 'react-icons/ai';
import {
  CloseBtn,
  Description,
  DontShowThis,
  MsgWrapper,
} from './CameraBtmSheet.styles';
import { lang } from '../../../../constants';
import { isRememberChooseKajian, storageKey } from '../../../../config';
import { setRhStorage } from '../../../../helper';

interface CameraBtmSheetProps {
  isCameraBtmSheet: boolean;
  onClose: () => void;
}

const CameraBtmSheet: React.FC<CameraBtmSheetProps> = (props) => {
  const [checked, setChecked] = useState<boolean>(isRememberChooseKajian());

  const onChange = () => {
    setChecked(!checked);
    setRhStorage(storageKey.REMEMBER_CHOOSE_KAJIAN, !checked);
  };

  return (
    <BottomSheet active={props.isCameraBtmSheet} onClose={props.onClose}>
      <MsgWrapper className={props.isCameraBtmSheet ? 'active' : ''}>
        <AiFillInfoCircle className="icon" />
        <Description>{lang('scan.choose_kajian_camera')}</Description>
        <CloseBtn onClick={props.onClose}>{lang('button.understand')}</CloseBtn>
        <DontShowThis>
          <input type="checkbox" checked={checked} onChange={onChange} />
          <p>{lang('scan.dont_show_this')}</p>
        </DontShowThis>
      </MsgWrapper>
    </BottomSheet>
  );
};

export default CameraBtmSheet;
