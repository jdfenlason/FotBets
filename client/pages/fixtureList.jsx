import React from 'react';
import { fromUnixTime, format } from 'date-fns';

export default class FixtureList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixturesList: []
    };
  }

  componentDidMount() {
    fetch('/api/weekGames/')
      .then(game =>
        this.setState({ fixturesList: game.data.response })
      )
      .catch(err => {
        console.error(err);
      });
  }

  getDateData(props) {
    const unix = fromUnixTime(props);
    const gameTime = format(unix, 'KK:mm bb');
    return gameTime;
  }

  noGamesToday() {
    return (
      <div className="row">
        <div className="no-game">
          <h1>No Upcoming Fixtures</h1>
        </div>
      </div>
    );
  }

  render() {
    if (!this.state.fixturesList.length) {
      return this.noGamesToday();
    }
    return (
        <>
      <div className="league-logo">
        {this.state.fixturesList[0].league.name}
        </div>
        {this.state.fixturesList.map(fixture => (
          <a key={fixture.fixture.id}>
            <div className="row column-full center">
              <div className="outer-card column-full">
                <div className="inner-card">
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
                    <h4>{this.getDateData(fixture.fixture.timestamp)}</h4>
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
          </a>
        ))}

        </>
    );
  }
}
