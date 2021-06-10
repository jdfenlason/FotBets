import React from 'react';
import axios from 'axios';
import FixturesList from './fixture-list';
import NoMatchesToday from './no-matches-today';
import SubmitWager from './submit-wager';
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
      userTokens: '',
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
    axios.request('/api/week-games/').then(response => {
      const fixtures = response.data.fixtures;
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
        <SubmitWager checkProfit={this.checkProfit}
                     script = {script}
                     handleChange = {this.handleChange}
                     setOdds = {setOdds}
                     teamLogo = {teamLogo}
                     betTeamId = {betTeamId}
                     activeId = {activeId}
                     matchesBetOn={matchesBetOn}
                     wagerAmount = {wagerAmount}

          />
      </>
        );
  }
}
