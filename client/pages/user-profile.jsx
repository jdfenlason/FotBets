import React from 'react';
import AppContext from '../lib/app-context';
export default class Profile extends React.Component {
  render() {
    const { username, tokenAmount } = this.context.user;
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
          <h2>1</h2>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
Profile.contextType = AppContext;
