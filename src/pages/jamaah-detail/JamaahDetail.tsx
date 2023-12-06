import React, { useEffect, useState } from 'react';
import {
  DownloadButton,
  Header,
  JamaahInfo,
  QRWrapper,
  Wrapper,
} from './JamaahDetail.styles';
import { GoXCircle } from 'react-icons/go';
import { useNavigate, useParams } from 'react-router-dom';
import { drawQRCode } from '../../helper';
import { JamaahType, lang } from '../../constants';
import QRCode from 'react-qr-code';
import { jamaahService } from '../../service';
import { Loading } from '../../components';

const JamaahDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [error, setError] = useState<any>();
  const [jamaah, setJamaah] = useState<JamaahType>({
    id: 0,
    name: '',
    phoneNumber: '',
    uniqueId: '',
  });

  const getJamaahByID = async (id: string) => {
    const { resp: jamaah, error } = await jamaahService.getJamaahByIDDB(id);
    setError(error?.message);
    setJamaah(jamaah);
  };

  const onImageDownload = () => {
    const svg = document.getElementById('QRCode');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        if (ctx) {
          drawQRCode({ ctx, img, jamaah });

          const pngFile = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.download = `QR-RTRH-${jamaah.phoneNumber}`;
          downloadLink.href = `${pngFile}`;
          downloadLink.click();
        }
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  };

  useEffect(() => {
    getJamaahByID(id as string);
  }, []);

  useEffect(() => {
    error && navigate('/not-found');
  }, [error]);

  return (
    <React.Fragment>
      {!jamaah.qrString ? (
        <Loading midScreen />
      ) : (
        <Wrapper>
          <GoXCircle className="back" onClick={() => navigate('/jamaah')} />
          <Header>{lang('jamaah.detail')}</Header>
          <QRWrapper>
            <QRCode id="QRCode" value={jamaah.qrString || ''} size={256} />
          </QRWrapper>
          <JamaahInfo>
            <p>{jamaah.name}</p>
            <p>{jamaah.phoneNumber}</p>
          </JamaahInfo>
          <DownloadButton onClick={onImageDownload}>
            {lang('button.download_qr')}
          </DownloadButton>
        </Wrapper>
      )}
    </React.Fragment>
  );
};

export default JamaahDetail;
