import { JamaahType } from '../constants';

export const generateUniqueId = (): string => {
  return Math.random().toString(16).slice(2);
};

export const generateQRString = (jamaah: JamaahType): string => {
  const uniqueId = generateUniqueId();
  const name = jamaah.name.split(' ').join('%20');
  return `RTRH/${name}/${jamaah.phoneNumber}/${uniqueId}`;
};
