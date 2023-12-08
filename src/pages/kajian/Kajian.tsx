import React, { useEffect, useRef, useState } from 'react';
import { Wrapper } from './Kajian.styles';
import { AddButton, FormBtmSheet, TableKajian } from './components';
import { Header, MsgBtmSheet, SearchBar } from '../../components';
import { KajianType, lang } from '../../constants';
import { kajianService } from '../../service';
import { debounce } from 'lodash';

const Kajian: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [isFormBtmSheet, setIsFormBtmSheet] = useState<boolean>(false);
  const [isMsgBtmSheet, setIsMsgBtmSheet] = useState<boolean>(false);
  const [disabledSave, setDisabledSave] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [kajianData, setKajianData] = useState<KajianType[]>([]);
  const [kajian, setKajian] = useState<KajianType>({
    id: 0,
    name: '',
    lecturer: '',
    date: '',
  });

  const getKajian = useRef(
    debounce(async (keyword: string) => {
      setLoading(true);
      try {
        const { resp: kajianData } = await kajianService.getKajianDB(keyword);
        setKajianData(kajianData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }, 500),
  ).current;

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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setDisabledSave(true);
    try {
      await kajianService.insertKajianDB(kajian);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setDisabledSave(false);
    }

    setIsFormBtmSheet(false);
    setIsMsgBtmSheet(true);
    setKajianData([kajian, ...kajianData]);
  };

  useEffect(() => {
    getKajian(keyword);
  }, [keyword]);

  useEffect(() => {
    kajian.name && kajian.lecturer && kajian.date && setDisabledSave(false);
  }, [kajian]);

  useEffect(() => {
    return () => {
      getKajian.cancel();
    };
  }, [getKajian]);

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
        <TableKajian kajianData={kajianData} loading={loading} />
        <AddButton onClick={onClick} />
      </Wrapper>

      <FormBtmSheet
        isFormBtmSheet={isFormBtmSheet}
        kajian={kajian}
        disabledSave={disabledSave}
        onClose={onClose}
        onNameChange={onNameChange}
        onLecturerChange={onLecturerChange}
        onDateChange={onDateChange}
        onSubmit={onSubmit}
      />

      <MsgBtmSheet
        isMsgBtmSheet={isMsgBtmSheet}
        type="info"
        title={lang('kajian.success')}
        onClose={onClose}
      />
    </React.Fragment>
  );
};

export default Kajian;
