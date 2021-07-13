import React from 'react';
import { getUnixTime } from 'date-fns';
const SubmitWager = props => {
  const {
    checkProfit,
    wagerAmount,
    handleSubmit,
    script,
    handleChange,
    setOdds,
    teamLogo,
    betTeamId,
    activeId,
    matchesBetOn,
    userTokens,
    fixtures,
    // today
  } = props;

  // const todayUnix = getUnixTime(today);
  // const fixtureUnix = fixtures.fixture.timestamp;
  // const checkTime = todayUnix > fixtureUnix;
  const checkBet = matchesBetOn.includes(activeId);
  const value = wagerAmount;
  const active = activeId === fixtures.fixture.id;
  const showWagerLogo =
    betTeamId === fixtures.teams.home.id.toString() ||
    betTeamId === fixtures.teams.away.id.toString();
  // return
  // checkTime
  //   ? (
  //   <div className={active ? '' : 'none'}>
  //     <div className={checkBet ? 'none' : ''}>
  //       <div className="row column-full center">
  //         <div className="outer-card column-full">
  //           <div className="match-card row center">
  //             <h3>This fixture has already started</h3>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  //     )
    // :
  return (
    <>
      <div className={active ? '' : 'none'}>
        <div className={checkBet ? 'none' : ''}>
          <div className={!showWagerLogo ? 'none' : ''}>
            <div className="row column-full center">
              <div className="outer-card column-full">
                <div className="match-card row center">
                  <h2>Wager Slip</h2>
                  <img className={'team-logo'} src={teamLogo} alt="" />
                  <h4 className="sub-head">Odds:</h4>
                  <h4 className="sub-head">{setOdds}</h4>
                  <div className="input-container column-full">
                    <label htmlFor="">WAGER:</label>
                    <form
                      onSubmit={() => handleSubmit(event)}
                      className="column-full"
                    >
                      <input
                        className="wager-input"
                        type="number"
                        max={userTokens}
                        min= "0"
                        required
                        autoFocus
                        value={value}
                        placeholder="Wager Tokens"
                        onChange={handleChange}
                      />
                      <div>
                        <h4
                          className={
                            script === '' ? 'hidden' : 'row payout center'
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
      </div>
    </>
  );
};

export default SubmitWager;
