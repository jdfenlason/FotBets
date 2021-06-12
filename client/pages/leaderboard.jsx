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
      <div className="row column-full center">
        <div className="outer-card column-full">
          <div className="match-card row center">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>UserName</th>
                  <th>Tokens</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((leaders, index) => {
                  const { userName, tokenAmount } = leaders;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{userName}</td>
                      <td>{tokenAmount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
