import React from 'react';
import { formatTime } from '../lib';
const Fixture = props => {
  const { fixture } = props.fixtures;
  const { home, away } = props.fixtures.teams;
  return (
    <div className="row column-full center fixture-card" id={props.id}>
      <div className="outer-card column-full">
        <div className="inner-card column-full">
          <div className="team-container">
            <div className="image-container">
              <img
                id={home.id}
                className="team-logo"
                src={home.logo}
                alt="home-team-logo"
              />
            </div>
            <h4>{home.name}</h4>
          </div>
          <div className="kick-off-container">
            <h3>Kick-Off</h3>
            <h4 className="kick-off-time">
              {formatTime(fixture.timestamp)}
            </h4>
          </div>
          <div className="team-container">
            <div className="image-container"></div>
            <img
              id={away.id}
              className="team-logo"
              src={away.logo}
              alt="away-team-logo"
            />
            <h4>{away.name}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Fixture;
