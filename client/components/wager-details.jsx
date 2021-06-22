import React from 'react';

const WagerDetails = props => {
  const { activeId, homeOdds, awayOdds, matchesBetOn, addWagerTeam, betTeamId } = props;
  const { id } = props.fixtures.fixture;
  const { home, away } = props.fixtures.teams;
  const checkBet = matchesBetOn.includes(id);
  return props.loading
    ? (
    <p className="hidden">Loading</p>
      )
    : (
    <>
      <div className={activeId === id ? '' : 'hidden'} >
        <div className="row column-full center fixture-card">
          <div className="outer-card column-full">
            <div className="match-card row center">
              <h2>Wager Slip</h2>
              <h3>Pick a Team:</h3>
              <div className="row column-full">
                <div className="location column-half margin-bottom">
                  <h4>{home.name}</h4>

                  <div className={!checkBet ? 'logo-button' : ''}>
                    <div className = {betTeamId === home.id.toString() ? 'active logo-button' : ''}>

                    <img
                      className="small-logo"
                      onClick={() => addWagerTeam(event, homeOdds, activeId)}
                      id={home.id}
                      src={home.logo}
                      alt={home.name}
                      />
                      </div>
                  </div>
                  <h3>Past Results:</h3>
                  <span className="sub-head">{props.teamDetails[0].form}</span>
                  <h3>Odds:</h3>
                  <h4 className="sub-head">{homeOdds}</h4>
                </div>
                <div className="location column-half margin-bottom">
                  <h4>{away.name}</h4>
                  <div className={!checkBet ? 'logo-button' : ''}>
                        <div className = {betTeamId === away.id.toString() ? 'active logo-button' : ''}>

                    <img
                      onClick={() => addWagerTeam(event, awayOdds, activeId)}
                      id={away.id}
                      className="small-logo"
                      src={away.logo}
                      alt={away.name}
                      />
                      </div>
                  </div>
                  <h3>Past Results:</h3>
                  <span className="sub-head">{props.teamDetails[1].form}</span>
                  <h3>Odds:</h3>
                  <h4 className="sub-head">{awayOdds}</h4>
                </div>
              </div>
              <h2 className={!checkBet ? 'hidden' : 'text-center'}>
                You have an active wager for this fixture
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
      );
};
export default WagerDetails;
