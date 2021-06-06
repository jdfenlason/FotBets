import React from 'react';

const WagerInput = props => {
  const value = props.wagerAmount;
  const checkBet = props.matchesBetOn.includes(props.activeId);
  return (
    <div className={checkBet ? 'hidden' : ''}>
      <div className={!props.betTeamId ? 'none' : ''}>
        <div className="row column-full center">
          <div className="outer-card column-full">
            <div className="match-card row center">
              <img className={'team-logo'} src={props.teamLogo} alt="" />
              <div className="input-container column-full">
                <form
                  onSubmit={() => props.handleSubmit(event)}
                  className="column-full"
                >
                  <input
                    className="wager-input"
                    type="number"
                    max={props.userTokens}
                    required
                    autoFocus
                    value={value}
                    placeholder="WAGER HERE"
                    onChange={() => props.handleChange(event)}
                  />
                  <div>
                    <h4
                      className={
                        props.script === '' ? 'hidden' : 'row payout center'
                      }
                    >
                      {props.script}
                    </h4>
                  </div>
                  <div className="button-container row">
                    <button className="enter-button " type="submit">
                      Enter
                    </button>
                    <button
                      onClick={() => props.checkProfit(event)}
                      className="enter-button"
                      type="button"
                    >
                      Check Profit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WagerInput;
