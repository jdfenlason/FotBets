import React from 'react';
import AppContext from './lib/app-context';
import Loading from './components/loading';
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
import FixturesContainer from './components/fixtures-container';
import { format } from 'date-fns';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorizing: false,
      isLoading: true,
      user: null,
      pastBets: [],
      userId: null,
      tokenAmount: '',
      route: parseRoute(window.location.hash)
    };

    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handlePastBets = this.handlePastBets.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
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
    this.setState({ user, isAuthorizing: false });
    this.getPastBets();
  }

  getPastBets() {
    const userId = {
      userId: this.state.userId
    };
    axios
      .get('/api/user-profile/past-bets', { params: userId })
      .then(response => {
        const userBets = response.data;
        this.setState({
          pastBets: userBets,
          isLoading: false
        });
      }).catch(err => {
        this.state({ networkError: true });
        console.error(err);
      });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    const { userId, tokenAmount } = user;
    this.setState({ user, userId, tokenAmount });
    this.getPastBets();
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null, userId: null, tokenAmount: null });
  }

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
    const { tokenAmount } = this.state.user;
    const currentTokenAmount = tokenAmount;
    const changeTokenAmount = currentTokenAmount - wagerAmounts;
    const wager = {
      userId: this.state.userId,
      changeTokenAmount: changeTokenAmount
    };
    axios.patch('/api/token-amount', { params: wager }).then(response => {
      const newTokenAmount = response.data.tokenAmount;
      this.setState({ tokenAmount: newTokenAmount });
    }
    ).catch(err => {
      this.state({ networkError: true });
      console.error(err);
    });
  }

  renderPage() {
    const { pastBets } = this.state;
    const { path } = this.state.route;
    const { handlePastBets, handleTokenChange, handleSignOut } = this;
    if (path === '') {
      return <Auth />;
    }
    if (path === 'sign-in' || path === 'sign-up') {
      return <Auth />;
    }
    if (path === 'fixtures') {
      return (
        <>
          <FixturesContainer
            handleTokenChange={handleTokenChange}
            handlePastBets={handlePastBets}
          />

        </>
      );
    }
    if (path === 'home') {
      return <Home handleSignOut={handleSignOut}/>;
    }

    if (path === 'profile') {
      return (
        <>

          <Profile
            pastBets={pastBets}
          />

          <PastBets pastBets={pastBets} handlePastBets={handlePastBets} />

        </>
      );
    }
    if (path === 'leaderboard') {
      return (
        <>
          <Leaderboard />
        </>
      );
    }
  }

  render() {
    const { isAuthorizing, isLoading } = this.state;
    if (isAuthorizing) return null;
    if (isLoading) return <Loading/>;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut, handlePastBets, handleTokenChange } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut, handlePastBets, handleTokenChange };
    return (
      <AppContext.Provider value={contextValue}>
        <>
        <div className ="container">
        <div className="header">
            <Header value = {contextValue} />
          </div>
            <div className="main">{this.renderPage()}</div>

          <div>
             <Footer value= {contextValue}/>
          </div>
        </div>
        </>
      </AppContext.Provider>
    );
  }
}
