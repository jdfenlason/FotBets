const randomOdds = (min, max, decimalPlaces) => {
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces) * 1;
};
export default randomOdds;
