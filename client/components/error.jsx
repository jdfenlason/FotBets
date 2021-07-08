import React from 'react';
import Home from '../pages/home';

export default class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      netWorkError: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isClicked: true
    });
  }

  render() {
    const { isClicked, netWorkError } = this.state;
    if (isClicked) {
      return <Home netWorkError = {netWorkError}/>;
    }
    return <div className="error-box" onClick={this.handleClick}>
      <div className="network-error">
 There is an issue with your connection. Please check that your network is online and try again.
      </div>
      </div>;
  }
}
