import React from 'react';
import axios from 'axios';
import FixturesList from './fixture-list';
import NoGamesToday from './no-games-today';
export default class FetchData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixturesList: [],
      matchForm: [],
      isLoading: false,
      toggleMatchDetails: false,
      activeId: ''
    };
  }

  handleClick(id) {
    this.setState(prevState => ({
      toggleMatchDetails: !prevState.toggleMatchDetails,
      activeId: id
    }));
  }

  componentDidMount() {

    axios.request('/api/team-form').then(response => {
      const teamForm = response.data.matchDetails;
      this.setState({
        matchForm: teamForm,
        isLoading: false
      });
    });
    axios.request('/api/week-games/:date').then(response => {
      const fixtures = response.data;
      this.setState({
        fixturesList: fixtures
      }
      );
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
        <FixturesList fixtures ={this.state.fixturesList} matchForm = {this.state.matchForm} onClick={() => this.handleClick()}/>
</>
    );
  }
}
