import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { kajianService, presensiService } from '../../service';
import { JamaahType, KajianType, lang } from '../../constants';
import { Header, Loading } from '../../components';
import { KajianInfo, Wrapper } from './KajianDetail.styles';
import { formatDateString } from '../../helper';
import { TablePresensi } from './components';

const KajianDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [error, setError] = useState<any>();
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [jamaah, setJamaah] = useState<JamaahType[]>([]);
  const [kajian, setKajian] = useState<KajianType>({
    id: 0,
    name: '',
    lecturer: '',
    date: '',
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

  const getPresensiByKajianID = async (id: string) => {
    const { resp: jamaah, count } =
      await presensiService.getPresensiByKajianIDDB(id);
    setJamaah(jamaah);
    setCount(count);
  };

  useEffect(() => {
    getKajianByID(id as string);
    getPresensiByKajianID(id as string);
  }, []);

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
            <p>{formatDateString(kajian.date, 'D MMMM YYYY')}</p>
            <p className="total">{lang('presensi.total', { n: count })}</p>
          </KajianInfo>
          <TablePresensi jamaahData={jamaah} />
        </Wrapper>
      )}
    </React.Fragment>
  );
};

export default KajianDetail;
