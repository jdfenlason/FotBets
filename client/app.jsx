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
      fixturesOn: true
    };
    this.handleProfile = this.handleProfile.bind(this);
    this.handleFixtures = this.handleFixtures.bind(this);
    this.handleTokenChange = this.handleTokenChange.bind(this);
  }

  handleProfile(event) {
    this.setState(prevState => ({
      profileOn: true,
      fixturesOn: false
    }));
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
        userTokens: response.data.tokenAmount,
        isLoading: false
      });
    });
  }

  render() {
    const { userName, userTokens, profileOn, fixturesOn, fixtures } = this.state;
    const { handleProfile, handleFixtures, handleTokenChange } = this;
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
             />
    );
  }
}
