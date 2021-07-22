import React from 'react';
import { formatTime } from '../lib';
import { useMediaQuery } from 'react-responsive';
const Fixture = props => {
  const isNotMobile = useMediaQuery({ minWidth: 900 });
  // const adjustTitle = useMediaQuery({ maxWidth: 510 });
  const { fixture, score } = props.fixtures;
  const { home, away } = props.fixtures.teams;
  let homeWinner;
  let awayWinner;
  if (home.winner && !away.winner) {
    homeWinner = 'sub-head Won';
    awayWinner = 'sub-head ';
  } if (away.winner && !home.winner) {
    awayWinner = 'sub-head Won';
    homeWinner = 'sub-head ';
  } else if (!away.winner && !home.winner) {
    awayWinner = 'sub-head Pending';
    homeWinner = 'sub-head Pending';
  }
  return (
    <div className="row center fixture-card" >
      <div className= {!isNotMobile ? 'outer-card shadow column-full' : 'outer-card shadow column-75' }id={fixture.id}>
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
            <h4 className="head lg">{home.name}</h4>
            {
              score.fulltime.home !== null
}
            <h2 className = {homeWinner}>{score.fulltime.home}</h2>
          </div>
          <div className="kick-off-container" id={fixture.id}>
            <h3>Kick-Off</h3>
            <h4 className="kick-off-time head">
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
            <h4 className = "head lg">{away.name}</h4>
             {
              score.fulltime.away !== null

}
            <h2 className = {awayWinner}>{score.fulltime.away}</h2>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Fixture;
