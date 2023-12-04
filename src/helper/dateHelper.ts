export const now = (): Date => {
  return new Date();
};

export const getTimeString = (date: Date): string => {
  let hour = date.getHours().toString();
  let minute = date.getMinutes().toString();

  if (minute.length === 1) {
    minute = `0${minute}`;
  }

  if (hour.length === 1) {
    hour = `0${hour}`;
  }

  return `${hour}:${minute}`;
};
