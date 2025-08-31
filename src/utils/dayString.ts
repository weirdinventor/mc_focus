import { format, fromUnixTime, isToday, isYesterday } from 'date-fns';

export const dayString = (timestamp: number): string => {
  const date = fromUnixTime(timestamp / 1000);

  const isDateToday = isToday(date);
  const isDateYesterday = isYesterday(date);

  if (isDateToday) {
    return 'Aujourd’hui';
  } else if (isDateYesterday) {
    return 'Hier';
  }

  return format(date, 'dd/MM/yyyy');
};
