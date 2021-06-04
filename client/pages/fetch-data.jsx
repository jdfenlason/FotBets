import React from 'react';
import axios from 'axios';
import FixturesList from './fixture-list';
import NoGamesToday from './no-games-today';
import randomOdds from './get-random-odds';
import { makeBets, makeBetsScript } from './payouts';
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
      profitAmount: '',
      homeOdds: '',
      awayOdds: '',
      userTokens: 300,
      gamesBetOn: [],
      betTeamId: '',
      userId: 1,
      setOdds: '',
      betTeamLogo: '',
      checkProfit: false,
      script: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addWagerTeam = this.addWagerTeam.bind(this);
    this.checkProfit = this.checkProfit.bind(this);
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
        isLoading: false,
        awayOdds: randomOdds(1, 5, 2),
        homeOdds: randomOdds(1, 4, 2)
      }
      );
    });
    axios.get('/api/wager-input').then(response => {
      const pastBets = response.data;
      this.setState({
        gamesBetOn: pastBets
      });
    });
  }

  addWagerInput(newWager) {
    const { fixtureId } = newWager.fixtureId;
    const newArray = this.state.gamesBetOn.slice();
    newArray.push(fixtureId);
    axios.post('/api/wager-input', { newWager });
  }

  addWagerTeam(event, odds) {
    this.setState({
      betTeamId: event.target.id,
      teamLogo: event.target.src,
      setOdds: odds
    });
  }

  checkProfit(props) {
    const odds = this.state.setOdds;
    const stake = this.state.wagerAmount;
    this.setState({
      checkProfit: true,
      script: makeBetsScript(odds, stake)
    });

  }

  handleSubmit(event) {
    event.preventDefault();
    event.target.reset();
    const stake = this.state.wagerAmount;
    const odds = this.state.setOdds;
    const newWager = {
      userId: this.state.userId,
      fixtureId: this.state.activeId,
      wagerAmount: this.state.wagerAmount,
      betOn: true,
      teamLogo: this.state.teamLogo,
      profitAmount: makeBets(stake, odds),
      betTeamId: this.state.betTeamId
    };
    this.addWagerInput(newWager);
    this.setState = ({
      wagerAmount: '',
      checkProfit: false,
      script: ''
    });

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

    axios.get('/api/team-form/', {
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
    const value = this.state.wagerAmount;
    if (!this.state.fixturesList.length) {
      <NoGamesToday/>;
    }
    return (
      this.state.isLoading
        ? <p>isLoading...</p>
        : <>
        <FixturesList wagerAmount={this.state.wagerAmount} homeOdds={this.state.homeOdds} awayOdds = {this.state.awayOdds} betOn = {this.state.betOn} toggleMatchDetails= {this.state.toggleMatchDetails} activeId = {this.state.activeId} fixtures ={this.state.fixturesList} click={id => this.handleClick(id)} teamDetails = {this.state.teamDetails}loading={this.state.isLoading} betTeamId ={this.betTeamId}
        addWagerTeam = {this.addWagerTeam}
        />
  <>
  <div className = {!this.state.betTeamId ? 'hidden' : ''}>

  <div className="row column-full center" >
         <div className="outer-card column-full">
           <div className="match-card row center">

         <img className={'team-logo'} src={this.state.teamLogo} alt=''/>
      <div className = "input-container column-full">
        <form onSubmit={this.handleSubmit} className="column-full" >
          <input
        className = "wager-input"
        type="number"
        max = {this.state.userTokens}
        required
        autoFocus
        value = {value}
        placeholder= "WAGER HERE"
        onChange={this.handleChange}/>
        <div>
          <h4 className={'row payout center'}>{this.state.script}</h4>
          </div>
        <div className = "button-container row">
      <button className = "enter-button " type="submit" >Enter</button>
      <button onClick = {this.checkProfit} className = "enter-button" type="button" >Check Profit</button>
        </div>
        </form>
      </div>
        </div>
    </div>
        </div>
</div>
      </>
</>
    );
  }
}
