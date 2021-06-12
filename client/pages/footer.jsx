import React from 'react';

const Footer = props => {
  const { handleFixtures, handleProfile, handleLeaderboard } = props;
  return (
    <div className="row footer">
      <div className="column-full">
        <div className="footer-container">
          <i onClick = {() => handleLeaderboard(event)} className="fas fa-trophy size"></i>
          <i onClick = {() => handleFixtures(event)} className="fas fa-home size"></i>
          <i onClick = {() => handleProfile(event)} className="far fa-user-circle size"></i>
        </div>
      </div>
    </div>
  );
};
export default Footer;
