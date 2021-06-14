import React from 'react';
const PastBets = props => {
  const { pastBets } = props;
  return (
<>
    <div className = "central-heading">
        <h2>Latest Bets</h2>
    </div>

{pastBets.map((bets, index) => {
  const { teamLogo, wagerAmount, date, profitAmount, betResult } = bets;
  return (
        <div className="outer-card" key={index}>
          <div className="bets-inner-card column-full">
            <div className="past-bets-container">
              <div className = "bet-item">
                <h2>Date</h2>
                <h3>{date}</h3>
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
                <h3>{betResult}</h3>
              </div>
              <div className = "bet-item">
                <h2>+/-</h2>
                <h3>{profitAmount}</h3>
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
