import React from 'react';

const TeamDetails = props => {
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
              <h3>Team Facts</h3>
              <div className="row column-full">
                <div className="location column-half margin-bottom">
                  <h4>{props.teamDetails[0].team.name}</h4>

                    <img
                      id={props.fixtures.teams.home.id}
                      className="small-logo"
                      src={props.fixtures.teams.home.logo}
                      alt={props.fixtures.teams.home.name}
                    />
                  <h3>Past Results:</h3>
                  <span>{props.teamDetails[0].form}</span>
                </div>
                <div className="location column-half margin-bottom">
                  <h4>{props.teamDetails[1].team.name}</h4>

                    <img
                      id={props.fixtures.teams.away.id}
                      className="small-logo"
                      src={props.fixtures.teams.away.logo}
                      alt={props.fixtures.teams.away.name}
                    />

                  <h3 >Past Results:</h3>
                  <span className="sub-head">{props.teamDetails[1].form}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
      );
};
export default TeamDetails;
