import React from 'react';
import Header from './header';
import Footer from './footer';
import FixturesContainer from './fixtures-container';
import Profile from './user-profile';
import PastBets from './past-bets';
import Leaderboard from './leaderboard';

const Home = props => {
  const {
    userTokens,
    userName,
    profileOn,
    fixturesOn,
    handleProfile,
    handleFixtures,
    pastBets,
    handleTokenChange,
    handlePastBets,
    leaderboardOn,
    handleLeaderboard
  } = props;
  return (
    <>
      <div className="container">
        <div className="header">
          <Header userTokens={userTokens} />
        </div>
        <div className="main">
          <div
            className={
              leaderboardOn && profileOn && fixturesOn ? 'hidden' : ''
            }
          >
            <Leaderboard />
          </div>
          <div
            className={
              fixturesOn && !profileOn && !leaderboardOn ? 'hidden' : ''
            }
          >
            <Profile
              pastBets={pastBets}
              userTokens={userTokens}
              userName={userName}
            />
            <PastBets pastBets={pastBets} handlePastBets={handlePastBets} />
          </div>
          <div
            className={
              profileOn && !leaderboardOn && !fixturesOn ? 'hidden' : ''
            }
          >
            <FixturesContainer
              userTokens={userTokens}
              handleTokenChange={handleTokenChange}
              handlePastBets={handlePastBets}
            />
          </div>
        </div>
        <div className="footer">
          <Footer
            handleProfile={handleProfile}
            handleFixtures={handleFixtures}
            handleLeaderboard={handleLeaderboard}
          />
        </div>
      </div>
    </>
  );
};
export default Home;
