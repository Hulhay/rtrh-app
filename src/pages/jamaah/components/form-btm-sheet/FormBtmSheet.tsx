import React from 'react';
import { BottomSheet } from '../../../../components';
import {
  Field,
  FieldLabel,
  FieldWrapper,
  FormBody,
  FormTitle,
  FormWrapper,
  SaveBtn,
} from './FormBtmSheet.styles';
import { JamaahType, lang } from '../../../../constants';

interface FormBtmSheetProps {
  isFormBtmSheet: boolean;
  jamaah: JamaahType;
  disabledSave: boolean;
  onClose: () => void;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const FormBtmSheet: React.FC<FormBtmSheetProps> = (props) => {
  return (
    <BottomSheet active={props.isFormBtmSheet} onClose={props.onClose}>
      <FormWrapper
        onSubmit={props.onSubmit}
        className={props.isFormBtmSheet ? 'active' : ''}
      >
        <FormTitle>{lang('jamaah.form.title')}</FormTitle>
        <FormBody>
          <FieldWrapper>
            <FieldLabel>{lang('jamaah.form.name')}</FieldLabel>
            <Field
              required
              placeholder={lang('jamaah.form.name_placeholder')}
              value={props.jamaah.name}
              onChange={props.onNameChange}
            />
          </FieldWrapper>
          <FieldWrapper>
            <FieldLabel>{lang('jamaah.form.phone')}</FieldLabel>
            <Field
              required
              inputMode="numeric"
              placeholder={lang('jamaah.form.phone_placeholder')}
              value={props.jamaah.phoneNumber}
              onChange={props.onPhoneChange}
            />
          </FieldWrapper>
        </FormBody>
        <SaveBtn
          type="submit"
          disabled={props.disabledSave}
          className={props.disabledSave ? 'disabled' : ''}
        >
          {lang('button.save')}
        </SaveBtn>
      </FormWrapper>
    </BottomSheet>
  );
};

export default FormBtmSheet;
