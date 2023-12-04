import React, { useEffect, useState } from 'react';
import { Header, SearchBar } from '../../components';
import { JamaahType, lang } from '../../constants';
import { jamaahData } from './dummy';
import { AddButton, FormBtmSheet, TableJamaah } from './components';
import { Wrapper } from './Jamaah.styles';
import { generateQRString } from '../../helper';
import { useAppDispatch } from '../../hooks';
import { insertJamaah } from '../../store/reducer';
import { useNavigate } from 'react-router-dom';

const Jamaah: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState<string>('');
  const [isFormBtmSheet, setIsFormBtmSheet] = useState<boolean>(false);
  const [disabledSave, setDisabledSave] = useState<boolean>(true);
  const [jamaah, setJamaah] = useState<JamaahType>({
    id: 0,
    name: '',
    phoneNumber: '',
    uniqueId: '',
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

  const onClose = () => {
    setIsFormBtmSheet(false);
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJamaah({ ...jamaah, name: event.target.value });
  };

  const onPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJamaah({ ...jamaah, phoneNumber: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const jamaahQRString = generateQRString(jamaah);
    dispatch(
      insertJamaah({
        id: jamaah.id,
        name: jamaah.name,
        phoneNumber: jamaah.phoneNumber,
        uniqueId: jamaah.uniqueId,
        qrString: jamaahQRString,
      }),
    );
    console.log(jamaahQRString);
    navigate(`/jamaah/new`);
  };

  useEffect(() => {
    jamaah.name && jamaah.phoneNumber && setDisabledSave(false);
  }, [jamaah]);

  return (
    <React.Fragment>
      <Wrapper>
        <Header title={lang('jamaah.header')} />
        <SearchBar
          placeholder={lang('jamaah.search_placeholder')}
          value={keyword}
          onChange={onKeywordChange}
          onClear={onClear}
        />
        <TableJamaah jamaahData={jamaahData} />
        <AddButton onClick={onClick} />
      </Wrapper>

      <FormBtmSheet
        isFormBtmSheet={isFormBtmSheet}
        jamaah={jamaah}
        onClose={onClose}
        onNameChange={onNameChange}
        onPhoneChange={onPhoneChange}
        onSubmit={onSubmit}
        disabledSave={disabledSave}
      />
    </React.Fragment>
  );
};

export default Jamaah;
