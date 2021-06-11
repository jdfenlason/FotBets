import React from 'react';
import { format, parseISO } from 'date-fns';
const PastBets = props => {
  const { pastBets } = props;
  return pastBets.map(bets => {
    const { teamLogo, wagerAmount, createdAt, profitAmount } = bets;
    // betResult
    return (
      <div
        className="row column-full center fixture-card"
        key={bets.betId}
        id={props.id}
      >
        <div className="outer-card column-full">
          <div className="bets-inner-card column-full">
            <div className="past-bets-container column-full">
              <div className = "bet-item">
                <h2>Date</h2>
                <h3>{format(parseISO(createdAt), 'M/dd')}</h3>
              </div>
              <div className = "bet-item">
                <h2 className = "reset">Team</h2>
                <img
                  className="team-logo"
                  src={teamLogo}
                  alt="home-team-logo"
                  />
                  </div>
              <div className = "bet-item">
                <h2>Wager</h2>
                <h3>{wagerAmount}</h3>
              </div>
              <div className = "bet-item">
                <h2>Result</h2>
                <h3>{/* {betResult} */}</h3>
              </div>
              <div className = "bet-item">
                <h2>+/-</h2>
                <h3>{profitAmount}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
};
export default PastBets;
