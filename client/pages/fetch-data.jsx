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
      teamDetails: [],
      wagerAmount: '',
      homeOdds: '',
      awayOdds: '',
      userTokens: '',
      betOn: ''

    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(id) {
    this.setState(prevState => ({
      toggleMatchDetails: !prevState.toggleMatchDetails,
      activeId: id
    }));
    this.willFetch(id);
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

  addWagerInput(newWager) {
    axios.post('/api/wager-input', { newWager });

  }

  handleSubmit(event) {
    event.preventDefault();
    const newWager = {
      userId: this.state.userId,
      fixtureId: this.state.filterId,
      wagerAmount: this.state.wagerAmount,
      betOn: true,
      oddsPicked: this.state.oddsPicked,
      teamLogo: this.state.teamLogo
      // add teamId
    };
    // this.onSubmit(newWager);
    this.addWagerInput(newWager);
    this.setState({ wagerAmount: '' });
  }

  handleChange(event) {
    this.setState({
      wagerAmount: event.target.value
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
        <FixturesList wagerAmount={this.state.wagerAmount} homeOdds={this.state.homeOdds} awayOdds = {this.state.awayOdds} userTokens = {this.state.UserTokens} betOn = {this.state.betOn} toggleMatchDetails= {this.state.toggleMatchDetails} activeId = {this.state.activeId} fixtures ={this.state.fixturesList} click={id => this.handleClick(id)} teamDetails = {this.state.teamDetails}loading={this.state.isLoading} onSubmit ={this.handleSubmit} />
</>
    );
  }
}
