import React, { useState } from 'react';
import {
  Option,
  ScannerWrapper,
  Select,
  SelectWrapper,
  Wrapper,
} from './Scan.styles';
import { GoXCircleFill } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import ContinuousQrScanner from 'react-webcam-qr-scanner.ts';

const Scan: React.FC = () => {
  const navigate = useNavigate();
  const [qrCode, setQrCode] = useState<string>('');

  const onQrCode = (qrCode: string) => {
    setQrCode(qrCode);
  };

  return (
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
      <div style={{ textAlign: 'center' }}>{qrCode}</div>
    </Wrapper>
  );
};

export default Scan;
