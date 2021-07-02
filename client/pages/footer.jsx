import React from 'react';
import AppContext from '../lib/app-context';
export default class Footer extends React.Component {
  render() {
    const { path } = this.context.route;
    if (path === 'sign-in' || path === 'sign-up' || path === 'home' || path === '') return null;
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
            <a href="#home">
              <i className="fas fa-home size"></i>
            </a>
              <span className = "span-pad">Home</span>
          </div>

 <div className="icon-nav">
            <a href="#fixtures">
            <span>
                <i className="fas fa-calendar-alt size"></i>
              </span>
            </a>
              <span className = "span-pad">Fixtures</span>
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
  }
}

Footer.contextType = AppContext;
