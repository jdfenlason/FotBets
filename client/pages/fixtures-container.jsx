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

  addWagerTeam(event, odds) {
    const { id, src } = event.target;
    const checkBet = this.state.matchesBetOn.includes(id);
    if (!checkBet) {
      this.setState({
        betTeamId: id,
        teamLogo: src,
        setOdds: odds
      });
    }
  }

  checkProfit(props) {
    const { setOdds, wagerAmount } = this.state;
    const odds = setOdds;
    const stake = wagerAmount;
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
    const { userId, activeId, wagerAmount, teamLogo, betTeamId } = this.state;
    const newWager = {
      userId: userId,
      fixtureId: activeId,
      wagerAmount: wagerAmount,
      teamLogo: teamLogo,
      profitAmount: profitAmount,
      betTeamId: betTeamId
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
    const { fixture, league, teams } = newArray[0];
    const teamId = {
      fixtureId: fixture.id,
      leagueId: league.id,
      currentSeason: league.season,
      awayId: teams.away.id,
      homeId: teams.home.id,
      date: fixture.date.slice(0, 10),
      utcDate: fixture.date
    };

    axios
      .get('/api/team-form', {
        params: teamId
      })
      .then(response => {
        const { teamDetails, homeOdds, awayOdds } = response.data[0];
        this.setState({
          isLoading: false,
          teamDetails: teamDetails,
          awayOdds: homeOdds,
          homeOdds: awayOdds
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { toggleMatchDetails, activeId, fixturesList, matchesBetOn, teamDetails, isLoading, wagerAmount, betOn, homeOdds, awayOdds, betTeamId, teamLogo, setOdds, script } = this.state;
    const value = this.state.wagerAmount;
    const checkBet = matchesBetOn.includes(activeId);
    if (!fixturesList.length) {
      <NoMatchesToday />;
    }
    return isLoading
      ? (
      <p>isLoading...</p>
        )
      : (
      <>
        <FixturesList
          wagerAmount={wagerAmount}
          homeOdds={homeOdds}
          awayOdds={awayOdds}
          betOn={betOn}
          toggleMatchDetails={toggleMatchDetails}
          activeId={activeId}
          fixtures={fixturesList}
          click={id => this.handleClick(id)}
          teamDetails={teamDetails}
          loading={isLoading}
          betTeamId={betTeamId}
          addWagerTeam={this.addWagerTeam}
          matchesBetOn = {matchesBetOn}
        />
        <>
          <div className={checkBet ? 'hidden' : ''}>
            <div className={!betTeamId ? 'none' : ''}>
              <div className="row column-full center">
                <div className="outer-card column-full">
                  <div className="match-card row center">
                    <img
                      className={'team-logo'}
                      src={teamLogo}
                      alt=""
                    />
                    <h4 className = 'sub-head'>Odds:</h4>
                    <h4 className = 'sub-head'>{setOdds}</h4>
                    <div className="input-container column-full">
                      <form
                        onSubmit={this.handleSubmit}
                        className="column-full"
                      >
                        <input
                          className="wager-input"
                          type="number"
                          max= '300'
                          required
                          autoFocus
                          value={value}
                          placeholder="WAGER HERE"
                          onChange={this.handleChange}
                        />
                        <div>
                          <h4
                            className={
                              script === ''
                                ? 'hidden'
                                : 'row payout center'
                            }
                          >
                            {script}
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
