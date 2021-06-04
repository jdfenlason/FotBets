const makeBets = (stake, odds) => {
  const profit = Math.floor(stake * odds - 1).toFixed(0);
  return profit;
};

const makeBetsScript = (stake, odds) => {
  const totalPayout = Math.floor(stake * odds);
  const profit = Math.floor(stake * (odds - 1));
  return `Your total payout will be ${totalPayout} tokens, and your profit will be ${profit} tokens`;
};

export { makeBets, makeBetsScript };
