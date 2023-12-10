import { getRhStorage } from '../helper';

export const keyStorage = {
  rememberChooseKajian: 'rememberChooseKajian',
};

export const isRememberChooseKajian = (): boolean => {
  return getRhStorage(keyStorage.rememberChooseKajian) || false;
};
