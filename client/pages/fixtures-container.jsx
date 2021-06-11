import React from 'react';
import axios from 'axios';
import FixturesList from './fixture-list';
import NoMatchesToday from './no-matches-today';
import SubmitWager from './submit-wager';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { makeBets, makeBetsScript } from '../lib/payouts';
import DateStrip from './date-strip';
export default class FixturesContainer extends React.Component {
  constructor(props) {
    super(props);
    const formatDay = format(new Date(), 'yyyy-MM-dd');
    this.state = {
      today: new Date(),
      selectedDay: formatDay,
      formatDay: formatDay,
      fixtures: [],
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
      awayOdds: '',
      dayOfFixtures: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addWagerTeam = this.addWagerTeam.bind(this);
    this.checkProfit = this.checkProfit.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  handleClick(id) {
    this.willFetch(id);
    this.setState(prevState => ({
      toggleMatchDetails: !prevState.toggleMatchDetails,
      activeId: id
    }));
  }

  componentDidMount() {
    axios.get('/api/wager-input').then(response => {
      const pastBets = response.data;
      this.setState({
        matchesBetOn: pastBets
      });
    });
    axios.get('/api/week-games/').then(response => {
      const fixtures = response.data.fixtures;
      this.setState({
        fixtures: fixtures,
        isLoading: false
      });
    });
  }

  changeDate(dateObj) {
    const { selectedDay } = dateObj;
    const { fixtures } = this.state;
    const selectedDaytoUTC = zonedTimeToUtc(selectedDay);
    const formatSelected = format(selectedDaytoUTC, 'yyyy-MM-dd');
    const dayOfFixtures = fixtures.filter(fixtures => {
      const zonedDate = utcToZonedTime(
        fixtures.fixture.date,
        'America/Los_Angeles'
      );
      const formatUTCDate = format(zonedDate, 'yyyy-MM-dd');
      return formatUTCDate === formatSelected;
    });
    this.setState({
      dayOfFixtures: dayOfFixtures,
      isLoading: false,
      selectedDay: selectedDay
    });
  }

  handleDateClick(event) {
    const id = event.target.closest('div').id;
    this.setState({
      selectedDay: id
    });
    const dateObj = {
      selectedDay: id
    };
    this.changeDate(dateObj);
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

  handleSubmit(props) {
    event.preventDefault();
    const stake = this.state.wagerAmount;
    const odds = this.state.setOdds;
    this.props.handleTokenChange(stake);
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
    const newArray = this.state.fixtures.filter(fixtures => {
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
    const {
      toggleMatchDetails,
      activeId,
      dayOfFixtures,
      matchesBetOn,
      teamDetails,
      isLoading,
      wagerAmount,
      betOn,
      homeOdds,
      awayOdds,
      betTeamId,
      teamLogo,
      setOdds,
      script,
      today,
      selectedDay,

      formatDay
    } = this.state;
    const { handleDateClick, addWagerTeam, handleClick, checkProfit, handleChange, handleSubmit } = this;
    const { userTokens } = this.props;
    if (dayOfFixtures.length === 0) {
      return (
        <>
          <DateStrip
            handleDateClick={this.handleDateClick}
            today={today}
            selectedDay={selectedDay}
            formatDay={formatDay}
          />
          <NoMatchesToday />
        </>
      );
    }
    return isLoading
      ? (
      <p>isLoading...</p>
        )
      : (
      <>
        <DateStrip
          handleDateClick={handleDateClick}
          today={today}
          selectedDay={selectedDay}
          formatDay={formatDay}
        />
        <FixturesList
          wagerAmount={wagerAmount}
          homeOdds={homeOdds}
          awayOdds={awayOdds}
          betOn={betOn}
          toggleMatchDetails={toggleMatchDetails}
          activeId={activeId}
          fixtures={dayOfFixtures}
          click={id => handleClick(id)}
          teamDetails={teamDetails}
          loading={isLoading}
          betTeamId={betTeamId}
          addWagerTeam={addWagerTeam}
          matchesBetOn={matchesBetOn}
        />
        <SubmitWager
          checkProfit={checkProfit}
          script={script}
          handleChange={handleChange}
          setOdds={setOdds}
          teamLogo={teamLogo}
          betTeamId={betTeamId}
          activeId={activeId}
          matchesBetOn={matchesBetOn}
          wagerAmount={wagerAmount}
          userTokens={userTokens}
          handleSubmit={handleSubmit}
        />
      </>
        );
  }
}
