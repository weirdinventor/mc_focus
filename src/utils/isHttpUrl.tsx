export const isHttpUrl = (value: string) => {
  const urlPattern = /https?:\/\//;
  return urlPattern.test(value);
};
