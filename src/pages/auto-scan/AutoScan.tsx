import React, { useState } from 'react';
// import {
// Option,
// ScannerWrapper,
// Select,
// SelectWrapper,
// Wrapper,
// } from './AutoScan.styles';
// import { GoXCircleFill } from 'react-icons/go';
// import { useNavigate } from 'react-router-dom';
import ContinuousQrScanner from 'react-webcam-qr-scanner.ts';
// import { MsgBtmSheet } from '../../components';
// import { parsingQr } from '../../helper';
// import { PresensiType } from '../../constants';
// import { presensiService } from '../../service';
// import { kajianService, presensiService } from '../../service';
// import { KajianType, PresensiType, lang } from '../../constants';
// import { CameraBtmSheet, SuccessBtmSheet } from './components';
// import { isRememberChooseKajian } from '../../config';

const AutoScan: React.FC = () => {
  const [qrCode, setQrCode] = useState('');
  const [shouldScan, setShouldScan] = useState(false);

  function startScanner() {
    setShouldScan(true);
  }
  function stopScanner() {
    setShouldScan(false);
  }

  return (
    <>
      <p>
        QR Code: <code>{qrCode}</code>
      </p>
      {!shouldScan ? (
        <button onClick={startScanner}>Scan QR Code</button>
      ) : (
        <>
          <button onClick={stopScanner}>Stop Scanning</button>
          {/* onQrCode can be fired multiple times */}
          <ContinuousQrScanner onQrCode={setQrCode} />
        </>
      )}
    </>
  );
  // const navigate = useNavigate();

  // const [qrCode, setQrCode] = useState<string>('');
  // const [isCameraBtmSheet, setIsCameraBtmSheet] = useState<boolean>(
  //   !isRememberChooseKajian(),
  // );
  // const [isSuccessBtmSheet, setIsSuccessBtmSheet] = useState<boolean>(false);
  // const [isMsgBtmSheet, setIsMsgBtmSheet] = useState<boolean>(false);
  // const [kajianData, setKajianData] = useState<KajianType[]>([]);
  // const [presensi, setPresensi] = useState<PresensiType>({
  //   kajianId: 6,
  //   name: '',
  //   phoneNumber: '',
  //   uniqueId: '',
  //   time: '',
  // });

  // const getKajian = async () => {
  //   const { resp: kajianData } = await kajianService.getKajianDB('');
  //   setKajianData(kajianData);
  // };

  // const insertPresensi = async (presensi: PresensiType) => {
  //   try {
  //     await presensiService.insertPresensiDB(presensi);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const scanQr = async (qrCode: string) => {
  //   if (qrCode !== '') {
  //     // if (!validateQrString(qrCode)) {
  //     //   setIsMsgBtmSheet(true);
  //     //   return;
  //     // }

  //     const { name, phoneNumber, uniqueId, time } = parsingQr(qrCode);
  //     const updatedPresensi = {
  //       ...presensi,
  //       name,
  //       phoneNumber,
  //       uniqueId,
  //       time,
  //     };

  //     setPresensi(updatedPresensi);
  //     await insertPresensi(updatedPresensi);
  //     // setIsSuccessBtmSheet(true);

  //     // setTimeout(() => {
  //     //   // setIsSuccessBtmSheet(false);
  //     //   setPresensi({ ...presensi, kajianId: presensi.kajianId });
  //     // }, 2000);
  //   }
  // };

  // const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setPresensi({ ...presensi, kajianId: parseInt(event.target.value) });
  // };

  // const onQrCode = (qrCode: string) => {
  //   setQrCode(qrCode);
  // scanQr(qrCode);
  // };

  // const onCloseCameraBtmSheet = () => {
  //   setIsCameraBtmSheet(false);
  // };

  // const onClose = () => {
  //   setIsSuccessBtmSheet(false);
  //   setIsMsgBtmSheet(false);
  //   window.location.reload();
  // };

  // useEffect(() => {
  //   getKajian();
  // }, []);

  // useEffect(() => {
  //   scanQr();
  // }, [qrCode]);

  // return (
  // <React.Fragment>
  // <div>
  {
    /* <GoXCircleFill className="back" onClick={() => navigate('/')} /> */
  }
  {
    /* <ScannerWrapper> */
  }
  {
    /* {presensi.kajianId > 0 && ( */
  }
  // <ContinuousQrScanner
  // onQrCode={onQrCode}
  // style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  // />
  {
    /* )} */
  }
  {
    /* </ScannerWrapper> */
  }
  // <pre>{JSON.stringify(qrCode)}</pre>
  {
    /* <SelectWrapper>
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
        </SelectWrapper> */
  }
  // </div>

  {
    /* <CameraBtmSheet
        isCameraBtmSheet={isCameraBtmSheet}
        onClose={onCloseCameraBtmSheet}
      /> */
  }

  {
    /* <SuccessBtmSheet
        isSuccessBtmSheet={isSuccessBtmSheet}
        onClose={onClose}
        presensi={presensi}
      /> */
  }

  {
    /* <MsgBtmSheet
        isMsgBtmSheet={isMsgBtmSheet}
        type="question"
        title={lang('scan.unknown_qr')}
        onClose={onClose}
      /> */
  }
  // </React.Fragment>
  // );
};

export default AutoScan;
