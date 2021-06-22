import React from 'react';

const Header = props => {
  const { userTokens } = props;
  return (
      <header>
      <div className="row">
        <div className="column-full">
          <div className="header-container">
          <a href="">

              <span>
            <h2>F
              <i className='fas fa-futbol logoSize'></i>tBets</h2></span>
            </a>
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
