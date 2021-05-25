import React from 'react';
import { fromUnixTime, format } from 'date-fns';
import axios from 'axios';
export default class FixtureList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixturesList: []
    };
  }

  componentDidMount() {
    axios
      .get('https://api-football-v1.p.rapidapi.com/v3/fixtures?id=695220', {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            '7b4364dcafmsh1c0748d91f17a0fp1158c3jsn481601d49ec0',
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
      })
      .then(game => {
        this.setState({ fixturesList: game.data.response });
      })
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
