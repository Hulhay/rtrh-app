import React, { useEffect, useState } from 'react';
import {
  CloseBtn,
  Description,
  JamaahWrapper,
  MsgWrapper,
  Option,
  ScannerWrapper,
  Select,
  SelectWrapper,
  Wrapper,
} from './Scan.styles';
import { GoXCircleFill } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import ContinuousQrScanner from 'react-webcam-qr-scanner.ts';
import { BottomSheet } from '../../components';
import { parsingQr, validateQrString } from '../../helper';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { kajianService, presensiService } from '../../service';
import { KajianType, PresensiType } from '../../constants';

const Scan: React.FC = () => {
  const navigate = useNavigate();

  const [qrCode, setQrCode] = useState<string>('');
  const [isBtmSheet, setIsBtmSheet] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [kajianData, setKajianData] = useState<KajianType[]>([]);
  const [presensi, setPresensi] = useState<PresensiType>({
    kajianId: 0,
    name: '',
    phoneNumber: '',
    uniqueId: '',
    time: '',
  });

  const getKajianToday = async () => {
    const { resp: kajianData } = await kajianService.getKajianTodayDB();
    setKajianData(kajianData);
  };

  const insertPresensi = async (presensi: PresensiType) => {
    try {
      await presensiService.insertPresensiDB(presensi);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPresensi({ ...presensi, kajianId: parseInt(event.target.value) });
  };

  const onQrCode = (qrCode: string) => {
    setQrCode(qrCode);
  };

  const onClose = () => {
    setIsBtmSheet(false);
    window.location.reload();
  };

  useEffect(() => {
    getKajianToday();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (qrCode !== '') {
        if (!validateQrString(qrCode)) {
          setIsValid(false);
          setIsBtmSheet(true);
          return;
        }

        const { name, phoneNumber, uniqueId, time } = parsingQr(qrCode);
        const updatedPresensi = {
          ...presensi,
          name,
          phoneNumber,
          uniqueId,
          time,
        };

        setPresensi(updatedPresensi);
        await insertPresensi(updatedPresensi);
        setIsValid(true);
        setIsBtmSheet(true);
      }
    };

    fetchData();
  }, [qrCode]);

  return (
    <React.Fragment>
      <Wrapper>
        <GoXCircleFill className="back" onClick={() => navigate('/')} />
        <ScannerWrapper>
          <ContinuousQrScanner
            onQrCode={onQrCode}
            hidden={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </ScannerWrapper>
        <SelectWrapper>
          <Select defaultValue="placeholder" onChange={onChange}>
            <Option value="placeholder" disabled>
              Pilih Kajian
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

      <BottomSheet active={false} onClose={onClose}>
        <MsgWrapper className={isBtmSheet ? 'active' : ''}>
          {isValid ? (
            <React.Fragment>
              <IoIosCheckmarkCircle className="icon" />
              <Description>Ahlan Wa Sahlan</Description>
              <JamaahWrapper>
                <p>{presensi.name}</p>
                <p>{presensi.phoneNumber}</p>
                <p>{presensi.time}</p>
              </JamaahWrapper>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <AiFillQuestionCircle className="icon" />
              <Description>QR Tidak Dikenal</Description>
              <p>Silakan Coba Lagi</p>
            </React.Fragment>
          )}
          <CloseBtn onClick={onClose}>Tutup</CloseBtn>
        </MsgWrapper>
      </BottomSheet>
    </React.Fragment>
  );
};

export default Scan;
