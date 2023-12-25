import { getRhStorage } from '../helper';
import { storageKey } from './key';

export const isRememberChooseKajian = (): boolean => {
  return getRhStorage(storageKey.REMEMBER_CHOOSE_KAJIAN) || false;
};
