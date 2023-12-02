import React, { useEffect, useState } from 'react';
import { BottomSheet, SearchBar } from '../../components';
import { lang } from '../../constants';
import { jamaahData } from './dummy';
import { AddButton, Header, TableJamaah } from './components';
import {
  Field,
  FieldLabel,
  FieldWrapper,
  FormBody,
  FormTitle,
  FormWrapper,
  SaveBtn,
  Wrapper,
} from './Jamaah.styles';

const Jamaah: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [isBtmSheet, setIsBtmSheet] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [jamaah, setJamaah] = useState({
    name: '',
    phone: '',
  });

  const onKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const onClear = () => {
    setKeyword('');
  };

  const onClick = () => {
    setIsBtmSheet(true);
  };

  const onClose = () => {
    setIsBtmSheet(false);
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJamaah({ ...jamaah, name: event.target.value });
  };

  const onPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJamaah({ ...jamaah, phone: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(jamaah);
  };

  useEffect(() => {
    jamaah.name && jamaah.phone && setDisabled(false);
  }, [jamaah]);

  return (
    <React.Fragment>
      <Wrapper>
        <Header />
        <SearchBar
          placeholder={lang('jamaah.search_placeholder')}
          value={keyword}
          onChange={onKeywordChange}
          onClear={onClear}
        />
        <TableJamaah jamaahData={jamaahData} />
        <AddButton onClick={onClick} />
      </Wrapper>

      <BottomSheet active={isBtmSheet} onClose={onClose}>
        <FormWrapper onSubmit={onSubmit} className={isBtmSheet ? 'active' : ''}>
          <FormTitle>{lang('jamaah.form.title')}</FormTitle>
          <FormBody>
            <FieldWrapper>
              <FieldLabel>{lang('jamaah.form.name')}</FieldLabel>
              <Field
                placeholder={lang('jamaah.form.name_placeholder')}
                value={jamaah.name}
                onChange={onNameChange}
              />
            </FieldWrapper>
            <FieldWrapper>
              <FieldLabel>{lang('jamaah.form.phone')}</FieldLabel>
              <Field
                inputMode="numeric"
                placeholder={lang('jamaah.form.phone_placeholder')}
                value={jamaah.phone}
                onChange={onPhoneChange}
              />
            </FieldWrapper>
          </FormBody>
          <SaveBtn
            type="submit"
            disabled={disabled}
            className={disabled ? 'disabled' : ''}
          >
            {lang('button.save')}
          </SaveBtn>
        </FormWrapper>
      </BottomSheet>
    </React.Fragment>
  );
};

export default Jamaah;
