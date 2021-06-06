import React from 'react';

const WagerDetails = props => {
  const checkBet = props.matchesBetOn.includes(props.fixtures.fixture.id);
  return props.loading
    ? (
    <p className="hidden">Loading</p>
      )
    : (
    <>
      <div
        className={props.activeId === props.fixtures.fixture.id ? '' : 'hidden'}
        id={props.fixtures.fixture.id}
      >
        <div className="row column-full center fixture-card">
          <div className="outer-card column-full">
            <div className="match-card row center">
              <h2>Wager Slip</h2>
              <div className="row column-full">
                <div className="location column-half margin-bottom">
                  <h4>{props.fixtures.teams.home.name}</h4>

                  <div className={!checkBet ? 'logo-button' : ''}>
                    <img
                      className="small-logo"
                      onClick={() => props.addWagerTeam(event, props.homeOdds, props.activeId)}
                      id={props.fixtures.teams.home.id}
                      src={props.fixtures.teams.home.logo}
                      alt={props.fixtures.teams.home.name}
                    />
                  </div>
                  <h3>Past Results:</h3>
                  <span className="sub-head">{props.teamDetails[0].form}</span>
                  <h3>Odds:</h3>
                  <h4 className="sub-head">{props.homeOdds}</h4>
                </div>
                <div className="location column-half margin-bottom">
                  <h4>{props.fixtures.teams.away.name}</h4>
                  <div className={!checkBet ? 'logo-button' : ''}>
                    <img
                      onClick={() => props.addWagerTeam(event, props.awayOdds, props.activeId)}
                      id={props.fixtures.teams.away.id}
                      className="small-logo"
                      src={props.fixtures.teams.away.logo}
                      alt={props.fixtures.teams.away.name}
                    />
                  </div>
                  <h3>Past Results:</h3>
                  <span className="sub-head">{props.teamDetails[1].form}</span>
                  <h3>Odds:</h3>
                  <h4 className="sub-head">{props.awayOdds}</h4>
                </div>
              </div>
                <h2 className={!checkBet ? 'hidden' : 'text-center'}>You have an active wager for this fixture</h2>
            </div>
          </div>
        </div>
      </div>
    </>
      );
};
export default WagerDetails;
