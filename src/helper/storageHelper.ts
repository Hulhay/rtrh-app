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
