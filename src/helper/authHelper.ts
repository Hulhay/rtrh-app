import { redirect } from 'react-router-dom';
import { getCookie, getRhStorage, now } from '.';
import { cookieKey, storageKey } from '../config';
import { authService } from '../service';

export const isAccessExpired = (): boolean => {
  const nowTime = now();
  const expAccessToken = getCookie(cookieKey.EXP_ACCESS_TOKEN);

  if (!expAccessToken) return true;

  const expTime = new Date(expAccessToken);

  return nowTime > expTime;
};

export const loader = async () => {
  const exp = isAccessExpired();
  const refreshToken = getRhStorage(storageKey.REFRESH_TOKEN);

  if (!exp) return null;

  if (exp && !refreshToken) throw redirect('/login');

  const { error } = await authService.refreshToken(refreshToken);
  if (error) console.error('Error:', error);

  return null;
};
