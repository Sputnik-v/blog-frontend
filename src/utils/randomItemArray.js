export const randomItemArray = (array) => {
  const randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber];
};
