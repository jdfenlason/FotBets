const makeBets = (stake, odds) => {
  const profit = Math.floor(stake * odds - 1).toFixed(0);
  return profit.toLocaleString('en-US');
};

const makeBetsScript = (stake, odds) => {
  const totalPayout = Math.floor(stake * odds);
  const profit = Math.floor(stake * (odds - 1));
  return `Your profit will be ${profit.toLocaleString(
    'en-US'
  )} tokens, and your total payout will be ${totalPayout.toLocaleString(
    'en-US'
  )} tokens`;
};

export { makeBets, makeBetsScript };
