import React from 'react';
import formatTime from './format-time';

const Fixtures = props => {
  return (
    <>
    {props.fixtures.map(fixture => (
        <div key={fixture.fixture.id} fixtureid = {fixture.fixture.id} className="row column-full center fixture-card">
            <div className="outer-card column-full">
              <div className="inner-card column-full">
                <div className="team-container">
                  <div className="image-container">
                    <img
                      className="team-logo"
                      src={fixture.teams.home.logo}
                      alt="home-team-logo"
                      />
                  </div>
                  <h4>{fixture.teams.home.name}</h4>
                </div>
                <div className="kick-off-container">
                  <h3>Kick-Off</h3>
                  <h4 className= "kick-off-time">{formatTime(fixture.fixture.timestamp)}</h4>
                </div>
                <div className="team-container">
                  <div className="image-container"></div>
                  <img
                    className="team-logo"
                    src={fixture.teams.away.logo}
                    alt="away-team-logo"
                    />
                  <h4>{fixture.teams.away.name}</h4>
                </div>
              </div>
            </div>
            </div>
    ))}
</>
  );
};

export default Fixtures;
