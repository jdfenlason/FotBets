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
                  <h5>Past Results:</h5>
                  <h4>{props.teamDetails[0].form} </h4>
                </div>
                <div className="location column-half margin-bottom">
                  <h4>{props.teamDetails[1].team.name}</h4>
                  <h5>Past Results:</h5>
                  <span>{props.teamDetails[1].form}</span>
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
