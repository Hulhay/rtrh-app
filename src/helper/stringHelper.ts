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
  const validQrPattern =
    /RTRH\/(?:[A-Za-z0-9%]+%20)?([A-Za-z0-9%]+)%20?([A-Za-z0-9]+)\/(\d{10,12})\/([A-Za-z0-9]+)/;
  return validQrPattern.test(qrString);
};

export const parsingQr = (qrString: string) => {
  const parse = qrString.split('/');
  return {
    name: parse[1],
    phoneNumber: parse[2],
  };
};
