import React from 'react';
import Main from './pages/main';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userName: '',
      userTokens: '',
      userId: 2
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
  }

  render() {
    return (
      this.state.isLoading
        ? <p className='hidden'>isLoading</p>
        : <Main />
    );
  }
}
