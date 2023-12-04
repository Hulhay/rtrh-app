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
import { KajianType, lang } from '../../../../constants';

interface FormBtmSheetProps {
  isFormBtmSheet: boolean;
  kajian: KajianType;
  disabledSave: boolean;
  onClose: () => void;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLecturerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const FormBtmSheet: React.FC<FormBtmSheetProps> = (props) => {
  return (
    <BottomSheet active={props.isFormBtmSheet} onClose={props.onClose}>
      <FormWrapper
        onSubmit={props.onSubmit}
        className={props.isFormBtmSheet ? 'active' : ''}
      >
        <FormTitle>{lang('kajian.form.title')}</FormTitle>
        <FormBody>
          <FieldWrapper>
            <FieldLabel>{lang('kajian.form.name')}</FieldLabel>
            <Field
              placeholder={lang('kajian.form.name_placeholder')}
              value={props.kajian.name}
              onChange={props.onNameChange}
            />
          </FieldWrapper>
          <FieldWrapper>
            <FieldLabel>{lang('kajian.form.lecturer')}</FieldLabel>
            <Field
              placeholder={lang('kajian.form.lecturer_placeholder')}
              value={props.kajian.lecturer}
              onChange={props.onLecturerChange}
            />
          </FieldWrapper>
          <FieldWrapper>
            <FieldLabel>{lang('kajian.form.date')}</FieldLabel>
            <Field
              type="date"
              placeholder={lang('kajian.form.date_placeholder')}
              value={props.kajian.date}
              onChange={props.onDateChange}
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
