function makeBets(stake, odds) {
  const totalPayout = stake * odds;
  const profit = Math.floor(stake * (odds - 1));
  return [`Your total payout will be ${totalPayout}, and your profit will be ${profit}`];
}
export default makeBets;
