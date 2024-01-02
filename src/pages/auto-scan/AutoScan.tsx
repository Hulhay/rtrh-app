import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import {
  Option,
  ScannerWrapper,
  Select,
  SelectWrapper,
  Wrapper,
} from './AutoScan.styles';
import { useNavigate } from 'react-router-dom';
import { parsingQr, validateQrString } from '../../helper';
import { KajianType, PresensiType, lang } from '../../constants';
import { kajianService, presensiService } from '../../service';
import { CameraBtmSheet, SuccessBtmSheet } from './components';
import { GoXCircleFill } from 'react-icons/go';
import { autoCloseDuration, isRememberChooseKajian } from '../../config';
import { MsgBtmSheet } from '../../components';

const AutoScan: React.FC = () => {
  const navigate = useNavigate();

  const [isSuccessBtmSheet, setIsSuccessBtmSheet] = useState<boolean>(false);
  const [isMsgBtmSheet, setIsMsgBtmSheet] = useState<boolean>(false);
  const [isCameraBtmSheet, setIsCameraBtmSheet] = useState<boolean>(
    !isRememberChooseKajian(),
  );
  const [kajianData, setKajianData] = useState<KajianType[]>([]);
  const [presensi, setPresensi] = useState<PresensiType>({
    kajianId: 0,
    name: '',
    phoneNumber: '',
    uniqueId: '',
    time: '',
  });

  const getKajian = async () => {
    const { resp: kajianData } = await kajianService.getKajianDB('');
    setKajianData(kajianData);
  };

  const insertPresensi = async (presensi: PresensiType) => {
    try {
      await presensiService.insertPresensiDB(presensi);
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPresensi({ ...presensi, kajianId: 0 });
    setTimeout(() => {
      setPresensi({ ...presensi, kajianId: parseInt(event.target.value) });
    }, 500);
  };

  const onResult = async (result: any) => {
    const qrCode = result?.getText() as string;
    if (!!qrCode) {
      if (!validateQrString(qrCode)) {
        setIsMsgBtmSheet(true);
        return;
      }
      const { name, phoneNumber, uniqueId, time } = parsingQr(qrCode);
      const presensiReq: PresensiType = {
        ...presensi,
        name,
        phoneNumber,
        uniqueId,
        time,
      };
      setPresensi(presensiReq);
      await insertPresensi(presensiReq);
      setIsSuccessBtmSheet(true);
      setTimeout(() => {
        setIsSuccessBtmSheet(false);
      }, autoCloseDuration);
    }
  };

  const onClose = () => {
    setIsSuccessBtmSheet(false);
    setIsMsgBtmSheet(false);
  };

  const onCloseCameraBtmSheet = () => {
    setIsCameraBtmSheet(false);
  };

  useEffect(() => {
    getKajian();
  }, []);

  return (
    <React.Fragment>
      <Wrapper>
        <GoXCircleFill className="back" onClick={() => navigate('/')} />
        <ScannerWrapper>
          {presensi.kajianId > 0 && (
            <QrReader
              constraints={{ facingMode: 'environment' }}
              scanDelay={2000}
              onResult={onResult}
              containerStyle={{
                height: '65vh',
              }}
              videoContainerStyle={{ height: '65vh' }}
              videoStyle={{ height: '65vh', objectFit: 'cover' }}
            />
          )}
        </ScannerWrapper>
        <SelectWrapper>
          <Select defaultValue="placeholder" onChange={onChange}>
            <Option value="placeholder" disabled>
              {lang('scan.choose_kajian')}
            </Option>
            {kajianData.map((kajian, index) => {
              return (
                <Option value={kajian.id} key={index}>
                  {kajian.name}
                </Option>
              );
            })}
          </Select>
        </SelectWrapper>
      </Wrapper>

      <SuccessBtmSheet
        isSuccessBtmSheet={isSuccessBtmSheet}
        onClose={onClose}
        presensi={presensi}
      />

      <CameraBtmSheet
        isCameraBtmSheet={isCameraBtmSheet}
        onClose={onCloseCameraBtmSheet}
      />

      <MsgBtmSheet
        isMsgBtmSheet={isMsgBtmSheet}
        type="question"
        title={lang('scan.unknown_qr')}
        onClose={onClose}
      />
    </React.Fragment>
  );
};

export default AutoScan;
