import React, { useEffect, useRef, useState } from 'react';
import { Header, MsgBtmSheet, SearchBar } from '../../components';
import { JamaahType, lang } from '../../constants';
import { AddButton, FormBtmSheet, TableJamaah } from './components';
import { Wrapper } from './Jamaah.styles';
import { generateQRString } from '../../helper';
import { useAppDispatch } from '../../hooks';
import { insertJamaah } from '../../store/reducer';
import { useNavigate } from 'react-router-dom';
import { jamaahService } from '../../service';
import { debounce } from 'lodash';
import { jamaahMap } from './Jamaah.helper';

const Jamaah: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMountedRef = useRef(true);

  const [keyword, setKeyword] = useState<string>('');
  const [isFormBtmSheet, setIsFormBtmSheet] = useState<boolean>(false);
  const [isMsgBtmSheet, setIsMsgBtmSheet] = useState<boolean>(false);
  const [disabledSave, setDisabledSave] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [jamaahData, setJamaahData] = useState<JamaahType[]>([]);
  const [errMsg, setErrMsg] = useState<string>('');
  const [jamaah, setJamaah] = useState<JamaahType>({
    id: 0,
    name: '',
    phoneNumber: '',
    uniqueId: '',
  });

  const getJamaah = async () => {
    const { data: jamaahResponse } = await jamaahService.getJamaahDB();
    const jamaahData = jamaahMap(jamaahResponse);
    setJamaahData(jamaahData);
  };

  const searchJamaah = useRef(
    debounce(async (keyword: string) => {
      const { data: jamaahResponse } =
        await jamaahService.searchJamaahByKeywordDB(keyword);
      const jamaahData = jamaahMap(jamaahResponse);
      setJamaahData(jamaahData);
    }, 500),
  ).current;

  const onKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const onClear = () => {
    setKeyword('');
    getJamaah();
  };

  const onClick = () => {
    setIsFormBtmSheet(true);
  };

  const onClose = () => {
    setIsFormBtmSheet(false);
    setIsMsgBtmSheet(false);
    setJamaah({
      ...jamaah,
      name: '',
      phoneNumber: '',
    });
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJamaah({ ...jamaah, name: event.target.value });
  };

  const onPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJamaah({ ...jamaah, phoneNumber: event.target.value });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { jamaahQRString, uniqueId } = generateQRString(jamaah);

    dispatch(
      insertJamaah({
        ...jamaah,
        qrString: jamaahQRString,
      }),
    );

    let _errMsg = '';
    setLoading(true);
    try {
      const { error } = await jamaahService.insertJamaahDB({
        ...jamaah,
        uniqueId: uniqueId,
      });

      if (error && isMountedRef.current) {
        _errMsg = error.message;
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }

    console.log(_errMsg);

    if (_errMsg && isMountedRef.current) {
      setErrMsg(_errMsg);
      setIsFormBtmSheet(false);
      setIsMsgBtmSheet(true);
      setJamaah({
        ...jamaah,
        name: '',
        phoneNumber: '',
      });
      return;
    }

    if (isMountedRef.current) {
      navigate(`/jamaah/new`);
    }
  };

  useEffect(() => {
    getJamaah();
  }, []);

  useEffect(() => {
    keyword && searchJamaah(keyword);
  }, [keyword]);

  useEffect(() => {
    jamaah.name && jamaah.phoneNumber && setDisabledSave(false);
  }, [jamaah]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      searchJamaah.cancel();
    };
  }, [searchJamaah]);

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
        {jamaahData.length === 0 ? (
          'loading..'
        ) : (
          <TableJamaah jamaahData={jamaahData} />
        )}
        <AddButton onClick={onClick} />
      </Wrapper>

      <FormBtmSheet
        isFormBtmSheet={isFormBtmSheet}
        jamaah={jamaah}
        onClose={onClose}
        onNameChange={onNameChange}
        onPhoneChange={onPhoneChange}
        onSubmit={onSubmit}
        disabledSave={disabledSave || loading}
      />

      {errMsg && (
        <MsgBtmSheet
          isMsgBtmSheet={isMsgBtmSheet}
          type="error"
          title={errMsg}
          onClose={onClose}
        />
      )}
    </React.Fragment>
  );
};

export default Jamaah;
