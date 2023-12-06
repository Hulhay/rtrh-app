import React, { useEffect, useRef, useState } from 'react';
import { Wrapper } from './Kajian.styles';
import {
  AddButton,
  FormBtmSheet,
  SuccessBtmSheet,
  TableKajian,
} from './components';
import { Header, Loading, SearchBar } from '../../components';
import { KajianType, lang } from '../../constants';
import { kajianService } from '../../service';
import { debounce } from 'lodash';

const Kajian: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [isFormBtmSheet, setIsFormBtmSheet] = useState<boolean>(false);
  const [isSuccessBtmSheet, setIsSuccessBtmSheet] = useState<boolean>(false);
  const [disabledSave, setDisabledSave] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [kajianData, setKajianData] = useState<KajianType[]>([]);
  const [kajian, setKajian] = useState<KajianType>({
    id: 0,
    name: '',
    lecturer: '',
    date: '',
  });

  const getKajian = async () => {
    setLoading(true);
    try {
      const { resp: kajianData } = await kajianService.getKajianDB();
      setKajianData(kajianData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const searchKajian = useRef(
    debounce(async (keyword: string) => {
      const { resp: kajianData } =
        await kajianService.searchKajianByKeywordDB(keyword);
      setKajianData(kajianData);
    }, 500),
  ).current;

  const onKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const onClear = () => {
    setKeyword('');
    getKajian();
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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setDisabledSave(true);
    try {
      await kajianService.insertKajianDB(kajian);
    } catch (error) {
      console.log(error);
    } finally {
      setDisabledSave(false);
    }

    setIsFormBtmSheet(false);
    setIsSuccessBtmSheet(true);
  };

  useEffect(() => {
    getKajian();
  }, []);

  useEffect(() => {
    keyword && searchKajian(keyword);
  }, [keyword]);

  useEffect(() => {
    kajian.name && kajian.lecturer && kajian.date && setDisabledSave(false);
  }, [kajian]);

  useEffect(() => {
    return () => {
      searchKajian.cancel();
    };
  }, [searchKajian]);

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
        {loading ? <Loading /> : <TableKajian kajianData={kajianData} />}
        <AddButton onClick={onClick} />
      </Wrapper>

      <FormBtmSheet
        isFormBtmSheet={isFormBtmSheet}
        kajian={kajian}
        disabledSave={disabledSave}
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
