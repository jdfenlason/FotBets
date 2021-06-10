import React from 'react';

const SubmitWager = props => {
  const { checkProfit, wagerAmount, handleSubmit, script, handleChange, setOdds, teamLogo, betTeamId, activeId, matchesBetOn } = props;
  const { userTokens } = props.userTokens;
  const checkBet = matchesBetOn.includes(activeId);
  const value = wagerAmount;
  return (
 <>
          <div className={checkBet ? 'hidden' : ''}>
            <div className={!betTeamId ? 'none' : ''}>
              <div className="row column-full center">
                <div className="outer-card column-full">
                  <div className="match-card row center">
                    <img
                      className={'team-logo'}
                      src={teamLogo}
                      alt=""
                    />
                    <h4 className = 'sub-head'>Odds:</h4>
                    <h4 className = 'sub-head'>{setOdds}</h4>
                    <div className="input-container column-full">
                      <form
                        onSubmit={() => handleSubmit(event)}
                        className="column-full"
                      >
                        <input
                          className="wager-input"
                          type="number"
                          max= {userTokens}
                          required
                          autoFocus
                          value={value}
                          placeholder="WAGER HERE"
                          onChange={handleChange}
                        />
                        <div>
                          <h4
                            className={
                              script === ''
                                ? 'hidden'
                                : 'row payout center'
                            }
                          >
                            {script}
                          </h4>
                        </div>
                        <div className="button-container row">
                          <button className="enter-button " type="submit">
                            Enter
                          </button>
                          <button
                            onClick={() => checkProfit()}
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
        </>

  );
};

export default SubmitWager;
