const getRandom = (max) => {
  const random = Math.floor(Math.random() * (max - 0)) + 1;
  return random;
};

export default getRandom;


