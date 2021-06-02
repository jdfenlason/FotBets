import React from 'react';
import axios from 'axios';
import FixturesList from './fixture-list';
import NoGamesToday from './no-games-today';
export default class FetchData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixturesList: [],
      isLoading: false,
      toggleMatchDetails: false,
      activeId: '',
      matchForm: []
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
    axios.request('/api/team-form').then(response => {
      const teamForm = response.data;
      this.setState({
        matchForm: teamForm,
        isLoading: true
      });
    }).catch(err => console.error(err));

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
      (!this.state.isLoading)
        ? <p>isLoading...</p>
        : <>
        <FixturesList toggleMatchDetails= {this.state.toggleMatchDetails} activeId = {this.state.activeId} fixtures ={this.state.fixturesList} matchForm = {this.state.matchForm} click={id => this.handleClick(id)} loading={this.state.isLoading}/>

</>
    );
  }
}
