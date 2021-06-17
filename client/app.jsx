import React from 'react';
import Home from './pages/home';
import axios from 'axios';
import { parseRoute } from './lib';
import Leaderboard from './pages/leaderboard';
import Profile from './pages/user-profile';
import PastBets from './pages/past-bets';
import Header from './pages/header';
import Footer from './pages/footer';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userName: '',
      userTokens: '',
      userId: 2,
      pastBets: [],
      route: parseRoute(window.location.hash)
    };
    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handlePastBets = this.handlePastBets.bind(this);
  }

  handlePastBets(newWager) {
    const betResult = 'Pending';
    const newArray = this.state.pastBets.slice();
    const dateObj = new Date();
    const dateString = dateObj.toLocaleDateString();
    const date = dateString.slice(0, 4);
    newWager.betResult = betResult;
    newWager.date = date;
    newArray.push(newWager);
    this.setState({
      pastBets: newArray
    });
  }

  handleTokenChange(wagerAmounts) {
    const currentTokenAmount = this.state.userTokens;
    const changeTokenAmount = currentTokenAmount - wagerAmounts;
    const wager = {
      userId: this.state.userId,
      changeTokenAmount: changeTokenAmount
    };
    axios.patch('/api/token-amount', { params: wager }).then(response => {
      const newTokenAmount = response.data.tokenAmount;
      this.setState({ userTokens: newTokenAmount });
    });
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({
        route: newRoute
      });
    });
    const userId = {
      userId: this.state.userId
    };
    axios.get('/api/user-profile', { params: userId }).then(response => {
      this.setState({
        userName: response.data.userName,
        userTokens: response.data.tokenAmount
      });
    });
    axios
      .get('/api/user-profile/past-bets', { params: userId })
      .then(response => {
        const userBets = response.data;
        this.setState({
          pastBets: userBets,
          isLoading: false
        });
      });
  }

  renderPage() {
    const { route, userName, pastBets, userTokens } = this.state;
    const { handlePastBets, handleTokenChange } = this;
    if (route.path === '') {
      return (
        <Home
          userTokens={userTokens}
          handleTokenChange={handleTokenChange}
          handlePastBets={handlePastBets}
        />
      );
    }
    if (route.path === 'profile') {
      return (
        <>
          <Profile
            pastBets={pastBets}
            userTokens={userTokens}
            userName={userName}
          />

          <PastBets pastBets={pastBets} handlePastBets={handlePastBets} />

        </>
      );
    }
    if (route.path === 'leaderboard') {
      return <Leaderboard />;
    }
  }

  render() {
    const { userTokens } = this.state;
    return this.state.isLoading
      ? (
      <p className="hidden">isLoading</p>
        )
      : (
      <>
        <div className="container">
          <div className="header">
            <Header userTokens={userTokens} />
          </div>
          <div className="main">{this.renderPage()}</div>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </>
        );
  }
}
