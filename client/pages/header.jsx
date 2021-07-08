import React from 'react';
import AppContext from '../lib/app-context';
export default class Header extends React.Component {
  render(props) {
    const { tokenAmount } = this.props;
    const { path } = this.context.route;
    if (path === 'sign-in' || path === 'sign-up' || path === 'home' || path === '') return null;
    return (
      <header>
      <div className="row">
        <div className="column-full">
          <div className="header-container">
          <a href="#home">
              <span>
            <h2>F
              <i className='fas fa-futbol logoSize'></i>tBets</h2></span>
            </a>
            <div className = "inline">
              <i className="fas fa-coins tokens"></i>
              <h4>{tokenAmount.toLocaleString('en-US')}</h4>
            </div>
          </div>
        </div>
      </div>
    </header>

    );
  }
}
Header.contextType = AppContext;
