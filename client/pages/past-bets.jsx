import React from 'react';
import Loading from '../components/loading';
import { formatPastResult } from '../lib';
import axios from 'axios';
import Error from '../components/error';
export default class PastBets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pastBets: [],
      networkError: false
    };
  }

  componentDidMount(props) {
    const { userId } = this.props;
    axios
      .get('/api/user-profile/past-bets', { params: userId })
      .then(response => {
        const userBets = response.data;
        this.setState({
          pastBets: userBets,
          isLoading: false
        });
      }).catch(err => {
        this.setState({ networkError: true });
        console.error(err);
      });
  }

  render(props) {
    const { isLoading, pastBets, networkError } = this.state;
    if (isLoading) {
      return <Loading/>;
    }
    if (networkError) {
      return <Error/>;
    }
    return (
    <>
      <div className="central-heading">
        <h2>Latest Bets</h2>
      </div>

      {pastBets.map((bets, index) => {
        const { teamLogo, wagerAmount, date, profitAmount, betResult, betEvaluated } = bets;
        let result;
        if (!betEvaluated) {
          result = 'Pending';
        } else {
          betResult ? (result = 'Won') : (result = 'Lost');
        }

        return (
          <div className="outer-card" key={index}>
            <div className="bets-inner-card column-full">
              <div className="past-bets-container">
                <div className="bet-item">
                  <h3>Date</h3>
                  <h4>{formatPastResult(date)}</h4>
                </div>
                <div className="bet-item">
                  <h3 className="reset">Team</h3>
                  <img
                    className="team-logo"
                    src={teamLogo}
                    alt="home-team-logo"
                  />
                </div>
                <div className="bet-item">
                  <h3>Wager</h3>
                  <h4 className={result}>
                    {wagerAmount.toLocaleString('en-US')}
                  </h4>
                </div>
                <div className="bet-item">
                  <h3>Result</h3>
                  <h4 className={result}>{result}</h4>
                </div>
                <div className="bet-item">
                  <h3>Profit</h3>
                  <h4 className={result}>
                    {profitAmount.toLocaleString('en-US')}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
    );
  }
}
