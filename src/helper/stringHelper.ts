import { getTimeString, now } from '.';
import { JamaahType } from '../constants';

export const generateUniqueId = (): string => {
  return Math.random().toString(16).slice(2);
};

export const generateQRString = (jamaah: JamaahType): string => {
  const uniqueId = generateUniqueId();
  const name = jamaah.name.split(' ').join('%20');
  return `RTRH/${name}/${jamaah.phoneNumber}/${uniqueId}`;
};

export const validateQrString = (qrString: string): boolean => {
  const validQrPattern = /RTRH\/[a-zA-Z0-9%]+\/\d+\/\S+/;
  return validQrPattern.test(qrString);
};

export const parsingQr = (qrString: string) => {
  const parse = qrString.split('/');
  return {
    name: parse[1].split('%20').join(' '),
    phoneNumber: parse[2],
    date: getTimeString(now()),
  };
};
