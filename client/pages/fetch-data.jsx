import React from 'react';
import axios from 'axios';
import FixturesList from './fixture-list';
import NoGamesToday from './no-games-today';
export default class FetchData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixturesList: [],
      isLoading: true,
      toggleMatchDetails: false,
      activeId: '',
      teamDetails: []

    };
    this.handleClick = this.handleClick.bind(this);
    this.handleTeamDetails = this.handleTeamDetails.bind(this);
  }

  handleClick(id) {
    this.setState(prevState => ({
      toggleMatchDetails: !prevState.toggleMatchDetails,
      activeId: id
    }));
    this.willFetch(id);
  }

  handleTeamDetails(id) {

  }

  componentDidMount() {

    axios.request('/api/week-games/:date').then(response => {
      const fixtures = response.data;
      this.setState({
        fixturesList: fixtures,
        isLoading: false
      }
      );
    });

  }

  willFetch(id) {
    const newArray = this.state.fixturesList.filter(fixtures => {
      return fixtures.fixture.id === id;
    });
    const teamId = {
      fixtureId: newArray[0].fixture.id,
      leagueId: newArray[0].league.id,
      currentSeason: newArray[0].league.season,
      awayId: newArray[0].teams.away.id,
      homeId: newArray[0].teams.home.id,
      date: newArray[0].fixture.date.slice(0, 10),
      utcDate: newArray[0].fixture.date
    };

    return axios.get('/api/team-form/', {

      params: teamId
    }
    ).then(response => {
      this.setState({
        isLoading: false,
        teamDetails: response.data[0].teamDetails
      });
    }).catch(err => {
      console.error(err);
    });
  }

  render() {
    if (!this.state.fixturesList.length) {
      <NoGamesToday/>;
    }
    return (
      this.state.isLoading
        ? <p>isLoading...</p>
        : <>
        <FixturesList toggleMatchDetails= {this.state.toggleMatchDetails} activeId = {this.state.activeId} fixtures ={this.state.fixturesList} click={id => this.handleClick(id)} teamDetails = {this.state.teamDetails}loading={this.state.isLoading} clickTeamDetails={() => this.handleTeamDetails()}/>
</>
    );
  }
}
