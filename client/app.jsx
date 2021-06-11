import React from 'react';
import Home from './pages/home';
import axios from 'axios';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userName: '',
      userTokens: '',
      userId: 2,
      profileOn: false,
      fixturesOn: true,
      pastBets: []
    };
    this.handleProfile = this.handleProfile.bind(this);
    this.handleFixtures = this.handleFixtures.bind(this);
    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handlePastBets = this.handlePastBets.bind(this);
  }

  handleProfile(event) {
    this.setState(prevState => ({
      profileOn: true,
      fixturesOn: false
    }));
  }

  handlePastBets(newWager) {
    const betResult = 'Pending';
    const newArray = this.state.pastBets;
    const dateObj = new Date();
    const dateString = dateObj.toLocaleDateString();
    const date = dateString.slice(0, 4);
    newWager.betResult = betResult;
    newWager.date = date;
    newArray.push(newWager);
    this.setState({
      pastBets: newArray
    });
  }

  handleFixtures(event) {
    this.setState(prevState => ({
      profileOn: false,
      fixturesOn: true
    }));
  }

  handleTokenChange(wagerAmount) {
    const currentTokenAmount = this.state.userTokens;
    const changeTokenAmount = currentTokenAmount - wagerAmount;
    this.setState({
      userTokens: changeTokenAmount
    });
  }

  componentDidMount() {
    const userId = {
      userId: this.state.userId
    };
    axios.get('/api/user-profile', { params: userId }).then(response => {
      this.setState({
        userName: response.data.userName,
        userTokens: response.data.tokenAmount
      });
    });
    axios.get('/api/user-profile/past-bets', { params: userId }).then(response => {
      const userBets = response.data;
      this.setState({
        pastBets: userBets,
        isLoading: false
      });
    });
  }

  render() {
    const { userName, pastBets, userTokens, profileOn, fixturesOn, fixtures } = this.state;
    const { handleProfile, handlePastBets, handleFixtures, handleTokenChange } = this;
    return (
      this.state.isLoading
        ? <p className='hidden'>isLoading</p>
        : <Home userName={userName}
             userTokens={userTokens}
             handleProfile ={handleProfile}
             handleFixtures = {handleFixtures}
             profileOn ={profileOn}
             fixturesOn = {fixturesOn}
             fixtures = {fixtures}
             handleTokenChange ={handleTokenChange}
             pastBets = {pastBets}
             handlePastBets = {handlePastBets}
             />
    );
  }
}
