import React from 'react';

const Profile = props => {
  const { userName, userTokens } = props;
  return (
    <div className="row column-full center">
      <div className="outer-card column-full">
        <div className="match-card row center">
          <div>
            <h1>{userName}</h1>
          </div>
          <div className = "token-amount-container">
          <h3>Your current Token amount is:</h3>
            <h2>
              <i className="fas fa-coins tokens"></i>
              {userTokens.toLocaleString('en-US')}
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
};

export default Profile;
