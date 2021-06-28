import React from 'react';
import { formatPastResult } from '../lib';
const PastBets = props => {
  const { pastBets } = props;

  return (
    <>
      <div className="central-heading">
        <h2>Latest Bets</h2>
      </div>

      {pastBets.map((bets, index) => {
        const { teamLogo, wagerAmount, date, profitAmount, betResult, betEvaluated } = bets;
        let result;
        if (!betEvaluated) {
          result = 'Pending';
        } else {
          betResult ? (result = 'Won') : (result = 'Lost');
        }

        return (
          <div className="outer-card" key={index}>
            <div className="bets-inner-card column-full">
              <div className="past-bets-container">
                <div className="bet-item">
                  <h3>Date</h3>
                  <h4>{formatPastResult(date)}</h4>
                </div>
                <div className="bet-item">
                  <h3 className="reset">Team</h3>
                  <img
                    className="team-logo"
                    src={teamLogo}
                    alt="home-team-logo"
                  />
                </div>
                <div className="bet-item">
                  <h3>Wager</h3>
                  <h4 className={result}>
                    {wagerAmount.toLocaleString()}
                  </h4>
                </div>
                <div className="bet-item">
                  <h3>Result</h3>
                  <h4 className={result}>{result}</h4>
                </div>
                <div className="bet-item">
                  <h3>Profit</h3>
                  <h4 className={result}>
                    {profitAmount.toLocaleString()}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default PastBets;
