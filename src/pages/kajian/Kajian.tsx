import React, { useEffect, useState } from 'react';
import { Wrapper } from './Kajian.styles';
import {
  AddButton,
  FormBtmSheet,
  SuccessBtmSheet,
  TableKajian,
} from './components';
import { Header, SearchBar } from '../../components';
import { KajianType, lang } from '../../constants';
import { kajianData } from './dummy';

const Kajian: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [isFormBtmSheet, setIsFormBtmSheet] = useState<boolean>(false);
  const [isSuccessBtmSheet, setIsSuccessBtmSheet] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [kajian, setKajian] = useState<KajianType>({
    id: 0,
    name: '',
    lecturer: '',
    date: '',
  });

  const onKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const onClear = () => {
    setKeyword('');
  };

  const onClick = () => {
    setIsFormBtmSheet(true);
  };

  const onFormClose = () => {
    setIsFormBtmSheet(false);
  };

  const onSuccessClose = () => {
    setIsSuccessBtmSheet(false);
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKajian({ ...kajian, name: event.target.value });
  };

  const onLecturerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKajian({ ...kajian, lecturer: event.target.value });
  };

  const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKajian({ ...kajian, date: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(kajian);

    setIsFormBtmSheet(false);
    setIsSuccessBtmSheet(true);
  };

  useEffect(() => {
    kajian.name && kajian.lecturer && kajian.date && setDisabled(false);
  }, [kajian]);

  return (
    <React.Fragment>
      <Wrapper>
        <Header title={lang('kajian.header')} />
        <SearchBar
          placeholder={lang('kajian.search_placeholder')}
          value={keyword}
          onChange={onKeywordChange}
          onClear={onClear}
        />
        <TableKajian kajianData={kajianData} />
        <AddButton onClick={onClick} />
      </Wrapper>

      <FormBtmSheet
        isFormBtmSheet={isFormBtmSheet}
        kajian={kajian}
        disabledSave={disabled}
        onClose={onFormClose}
        onNameChange={onNameChange}
        onLecturerChange={onLecturerChange}
        onDateChange={onDateChange}
        onSubmit={onSubmit}
      />

      <SuccessBtmSheet
        isSuccessBtmSheet={isSuccessBtmSheet}
        onClose={onSuccessClose}
      />
    </React.Fragment>
  );
};

export default Kajian;
