export const getStorage = () => {
  return JSON.parse(localStorage.getItem('rtrh') || '{}');
};

export const getRhStorage = (key: string) => {
  const rtGroup = getStorage();
  return rtGroup[key] || '';
};

export const setRhStorage = (key: string, value: any) => {
  const rtGroup = getStorage();
  rtGroup[key] = value;
  localStorage.setItem('rtrh', JSON.stringify(rtGroup));
  return;
};

export const removeRhStorage = (key: string) => {
  const rtGroup = getStorage();
  rtGroup[key] = undefined;
  localStorage.setItem('rtrh', JSON.stringify(rtGroup));
  return;
};

export const getCookie = (cookieName: string): string | null => {
  const cookies = document.cookie.split('; ');

  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');

    const trimmedName = name.trim();

    if (trimmedName === cookieName) {
      return decodeURIComponent(value);
    }
  }

  return null;
};

export const removeCookie = (cookieName: string) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
};
