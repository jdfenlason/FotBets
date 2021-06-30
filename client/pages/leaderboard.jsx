import React from 'react';
import axios from 'axios';

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: []
    };
  }

  componentDidMount() {
    axios.get('/api/leaderboard').then(response => {
      const leaders = response.data;
      this.setState({
        leaderboard: leaders
      });
    });
  }

  render() {
    const { leaderboard } = this.state;
    return (
      <>
        <div className="input-container">
          <div className="central-heading">
            <h1>Leaderboard</h1>
          </div>

          <div className="row column-full">
            <div className="outer-card column-full">
              <div className="column-half">
                <table>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Username</th>
                      <th>Tokens</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((leaders, index) => {
                      const { username, tokenAmount } = leaders;
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{username}</td>
                          <td>{tokenAmount.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
