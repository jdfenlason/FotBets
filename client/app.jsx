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
    return (
       <Home userName={this.state.userName}
             userTokens={this.state.userTokens}
             handleProfile ={this.handleProfile}
             handleFixtures = {this.handleFixtures}
             profileOn ={this.state.profileOn}
             fixturesOn = {this.state.fixturesOn}
             />
    );
  }
}
