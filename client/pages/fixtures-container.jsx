import React from 'react';
import axios from 'axios';
import FixturesList from './fixture-list';
import NoMatchesToday from './no-matches-today';
import { makeBets, makeBetsScript } from './payouts';
export default class FixturesContainer extends React.Component {
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
      userTokens: 1000,
      matchesBetOn: [],
      betTeamId: '',
      userId: 2,
      setOdds: '',
      checkProfit: false,
      script: '',
      homeOdds: '',
      awayOdds: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addWagerTeam = this.addWagerTeam.bind(this);
    this.checkProfit = this.checkProfit.bind(this);
  }

  handleClick(id) {
    this.willFetch(id);
    this.setState(prevState => ({
      toggleMatchDetails: !prevState.toggleMatchDetails,
      activeId: id
    }));
  }

  componentDidMount() {
    axios.request('/api/week-games/:date').then(response => {
      const fixtures = response.data;
      this.setState({
        fixturesList: fixtures,
        isLoading: false
      });
    });
    axios.get('/api/wager-input').then(response => {
      const pastBets = response.data;
      this.setState({
        matchesBetOn: pastBets
      });
    });
  }

  addWagerTeam(event, odds, id) {
    const checkBet = this.state.matchesBetOn.includes(id);
    if (!checkBet) {
      this.setState({
        betTeamId: event.target.id,
        teamLogo: event.target.src,
        setOdds: odds
      });
    }
  }

  checkProfit(props) {
    const odds = this.state.setOdds;
    const stake = this.state.wagerAmount;
    const script = makeBetsScript(stake, odds);
    this.setState({
      checkProfit: true,
      script: script
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const stake = this.state.wagerAmount;
    const odds = this.state.setOdds;
    const profitAmount = makeBets(stake, odds);
    const newWager = {
      userId: this.state.userId,
      fixtureId: this.state.activeId,
      wagerAmount: this.state.wagerAmount,
      teamLogo: this.state.teamLogo,
      profitAmount: profitAmount,
      betTeamId: this.state.betTeamId
    };
    const newArray = this.state.matchesBetOn.slice();
    newArray.push(this.state.activeId);
    axios.post('/api/wager-input', { newWager });
    this.setState({
      wagerAmount: '',
      checkProfit: false,
      script: '',
      betTeamId: '',
      activeId: '',
      matchesBetOn: newArray
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

    axios
      .get('/api/team-form', {
        params: teamId
      })
      .then(response => {
        this.setState({
          isLoading: false,
          teamDetails: response.data[0].teamDetails,
          awayOdds: response.data[0].homeOdds,
          homeOdds: response.data[0].awayOdds
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const value = this.state.wagerAmount;
    const checkBet = this.state.matchesBetOn.includes(this.state.activeId);
    if (!this.state.fixturesList.length) {
      <NoMatchesToday />;
    }
    return this.state.isLoading
      ? (
      <p>isLoading...</p>
        )
      : (
      <>
        <FixturesList
          wagerAmount={this.state.wagerAmount}
          homeOdds={this.state.homeOdds}
          awayOdds={this.state.awayOdds}
          betOn={this.state.betOn}
          toggleMatchDetails={this.state.toggleMatchDetails}
          activeId={this.state.activeId}
          fixtures={this.state.fixturesList}
          click={id => this.handleClick(id)}
          teamDetails={this.state.teamDetails}
          loading={this.state.isLoading}
          betTeamId={this.betTeamId}
          addWagerTeam={this.addWagerTeam}
          matchesBetOn = {this.state.matchesBetOn}
        />
        <>
          <div className={checkBet ? 'hidden' : ''}>
            <div className={!this.state.betTeamId ? 'none' : ''}>
              <div className="row column-full center">
                <div className="outer-card column-full">
                  <div className="match-card row center">
                    <img
                      className={'team-logo'}
                      src={this.state.teamLogo}
                      alt=""
                    />
                    <h4 className = 'sub-head'>Odds:</h4>
                    <h4 className = 'sub-head'>{ this.state.setOdds}</h4>
                    <div className="input-container column-full">
                      <form
                        onSubmit={this.handleSubmit}
                        className="column-full"
                      >
                        <input
                          className="wager-input"
                          type="number"
                          max={this.state.userTokens}
                          required
                          autoFocus
                          value={value}
                          placeholder="WAGER HERE"
                          onChange={this.handleChange}
                        />
                        <div>
                          <h4
                            className={
                              this.state.script === ''
                                ? 'hidden'
                                : 'row payout center'
                            }
                          >
                            {this.state.script}
                          </h4>
                        </div>
                        <div className="button-container row">
                          <button className="enter-button " type="submit">
                            Enter
                          </button>
                          <button
                            onClick={this.checkProfit}
                            className="enter-button"
                            type="button"
                          >
                            Check Profit
                          </button>
                        </div>
                      </form>
                    </div>
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
