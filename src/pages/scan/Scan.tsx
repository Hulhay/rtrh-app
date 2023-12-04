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

const Scan: React.FC = () => {
  const navigate = useNavigate();

  const [qrCode, setQrCode] = useState<string>('');
  const [isBtmSheet, setIsBtmSheet] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [jamaah, setJamaah] = useState({
    name: '',
    phoneNumber: '',
    date: '',
  });

  const onQrCode = (qrCode: string) => {
    setQrCode(qrCode);
  };

  const onClose = () => {
    setIsBtmSheet(false);
    window.location.reload();
  };

  useEffect(() => {
    if (qrCode !== '') {
      if (!validateQrString(qrCode)) {
        setIsValid(false);
        setIsBtmSheet(true);
        return;
      }

      const { name, phoneNumber, date } = parsingQr(qrCode);

      setJamaah({ name, phoneNumber, date });
      setIsValid(true);
      setIsBtmSheet(true);
    }
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
          <Select defaultValue="placeholder">
            <Option value="placeholder" disabled>
              Pilih Kajian
            </Option>
            <Option value="1">Kajian Mantab 1</Option>
            <Option value="2">Kajian Mantab 2</Option>
            <Option value="3">Kajian Mantab 3</Option>
            <Option value="4">Kajian Mantab 4</Option>
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
                <p>{jamaah.name}</p>
                <p>{jamaah.phoneNumber}</p>
                <p>{jamaah.date}</p>
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
