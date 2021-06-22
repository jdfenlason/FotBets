import React from 'react';
import { formatTime } from '../lib';
const Fixture = props => {
  const { fixture } = props.fixtures;
  const { home, away } = props.fixtures.teams;
  return (

    <div className="row column-full center fixture-card" >
      <div className="outer-card column-full" id={fixture.id}>
        <div className="inner-card column-full" id = {fixture.id}>
          <div className="team-container"id={fixture.id} >
            <div className="image-container" id={fixture.id} >
              <img
              id={fixture.id}
                className="team-logo"
                src={home.logo}
                alt="home-team-logo"
                />
            </div>
            <h4>{home.name}</h4>
          </div>
          <div className="kick-off-container" id={fixture.id}>
            <h3>Kick-Off</h3>
            <h4 className="kick-off-time">
              {formatTime(fixture.timestamp)}
            </h4>
          </div>
          <div className="team-container" id={fixture.id}>
            <div className="image-container" id={fixture.id}>
            <img
              className="team-logo"
              id={fixture.id}
              src={away.logo}
              alt="away-team-logo"
              />
              </div>
            <h4>{away.name}</h4>
          </div>
        </div>
      </div>
    </div>

  );
};
export default Fixture;
