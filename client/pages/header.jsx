import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenAmount: 'tokenAmount'
    };
  }

  render() {
    return (

    <header>
      <div className="row">
        <div className="column-full">
          <div className="header-container">
            <h2>FotBets</h2>
          </div>
        </div>
      </div>
    </header>

    );
  }

}
