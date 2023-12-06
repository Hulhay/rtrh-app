import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { kajianService } from '../../service';
import { KajianType, lang } from '../../constants';
import { Header, Loading } from '../../components';
import { KajianInfo, Wrapper } from './KajianDetail.styles';
import { formatDateString } from '../../helper';
import { TablePresensi } from './components';

const KajianDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [error, setError] = useState<any>();
  const [kajian, setKajian] = useState<KajianType>({
    id: 0,
    name: '',
    lecturer: '',
    date: '',
  });

  const getKajianByID = async (id: string) => {
    const { resp: kajian, error } = await kajianService.getKajianByIDDB(id);
    setError(error?.message);
    setKajian(kajian);
  };

  useEffect(() => {
    getKajianByID(id as string);
  }, []);

  useEffect(() => {
    error && navigate('/not-found');
  }, [error]);

  return (
    <React.Fragment>
      {!kajian.name ? (
        <Loading midScreen />
      ) : (
        <Wrapper>
          <Header title={lang('presensi.header')} />
          <KajianInfo>
            <p className="title">{kajian.name}</p>
            <p>{kajian.lecturer}</p>
            <p>{formatDateString(kajian.date, 'D MMMM YYYY')}</p>
            <p className="total">{lang('presensi.total', { n: 50 })}</p>
          </KajianInfo>
          <TablePresensi
            jamaahData={[
              {
                id: 1,
                name: 'Fulan bin Fulan',
                phoneNumber: '',
                uniqueId: '',
              },
              {
                id: 2,
                name: 'Fulanah binti Fulan',
                phoneNumber: '',
                uniqueId: '',
              },
            ]}
          />
        </Wrapper>
      )}
    </React.Fragment>
  );
};

export default KajianDetail;
