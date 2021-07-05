import React from 'react';
import AppContext from '../lib/app-context';
import axios from 'axios';
import Loading from '../components/loading';
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rank: '',
      isLoading: true
    };
  }

  componentDidMount() {
    const { username, userId, tokenAmount } = this.context.user;
    axios.get('/api/leaderboard/rank', { params: { username, userId, tokenAmount } }).then(response => {
      const { rank } = response.data[0];
      this.setState({ rank, isLoading: false });
    }).catch(err => {
      this.state({ networkError: true });
      console.error(err);
    });
  }

  render() {
    const { username, tokenAmount } = this.context.user;
    const { rank, isLoading } = this.state;
    if (isLoading) {
      <Loading/>;
    }
    return (
    <div className="row column-full center">
      <div className="outer-card column-full">
        <div className="match-card row center">
          <div>
            <h1>{username}</h1>
          </div>
          <div className = "token-amount-container">
          <h3>Your current Token amount is:</h3>
            <h2>
              <i className="fas fa-coins tokens"></i>
              {tokenAmount.toLocaleString('en-US')}
            </h2>
          </div>
          <div className = "token-amount-container">
          <h2>Current Rank:</h2>
          <h2>{rank}</h2>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

Profile.contextType = AppContext;
