import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { kajianService, presensiService } from '../../service';
import { JamaahType, KajianType, lang } from '../../constants';
import { Header, Loading } from '../../components';
import {
  Field,
  FieldWrapper,
  KajianInfo,
  Wrapper,
} from './KajianDetail.styles';
import { TablePresensi } from './components';
import { todayDateString } from '../../helper';

const KajianDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [error, setError] = useState<any>();
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [presensiLoading, setPresensiLoading] = useState<boolean>(false);
  const [jamaah, setJamaah] = useState<JamaahType[]>([]);
  const [date, setDate] = useState<string>(todayDateString());
  const [kajian, setKajian] = useState<KajianType>({
    id: 0,
    name: '',
    lecturer: '',
  });

  const getKajianByID = async (id: string) => {
    setLoading(true);
    try {
      const { resp: kajian, error } = await kajianService.getKajianByIDDB(id);
      setError(error?.message);
      setKajian(kajian);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPresensi = async (id: string, date: string) => {
    setPresensiLoading(true);
    try {
      const { resp: jamaah, count } =
        await presensiService.getPresensiByKajianIDandDateDB(id, date);
      setJamaah(jamaah);
      setCount(count);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setPresensiLoading(false);
    }
  };

  const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  useEffect(() => {
    getKajianByID(id as string);
  }, []);

  useEffect(() => {
    getPresensi(id as string, date);
  }, [date]);

  useEffect(() => {
    error && navigate('/not-found');
  }, [error]);

  return (
    <React.Fragment>
      {loading ? (
        <Loading midScreen />
      ) : (
        <Wrapper>
          <Header title={lang('presensi.header')} />
          <KajianInfo>
            <p className="title">{kajian.name}</p>
            <p>{kajian.lecturer}</p>
            <FieldWrapper>
              <Field type="date" value={date} onChange={onDateChange} />
              <p className="note">{lang('presensi.format_date_note')}</p>
            </FieldWrapper>
            <p className="total">{lang('presensi.total', { n: count })}</p>
          </KajianInfo>
          <TablePresensi jamaahData={jamaah} loading={presensiLoading} />
        </Wrapper>
      )}
    </React.Fragment>
  );
};

export default KajianDetail;
