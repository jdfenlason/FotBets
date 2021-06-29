import React from 'react';
import AppContext from './lib/app-context';
import decodeToken from './lib/decode-token';
import Auth from './pages/auth';
import Home from './pages/home';
import axios from 'axios';
import { parseRoute } from './lib';
import Leaderboard from './pages/leaderboard';
import Profile from './pages/user-profile';
import PastBets from './pages/past-bets';
import Header from './pages/header';
import Footer from './pages/footer';
import { format } from 'date-fns';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorizing: true,
      userName: null,
      userTokens: null,
      userId: null,
      pastBets: [],
      route: parseRoute(window.location.hash)
    };
    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handlePastBets = this.handlePastBets.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({
        route: newRoute
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthoritzing: false });

  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.setItem('react-context-jwt');
    this.setState({ user: null });
  }

  // const userId = {
  //   userId: this.state.userId
  // };
  // axios.get('/api/user-profile', { params: userId }).then(response => {
  //   this.setState({
  //     userName: response.data.userName,
  //     userTokens: response.data.tokenAmount
  //   });
  // });
  // axios
  //   .get('/api/user-profile/past-bets', { params: userId })
  //   .then(response => {
  //     const userBets = response.data;
  //     this.setState({
  //       pastBets: userBets,
  //       isLoading: false
  //     });
  //   });
  handlePastBets(newWager) {
    const betResult = 'Pending';
    const newArray = this.state.pastBets.slice();
    const dateObj = new Date();
    const formatDate = format(dateObj, 'yyyy-MM-dd');
    newWager.betResult = betResult;
    newWager.date = formatDate;
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

  renderPage() {
    const { userName, pastBets, userTokens } = this.state;
    const { path } = this.state.route;
    const { handlePastBets, handleTokenChange } = this;
    if (path === 'sign-in' || path === 'sign-out') {
      return <Auth/>;
    }
    if (path === '') {
      return (
        <Home
          userTokens={userTokens}
          handleTokenChange={handleTokenChange}
          handlePastBets={handlePastBets}
        />
      );
    }
    if (path === 'profile') {
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
    if (path === 'leaderboard') {
      return <Leaderboard />;
    }
  }

  render() {
    const { userTokens } = this.state;
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
        <AppContext.Provider value = {contextValue}>
        <>
        <div className="container">
          <div className="header">
            <Header userTokens={userTokens} />
          </div>
          <div className="main">{this.renderPage()}</div>
          <div className="">
            <Footer />
          </div>
        </div>
      </>
        </AppContext.Provider>
    );
  }
}
