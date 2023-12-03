import React, { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { GoXCircle } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import {
  DownloadButton,
  Header,
  JamaahDetail,
  QRWrapper,
  Wrapper,
} from './CreateJamaahSuccess.styles';
import { lang } from '../../constants';
import drawQRCode from './CreateJamaahSuccess.helper';

const CreateJamaahSuccess: React.FC = () => {
  const navigate = useNavigate();
  const jamaah = useAppSelector((state) => state.jamaah);

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
    if (!jamaah.qrString) {
      navigate('/jamaah');
    }
  }, []);

  return (
    <Wrapper>
      <GoXCircle className="back" onClick={() => navigate('/jamaah')} />
      <Header>{lang('jamaah.success')}</Header>
      <QRWrapper>
        <QRCode id="QRCode" value={jamaah.qrString || ''} size={256} />
      </QRWrapper>
      <JamaahDetail>
        <p>{jamaah.name}</p>
        <p>{jamaah.phoneNumber}</p>
      </JamaahDetail>
      <DownloadButton onClick={onImageDownload}>
        {lang('button.download_qr')}
      </DownloadButton>
    </Wrapper>
  );
};

export default CreateJamaahSuccess;
