import React from 'react';
import axios from 'axios';
import FixturesList from './fixture-list';
import NoMatchesToday from './no-matches-today';
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
    this.handleId = this.handleId.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addWagerTeam = this.addWagerTeam.bind(this);
    this.checkProfit = this.checkProfit.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  handleId(event) {
    const id = Number(event.target.closest('div').id);
    const { activeId } = this.state;
    this.getTeamDetails(id);
    if (activeId !== id) {
      this.setState({
        activeId: id
      });
    } else {
      this.setState({
        activeId: '',
        isLoading: true
      });
    }
  }

  componentDidMount() {
    const { userId } = this.state;
    axios.get('/api/wager-input', { userId }).then(response => {
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
      this.changeDate(this.state.selectedDay);
    });
  }

  changeDate(dateString) {
    const { fixtures } = this.state;
    const selectedDaytoUTC = zonedTimeToUtc(dateString);
    const formatSelected = format(selectedDaytoUTC, 'yyyy-MM-dd');
    const zone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dayOfFixtures = fixtures.filter(fixtures => {
      const zonedDate = utcToZonedTime(fixtures.fixture.date, zone);
      const formatUTCDate = format(zonedDate, 'yyyy-MM-dd');
      return formatUTCDate === formatSelected;
    });
    this.setState({
      dayOfFixtures: dayOfFixtures,
      isLoading: false,
      selectedDay: dateString,
      activeId: ''
    });
  }

  handleDateClick(event, sendDate) {
    const id = event.target.closest('div').id;
    this.setState({
      selectedDay: id
    });
    this.changeDate(id);
  }

  addWagerTeam(event, odds) {
    const { id, src } = event.target;
    const { activeId, matchesBetOn } = this.state;
    const checkBet = matchesBetOn.includes(activeId);
    if (!checkBet) {
      this.setState({
        betTeamId: id,
        teamLogo: src,
        setOdds: odds
      });
    } else {
      this.setState({
        betTeamId: '',
        teamLogo: '',
        setOdds: ''
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
    const { handleTokenChange, handlePastBets } = this.props;
    event.preventDefault();
    const stake = this.state.wagerAmount;
    const odds = this.state.setOdds;
    handleTokenChange(stake);
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
    handlePastBets(newWager);
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

  getTeamDetails(id) {
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
          teamDetails: teamDetails,
          awayOdds: awayOdds,
          homeOdds: homeOdds,
          isLoading: false
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const {
      activeId,
      dayOfFixtures,
      matchesBetOn,
      teamDetails,
      isLoading,
      wagerAmount,
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
    const {
      handleDateClick,
      addWagerTeam,
      handleId,
      checkProfit,
      handleChange,
      handleSubmit
    } = this;
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
          <NoMatchesToday selectedDay={selectedDay} />
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
          activeId={activeId}
          fixtures={dayOfFixtures}
          handleId={handleId}
          teamDetails={teamDetails}
          loading={isLoading}
          betTeamId={betTeamId}
          addWagerTeam={addWagerTeam}
          matchesBetOn={matchesBetOn}
          checkProfit={checkProfit}
          script={script}
          handleChange={handleChange}
          setOdds={setOdds}
          teamLogo={teamLogo}
          userTokens={userTokens}
          handleSubmit={handleSubmit}
          today={today}
        />
      </>
        );
  }
}
