const makeBets = props => {
  const totalPayout = props.stake * props.odds;
  const profit = Math.floor(props.stake * (props.odds - 1));
  const localProfit = profit.toLocaleString('en');
  return [totalPayout, localProfit];
};
export default makeBets;
