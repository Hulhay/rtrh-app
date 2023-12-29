import { getTimeString, now } from '.';
import { JamaahType } from '../constants';

export const generateUniqueId = (): string => {
  return Math.random().toString(16).slice(2);
};

export const generateQRString = (jamaah: JamaahType, uniqueId?: string) => {
  let uid = uniqueId;
  if (!uid) {
    uid = generateUniqueId();
  }
  const name = jamaah.name.split(' ').join('%20');
  return {
    jamaahQRString: `RTRH/${name}/${jamaah.phoneNumber}/${uid}`,
    uniqueId: uid,
  };
};

export const buildQRStringFromResponse = (jamaah: any) => {
  const name = jamaah.name.split(' ').join('%20');
  return `RTRH/${name}/${jamaah.phone_number}/${jamaah.unique_id}`;
};

export const validateQrString = (qrString: string): boolean => {
  const isRTRH = qrString.split('/')[0];
  return isRTRH === 'RTRH' || isRTRH === 'rtrh';
};

export const parsingQr = (qrString: string) => {
  const parse = qrString.split('/');
  return {
    name: parse[1].split('%20').join(' '),
    phoneNumber: parse[2],
    uniqueId: parse[3],
    time: getTimeString(now()),
  };
};
