import React from 'react';
import formatDate from './format-date';

const FixtureDetails = props => {
  return (
    <div
      className={props.activeId === props.fixtures.fixture.id ? '' : 'hidden'}
      id={props.fixtures.fixture.id}
    >
      <div className="row column-full center fixture-card">
        <div className="outer-card column-full">
          <div className="match-card row center">
            <h2>Fixture Details</h2>
            <h5 className="sub-head">{props.fixtures.league.name}</h5>
            <h5 className="sub-head">{props.fixtures.league.round}</h5>
            <img
              className="small-logo"
              src={props.fixtures.league.logo}
              alt=""
            />
            <h4>{formatDate(props.fixtures.fixture.date)}</h4>
            <div className="sub-details column-full">
              <div className="location column-half">
                <h3>Stadium:</h3>
                <h5 className="sub-head">
                  {props.fixtures.fixture.venue.name}
                </h5>
                <h5 className="sub-head">
                  {props.fixtures.fixture.venue.city}
                </h5>
              </div>
              <div className="location column-half ref">
                <h3>Referee:</h3>
                <h5 className="sub-head">{props.fixtures.fixture.referee}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FixtureDetails;
