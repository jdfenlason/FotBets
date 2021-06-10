import React from 'react';

const Header = props => {
  const { userTokens } = props;
  return (
      <header>
      <div className="row">
        <div className="column-full">
          <div className="header-container">
            <h2>FotBets</h2>
            <div className = "inline">
              <i className="fas fa-coins tokens"></i>
              <h4>{userTokens.toLocaleString('en-US')}</h4>
            </div>
          </div>
        </div>
      </div>
    </header>

  );
};

export default Header;
