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

  const getJamaah = useRef(
    debounce(async (keyword: string) => {
      setLoading(true);
      try {
        const { resp: jamaahData } = await jamaahService.getJamaahDB(keyword);
        setJamaahData(jamaahData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }, 500),
  ).current;

  const insertNewJamaah = async (jamaah: JamaahType, uniqueId: string) => {
    let errMsg = '';
    setDisabledSave(true);
    try {
      const { error } = await jamaahService.insertJamaahDB({
        ...jamaah,
        uniqueId: uniqueId,
      });

      if (error && isMountedRef.current) {
        errMsg = error.message;
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setDisabledSave(false);
    }

    return errMsg;
  };

  const resetJamaah = () => {
    setJamaah({
      ...jamaah,
      name: '',
      phoneNumber: '',
    });
  };

  const dispatchJamaah = (jamaah: JamaahType, jamaahQRString: string) => {
    dispatch(
      insertJamaah({
        ...jamaah,
        qrString: jamaahQRString,
      }),
    );
  };

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
    setIsMsgBtmSheet(false);
    resetJamaah();
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

    dispatchJamaah(jamaah, jamaahQRString);
    const errMsg = await insertNewJamaah(jamaah, uniqueId);

    if (errMsg && isMountedRef.current) {
      setErrMsg(errMsg);
      setIsFormBtmSheet(false);
      setIsMsgBtmSheet(true);
      resetJamaah();
      return;
    }

    if (isMountedRef.current) {
      navigate(`/jamaah/new`);
    }
  };

  useEffect(() => {
    getJamaah(keyword);
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
      getJamaah.cancel();
    };
  }, [getJamaah]);

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
        <TableJamaah jamaahData={jamaahData} loading={loading} />
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
