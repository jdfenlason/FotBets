import React from 'react';

const Footer = () => {
  return (
    <div className="row">
      <div className="column-full">
        <div className="footer-container">
          <div className="icon-nav">
            <a href="#leaderboard">
              <span>
                <i className="fas fa-trophy size"></i>
              </span>
            </a>
            <span className = "span-pad">Leaderboard</span>
          </div>
          <div className="icon-nav">
            <a href="">
              <i className="fas fa-home size"></i>
            </a>
              <span className = "span-pad">Home</span>
          </div>
          <div className="icon-nav">
            <a href="#profile">
              <i className="far fa-user-circle size"></i>
            </a>
              <span className = "span-pad">Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
