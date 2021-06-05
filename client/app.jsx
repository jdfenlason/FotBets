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
      userId: 1
    };
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
             userTokens={this.state.userTokens}/>
    );
  }
}
