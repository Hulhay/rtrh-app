import { cookieKey, sbClient, storageKey } from '../config';
import { LoginType } from '../constants';
import { epochToDate, setRhStorage } from '../helper';

export default {
  login: async (req: LoginType) => {
    const { data: resp, error } = await sbClient.auth.signInWithPassword({
      email: req.email,
      password: req.password,
    });

    document.cookie = `${cookieKey.ACCESS_TOKEN}=${resp.session?.access_token}`;
    document.cookie = `${cookieKey.EXP_ACCESS_TOKEN}=${epochToDate(
      resp.session?.expires_at || 0,
    )}`;
    setRhStorage(storageKey.REFRESH_TOKEN, resp.session?.refresh_token);

    return { resp, error };
  },
  refreshToken: async (refreshToken: string) => {
    const { data: resp, error } = await sbClient.auth.refreshSession({
      refresh_token: refreshToken,
    });

    document.cookie = `${cookieKey.ACCESS_TOKEN}=${resp.session?.access_token}`;
    document.cookie = `${cookieKey.EXP_ACCESS_TOKEN}=${epochToDate(
      resp.session?.expires_at || 0,
    )}`;
    setRhStorage(storageKey.REFRESH_TOKEN, resp.session?.refresh_token);

    return { resp, error };
  },
};
