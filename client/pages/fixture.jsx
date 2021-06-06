import React from 'react';

import formatTime from './format-time';
const Fixture = props => {
  return (

    <div className="row column-full center fixture-card" id={props.id}>
      <div className="outer-card column-full">
        <div className="inner-card column-full">
          <div className="team-container">
            <div className="image-container">
              <img
                id={props.fixtures.teams.home.id}
                className="team-logo"
                src={props.fixtures.teams.home.logo}
                alt="home-team-logo"
              />
            </div>
            <h4>{props.fixtures.teams.home.name}</h4>
          </div>
          <div className="kick-off-container">
            <h3>Kick-Off</h3>
            <h4 className="kick-off-time">
              {formatTime(props.fixtures.fixture.timestamp)}
            </h4>
          </div>
          <div className="team-container">
            <div className="image-container"></div>
            <img
              id={props.fixtures.teams.away.id}
              className="team-logo"
              src={props.fixtures.teams.away.logo}
              alt="away-team-logo"
            />
            <h4>{props.fixtures.teams.away.name}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Fixture;
