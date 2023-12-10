import React, { useEffect, useState } from 'react';
import {
  Action,
  DownloadButton,
  EditButton,
  Header,
  JamaahInfo,
  QRWrapper,
  Wrapper,
} from './JamaahDetail.styles';
import { GoXCircle } from 'react-icons/go';
import { useNavigate, useParams } from 'react-router-dom';
import { drawQRCode, generateQRString } from '../../helper';
import { JamaahType, lang } from '../../constants';
import QRCode from 'react-qr-code';
import { jamaahService } from '../../service';
import { Loading, MsgBtmSheet } from '../../components';
import { FormBtmSheet } from './components';

const JamaahDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isFormBtmSheet, setIsFormBtmSheet] = useState<boolean>(false);
  const [isMsgBtmSheet, setIsMsgBtmSheet] = useState<boolean>(false);
  const [disabledSave, setDisabledSave] = useState<boolean>(true);
  const [jamaah, setJamaah] = useState<JamaahType>({
    id: 0,
    name: '',
    phoneNumber: '',
    uniqueId: '',
  });
  const [uJamaah, setUJamaah] = useState<JamaahType>({
    id: 0,
    name: '',
    phoneNumber: '',
    uniqueId: '',
  });

  const getJamaahByID = async (id: string) => {
    setLoading(true);
    try {
      const { resp: jamaah, error } = await jamaahService.getJamaahByIDDB(id);
      setJamaah(jamaah);
      setUJamaah(jamaah);
      setError(error?.message);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateJamaahByID = async (jamaah: JamaahType, id: string) => {
    setDisabledSave(true);
    try {
      await jamaahService.updateJamaahByIDDB(jamaah, id);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setDisabledSave(false);
    }
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

  const onEditClick = () => {
    setUJamaah(jamaah);
    setIsFormBtmSheet(true);
  };

  const onClose = () => {
    setIsFormBtmSheet(false);
    setIsMsgBtmSheet(false);
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUJamaah({ ...jamaah, name: event.target.value });
  };

  const onPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUJamaah({ ...jamaah, phoneNumber: event.target.value });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { jamaahQRString: qrString } = generateQRString(
      uJamaah,
      uJamaah.uniqueId,
    );
    await updateJamaahByID(uJamaah, id as string);
    setJamaah({ ...uJamaah, qrString });
    setIsFormBtmSheet(false);
  };

  useEffect(() => {
    getJamaahByID(id as string);
  }, []);

  useEffect(() => {
    error && navigate('/not-found');
  }, [error]);

  useEffect(() => {
    if (jamaah.name && jamaah.phoneNumber) {
      setDisabledSave(false);
    } else {
      setDisabledSave(true);
    }
  }, [jamaah]);

  return (
    <React.Fragment>
      {loading ? (
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
          <Action>
            <EditButton onClick={onEditClick}>{lang('button.edit')}</EditButton>
            <DownloadButton onClick={onImageDownload}>
              {lang('button.download_qr')}
            </DownloadButton>
          </Action>
        </Wrapper>
      )}

      <FormBtmSheet
        jamaah={uJamaah}
        isFormBtmSheet={isFormBtmSheet}
        disabledSave={disabledSave}
        onClose={onClose}
        onNameChange={onNameChange}
        onPhoneChange={onPhoneChange}
        onSubmit={onSubmit}
      />

      <MsgBtmSheet
        isMsgBtmSheet={isMsgBtmSheet}
        type="info"
        title={lang('jamaah.edit_success')}
        onClose={onClose}
      />
    </React.Fragment>
  );
};

export default JamaahDetail;
