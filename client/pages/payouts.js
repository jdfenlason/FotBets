const makeBets = (stake, odds) => {
  const profit = Math.floor(stake * odds - 1).toFixed(0);
  return profit;
};

const makeBetsScript = (stake, odds) => {
  const totalPayout = Math.floor(stake * odds);
  const profit = Math.floor(stake * (odds - 1));
  return `Your profit will be ${profit} tokens, and your total payout will be ${totalPayout} tokens`;
};

export { makeBets, makeBetsScript };
