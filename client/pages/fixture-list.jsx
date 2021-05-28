import React from 'react';
import axios from 'axios';
import MatchDetails from './match-details';
import TodayFixtures from './today-fixtures';
import NoGamesToday from './no-games-today';
import Fixtures from './fixtures';

export default class FixtureList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixturesList: [],
      toggleMatchDetails: null,
      isLoading: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const clickedFixture = event.target.getAttribute('fixtureid');

    if (clickedFixture === this.state.toggleMatchDetails) {
      this.setState({ toggleMatchDetails: '' });
    } else {
      this.setState({ toggleMatchDetails: clickedFixture });
    }

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
        ? <p>...Loading</p>
        : <>
    <TodayFixtures />
    <Fixtures fixtures= {this.state.fixturesList} />
   <MatchDetails matchdetails= {this.state.fixturesList} />
        </>
    );
  }
}
