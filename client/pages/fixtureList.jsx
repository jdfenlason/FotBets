import React from 'react';
import { fromUnixTime, format, parseISO } from 'date-fns';
import axios from 'axios';
export default class FixtureList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixturesList: [],
      toggleMatchDetails: null,
      isLoading: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const clickedFixture = event.target.getAttribute('fixtureid');

    if (clickedFixture === this.state.toggleMatchDetails) {
      this.setState({ toggleMatchDetails: '' });
    } else {
      this.setState({ toggleMatchDetails: clickedFixture });
    }

  }

  footer() {
    return (
<>
      <div className="row">
        <div className="column-full">
          <div className="header-container center">
          <i className="fas fa-home"></i>
          </div>
        </div>
      </div>
</>
    );
  }

  matchDetails() {

    return (
     <>

            {this.state.fixturesList.map(matchDetails =>
      <div className ="row center" key= {matchDetails.fixture.id}>
          <div className = "outer-card column-full">
              <div className="match-details column-full center">

               <h2>Match Details</h2>
            <h5 className="sub-head">{matchDetails.league.name}</h5>
          <h6 className="sub-head">{matchDetails.league.round}</h6>
          <img className="league-logo" src={matchDetails.league.logo} alt="" />
            <div className ="sub-details column-thirds">

          <div className = "location">
          <h6>{matchDetails.fixture.venue.city}</h6>
          <h6>{matchDetails.fixture.venue.name}</h6>

          </div>
<div className="location">
  <h6>
    {this.formatTime(matchDetails.fixture.timestamp)}
    </h6>
   <h6>
     {this.formatDate(matchDetails.fixture.date)}
     </h6>
          </div>

          <div className= "location">
         <span>
           <h6>Referee:</h6>
          <h6>{matchDetails.fixture.referee}</h6>
           </span>
</div>
        </div>

            </div>

          </div>
        </div>

            )}
        </>
    );

  }

  componentDidMount() {
    axios.request('/api/week-games/:date').then(response => {
      const fixtures = response.data;
      this.setState({
        fixturesList: fixtures,
        isLoading: false
      });
    }).catch(err => {
      console.error(err);
    });
  }

  formatDate(props) {
    const gameDate = format(parseISO(props), 'MM-dd');
    return gameDate;
  }

  formatTime(props) {
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

  todaysFixture() {
    return (
  <div className = "fixture-date-heading">
       <h1>Today&apos;s Fixtures</h1>
        </div>
    );
  }

  fixtures() {

    return (
    <>
    {this.todaysFixture()}
      {this.state.fixturesList.map(fixture => (
        <div key={fixture.fixture.id} onClick={(this.handleClick)} fixtureid = {fixture.fixture.id} className="row column-full center fixture-card">
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
                  <h4 className= "kick-off-time">{this.formatTime(fixture.fixture.timestamp)}</h4>
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
  }

  render() {
    if (!this.state.fixturesList.length) {
      return this.noGamesToday();
    }
    return (
      this.state.isLoading
        ? <p>...Loading</p>
        : <>
        {this.fixtures()}
        </>
    );
  }
}
