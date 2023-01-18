export const transformDate = (date) => {
  const newDate = date.slice(0, 10) + " " + date.slice(11, 16);
  return newDate;
};
