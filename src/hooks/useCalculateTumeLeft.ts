import i18n from 'i18next';

export const calculateTimeLeft = (futureDate: string): string => {
  const now = new Date();
  const future = new Date(futureDate);
  const diffInMilliseconds = future.getTime() - now.getTime();

  if (diffInMilliseconds <= 0) return i18n.t('timeLeft.now');

  const minutes = Math.floor((diffInMilliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((diffInMilliseconds / (1000 * 60 * 60)) % 24);
  const days = Math.floor((diffInMilliseconds / (1000 * 60 * 60 * 24)) % 30);
  const months = Math.floor(
    (diffInMilliseconds / (1000 * 60 * 60 * 24 * 30)) % 12,
  );
  const years = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365));

  const parts: string[] = [];

  if (years > 0) {
    parts.push(
      i18n.t(`timeLeft.${years > 1 ? 'years_plural' : 'years'}`, {
        count: years,
      }),
    );
  }
  if (months > 0) {
    parts.push(i18n.t('timeLeft.months', { count: months }));
  }
  if (days > 0) {
    parts.push(
      i18n.t(`timeLeft.${days > 1 ? 'days_plural' : 'days'}`, { count: days }),
    );
  }
  if (hours > 0) {
    parts.push(
      i18n.t(`timeLeft.${hours > 1 ? 'hours_plural' : 'hours'}`, {
        count: hours,
      }),
    );
  }
  if (minutes > 0) {
    parts.push(
      i18n.t(`timeLeft.${minutes > 1 ? 'minutes_plural' : 'minutes'}`, {
        count: minutes,
      }),
    );
  }

  return parts.join(', ');
};
