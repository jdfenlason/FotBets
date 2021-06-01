
import React from 'react';
import formatDate from './format-date';

const MatchDetails = props => {
  return (
    <div className={props.className} id={props.id}>
      <div className="row column-full center fixture-card">
        <div className="outer-card column-full">
          <div className="match-card row center">
            <h2>Match Details</h2>
            <h5 className="sub-head">{props.fixtures.league.name}</h5>
            <h6 className="sub-head">{props.fixtures.league.round}</h6>
            <img
              className="league-logo"
              src={props.fixtures.league.logo}
              alt=""
              />
              <h4>{formatDate(props.fixtures.fixture.date)}</h4>
            <div className="sub-details column-full">
              <div className="location column-half">
                <h4>Stadium:</h4>
                <h5>{props.fixtures.fixture.venue.name}</h5>
                <h5>{props.fixtures.fixture.venue.city}</h5>
              </div>
              <div className="location column-half ref">
                <h4>Referee:</h4>
                <h5>{props.fixtures.fixture.referee}</h5>
                <h5></h5>
              </div>
            </div>
      </div>
    </div>
</div>
</div>
  );

};
export default MatchDetails;
