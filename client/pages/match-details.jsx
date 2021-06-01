import axios from 'axios';
import React from 'react';
import formatDate from './format-date';

const MatchDetails = props => {
  const teamId = {
    leagueId: props.fixtures.league.id,
    currentSeason: props.fixtures.league.season,
    awayId: props.fixtures.teams.away.id,
    homeId: props.fixtures.teams.home.id,
    date: props.fixtures.fixture.date.slice(0, 10),
    utcDate: props.fixtures.fixture.date
  };
  axios.post('/api/team-form/:teamId', { teamId }).then(response => {
    // console.log(response);
  }).catch(err => {
    console.error(err);
  });
  return (
    <div className={props.toggleMatchDetails && props.activeId === props.fixtures.fixture.id ? '' : 'hidden'} id={props.fixtures.fixture.id} >
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
