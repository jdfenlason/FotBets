import React from 'react';
import axios from 'axios';
import MatchDetails from './match-details';
import TodayFixtures from './today-fixtures';
import NoGamesToday from './no-games-today';
import Fixtures from './fixtures';
import Loading from './loading';
// import formatDate from './format-date';
// import formatTime from './format-time';

export default class FixtureList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixturesList: [],
      toggleMatchDetails: false,
      isLoading: false,
      activeId: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
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
        ? <Loading />
        : <>
        <TodayFixtures />

    {this.state.fixturesList.map((fixtures, event) => {
      return (
        <div key={fixtures.fixture.id} onClick={() => this.handleClick(fixtures.fixture.id)} id={fixtures.fixture.id}>

      <Fixtures fixtures={fixtures} id={fixtures.fixture.id} />
    <MatchDetails matchdetails={fixtures} id={fixtures.fixture.id} className={this.state.toggleMatchDetails && this.state.activeId === fixtures.fixture.id ? '' : 'hidden'}/>
        </div>
      );
    })}

  </>
    );
  }
}
