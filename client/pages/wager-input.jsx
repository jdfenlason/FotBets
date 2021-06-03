import React from 'react';
import axios from 'axios';
export default class WagerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oddsDetails: [],
      fixtures: [],
      filterId: '',
      wagerInput: '',
      betOn: false
    };
    this.handleFilterId = this.handleFilterId.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFilterId(id, fixturesArray) {
    this.setState(prevState => ({
      filterId: id
    }));
    this.getOddsData(id, fixturesArray);
  }

  handleChange(event) {
    this.setState({
      wagerInput: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newWager = {
      wagerInput: this.state.wagerInput,
      betOn: true
    };
    this.props.Onsubmit(newWager);
    this.setState({ wagerInput: ' ' });
  }

  getOddsData(id, fixturesArray) {
    const newArray = fixturesArray.filter(fixtures => {
      return fixtures.fixture.id === id;
    });
    const teamId = {
      fixtureId: newArray[0].fixture.id,
      date: newArray[0].fixture.date.slice(0, 10)
    };
    return axios.get('/api/odds/', {
      params: teamId
    }).then(response => {
      this.setState({
        oddsDetails: response.data[0]
      });
    }).catch(err => {
      console.error(err);
    });
  }

  render() {
    const value = this.state.wagerInput;
    return (
      <div className = "input-container column-full">
        <form onSubmit={this.handleSubmit} className="column-full" >
        <input
        className = "wager-input"
        type="number"
        max= '10'
        required
        autoFocus
        value = {value}
        placeholder= "WAGER HERE"
        onChange={this.handleChange}/>
          <div className = "row">

      <h4 className={!value ? 'hidden' : 'row payout center'}>{`TOTAL PAYOUT IS ${value} and profit is ${value}`}</h4>

          </div>
        <div className = "button-container row">
      <button className = "enter-button" type="submit" >ENTER</button>
        </div>
        </form>
      </div>
    );
  }
}
