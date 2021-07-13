import React from 'react';
import axios from 'axios';
import AppContext from '../lib/app-context';
import FixturesList from './fixture-list';
import NoMatchesToday from './no-matches-today';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { makeBets, makeBetsScript } from '../lib/payouts';
import DateStrip from './date-strip';
import { isPast, parseISO, isToday, subDays } from 'date-fns';
import Loading from './loading';
import Error from './error';
export default class FixturesContainer extends React.Component {
  constructor(props) {
    super(props);
    const formatDay = format(new Date(), 'yyyy-MM-dd');
    const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');
    this.state = {
      today: new Date(),
      selectedDay: formatDay,
      formatDay: formatDay,
      yesterday: yesterday,
      fixtures: [],
      isLoading: true,
      activeId: '',
      teamDetails: [],
      wagerAmount: '',
      profitAmount: '',
      matchesBetOn: [],
      betTeamId: '',
      setOdds: '',
      checkProfit: false,
      script: '',
      homeOdds: '',
      awayOdds: '',
      dayOfFixtures: [],
      networkError: false
    };
    this.handleId = this.handleId.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addWagerTeam = this.addWagerTeam.bind(this);
    this.checkProfit = this.checkProfit.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.getDayBeforeScores = this.getDayBeforeScores.bind(this);
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
    const { userId } = this.context.user;
    axios.get('/api/wager-input', { params: { userId } }).then(response => {
      const pastBets = response.data;
      this.setState({
        matchesBetOn: pastBets
      });
    }).catch(err => {
      this.setState({ networkError: true });
      console.error(err);
    });
    axios.get('/api/week-games/').then(response => {
      const fixtures = response.data.fixtures;
      this.setState({
        fixtures: fixtures
      });
      this.changeDate(this.state.selectedDay);
    }).catch(err => {
      this.setState({ networkError: true });
      console.error(err);
    });
    const { yesterday } = this.state;
    axios.post('/api/bet-validation', { yesterday }).catch(err => {
      this.setState({ networkError: true });
      console.error(err);
    });

  }

  getDayBeforeScores(dateString) {
    this.setState({
      isLoading: true
    });
    const zone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
    axios.get('/api/past-results', { params: { dateString } }).then(response => {
      const pastResults = response.data.yesterdayGames;
      if (!pastResults || !pastResults[0].length) {
        this.setState({
          dayOfFixtures: [],
          isLoading: false
        });
        return;
      }
      if (pastResults[0].length >= 1) {
        const singleArrayFixtures = pastResults.reduce((utcFirstDay, utcSecondDay) => {
          return utcFirstDay.concat(utcSecondDay);
        });
        const pastFixtures = singleArrayFixtures.filter(fixtures => {
          const zonedDate = utcToZonedTime(fixtures.fixture.date, zone);
          const formatUTCDate = format(zonedDate, 'yyyy-MM-dd');
          return formatUTCDate === dateString;
        });
        this.setState({
          dayOfFixtures: pastFixtures,
          isLoading: false
        });
      } else {
        const pastFixtures = pastResults.filter(fixtures => {
          const zonedDate = utcToZonedTime(fixtures.fixture.date, zone);
          const formatUTCDate = format(zonedDate, 'yyyy-MM-dd');
          return formatUTCDate === dateString;
        });
        this.setState({
          dayOfFixtures: pastFixtures,
          isLoading: false
        });
      }
    }).catch(err => {
      this.setState({ networkError: true });
      console.error(err);
    });
  }

  changeDate(dateString) {
    const { fixtures } = this.state;
    const selectedDaytoUTC = zonedTimeToUtc(dateString);
    const formatSelected = format(selectedDaytoUTC, 'yyyy-MM-dd');
    const zone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
    const isInPast = isPast(parseISO(formatSelected));
    const isNotToday = !isToday(parseISO(formatSelected));
    if (isInPast && isNotToday) {
      this.setState({
        activeId: '',
        selectedDay: dateString
      });
      this.getDayBeforeScores(formatSelected);
      return;
    }
    const dayOfFixtures = fixtures.filter(fixtures => {
      const zonedDate = utcToZonedTime(fixtures.fixture.date, zone);
      const formatUTCDate = format(zonedDate, 'yyyy-MM-dd');
      return formatUTCDate === formatSelected;
    });
    this.setState({
      dayOfFixtures: dayOfFixtures,
      selectedDay: dateString,
      activeId: '',
      isLoading: false
    });
  }

  handleDateClick(event, sendDate) {
    const id = event.target.closest('div').id;
    this.setState({
      selectedDay: id,
      isLoading: true
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
    const { handleTokenChange } = this.context;
    event.preventDefault();
    const stake = this.state.wagerAmount;
    const odds = this.state.setOdds;
    handleTokenChange(stake);
    const profitAmount = makeBets(stake, odds);
    const { userId } = this.context.user;
    const { activeId, wagerAmount, teamLogo, betTeamId, selectedDay } = this.state;
    if (wagerAmount <= 0) {
      const script = 'Zero is not a valid wager amount!';
      this.setState({
        script: script
      });
      return;
    }
    const newWager = {
      userId: userId,
      fixtureId: activeId,
      wagerAmount: wagerAmount,
      teamLogo: teamLogo,
      profitAmount: profitAmount,
      betTeamId: betTeamId,
      selectedDay: selectedDay,
      betEvaluated: false
    };
    const newArray = this.state.matchesBetOn.slice();
    newArray.push(this.state.activeId);
    axios.post('/api/wager-input', { newWager }).catch(err => {
      this.setState({ networkError: true });
      console.error(err);
    });
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
    const { selectedDay } = this.state;
    const isInPast = isPast(parseISO(selectedDay));
    const isNotToday = !isToday(parseISO(selectedDay));
    let newArray;
    if (isInPast && isNotToday) {
      newArray = this.state.dayOfFixtures.filter(fixtures => {
        return fixtures.fixture.id === id;
      });

    } else {
      newArray = this.state.fixtures.filter(fixtures => {
        return fixtures.fixture.id === id;
      });

    }
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
        this.setState({ networkError: true });
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
      networkError,
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
    const { tokenAmount } = this.context.user;
    const userTokens = tokenAmount;
    if (networkError) {
      return <Error/>;
    }
    if (isLoading) {
      return <Loading/>;
    } else if (!dayOfFixtures.length && !isLoading) {
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
      <Loading/>
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
          handleSubmit={handleSubmit}
          today={today}
          selectedDay = {selectedDay}
          userTokens = {userTokens}
          isLoading = {isLoading}
        />
  </>
        );
  }
}
FixturesContainer.contextType = AppContext;
